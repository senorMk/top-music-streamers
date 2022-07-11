import cheerio from 'cheerio';
import zod from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';

const schema = zod.object({
  countryCode: zod.string(),
});

const getCountFromString = (str: string) => {
  const lastChar = str.slice(-1);

  if (lastChar === 'k') {
    return parseFloat(str.slice(0, -1)) * 1000;
  }
  if (lastChar === 'm') {
    return parseFloat(str.slice(0, -1)) * 1000000;
  }
  if (lastChar === 'b') {
    return parseFloat(str.slice(0, -1)) * 1000000000;
  }

  return 0;
};

const getStreamers = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const data = schema.parse(req.query);
      const countryCode = data.countryCode;
      const response = await fetch(
        `https://www.boomplay.com/artists?categoryID=0&sex=&countryCode=${countryCode}&firstAlpha=`
      );

      const dom = await response.text();
      const $ = cheerio.load(dom);

      interface artist {
        no: number;
        name: string;
        url: string;
        streams: number;
        streamCount: string;
        image: string;
      }

      let artists: Array<artist> = [];

      $('.display.display_artists.partTo_artists ul li').each(function (i, el) {
        const url = `https://www.boomplay.com${$(el).find(`a`).attr('href')}`;
        const name = $(el).find(`strong`).text();
        const streamCount = $(el).find(`span`).text();
        const image = $(el).find(`a > div > div`).attr('data-bgurl');

        let nArtist = {
          no: i + 1,
          url: url,
          name: name,
          streamCount: streamCount,
          streams: getCountFromString(streamCount),
          image: image ? image : '',
        };

        artists.push(nArtist);
      });

      // Sort by streams and re-number
      artists.sort((a, b) => {
        return b.streams - a.streams;
      });

      artists.forEach((artist, i) => (artist.no = i + 1));

      return res.status(200).json({
        message: 'Success',
        countryCode: countryCode,
        artists: artists.slice(0, 10),
        success: true,
      });
    } catch (error) {
      return res.status(400).json({ message: 'Bad request', success: false });
    }
  } else {
    return res
      .status(405)
      .json({ message: 'Method not allowed', success: false });
  }
};

export default getStreamers;

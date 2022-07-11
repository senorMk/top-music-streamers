import { useEffect, useState } from 'react';
import axios from 'axios';

interface artist {
  no: number;
  name: string;
  url: string;
  streams: number;
  streamCount: string;
  image: string;
}

const Home = () => {
  const [topZambian, setTopZambian] = useState<Array<artist>>([]);
  const [topNigerian, setTopNigerian] = useState<Array<artist>>([]);
  const [topSouthAfrican, setTopSouthAfrican] = useState<Array<artist>>([]);

  useEffect(() => {
    const getTopZambian = async () => {
      try {
        let response = await axios.get('/api/streamers', {
          params: {
            countryCode: 'ZM',
          },
        });

        return response.data.artists;
      } catch (error) {
        console.log(error);
      }
    };

    const getTopNigerian = async () => {
      try {
        let response = await axios.get('/api/streamers', {
          params: {
            countryCode: 'NG',
          },
        });

        return response.data.artists;
      } catch (error) {
        console.log(error);
      }
    };

    const getTopSouthAfrican = async () => {
      try {
        let response = await axios.get('/api/streamers', {
          params: {
            countryCode: 'ZA',
          },
        });

        return response.data.artists;
      } catch (error) {
        console.log(error);
      }
    };

    getTopZambian().then((topZambian) => {
      if (topZambian) {
        setTopZambian(topZambian);
        console.log('topZambian: ', topZambian);
      }
    });

    getTopNigerian().then((topNigerian) => {
      if (topNigerian) {
        setTopNigerian(topNigerian);
        console.log('topNigerian: ', topNigerian);
      }
    });

    getTopSouthAfrican().then((topSouthAfrican) => {
      if (topSouthAfrican) {
        setTopSouthAfrican(topSouthAfrican);
        console.log('topSouthAfrican: ', topSouthAfrican);
      }
    });
  }, []);

  return (
    <div className="py-5 flex flex-col items-center animate-fade-in-down h-screen relative cursor-default">
      <h1 className="text-2xl text-white">Top 10 Music Streamers - Boomplay</h1>

      <div className="flex flex-col items-center mt-5 p-2">
        <h2 className="text-xl text-center text-white">ZAMBIA</h2>
        <div className="py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3 p-5 overflow-hidden">
          {topZambian.map((artist) => (
            <a
              key={artist.url}
              href={artist.url}
              className="group block w-56 mx-auto rounded-lg border-2 p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500 hover:text-white"
            >
              {artist.no === 1 ? (
                <>
                  <h2 className="text-xl text-center font-bold">
                    No. {artist.no} {artist.no === 1 ? '🚩' : ''}
                  </h2>
                  <h2 className="text-xl text-center">{artist.name}</h2>
                  <h2 className="text-xl text-center text-slate-700">
                    {artist.streamCount}
                  </h2>
                </>
              ) : (
                <>
                  <h2 className="text-xl text-center">No. {artist.no}</h2>
                  <h2 className="text-xl text-center">{artist.name}</h2>
                  <h2 className="text-xl text-center">{artist.streamCount}</h2>
                </>
              )}
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center mt-5 p-2">
        <h2 className="text-xl text-center text-white">NIGERIA</h2>
        <div className="py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3 p-5 overflow-hidden">
          {topNigerian.map((artist) => (
            <a
              key={artist.url}
              href={artist.url}
              className="group block w-56 mx-auto rounded-lg border-2 p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500 hover:text-white"
            >
              {artist.no === 1 ? (
                <>
                  <h2 className="text-xl text-center font-bold">
                    No. {artist.no} {artist.no === 1 ? '🚩' : ''}
                  </h2>
                  <h2 className="text-xl text-center">{artist.name}</h2>
                  <h2 className="text-xl text-center text-slate-700">
                    {artist.streamCount}
                  </h2>
                </>
              ) : (
                <>
                  <h2 className="text-xl text-center">No. {artist.no}</h2>
                  <h2 className="text-xl text-center">{artist.name}</h2>
                  <h2 className="text-xl text-center">{artist.streamCount}</h2>
                </>
              )}
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center mt-5 p-2">
        <h2 className="text-xl text-center text-white">SOUTH AFRICA</h2>
        <div className="py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3 p-5 overflow-hidden">
          {topSouthAfrican.map((artist) => (
            <a
              key={artist.url}
              href={artist.url}
              className="group block w-56 mx-auto rounded-lg border-2 p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500 hover:text-white"
            >
              {artist.no === 1 ? (
                <>
                  <h2 className="text-xl text-center font-bold">
                    No. {artist.no} {artist.no === 1 ? '🚩' : ''}
                  </h2>
                  <h2 className="text-xl text-center">{artist.name}</h2>
                  <h2 className="text-xl text-center text-slate-700">
                    {artist.streamCount}
                  </h2>
                </>
              ) : (
                <>
                  <h2 className="text-xl text-center">No. {artist.no}</h2>
                  <h2 className="text-xl text-center">{artist.name}</h2>
                  <h2 className="text-xl text-center">{artist.streamCount}</h2>
                </>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

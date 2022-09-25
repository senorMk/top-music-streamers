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

  const [loadingZM, setLoadingZM] = useState<boolean>(false);
  const [loadingNG, setLoadingNG] = useState<boolean>(false);
  const [loadingZA, setLoadingZA] = useState<boolean>(false);

  useEffect(() => {
    const getTopMusicStreamers = async (countryCode: string) => {
      try {
        let response = await axios.get('/api/streamers', {
          params: {
            countryCode: countryCode,
          },
        });

        return response.data.artists;
      } catch (error) {
        return [];
      }
    };

    setLoadingZM(true);
    getTopMusicStreamers('ZM')
      .then((topZambian) => {
        setLoadingZM(false);
        if (topZambian) {
          setTopZambian(topZambian);
        }
      })
      .catch((error) => {
        setLoadingZM(false);
      });

    setLoadingNG(true);
    getTopMusicStreamers('NG')
      .then((topNigerian) => {
        setLoadingNG(false);
        if (topNigerian) {
          setTopNigerian(topNigerian);
        }
      })
      .catch((error) => {
        setLoadingNG(false);
      });

    setLoadingZA(true);
    getTopMusicStreamers('ZA')
      .then((topSouthAfrican) => {
        setLoadingZA(false);
        if (topSouthAfrican) {
          setTopSouthAfrican(topSouthAfrican);
        }
      })
      .catch((error) => {
        setLoadingZA(false);
      });
  }, []);

  return (
    <div className="py-5 flex flex-col items-center animate-fade-in-down h-screen relative cursor-default">
      <h1 className="text-2xl text-white">Top 10 Music Streamers - Boomplay</h1>

      <div className="flex flex-col items-center mt-5 p-2">
        <h2 className="text-xl text-center text-white">ZAMBIA</h2>
        {loadingZM ? (
          <div className="flex flex-col items-center mt-5 group w-56 mx-auto rounded-lg border-2 p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500 hover:text-white">
            <h2 className="text-xl text-center text-white">Loading...</h2>
          </div>
        ) : (
          <></>
        )}
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
        {loadingNG ? (
          <div className="flex flex-col items-center mt-5 group w-56 mx-auto rounded-lg border-2 p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500 hover:text-white">
            <h2 className="text-xl text-center text-white">Loading...</h2>
          </div>
        ) : (
          <></>
        )}
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
        {loadingZA ? (
          <div className="flex flex-col items-center mt-5 group w-56 mx-auto rounded-lg border-2 p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500 hover:text-white">
            <h2 className="text-xl text-center text-white">Loading...</h2>
          </div>
        ) : (
          <></>
        )}
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

import { FormEvent, useState } from "react";
import CompassSVG from "./components/Compass";
import ApiService from "./services/ApiService";

interface data {
  city: string;
  weather: weather[];
  main: main;
  wind: wind;
  error: string | null;
}

interface main {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface weather {
  description: string;
  icon: string;
}

interface wind {
  deg: number;
  speed: number;
  gust: number;
}

function App() {
  const [data, setData] = useState<data>({
    city: "",
    weather: [],
    main: {
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    wind: {
      deg: 0,
      speed: 0,
      gust: 0,
    },
    error: null,
  });
  const fetchWeatherData = async (e: FormEvent) => {
    e.preventDefault();

    if (data?.city) {
      const result = await ApiService.getWeatherData(data?.city);
      if (typeof result == "string") {
        setData({
          ...data,
          weather: [],
          main: {
            feels_like: 0,
            humidity: 0,
            pressure: 0,
            temp: 0,
            temp_max: 0,
            temp_min: 0,
          },
          wind: {
            deg: 0,
            speed: 0,
            gust: 0,
          },
          error: result,
        });
      } else {
        setData({
          ...data,
          weather: result.weather,
          main: result.main,
          wind: result.wind,
          error: null,
        });
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mt-10 max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 min-h-[92vh]">
        <form className=" " onSubmit={(e) => fetchWeatherData(e)}>
          <h1 className="text-xl font-bold text-center mb-8">
            Weather Dashboard
          </h1>
          <div className="mb-4">
            <input
              id="city"
              type="text"
              name={data?.city}
              value={data?.city}
              onChange={(e) => setData({ ...data, city: e.target.value })}
              placeholder="Enter City Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Get Weather Information
            </button>
          </div>
        </form>

        {data.error !== null && (
          <div className="capitalize p-10 flex items-center content-center justify-center text-red-600 bg-gray-100 mt-10 rounded text-3xl">
            {data.error}
          </div>
        )}

        {data.city !== "" && data.weather.length > 0 && data.main !== null && (
          <div className=" bg-blue-200 rounded mt-10 p-5">
            <div className="flex flex-col items-center justify-center">
              {/* <p className="font-bold text-xl text-center capitalize">{city}</p> */}
              <p className="text-center font-bold text-4xl relative">
                {Math.floor(data.main?.temp ?? "")}{" "}
                <span className="text-sm inline-block absolute top-1">°C</span>
              </p>
              <p className="text-center capitalize text-gray-600">
                {data.weather[0]["description"]}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="inline-block font-semibold relative">
                  H: {Math.ceil(data.main.temp_max)}
                  <span className="text-sm inline-block absolute top-0">
                    °C
                  </span>
                </div>
                <div className="inline-block font-semibold  relative">
                  L: {Math.floor(data.main.temp_min)}
                  <span className="text-sm inline-block absolute top-0">
                    °C
                  </span>
                </div>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`}
                alt=""
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-blue-100 p-5 pt-2 rounded">
                <span className="icon-label">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-chart-dots-2 inline-block mr-1"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 3v18h18" />
                    <path d="M9 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M13 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M18 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M21 3l-6 1.5" />
                    <path d="M14.113 6.65l2.771 3.695" />
                    <path d="M16 12.5l-5 2" />
                  </svg>
                  AVERAGE
                </span>

                <div className="grid grid-cols-2 gap-8 mt-2">
                  <div className="inline-block font-semibold relative">
                    H: {Math.ceil(data.main.temp_max)}
                    <span className="text-sm inline-block absolute top-0">
                      °C
                    </span>
                  </div>
                  <div className="inline-block font-semibold  relative">
                    L: {Math.floor(data.main.temp_min)}
                    <span className="text-sm inline-block absolute top-0">
                      °C
                    </span>
                  </div>
                </div>

                <div className="text-xs grid grid-cols-2 gap-4 mt-2 border-b border-b-gray-300 pb-2">
                  <div>Humidity</div>
                  <div className="text-gray-500">{data.main.humidity}%</div>
                </div>
                <div className="text-xs grid grid-cols-2 gap-4 pt-2">
                  <div>Pressure</div>
                  <div className="text-gray-500">{data.main.pressure}hPa</div>
                </div>
              </div>
              <div className="bg-blue-100 p-5 pt-2 rounded">
                <span className="icon-label">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-temperature-sun inline-block mr-1"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 1 0 -4 0v8.5" />
                    <path d="M4 9h4" />
                    <path d="M13 16a4 4 0 1 0 0 -8a4.07 4.07 0 0 0 -1 .124" />
                    <path d="M13 3v1" />
                    <path d="M21 12h1" />
                    <path d="M13 20v1" />
                    <path d="M19.4 5.6l-.7 .7" />
                    <path d="M18.7 17.7l.7 .7" />
                  </svg>
                  FEELS LIKE
                </span>

                <p className=" font-bold text-2xl relative mt-2">
                  {Math.ceil(data.main.feels_like)}
                  <span className="text-xs inline-block absolute top-1">
                    °C
                  </span>
                  <span className="text-xs text-gray-500 font-normal block mt-2">
                    Similar to the actual temperature
                  </span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 bg-blue-100 p-5 pt-2 pr-0 rounded mt-5">
              <span className="icon-label">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-wind inline-block mr-1"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />
                  <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />
                  <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
                </svg>
                WIND
              </span>
              <div className="flex w-full mt-3">
                <div className="w-2/3 text-xs">
                  {data.wind.speed && (
                    <div className="grid grid-cols-2 gap-4 border-b border-b-gray-300 pb-2">
                      <div>Wind</div>
                      <div className="text-gray-400">{data.wind.speed} m/s</div>
                    </div>
                  )}
                  {data.wind.gust && (
                    <div className="grid grid-cols-2 gap-4 border-b border-b-gray-300 py-2">
                      <div>Gusts</div>
                      <div className="text-gray-400">{data.wind.gust} m/s</div>
                    </div>
                  )}
                  {data.wind.deg && (
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>Direction</div>
                      <div className="text-gray-400">{data.wind.deg}°</div>
                    </div>
                  )}
                </div>
                <div className="w-1/3 flex justify-center items-center -mt-3">
                  <CompassSVG degree={data.wind?.deg ?? ""} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import { FormEvent, useEffect, useRef, useState } from "react";
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
  const cityInputRef = useRef<HTMLInputElement>(null);
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

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const fetchWeatherData = async (e: FormEvent) => {
    e.preventDefault();

    if (data?.city) {
      const result = await ApiService.getWeatherData(data?.city);
      console.log(result);
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

  useEffect(() => {
    if (cityInputRef.current) {
      cityInputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-200 dark:bg-gray-950 mt-0 py-10">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-900 dark:text-white shadow-md rounded px-8 pt-6 pb-8 mb-4 min-h-[88vh]">
        <form className=" " onSubmit={(e) => fetchWeatherData(e)}>
          <div className="grid justify-items-stretch grid-cols-2 text-xl font-bold text-center mb-8">
            <div>Weather Dashboard</div>
            <div
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="justify-self-end cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-300  dark:hover:bg-gray-800 dark:border-gray-700 border-0 rounded px-2 pt-1 pb-2 text-gray-500 dark:text-gray-200"
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-sun inline-block "
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-moon inline-block "
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                </svg>
              )}
            </div>
          </div>
          <div className="mb-4">
            <input
              id="city"
              type="text"
              ref={cityInputRef}
              name={data?.city}
              value={data?.city}
              onChange={(e) => setData({ ...data, city: e.target.value })}
              placeholder="Enter City Name"
              className="shadow appearance-none border dark:border-0 rounded w-full py-2 px-3 dark:text-gray-300 dark:bg-gray-600  leading-tight focus:outline-none focus:shadow-outline border-gray-200 text-gray-600"
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
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
          <div className=" dark:bg-gray-800 bg-blue-200 rounded mt-10 p-5">
            <div className="flex flex-col items-center justify-center">
              {/* <p className="font-bold text-xl text-center capitalize">{city}</p> */}
              <p className="text-center font-bold text-4xl relative">
                {Math.floor(data.main?.temp ?? "")}{" "}
                <span className="text-sm inline-block absolute top-1">°C</span>
              </p>
              <p className="text-center capitalize dark:text-gray-300 text-gray-600">
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
              <div className="dark:bg-gray-600 bg-blue-100 p-5 pt-2 rounded">
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
                  <div className="text-gray-500 dark:text-gray-300">
                    {data.main.humidity}%
                  </div>
                </div>
                <div className="text-xs grid grid-cols-2 gap-4 pt-2">
                  <div>Pressure</div>
                  <div className="text-gray-500 dark:text-gray-300">
                    {data.main.pressure}hPa
                  </div>
                </div>
              </div>
              <div className="dark:bg-gray-600 bg-blue-100 p-5 pt-2 rounded">
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
                  <span className="text-xs dark:text-gray-300 text-gray-600 font-normal block mt-2">
                    Similar to the actual temperature
                  </span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 dark:bg-gray-600 bg-blue-100 p-5 pt-2 pr-0 rounded mt-5">
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
                      <div className="dark:text-white">Wind</div>
                      <div className="dark:text-gray-300 text-gray-500">
                        {data.wind.speed} m/s
                      </div>
                    </div>
                  )}
                  {data.wind.gust && (
                    <div className="grid grid-cols-2 gap-4 border-b border-b-gray-300 py-2">
                      <div>Gusts</div>
                      <div className="dark:text-gray-300 text-gray-500">
                        {data.wind.gust} m/s
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>Direction</div>
                    <div className="dark:text-gray-300 text-gray-500">
                      {data.wind.deg}°
                    </div>
                  </div>
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

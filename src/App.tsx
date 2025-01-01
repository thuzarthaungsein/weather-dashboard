import { useState } from "react";

interface data {
  city: string;
  weather: object;
  error: string;
}

function App() {
  const [data, setData] = useState<data>();
  const fetchWeatherData = () => {
    if (!data?.city) {
      return;
    }

    //
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;

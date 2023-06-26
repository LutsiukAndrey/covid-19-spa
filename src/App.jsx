import { useState } from "react";

import "./App.css";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

function App() {
  // const [count, setCount] = useState(0)
  const data = [{ name: "Page A", uv: 4050, pv: 2400, amt: 2400 }];

  return (
    <>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart>
    </>
  );
}

export default App;

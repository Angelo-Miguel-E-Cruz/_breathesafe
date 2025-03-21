import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function SensorChart({ chartData, title, type }) {

  return (
    <div className="card card-border border-lightblack bg-skyblue w-full shadow-black/50 shadow-md">
      <div className="card-body p-2 pt-5">
        <h1 className='text-lightgrey font-bold self-center text-[23px]'>{title}</h1>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="timestamp" />
            <YAxis domain={[0, 'dataMax']} />
            <CartesianGrid strokeDasharray="8 8" />
            <Tooltip contentStyle={{ color: "white", backgroundColor: "black" }} />
            <Area type="monotone" dataKey={type === "concentration" ? "pm25" : "aqi_pm25"} unit={type === "concentration" ? "µg/m³" : ""}
              stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" dot={{ stroke: 'black', strokeWidth: 1, r: 1 }}
              activeDot={8} name='PM 2.5' legendType='plainline' />

            <Area type="monotone" dataKey={type === "concentration" ? "pm10" : "aqi_pm10"} unit={type === "concentration" ? "µg/m³" : ""}
              stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" dot={{ stroke: 'black', strokeWidth: 1, r: 1 }}
              activeDot={8} name='PM 10' legendType='plainline' />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SensorChart;

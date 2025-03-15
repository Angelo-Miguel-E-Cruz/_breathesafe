import React from 'react'
import clsx from 'clsx'

function SensorCard({ label, value, latestVal }) {

  const latestval = latestVal === undefined ? "" : latestVal.toLowerCase()

  return (
    <div className="card card-border border-lightblack bg-skyblue w-full text-lightgrey shadow-black/50 shadow-md max-lg:h-fit">
      <div className="grid grid-cols-[max-content_1fr] card-body p-2 pl-5">
        <div className={clsx('rounded-full w-25 h-25 self-center justify-self-center content-center',
        {
          'bg-green-600': latestval === "good",
          'bg-amber-300' : latestval === "moderate",
          'bg-orange-600' : latestval === "unhealthy for sensitive groups",
          'bg-red-700' : latestval === "unhealthy",
          'bg-pink-900' : latestval === "very unhealthy",
          'bg-red-950' : latestval === "hazardous"
        }
        )}>
          <h2 className='text-center font-bold text-white'>{latestVal}</h2>
        </div>

        <div className='content-center pl-2'>
          <h2 className='text-start pb-2 font-bold text-3xl'>{value} µg/m³</h2>
          <p className='text-start pb-2 italic text-md text-lightgrey font-semibold'>{label} Concentration</p>
          <div className='flex'>
            <div className='bg-lightred/30 rounded-md h-6 px-2'>
              <p className='text-start pt-0.5 pb-1.5 font-bold text-lightred'>+5 µg/m³</p>
            </div>
            <p className='text-start text-grey/45 font-semi-bold italic pb-2 ml-1'>compared to the last hour</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SensorCard;

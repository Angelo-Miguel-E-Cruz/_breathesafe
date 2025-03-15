import React, { useEffect, useState } from 'react';

function Clock() {
  const [currentDay, setCurrentDay] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
    const now = new Date();
    const day = now.getDay()
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',   // Month as short form (e.g., 'Jan', 'Feb')
      day: 'numeric',   // Day as a numeric value
      year: 'numeric',  // Year as numeric value
    }).format(now);


    // Get time part (e.g., '12:45:00')
    const formattedTime = now.toLocaleTimeString();

    setCurrentDay(`${dayNames[day]}`)
    setCurrentDate(`${formattedDate}`)
    setCurrentTime(`${formattedTime}`)

    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='mr-5 ml-2 flex'>
      <h5 className='text-blue_green mr-2 text-[13px] flex-none'>{currentDay}</h5>
      <h5 className='mr-5 text-[13px] flex-none'>{currentDate}</h5>
      <h5 className='text-lightblue text-[13px] flex-none'>{currentTime}</h5>
    </div>
  );
}

export default Clock;

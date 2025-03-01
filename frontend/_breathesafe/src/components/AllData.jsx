import React from 'react'

function AllData() {
  return (
    <div className='absolute inset-0 bg-background min-h-screen overflow-auto pt-5'>
      <div className='grid grid-cols-2 gap-4 pr-4 max-lg:grid-cols-1'>
        <div className='grid grid-rows-4 gap-4 pr-4 max-lg:grid-cols-1'>
          <div className='bg-red-500'>1</div>
          <div className='bg-green-500'>2</div>
          <div className='bg-blue-500'>3</div>
          <div className='bg-yellow-500'>4</div>
        </div>
        <div className='grid grid-rows-4 gap-4 pr-4 max-lg:grid-cols-1'>
          <div className='bg-pink-500'>5</div>
          <div className='bg-orange-500'>6</div>
          <div className='bg-emerald-950'>7</div>
          <div className='bg-cyan-500'>8</div>
        </div>
      </div>
    </div>
  )
}

export default AllData
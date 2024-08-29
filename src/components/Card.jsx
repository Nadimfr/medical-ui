import React from 'react'

const Card = ({icon,title,description}) => {
  return (
    <div className='font-medium py-[45px] px-[12px] text-center h-[335px] w-full rounded-[20px] border-[0.5px] border-white hover:border-primary duration-300 flex flex-col items-center justify-center hover:shadow-custom'>
      <img className='h-[74px] w-[74px]' src={icon} />
      <div className='text-[20px] my-[29px]'>{title}</div>
      <div className='text-[#6A6A6A] text-[12px]'>{description}</div>
    </div>
  )
}

export default Card
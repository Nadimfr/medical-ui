import React from 'react'
import StarSvg from '../../public/svgs/star'

const Review = ({review, stars, reviewer}) => {
    const array = [1,2,3,4,5]
  return (
    <div className='w-[415px] h-[436px] pl-[60px] pr-[30px] rounded-[20px] flex flex-col justify-center bg-white hover:bg-primary text-primary hover:text-white duration-300 border-[1px] border-primary'>
        <div className='flex items-center justify-start gap-[6px] mb-8'>
            {array.map((_, index) => (
            <div
                key={index}
                className={index < stars ? 'text-[#FFF500]' : 'text-[#E1F0F2]'}
            >
                <StarSvg />
            </div>
            ))}
        </div>

        <div className='text-xl font-bold text-left line-clamp-5 mb-5 min-h-[135px]'>{review}</div>

        <div className='text-md font-extrabold text-left'>{reviewer}</div>
    </div>
  )
}

export default Review
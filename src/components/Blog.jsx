import React from 'react'
import ArrowSvg from '../../public/svgs/arrow'
import Link from 'next/link'

const Blog = ({author, title, paragraph, date, id}) => {
  return (
    <div>
        <img src='https://picsum.photos/200/300' className='w-full h-[240px] bg-slate-500 mb-8' />
        <div className='font-semibold text-sm text-primary leading-3 mb-4'>{author} • {date}</div>
        <div className='flex items-start justify-between font-semibold text-[#1a1a1a] text-base leading-6 mb-4'>{title}
            <Link href={`/blogs/${id}`} className='duration-500 hover:rotate-45 cursor-pointer'>
                <ArrowSvg />
            </Link>
</div>
        <div className='text-base text-[#667085] leading-6 line-clamp-2'>{paragraph}</div>
    </div>
  )
}

export default Blog
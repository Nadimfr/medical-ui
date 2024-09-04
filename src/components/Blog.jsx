import React from "react";
import ArrowSvg from "../../public/svgs/arrow";
import Link from "next/link";

const Blog = ({ author, title, paragraph, date, id, image }) => {
  return (
    <div className="group hover:shadow-custom duration-300 cursor-pointer rounded-lg">
      <a href={`/blogs/${id}`}>
        <img src={image} className="w-full h-[240px] bg-slate-500 mb-8" />
        <div className="px-4 font-semibold text-sm text-primary leading-3 mb-4">
          {author} • {date}
        </div>
        <div className="px-4 flex items-start justify-between font-semibold text-[#1a1a1a] text-base leading-6 mb-4">
          {title}
          <ArrowSvg className="group-hover:rotate-45 duration-300" />
        </div>
        <div className="px-4 pb-[5px] text-base text-[#667085] leading-6 line-clamp-2">
          {paragraph}
        </div>
      </a>
    </div>
  );
};

export default Blog;

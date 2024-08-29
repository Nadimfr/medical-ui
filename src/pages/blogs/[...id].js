import React from 'react';
import Layout from "@/components/Layout";
import Link from 'next/link';
import BackSvg from '../../../public/svgs/back';


const blogPage = ({blogData}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div>
        <img src='https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1679921049/Image_URL_header/Image_URL_header-png?_i=AA' className='w-full h-[40vh] object-cover bg-slate-500 mb-8' />

        <Layout cn="mt-0">
          <div className='text-[32px] font-semibold mb-2 flex items-center gap-5'>
            <Link href="/"><BackSvg /></Link>
            {blogData?.title}</div>
          <div className='text-[18px]'>{blogData?.paragraph}</div>

          <div className='flex items-center gap-2 mt-4 text-[#667085] text-[20px]'>
            <div>{blogData?.author}</div>
            •
            <div>{formatDate(blogData?.date)}</div>

          </div>
        </Layout>
    </div>
  )
}

export default blogPage

export async function getServerSideProps(context, req, res) {

    const { id } = context.params;

    // Fetch data from an external API or database
    const blog = await fetch(`http://localhost:8080/api/blogs/${id}`);
    const blogData = await blog.json();

    // Pass the data to the page via props
    return {
      props: {
        blogData, // will be passed to the page component as props
      },
    };
  }
  
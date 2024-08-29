import Image from "next/image";
import { Montserrat } from "next/font/google";
import Card from "@/components/Card";
import Button from "@/components/Button";
import ModalCmp from "@/components/ModalCmp";
import Header from "@/components/Header";
import Blog from "@/components/Blog";
import Review from "@/components/Review";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from 'axios';

const montserrat = Montserrat({ subsets: ["latin"] });

const services = [
  {
    title: "Leading Technology",
    description:"We harness cutting-edge AI technology to provide unparalleled accuracy and efficiency in bone fracture detection, ensuring you receive the most reliable diagnoses."
  },
  {
    title: "Timely Results",
    description:"With our platform, you can expect rapid turnaround times for diagnostic reports, enabling prompt treatment planning and improved patient outcomes."
  },
  {
    title: "Tailored Solutions",
    description:"We understand that every healthcare environment is unique. That's why we offer customizable options to meet your specific needs, ensuring a personalized experience that fits seamlessly into your practice."
  },
  {
    title: "Continuous Innovation",
    description:"As leaders in diagnostic technology, we are committed to continuous innovation and improvement, keeping you at the forefront of medical advancements and ensuring you always have access to the latest tools and resources."
  },
  {
    title: "AI-Powered Detection",
    description:"Utilizing state-of-the-art artificial intelligence, our platform delivers rapid and precise identification of bone fractures, ensuring timely diagnosis and treatment."
  },
  {
    title: "Imaging Analysis",
    description:"Our advanced imaging analysis services provide detailed assessments of X-rays, MRIs, offering comprehensive insights into patient conditions."
  },
  {
    title: "Real-Time Reporting",
    description:"Receive real-time diagnostic reports with our streamlined platform, enabling healthcare professionals to make informed decisions quickly and efficiently."
  },
  {
    title: "Consultation Services",
    description:"Access to a network of medical and AI specialists for case consultations and second opinions."
  }
];

export default function Home({ blogsData, reviewsData, userData }) {
  const router = useRouter(); 
  const [modal, setModal] = useState(false);
  const cookies = parseCookies();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const sortedBlogsData = blogsData.sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleUpload = async () => {
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];
      if (!file) return; // Ensure file is selected
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
          const response = await axios.post('https://detect.roboflow.com/fracture-detection-f3pux/1', formData, {
              params: {
                  api_key: 'nnPJkjfy2oRKWtNpOKRk'
              },
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
  
          const result = response.data; // Ensure result is set immediately

          // Show the image
          const img = document.getElementById('uploadedImage');
          img.src = URL.createObjectURL(file);
          img.style.display = 'block';
  
          // Draw image and annotations on canvas
          const canvas = document.getElementById('resultCanvas');
          const ctx = canvas.getContext('2d');
  
          img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
  
              // Draw annotations
              if (result?.predictions) {
                  result.predictions.forEach(area => {
                      ctx.beginPath();
                      ctx.rect(area.x-25, area.y -50 , area.width, area.height);
                      ctx.strokeStyle = 'red';
                      ctx.lineWidth = 2;
                      ctx.stroke();
                  });
              }
          };

          const data = {
            user_id: userData._id,
            confidence: result?.predictions[0]?.confidence,
            duration: '4months',
          }

          const createFracture = await axios.post(`http://localhost:8080/api/fractures/create`, data);

          router.push(`/fractures/${createFracture?.data?._id}`)

          console.log(fracture)

  
      } catch (error) {
          console.error('Error uploading image:', error);
      }
  };
  
  
  return (
    <div>
      <main className={`flex min-h-screen flex-col items-center justify-between overflow-x-hidden ${montserrat.className}`}>
        <Header user={userData} />

        <div className="mt-[150px] mb-[45px] bg-white flex items-center justify-between w-full px-8 lg:px-[70px]">
          <div>
            <div className="text-[54px] lg:text-[64px] leading-none">
              <span className="text-[#038096]">Instant </span>
              <span className="text-black">Accuracy</span>
              <span className="text-[#038096]">,</span>
              <br />
              <span className="text-black">Immediate </span>
              <span className="text-[#038096]">Care</span>
            </div>
            <div className="my-[24px]">AI-powered precision in bone fracture detection for faster and accurate diagnoses.</div>
            <div className="2xl:w-1/3">
              <Button primary title='Get Started' />
            </div>        
          </div>
          <img src="/hero.png" className="h-0 lg:h-[650px] 3xl:h-[517px] w-fit" alt="Hero" />
        </div>
        
        <Layout>
          <div id="services">
            <div className="text-[32px] text-[#038096] mb-[66px] text-center">Our Services</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-center justify-center gap-[89px]">
              {services.map((service, idx) => (
                <Card key={idx} icon={service.icon} title={service.title} description={service.description} />
              ))}
            </div>
          </div>
        </Layout>

        <div className="bg-[#038096] py-[100px] px-[230px] w-full mt-[66px] flex flex-col items-center justify-center">
          <div className="text-white font-medium text-[48px] text-center mb-[50px]">
            Revolutionizing Diagnosis: AI-Powered<br />Fracture Detection & Accurate Results!
          </div>
          <div>
            <Button title='Upload Image' primary onClick={() => {cookies?.token ? setModal(true) : router.push("/login")}} />
          </div>
        </div>

        <Layout>
          <div id="blogs">
            <div className="text-[32px] text-primary mb-[66px] text-center">Blog</div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start justify-center gap-8">
              {sortedBlogsData.map((blog, idx) => (
                <div key={idx}>
                  <Blog id={blog?._id} date={formatDate(blog?.date)} title={blog?.title} paragraph={blog?.paragraph} author={blog?.author} />
                </div>
              ))}
            </div>
          </div>
        </Layout>

          <div className="pl-8 lg:pl-[70px] mt-[15vh] w-full">
            <div className="text-[32px] text-primary mb-[60px] text-center">What Do People Say?</div>
            <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} slidesPerView={3.75}>
              {reviewsData.map((review, idx) => (
                <SwiperSlide key={idx}>
                  <Review stars={review?.stars} review={review?.review} reviewer={review?.reviewer} />
                </SwiperSlide>
              ))}
            </Swiper> 
          </div>

        <Footer />
      </main>

      {modal && (
        <div>
          <ModalCmp onClose={() => setModal(false)} onOutsideCLick={() => setModal(false)} title="Upload Image" >
            <div>
              <input type="file" id="fileInput" />
              <div className="w-[200px] my-3">
                <Button secondary title="Get Results" onClick={handleUpload}  /> 
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <img id="uploadedImage"  />
                </div>
                <div>
                  <canvas id="resultCanvas"></canvas>
                </div>
              </div>
            </div>
          </ModalCmp>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const userId = cookies.id;

  // Fetch data from an external API or database
  const blogs = await fetch(`http://localhost:8080/api/blogs`);
  const blogsData = await blogs.json();

  const reviews = await fetch(`http://localhost:8080/api/reviews`);
  const reviewsData = await reviews.json();

  const user = await fetch(`http://localhost:8080/api/users/${userId}`);
  const userData = await user.json();

  // Pass the data to the page via props
  return {
    props: {
      blogsData, // will be passed to the page component as props
      reviewsData,
      userData,
    },
  };
}

import Image from "next/image";
import { Montserrat } from "next/font/google";
import Card from "@/components/Card";
import Button from "@/components/Button";
import ModalCmp from "@/components/ModalCmp";
import Header from "@/components/Header";
import Blog from "@/components/Blog";
import Review from "@/components/Review";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import StarSvg from "../../public/svgs/star";
import clsx from "clsx";

const montserrat = Montserrat({ subsets: ["latin"] });

const services = [
  {
    icon: "/icons/icon1.png",
    title: "Leading Technology",
    description:
      "We harness cutting-edge AI technology to provide unparalleled accuracy and efficiency in bone fracture detection, ensuring you receive the most reliable diagnoses.",
  },
  {
    icon: "/icons/icon2.png",
    title: "Timely Results",
    description:
      "With our platform, you can expect rapid turnaround times for diagnostic reports, enabling prompt treatment planning and improved patient outcomes.",
  },
  {
    icon: "/icons/icon3.png",
    title: "Tailored Solutions",
    description:
      "We understand that every healthcare environment is unique. That's why we offer customizable options to meet your specific needs, ensuring a personalized experience that fits seamlessly into your practice.",
  },
  {
    icon: "/icons/icon4.png",
    title: "Continuous Innovation",
    description:
      "As leaders in diagnostic technology, we are committed to continuous innovation and improvement, keeping you at the forefront of medical advancements and ensuring you always have access to the latest tools and resources.",
  },
  {
    icon: "/icons/icon5.png",
    title: "AI-Powered Detection",
    description:
      "Utilizing state-of-the-art artificial intelligence, our platform delivers rapid and precise identification of bone fractures, ensuring timely diagnosis and treatment.",
  },
  {
    icon: "/icons/icon6.png",
    title: "Imaging Analysis",
    description:
      "Our advanced imaging analysis services provide detailed assessments of X-rays, MRIs, offering comprehensive insights into patient conditions.",
  },
  {
    icon: "/icons/icon7.png",
    title: "Real-Time Reporting",
    description:
      "Receive real-time diagnostic reports with our streamlined platform, enabling healthcare professionals to make informed decisions quickly and efficiently.",
  },
  {
    icon: "/icons/icon8.png",
    title: "Consultation Services",
    description:
      "Access to a network of medical and AI specialists for case consultations and second opinions.",
  },
];

export default function Home({ blogsData, reviewsData, userData }) {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const cookies = parseCookies();
  const [showLoadingPage, setShowLoadingPage] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const sortedBlogsData = blogsData.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleUpload = async () => {
    setShowLoadingPage(true);
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) return; // Ensure file is selected

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://detect.roboflow.com/fracture-detection-f3pux/1",
        formData,
        {
          params: {
            api_key: "nnPJkjfy2oRKWtNpOKRk",
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = response.data; // Ensure result is set immediately

      // Show the image
      const img = document.getElementById("uploadedImage");
      img.src = URL.createObjectURL(file);
      img.style.display = "block";

      // Draw image and annotations on canvas
      const canvas = document.getElementById("resultCanvas");
      const ctx = canvas.getContext("2d");

      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Draw annotations
        if (result?.predictions) {
          result.predictions.forEach((area) => {
            ctx.beginPath();
            ctx.rect(area.x - 25, area.y - 50, area.width, area.height);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.stroke();
          });

          const duration = result?.predictions[0]?.confidence > 0.75 ? 8 : 4;

          const addSolutions = await axios.get(
            `http://localhost:8080/api/solutions/${duration}`
          );

          setShowLoadingPage(false);

          // Convert canvas to Blob
          canvas.toBlob(async (blob) => {
            const url = "https://api.imgbb.com/1/upload";
            const apiKey = "aa32d11ef7de635ef1f66d4d01c7f791";
            const expiration = 1000000;

            const formData = new FormData();
            formData.append("key", apiKey);
            formData.append("expiration", expiration);
            formData.append("image", blob, "image.jpg");

            try {
              const uploadResponse = await axios.post(url, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });

              const data = {
                user_id: userData._id,
                confidence: result?.predictions[0]?.confidence,
                duration: duration,
                solutions: addSolutions.data,
                image: uploadResponse.data.data.url,
                startDate: new Date().toISOString(),
              };

              if (result?.predictions[0]?.confidence) {
                const createFracture = await axios.post(
                  `http://localhost:8080/api/fractures/create`,
                  data
                );

                document.getElementById("nextBtn").classList.remove("hidden");
                document.getElementById("nextBtn").onclick = function () {
                  if (createFracture?.data?._id) {
                    window.location.href = `/fractures/${createFracture.data._id}`;
                  }
                };
              } else {
                alert("NO FRACTURE DETECTED!");
              }
            } catch (uploadError) {
              console.error("Error uploading image to imgbb:", uploadError);
            }
          }, "image/jpeg");
        }
      };
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    cookies?.token &&
      document.getElementById("getStartedBtn").classList.add("hidden");
  }, [cookies?.token]);

  // Initialize the state with the number of stars (0 to 5 for example)
  const [stars, setStars] = useState(0);

  // Function to handle star clicks
  const handleClick = (index) => {
    setStars(index + 1); // Update the number of stars based on the clicked index
  };

  // Create an array with 5 elements (for 5 stars)
  const starArray = Array.from({ length: 5 });

  const [review, setReview] = useState("");

  const addReview = async () => {
    setShowLoadingPage(true);
    const reviewData = {
      name: userData.first_name,
      stars: stars,
      review: review,
    };

    const createFracture = await axios.post(
      `http://localhost:8080/api/reviews/create`,
      reviewData
    );

    setReviewModal(false);
    setShowLoadingPage(false);
  };

  return (
    <div>
      <Loading show={showLoadingPage} />

      {reviewModal && (
        <ModalCmp onClose={() => setReviewModal(false)} title="Add Review">
          <div className="flex justify-start items-start gap-1">
            {starArray.map((_, index) => (
              <div
                key={index}
                className={clsx("hover:text-[#FFF500] duration-300", {
                  "text-[#FFF500]": index < stars,
                  "text-[#E1F0F2]": index >= stars,
                })}
                onClick={() => handleClick(index)} // Add click handler
              >
                <StarSvg />
              </div>
            ))}
          </div>

          <Input
            name="Review"
            placeholder="Write here..."
            type="text"
            className="h-32 my-4"
            onChange={(e) => setReview(e.target.value)}
          />

          <Button title="Submit" secondary onClick={addReview} />
        </ModalCmp>
      )}

      <main
        className={`flex min-h-screen flex-col items-center justify-between overflow-x-hidden ${montserrat.className}`}
      >
        <Header user={userData} />

        <div className="pt-[150px] pb-[45px] bg-gradient-to-r from-primary via-white to-white flex items-center justify-between w-full px-8 lg:px-[70px] h-[100vh]">
          <div>
            <div className="text-[54px] lg:text-[72px] leading-none">
              <span className="text-white">Instant </span>
              <span className="text-primary">Accuracy</span>
              <span className="text-primary">,</span>
              <br />
              <span className="text-white">Immediate </span>
              <span className="text-primary">Care</span>
            </div>
            <div className="my-[24px] text-lg text-white">
              AI-powered precision in bone fracture detection<br></br>for faster
              and accurate diagnoses.
            </div>
            <div id="getStartedBtn" className="2xl:w-1/3">
              <Button
                primary
                title="Get Started"
                onClick={() => router.push("/login")}
              />
            </div>
          </div>
          <img
            src="/hero.png"
            className="h-0 lg:h-[650px] 3xl:h-[517px] w-fit"
            alt="Hero"
          />
        </div>

        <Layout>
          <div id="services">
            <div className="text-[32px] text-[#038096] mb-[66px] text-center">
              Our Services
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-center justify-center gap-[89px]">
              {services.map((service, idx) => (
                <Card
                  key={idx}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </Layout>

        <div className="bg-[#038096] py-[100px] px-[230px] w-full mt-[66px] flex flex-col items-center justify-center">
          <div className="text-white font-medium text-[48px] text-center mb-[50px]">
            Revolutionizing Diagnosis: AI-Powered
            <br />
            Fracture Detection & Accurate Results!
          </div>
          <div>
            <Button
              title="Upload Image"
              primary
              onClick={() => {
                cookies?.token ? setModal(true) : router.push("/login");
              }}
            />
          </div>
        </div>

        <Layout>
          <div id="blogs">
            <div className="text-[32px] text-primary mb-[66px] text-center">
              Blog
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start justify-center gap-8">
              {sortedBlogsData.map((blog, idx) => (
                <div key={idx}>
                  <Blog
                    id={blog?._id}
                    date={formatDate(blog?.date)}
                    title={blog?.title}
                    paragraph={blog?.paragraph}
                    author={blog?.author}
                    image={blog?.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </Layout>

        <div id="reviews" className="mt-[15vh] w-full ">
          <div className="text-[32px] text-primary mb-[60px] text-center">
            What Do People Say?
          </div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={3.75}
          >
            {reviewsData.map((review, idx) => (
              <SwiperSlide className="ps-8 lg:ps-[70px]" key={idx}>
                <Review
                  stars={review?.stars}
                  review={review?.review}
                  reviewer={review?.name}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-fit mt-10">
          <Button
            secondary
            title="Add Yours"
            onClick={() => setReviewModal(true)}
          />
        </div>

        <Footer />
      </main>

      {modal && (
        <div>
          <ModalCmp
            onClose={() => setModal(false)}
            onOutsideCLick={() => setModal(false)}
            title="Upload Image"
          >
            <div>
              <input type="file" id="fileInput" />
              <div className="w-[200px] my-3">
                <Button secondary title="Get Results" onClick={handleUpload} />
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <img id="uploadedImage" />
                </div>
                <div>
                  <canvas id="resultCanvas"></canvas>
                </div>
              </div>

              {
                <div id="nextBtn" className="w-[200px] my-3 hidden">
                  <Button secondary title="Next" />
                </div>
              }
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

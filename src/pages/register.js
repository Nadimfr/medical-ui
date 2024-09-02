import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { useState } from "react";
import axios from "axios";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";
import Link from "next/link";
import ModalCmp from "@/components/ModalCmp";

const register = () => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [verifyData, setVerifyData] = useState({
    email: "",
    code: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange2 = (e) => {
    setVerifyData({
      ...verifyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/verifyEmail`,
        formData
      );
      setOpenModal(true);
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
    }
  };

  const handlelogin = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/loginwithcode`,
        verifyData
      );
      setCookie(null, "token", response.data.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
      setCookie(null, "id", response.data.user._id, {
        maxAge: 30 * 24 * 60 * 60, // Cookie will last for 30 days
        path: "/", // Cookie is accessible across the entire site
      });
      router.push("/");
      router.push("/");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div className="h-[100vh] w-full flex">
        <div className="w-0 lg:w-1/2 h-full bg-white"></div>
        <div className="w-full lg:w-1/2 h-full bg-primary flex flex-col items-center justify-center px-[70px] lg:px-[130px]">
          <span className="text-[24px] font-medium text-white mb-10">
            CREATE AN ACCOUNT
          </span>

          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="flex gap-4 w-full">
              <Input
                type="text"
                placeholder="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />

              <Input
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>

            <Input
              type="email"
              placeholder="Email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button title="Register" primary onClick={handleRegister} />
          </div>

          <div className="text-[18px] mt-4 text-white mb-10">
            Already have an account,{" "}
            <Link
              href={"/login"}
              className="font-medium cursor-pointer hover:underline duration-300 text-left"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      {openModal && (
        <ModalCmp onClose={() => setOpenModal(false)}>
          <div className="mb-3 flex flex-col items-center justify-center gap-3">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={verifyData.email}
              onChange={handleChange2}
            />
            <Input
              type="text"
              placeholder="Verification Code"
              name="code"
              value={verifyData.code}
              onChange={handleChange2}
            />
          </div>

          <Button secondary title="Verify" onClick={handlelogin} />
        </ModalCmp>
      )}
    </>
  );
};

export default register;

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = parseCookies({ req });
  const token = cookies.token;

  if (token) {
    return {
      redirect: {
        destination: "/", // Redirect to the home page
        permanent: false,
      },
    };
  }

  // Pass the data to the page via props
  return {
    props: {}, // Add any props you want to pass to the page here
  };
}

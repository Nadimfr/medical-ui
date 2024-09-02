import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie, parseCookies } from "nookies";
import React, { useEffect, useState } from "react";

const login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/login`,
        formData
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
      setLoading(false);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("auth failed:", error.response?.data || error.message);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="h-[100vh] w-full flex">
      <div className="w-0 lg:w-1/2 h-full bg-white"></div>
      <div className="w-full lg:w-1/2 h-full bg-primary flex flex-col items-center justify-center px-[70px] lg:px-[130px]">
        <span className="text-[24px] font-medium text-white mb-10">
          WELCOME BACK !
        </span>

        <div className="flex flex-col items-center justify-center gap-4 w-full">
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

          <Button
            loading={loading}
            title="Sign In"
            primary
            onClick={handleLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default login;

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

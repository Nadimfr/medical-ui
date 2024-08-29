import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/router";
import { parseCookies, destroyCookie } from "nookies";
import Link from "next/link";

const Header = ({ user }) => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const deleteAllCookies = () => {
    const cookies = parseCookies(); // Get all cookies

    // Iterate over each cookie and delete it
    for (const cookieName in cookies) {
      destroyCookie(null, cookieName, {
        path: "/",
      });
    }
    window.location.reload();
  };

  const router = useRouter();

  return (
    <div className="h-[10vh] w-full flex items-center justify-between px-8 lg:px-[70px] fixed z-50 bg-white">
      <a href="/" className="text-[32px] text-primary">
        XRayRehab
      </a>

      {router.pathname == "/" && (
        <div className="hidden lg:flex text-[20px] items-center justify-between gap-[36px]">
          <div
            className="cursor-pointer hover:text-primary duration-300"
            onClick={() => scrollToSection("services")}
          >
            Services
          </div>
          <div
            className="cursor-pointer hover:text-primary duration-300"
            onClick={() => scrollToSection("generate")}
          >
            Generate
          </div>
          <div
            className="cursor-pointer hover:text-primary duration-300"
            onClick={() => scrollToSection("blogs")}
          >
            Blog
          </div>
          <div
            className="cursor-pointer hover:text-primary duration-300"
            onClick={() => scrollToSection("contact-us")}
          >
            Contact us
          </div>
        </div>
      )}

      {user?.first_name ? (
        <div className="relative group">
          <div className="font-medium text-primary text-[24px] cursor-pointer hover:text-black duration-300">
            {user?.first_name}
          </div>

          {/* Dropdown Menu */}
          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md w-fit z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <ul className="">
              <li
                onClick={() => router.push("/fractures")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Fractures
              </li>
              <li
                onClick={deleteAllCookies}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link href={"/register"}>
          <Button title="Register" secondary />
        </Link>
      )}
    </div>
  );
};

export default Header;

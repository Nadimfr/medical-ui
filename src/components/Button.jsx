import clsx from "clsx";
import { Montserrat } from "next/font/google";
import React from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

const Button = ({ title, primary, secondary, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        `w-full rounded-[15px] py-[10px] px-[15px] text-center 2xl:text-[24px] border-[2px] duration-300 cursor-pointer flex items-center justify-center ${montserrat.className}`,
        {
          "bg-white text-primary hover:bg-primary hover:text-white hover:border-white":
            primary,
          "bg-primary text-white hover:bg-white hover:text-primary hover:border-primary":
            secondary,
        }
      )}
    >
      {title}
    </div>
  );
};

export default Button;

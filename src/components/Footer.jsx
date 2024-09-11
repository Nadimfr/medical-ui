import React from "react";
import Layout from "./Layout";
import FacebookIcon from "../../public/svgs/facebook";
import InstagramIcon from "../../public/svgs/twitter";
import TwitterIcon from "../../public/svgs/twitter";
import MailIcon from "../../public/svgs/mail";
import CellIcon from "../../public/svgs/cell";
import LocationIcon from "../../public/svgs/location";

const Footer = () => {
  return (
    <div className="w-full mt-[66px] border-2 text-primary">
      <Layout>
        <div className="flex items-start justify-between gap-20">
          <div className="flex flex-col w-[320px]">
            <span className="text-[30px] font-bold leading-8 mb-6">
              XRayRehab
            </span>
            <span className="text-[18px] font-normal leading-8 mb-6">
              Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
            </span>

            <div className="flex items-center justify-start gap-6">
              <FacebookIcon />
              <TwitterIcon />
              <InstagramIcon />
            </div>
          </div>

          <div className="lg:flex flex-col hidden">
            <span className="mb-[40px] text-[20px] leading-5 font-bold">
              Product
            </span>
            <span className="text-[18px] font-normal mb-[18px]">Features</span>
            <span className="text-[18px] font-normal mb-[18px]">Pricing</span>
            <span className="text-[18px] font-normal mb-[18px]">
              Case studies
            </span>
            <span className="text-[18px] font-normal mb-[18px]">Reviews</span>
            <span className="text-[18px] font-normal mb-[18px]">Updates</span>
          </div>

          <div className="lg:flex flex-col hidden">
            <span className="mb-[40px] text-[20px] leading-5 font-bold">
              Company
            </span>

            <span className="text-[18px] font-normal mb-[18px]">About</span>
            <span className="text-[18px] font-normal mb-[18px]">
              Contact us
            </span>
            <span className="text-[18px] font-normal mb-[18px]">Careers</span>
            <span className="text-[18px] font-normal mb-[18px]">Culture</span>
            <span className="text-[18px] font-normal mb-[18px]">Blog</span>
          </div>

          <div className="lg:flex flex-col hidden">
            <span className="mb-[40px] text-[20px] leading-5 font-bold">
              Support
            </span>

            <span className="text-[18px] font-normal mb-[18px]">
              Getting started
            </span>
            <span className="text-[18px] font-normal mb-[18px]">
              Help center
            </span>
            <span className="text-[18px] font-normal mb-[18px]">
              Server status
            </span>
            <span className="text-[18px] font-normal mb-[18px]">
              Report a bug
            </span>
            <span className="text-[18px] font-normal mb-[18px]">
              Chat support
            </span>
          </div>

          <div className="flex flex-col">
            <span className="mb-[40px] text-[20px] leading-5 font-bold">
              Contact us
            </span>

            <span className="text-[18px] font-normal mb-[18px] flex items-center gap-2">
              <MailIcon /> contact@company.com
            </span>
            <span className="text-[18px] font-normal mb-[18px] flex items-center gap-2">
              <CellIcon /> (414) 687 - 5892
            </span>
            <span className="text-[18px] font-normal mb-[18px] flex items-start gap-2">
              <LocationIcon /> 794 Mcallister St<br></br>San Francisco, 94102
            </span>
          </div>
        </div>

        <div className="w-full h-0 border-[1px] border-primary mt-[105px] mb-6" />

        <div className="flex justify-between items-center text-[18px] mb-6">
          <span>Copyright © 2022 BRIX Templates</span>

          <span>
            All Rights Reserved |{" "}
            <span className="underline">Terms and Conditions</span> |{" "}
            <span className="underline">Privacy Policy</span>
          </span>
        </div>
      </Layout>
    </div>
  );
};

export default Footer;

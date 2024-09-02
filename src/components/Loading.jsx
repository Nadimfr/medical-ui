import React from "react";
import LoaderIcon from "../../public/svgs/loader";

const Loading = ({ show }) => {
  return (
    <>
      {show && (
        <div className="z-[900000] fixed h-[100vh] w-full bg-[rgba(0,0,0,0.75)] inset-0 flex items-center justify-center">
          <LoaderIcon className="animate-spin text-primary" />
        </div>
      )}
    </>
  );
};

export default Loading;

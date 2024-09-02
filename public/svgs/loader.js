import * as React from "react";

const LoaderIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 500"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      fill="url(#a)"
      fillRule="evenodd"
      d="M250 500c138.071 0 250-111.929 250-250S388.071 0 250 0 0 111.929 0 250s111.929 250 250 250Zm0-41.667c115.059 0 208.333-93.274 208.333-208.333S365.059 41.667 250 41.667 41.667 134.94 41.667 250 134.94 458.333 250 458.333Z"
      clipRule="evenodd"
    />
    <path
      fill="white"
      fillRule="evenodd"
      d="M474.617 200.014c11.411-1.472 21.856 6.585 23.328 17.997A249.93 249.93 0 0 1 500 250c0 11.506-9.327 20.833-20.833 20.833-11.506 0-20.834-9.327-20.834-20.833 0-8.913-.572-17.818-1.712-26.658-1.472-11.411 6.585-21.855 17.996-23.328Z"
      clipRule="evenodd"
    />
    <defs>
      <radialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(250 0 0 250 250 250)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" stopOpacity={0} />
        <stop offset={1} stopColor="currentColor" />
      </radialGradient>
    </defs>
  </svg>
);
export default LoaderIcon;

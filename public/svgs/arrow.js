import * as React from "react"
const ArrowSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 11 11 1m0 0H1m10 0v10"
    />
  </svg>
)
export default ArrowSvg
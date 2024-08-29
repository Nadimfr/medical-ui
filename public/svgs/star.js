import * as React from "react"
const StarSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29 28"
    width={29}
    height={28}
    fill="none"
    {...props}
  >
    <path
    //   fill="#E1F0F2"
      fill="currentColor"
      d="M12.968 1.69c.373-1.15 1.999-1.15 2.372 0l2.454 7.552c.167.514.646.862 1.186.862h7.942c1.208 0 1.71 1.546.733 2.257l-6.425 4.668c-.437.317-.62.88-.453 1.394l2.454 7.553c.374 1.15-.942 2.105-1.919 1.395l-6.425-4.668a1.247 1.247 0 0 0-1.466 0L6.996 27.37c-.978.71-2.293-.246-1.92-1.395l2.455-7.553a1.247 1.247 0 0 0-.453-1.394L.653 12.36c-.978-.71-.476-2.257.733-2.257h7.941c.54 0 1.02-.348 1.187-.862l2.454-7.553Z"
    />
  </svg>
)
export default StarSvg
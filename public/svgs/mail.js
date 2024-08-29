import * as React from "react"
const MailIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#038096"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      d="M18.333 5.95v8.333a2.083 2.083 0 0 1-2.083 2.083H3.75a2.083 2.083 0 0 1-2.083-2.083V5.95"
    />
    <path
      stroke="#038096"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      d="M18.333 5.95a2.083 2.083 0 0 0-2.083-2.084H3.75A2.083 2.083 0 0 0 1.667 5.95l7.229 4.513a2.083 2.083 0 0 0 2.208 0l7.23-4.513Z"
    />
  </svg>
)
export default MailIcon
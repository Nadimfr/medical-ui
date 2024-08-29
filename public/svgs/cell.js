import * as React from "react"
const CellIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={19}
    fill="none"
    {...props}
  >
    <path
      stroke="#038096"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      d="m12.251 17.385.01.006a4.1 4.1 0 0 0 5.1-.56l.573-.573a1.366 1.366 0 0 0 0-1.932l-2.416-2.415a1.367 1.367 0 0 0-1.933 0 1.366 1.366 0 0 1-1.932 0L7.789 8.046a1.366 1.366 0 0 1 0-1.932 1.366 1.366 0 0 0 0-1.933L5.373 1.766a1.366 1.366 0 0 0-1.932 0l-.573.573a4.099 4.099 0 0 0-.56 5.101l.006.01a36.988 36.988 0 0 0 9.937 9.935v0Z"
    />
  </svg>
)
export default CellIcon

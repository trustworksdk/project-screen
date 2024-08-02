import * as React from "react";

export function ClockIcon(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={2}
      >
        <path d="M53.92 10.081c12.107 12.105 12.107 31.732 0 43.838-12.106 12.108-31.734 12.108-43.84 0-12.107-12.105-12.107-31.732 0-43.838 12.106-12.108 31.733-12.108 43.84 0z" />
        <path d="M32 12v20l9 9M4 32h4M56 32h4M32 60v-4M32 8V4" />
      </g>
    </svg>
  );
}

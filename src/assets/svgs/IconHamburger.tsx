import type { SVGProps } from "react";
import * as React from "react";
const SvgIconHamburger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke="#E46198"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 8h22M5 16h22M5 24h22"
    />
  </svg>
);
export default SvgIconHamburger;

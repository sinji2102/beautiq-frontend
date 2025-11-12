import type { SVGProps } from "react";
const SvgIconBefore = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
    <circle cx={20} cy={20} r={18} fill="#0F0F0F" />
    <g clipPath="url(#icon-before_svg__a)">
      <path
        fill="#fff"
        d="M15.2 13.6h.8a.8.8 0 0 0-1.515-.358zm0 12.8v.8a.8.8 0 0 0 .8-.8zm-6.4 0-.715-.358A.8.8 0 0 0 8.8 27.2zm16-12.8.715-.358A.8.8 0 0 0 24 13.6zm0 12.8H24a.8.8 0 0 0 .8.8zm6.4 0v.8a.8.8 0 0 0 .715-1.158zM14.4 13.6v12.8H16V13.6zm.8 12H8.8v1.6h6.4zm-5.685 1.158 6.4-12.8-1.43-.716-6.4 12.8zM24 13.6v12.8h1.6V13.6zm.8 13.6h6.4v-1.6h-6.4zm7.115-1.158-6.4-12.8-1.43.716 6.4 12.8zM19.2 8v24h1.6V8z"
      />
    </g>
    <defs>
      <clipPath id="icon-before_svg__a">
        <path fill="#fff" d="M8 8h24v24H8z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIconBefore;

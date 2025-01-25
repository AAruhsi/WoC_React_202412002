import React from "react";
import { useEffect } from "react";
const Page2 = () => {
  return (
    <div className="main2 w-full h-[70%]  flex justify-center items-center ">
      <div className="max-w-[500px] bg-[#1d1e22] shadow-[0px_4px_30px_rgba(0,0,0,0.5)] rounded-[8px] p-[2px]">
        <div className="flex items-center justify-between m-[10px]">
          <span className="font-lato font-extrabold text-[14px] tracking-[1.57px] text-[#d4d4d4]">
            CSS
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-[20px] hover:cursor-pointer hover:rounded-full hover:bg-[#6e7281] transition-[0.2s_ease]"
          >
            <g strokeWidth={0} id="SVGRepo_bgCarrier" />
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              id="SVGRepo_tracerCarrier"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                strokeLinecap="round"
                strokeWidth={2}
                stroke="#4C4F5A"
                d="M6 6L18 18"
              />
              <path
                strokeLinecap="round"
                strokeWidth={2}
                stroke="#4C4F5A"
                d="M18 6L6 18"
              />
            </g>
          </svg>
        </div>
        <div className="m-[0_10px_10px] text-white">
          <code className="block">
            <p>
              <span className="text-[#569cd6]">.code-editor </span>
              {"{"}
            </p>
            <p className="ml-[30px]">
              <span className="text-[#9cdcfe]">max-width</span>:{" "}
              <span className="text-[#b6cea8]">300px</span>;
            </p>
            <p className="ml-[30px]">
              <span className="text-[#9cdcfe]">background-color</span>:{" "}
              <span className="text-[#1d1e22] bg-[#1d1e22] inline-block w-[8px] h-[8px] border-[1px] border-white mr-[3px]" />{" "}
              <span className="text-[#b6cea8]">#1d1e22</span>;
            </p>
            <p className="ml-[30px]">
              <span className="text-[#9cdcfe]">box-shadow</span>:{" "}
              <span className="text-[#b6cea8]">
                0px 4px 30px{" "}
                <span className="text-[#cf9278]">rgba(0, 0, 0, 0.5)</span>
              </span>
              ;
            </p>
            <p className="ml-[30px]">
              <span className="text-[#9cdcfe]">border-radius</span>:{" "}
              <span className="text-[#b6cea8]">8px</span>;
            </p>
            <span>{"}"}</span>
          </code>
        </div>
      </div>
    </div>
  );
};

export default Page2;

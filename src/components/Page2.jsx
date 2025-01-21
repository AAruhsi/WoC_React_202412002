import React from "react";
import { useEffect } from "react";
const Page2 = () => {
  // useEffect(() => {
  //   // Ensure VANTA is available on the global `window` object
  //   if (window.VANTA) {
  //     const wavesEffect = window.VANTA.CLOUDS({
  //       el: ".main2",
  //       mouseControls: true,
  //       touchControls: true,
  //       gyroControls: false,
  //       minHeight: 200.0,
  //       minWidth: 200.0,
  //       skyColor: 0x0,
  //       sunGlareColor: 0x378b2e,
  //       speed: 0.7,
  //     });

  //     // const wavesEffect = window.VANTA.WAVES({
  //     //   el: ".main",
  //     //   mouseControls: true,
  //     //   touchControls: true,
  //     //   gyroControls: false,
  //     //   minHeight: 200.0,
  //     //   minWidth: 200.0,
  //     //   scale: 1.0,
  //     //   scaleMobile: 1.0,
  //     //   color: 0xa0a0b,
  //     //   shininess: 92.0,
  //     //   waveHeight: 15.5,
  //     //   waveSpeed: 0.9,
  //     //   zoom: 0.75,
  //     // });

  //     // Cleanup on component unmount
  //     return () => {
  //       if (wavesEffect) wavesEffect.destroy();
  //     };
  //   }
  // }, []);
  return (
    <div className="main2 w-full h-[70%]  flex justify-center items-center transform rotate-180">
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
      <div className="p-4 overflow-hidden border border-gray-300 rounded-xl bg-gray-200/20 backdrop-blur-sm min-w-[344px]">
        <div className="flex flex-col gap-4 relative z-10 border border-gray-600 rounded-lg overflow-hidden">
          <div className="flex flex-col font-mono">
            <div className="flex items-center justify-between overflow-hidden min-h-[40px] px-3 bg-gray-800 rounded-t-lg">
              <div className="flex items-center gap-2 text-gray-400 font-semibold truncate whitespace-nowrap">
                <svg
                  className="h-4.5 w-4.5 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"></path>
                </svg>
                Terminal
              </div>
              <button
                className="flex items-center justify-center p-1 ml-auto border border-gray-300 rounded bg-gray-800 text-gray-400 cursor-pointer"
                tabIndex="-1"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                  <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-col relative rounded-b-lg overflow-x-auto p-4 leading-5 text-white bg-black whitespace-nowrap">
              <pre className="flex items-center whitespace-pre bg-transparent overflow-hidden box-border text-[16px]">
                <code className="text-gray-500">- </code>
                <code className="text-pink-500">npx </code>
                <code
                  className="relative flex items-center after:border-r-2 after:border-pink-500 after:animate-cursor"
                  data-cmd="create-react-app@latest"
                ></code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;

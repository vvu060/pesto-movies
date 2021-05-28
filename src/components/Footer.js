import React from "react";
import { GlobeIcon, ArrowCircleUpIcon } from "@heroicons/react/solid";
import { HashLink as Link } from "react-router-hash-link";

const Footer = () => {
  const smoothScroll = (el) => {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <footer className="relative grid w-full  bg-gray-700 text-sm text-gray-200">
      <Link className="justify-self-center" to="#banner" scroll={smoothScroll}>
        <ArrowCircleUpIcon className="absolute h-6  text-gray-200 -top-2 cursor-pointer" />
      </Link>
      <div className="px-8 py-3 text-center mt-2 border-b border-gray-800">
        <p>
          &copy; Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Sapiente minus dolore corporis ipsa ipsum neque molestiae aut
          accusamus quia accusantium?
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 grid-flow-row-dense px-8 py-3 cursor-pointer">
        <div className="flex justify-center items-center md:col-span-2 lg:col-span-1 lg:col-start-2">
          <GlobeIcon className="h-5 mr-1 text-green-700" />
          India
        </div>
        <div className="flex justify-center space-x-8 whitespace-nowrap md:justify-self-start">
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
        <div className="flex justify-center space-x-8 md:ml-auto">
          <p>Privacy</p>
          <p>Terms</p>
          <p>Feedback</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

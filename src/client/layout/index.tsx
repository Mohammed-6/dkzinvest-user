import { PowerIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
type headerOneProps = {
  children: React.ReactNode;
};
export const HeaderOne = (props: headerOneProps) => {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("dkz_client_token");
    localStorage.removeItem("dkz_client_name");
    router.push("/login");
  };
  return (
    <>
      <ToastContainer />
      <div className="">
        <div className="flex justify-between items-center p-4 bg-white shadow-lg">
          <div className="">
            <img className="ml-[15%] w-[100px]" src="/images/logo.png" alt="" />
          </div>
          <div className="">
            <div className="flex items-center gap-x-4">
              <div className="text-bold">
                {typeof window !== "undefined"
                  ? localStorage.getItem("dkz_client_name")
                  : ""}
              </div>
              <div className="">
                <PowerIcon
                  className="w-6 hover:cursor-pointer"
                  onClick={() => logout()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen">{props.children}</div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { loginProps } from "./types/login";
import { adminLogin, verifyotp } from "./query/login";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Preloader } from "../stuff";
const Login = () => {
  return (
    <>
      <Content />
    </>
  );
};

const Content = () => {
  const router = useRouter();
  const [collectdata, setcollectdata] = useState<loginProps>({
    phone: null,
    rememberToken: "",
  });
  const [otp, setotp] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);

  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };
  function isValidNumber(input: number) {
    // Check if input is a string
    if (typeof input !== "string") {
      return false;
    }
    // Check if input consists of exactly ten digits
    if (!/^\d{10}$/.test(input)) {
      return false;
    }
    // If both conditions are met, return true
    return true;
  }
  const formSubmit = () => {
    setloading(true);
    if (!isValidNumber(collectdata.phone)) {
      toast.error("Phone number not valid");
      setloading(false);
      return;
    }
    adminLogin(collectdata)
      .then((res) => {
        console.log(res);
        if (res.data.status === true) {
          setotp(true);
          setloading(false);
          toast.success(res.data.message);
        } else {
          setloading(false);
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        setloading(false);
        toast.error("Something went wrong!");
      });
  };
  const verifyOTP = () => {
    setloading(true);
    if (collectdata.rememberToken === null) {
      toast.error("OTP not valid");
      setloading(false);
      return;
    }
    verifyotp(collectdata)
      .then((res) => {
        console.log(res);
        if (res.data.status === true) {
          setotp(true);
          toast.success(res.data.message);
          localStorage.setItem("dkz_client_token", res.data.token);
          window.location.href = "/onboard";
        } else {
          setloading(false);
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        setloading(false);
        toast.error("Something went wrong!");
      });
  };
  return (
    <>
      <ToastContainer />
      {loading ? <Preloader /> : ""}
      <div
        className="h-screen bg-no-repeat bg-cover"
        style={{ backgroundImage: "url(/images/login-background.jpg)" }}
      >
        <div className="absolute inset-0 bg-white/50 z-0"></div>
        <div className="logo w-auto relative z-10">
          <img className="ml-[15%] w-[200px]" src="/images/logo.png" alt="" />
        </div>
        <div className="container py-[2%] ml-[15%] justify-center max-w-[600px] h-auto">
          <div className="card min-w-[320px] md:min-w-[450px] card-shadow relative z-10">
            <div className="card-body md:p-10">
              <div className="">
                <div className="mb-4">
                  <h2 className="mb-1 text-bold text-5xl italic">
                    Get upto 6% profit in 10 minutes
                  </h2>
                  <h3 className="pt-4 pb-2 text-black/50 text-2xl">
                    Best procurement just made for you
                  </h3>

                  {otp ? (
                    <div className="w-[80%] relative">
                      <input
                        type="number"
                        className="py-3 px-3 w-full border-gray-200 pr-32 rounded-sm text-xl border-2 duration-150"
                        onChange={formChange}
                        name="rememberToken"
                        value={collectdata.rememberToken}
                      />
                      <div className="absolute bottom-[40px] right-2 text-gray-500 text-sm">
                        <button onClick={formSubmit}>Resend OTP</button>
                      </div>
                      <br />
                      <div className="flex justify-end">
                        <small className="">
                          <span className="">+91-{collectdata.phone}</span>
                          &nbsp;{" "}
                          <button
                            className="text-bold"
                            onClick={() => setotp(false)}
                          >
                            Edit
                          </button>
                        </small>
                      </div>
                    </div>
                  ) : (
                    <div className="w-[80%] relative">
                      <input
                        type="number"
                        className="py-3 px-3 w-full pl-10 border-gray-200 rounded-sm text-xl border-2 duration-150"
                        onChange={formChange}
                        name="phone"
                        value={collectdata.phone}
                      />
                      <div className="absolute bottom-[37px] left-2 text-gray-500 text-xl">
                        +91
                      </div>
                      <br />
                      <small className="text-bold">
                        An OTP will be sent for verification
                      </small>
                    </div>
                  )}
                </div>
                <div className="w-[80%]">
                  {!otp ? (
                    <>
                      <div className="pb-3">
                        <button
                          className="w-full block text-center rounded-md font-bold py-4 text-lg bg-primary text-white cursor-pointer"
                          onClick={formSubmit}
                          type="button"
                        >
                          Apply Now
                        </button>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <div className="">
                          <input type="checkbox" checked className="h-5 w-5" />
                        </div>
                        <div className="text-xs">
                          By proceeding, you agree to our
                          <a className="underline">Terms & Conditions</a> &
                          <a className="underline">Privacy Policy</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <div className="">
                          <input type="checkbox" checked className="h-5 w-5" />
                        </div>
                        <div className="text-xs">
                          I agree to receive updates on WhatsApp
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="py-3">
                      <button
                        className="w-full block text-center rounded-md font-bold py-4 text-lg bg-primary text-white cursor-pointer"
                        onClick={verifyOTP}
                        type="button"
                      >
                        Verify OTP
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

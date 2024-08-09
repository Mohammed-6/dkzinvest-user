import React, { useState, useEffect } from "react";
import { HeaderOne } from "../layout";
import { Preloader, formatIndianRupee, serverURL } from "@/src/stuff";

// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

import {
  ArrowUpRightIcon,
  ChartPieIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronRightIcon,
  HomeIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getInvest } from "../query/investment";
import {
  detailsProp,
  investmentProp,
  investmentProps,
} from "../types/investment";
import Link from "next/link";
import { useRouter } from "next/router";
import { InvestmentDetail } from "./investment";

const Dashboard = () => {
  return (
    <>
      <HeaderOne>
        <Content />
      </HeaderOne>
    </>
  );
};

const Content = () => {
  const router = useRouter();
  const [collectdata, setcollectdata] = useState(investmentProps);
  const [loading, setloading] = useState<boolean>(true);
  useEffect(() => {
    getInvest(router.query.investid as string).then((res) => {
      console.log(res.data.data);
      setcollectdata(res.data.data);
      setloading(false);
    });
  }, []);

  const closeThis = () => {
    router.push("/dashboard");
  };
  return (
    <>
      {loading ? <Preloader /> : ""}
      <div className="max-w-lg mx-auto">
        <div className="grid grid-cols-1">
          <div>
            <Link href="/dashboard">
              <div className="bg-white px-10 py-8 my-6 duration-300 w-full rounded-xl shadow-lg hover:shadow-xl text-2xl font-bold">
                <div className="flex items-center justify-center gap-x-4">
                  <div className="">
                    <SparklesIcon className="w-12 fill-yellow-400 stroke-yellow-400" />
                  </div>
                  <div className="text-center">
                    Congratulations for your <br />
                    new investment
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        {collectdata.length === 0 ? (
          <div className="bg-white px-10 py-8 my-6 duration-300 w-full rounded-xl shadow-lg hover:shadow-xl text-2xl font-bold">
            No records found
          </div>
        ) : (
          <InvestmentDetail data={collectdata[0]} close={closeThis} />
        )}
      </div>
    </>
  );
};

export default Dashboard;

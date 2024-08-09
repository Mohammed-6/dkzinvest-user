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
} from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getInvestment } from "../query/investment";
import {
  detailsProp,
  investmentProp,
  investmentProps,
} from "../types/investment";
import Link from "next/link";

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
  return (
    <>
      <div className="px-16 py-10 bg-gray-100 min-h-screen">
        <ListInvestment />
      </div>
    </>
  );
};

const ListInvestment = () => {
  const [collectdata, setcollectdata] = useState(investmentProps);
  const [details, setdetails] = useState<investmentProp>();
  const [showdetails, setshowdetails] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    getInvestment().then((res) => {
      console.log(res.data.data);
      setcollectdata(res.data.data);
      setloading(false);
    });
  }, []);

  const showXYZ = (data: investmentProp) => {
    setdetails(data);
    // console.log(showdetails);
    setshowdetails(true);
  };

  const closeDetail = () => {
    setshowdetails(false);
  };

  function get30thDayOfCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    let day = 30; // Default to 30th day

    // Check if the current month is February and if the current year is a leap year
    if (
      currentMonth === 1 &&
      ((currentYear % 4 === 0 && currentYear % 100 !== 0) ||
        currentYear % 400 === 0)
    ) {
      // If February and a leap year, set day to 29
      day = 29;
    } else if (currentMonth === 1) {
      // If February but not a leap year, set day to 28
      day = 28;
    }

    // Set the date to the calculated day
    currentDate.setDate(day);
    return currentDate;
  }

  return (
    <>
      {loading ? <Preloader /> : ""}
      <div className="">
        <div className="max-w-lg mx-auto">
          <div className="grid grid-cols-1">
            <div>
              <Link href="/dashboard">
                <div className="bg-white px-10 py-8 my-6 duration-300 w-full rounded-xl shadow-lg hover:shadow-xl text-2xl font-bold">
                  <div className="flex items-center gap-x-4">
                    <div className="">
                      <ChartPieIcon className="w-6" />
                    </div>
                    <div className="">Dashboard</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {showdetails === false ? (
            <h2 className="text-3xl pb-4">My Investment(s)</h2>
          ) : (
            ""
          )}
          {collectdata.length === 0 ? (
            <div className="bg-white px-10 py-8 my-6 duration-300 w-full rounded-xl shadow-lg hover:shadow-xl text-2xl font-bold">
              No records found
            </div>
          ) : (
            ""
          )}
          {showdetails === false &&
            collectdata.map((data) => (
              <div className="bg-white m-2 mb-6 border-b-4 shadow-md hover:shadow-xl border-b-primary duration-300">
                <div className="px-6 py-2">
                  <div className="flex items-center gap-x-4">
                    <div className="">
                      <img
                        src={serverURL + "/" + data.planId.banner.path}
                        className="rounded-full h-16 w-16"
                      />
                    </div>
                    <div className="py-2">
                      <div className="text-lg">
                        <b>{data.planId.packageName}</b>
                      </div>
                      <div className="text-sm text-gray-500">
                        Profit sharing
                      </div>
                    </div>
                  </div>
                  <div className="py-2 grid grid-cols-2">
                    <div className="">
                      <div className="text-sm text-gray-500">
                        Capital Amount
                      </div>
                      <div className="text-lg">
                        <b>{formatIndianRupee(data.investmentAmount)}</b>
                      </div>
                    </div>
                    <div className="">
                      <div className="text-sm text-gray-500">
                        {"Next Pofit Date"}
                      </div>
                      <div className="text-lg">
                        <b>
                          {get30thDayOfCurrentMonth().toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            }
                          )}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-t-gray-200 py-3 px-3">
                  <div className="flex justify-end">
                    <button
                      className="flex items-center text-blue-500"
                      onClick={() => showXYZ(data)}
                    >
                      View Details{" "}
                      <ChevronRightIcon className="w-5 stroke-blue-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          {showdetails ? (
            <InvestmentDetail data={details} close={closeDetail} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export const InvestmentDetail = (props: detailsProp) => {
  function generate30thDay(startDate, durationMonths) {
    const result = [];
    let currentDate = new Date(startDate);
    // result.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), 30));

    // Loop for the specified duration in months
    for (let i = 0; i < durationMonths; i++) {
      // Add one month to the current date
      currentDate.setMonth(currentDate.getMonth() + 1);

      // Set the date to the 30th day of the month
      currentDate.setDate(30);

      // Add this date to the result array
      result.push(new Date(currentDate));
    }

    return result;
  }
  return (
    <>
      <div className="py-10">
        <div className="">
          <ArrowLeftIcon
            className="w-8 my-4 hover:cursor-pointer"
            onClick={() => props.close()}
          />
        </div>
        <h2 className="text-2xl font-bold py-2">Investment overview</h2>
        <div className="font-bold py-4">Loan details</div>
        <div className="p-4 border bg-white border-gray-200 rounded-3xl shadow-sm">
          <div className="grid grid-cols-2 gap-x-2">
            <div className="py-1">
              <div className="text-sm text-gray-500">Investment Capital</div>
              <div className="text-lg">
                <b>{formatIndianRupee(props.data.investmentAmount)}</b>
              </div>
            </div>
            <div className="py-1">
              <div className="text-sm text-gray-500">Monthly profit</div>
              <div className="text-lg">
                <b>
                  {formatIndianRupee(
                    (props.data.percentOfAmountTarget / 100) *
                      props.data.investmentAmount
                  )}
                </b>
              </div>
            </div>
            <div className="py-1">
              <div className="text-sm text-gray-500">Investment ID</div>
              <div className="text-sm text-gray-500">
                {props.data.investmentId}
              </div>
            </div>
            <div className="py-1">
              <div className="text-sm text-gray-500">Profit date</div>
              <div className="text-sm text-gray-500">30th every month</div>
            </div>
          </div>
          <div className="border-t border-t-gray-200 pt-2">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 font-bold">Auto credit</div>
              <div className="">
                <div className="flex items-center gap-x-0 bg-green-100 rounded-full">
                  <div className="">
                    <CheckIcon className="w-6 p-1 m-1 bg-green-500 rounded-full stroke-white" />
                  </div>
                  <div className="text-xs font-bold pr-1">Enabled</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-6">
        <div className="flex items-center justify-between font-bold">
          <div className="">Profit disburse details</div>
          <div className="underline hidden">View all transaction</div>
        </div>
      </div>
      <div className="p-6 border bg-white border-gray-200 rounded-3xl shadow-sm hidden">
        <div className="font-bold">Payment of Rs. 14,330 due on 30/06/2024</div>
        <div className="text-gray-500 pt-2">You have no due profits</div>
      </div>
      <div className="p-6 border bg-white border-gray-200 rounded-3xl shadow-sm">
        <div className="grid grid-cols-12 items-start py-1">
          <div className="col-span-2">
            <div className="grid place-items-center gap-y-1">
              <div>
                <CheckCircleIcon className="w-6 stroke-green-500" />
              </div>
              <div className="w-1 h-8 bg-gray-200"></div>
            </div>
          </div>
          <div className="col-span-8">
            <div className="font-bold">Money transferred to bank</div>
            <div className="text-gray-500">
              Recieve on{" "}
              {new Date(props.data.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </div>
          </div>
          <div className="col-span-2 font-bold">
            {formatIndianRupee(props.data.investmentAmount)}
          </div>
        </div>
        {generate30thDay(props.data.created_at, props.data.planId.duration).map(
          (dd, i) => {
            const curr = new Date();
            const currMonth = curr.getMonth() + 1;
            const crt = dd.getMonth();
            return (
              <div className="grid grid-cols-12 items-start py-1">
                <div className="col-span-2">
                  <div className="grid place-items-center gap-y-1">
                    <div>
                      {crt < currMonth ? (
                        <CheckCircleIcon className="w-6 stroke-green-500" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-300" />
                      )}
                    </div>
                    {i !==
                    generate30thDay(
                      props.data.created_at,
                      props.data.planId.duration
                    ).length -
                      1 ? (
                      <div className="w-1 h-8 bg-gray-200"></div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-span-8">
                  <div className="font-bold">{i + 1} Month - Profit</div>
                  <div className="text-gray-500">
                    {crt < currMonth ? "Paid" : "Due"} on{" "}
                    {new Date(dd).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </div>
                </div>
                <div className="col-span-2 font-bold">
                  {formatIndianRupee(
                    (props.data.percentOfAmountTarget / 100) *
                      props.data.investmentAmount
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
      <div className="p-6 border bg-white border-gray-200 rounded-3xl shadow-sm hidden">
        <div className="grid grid-cols-12 items-center py-1">
          <div className="col-span-2">
            <div className="grid place-items-center gap-y-1">
              <div>
                <ArrowUpRightIcon className="w-10 rounded-full stroke-green-500 bg-green-100 p-3" />
              </div>
            </div>
          </div>
          <div className="col-span-8">
            <div className="font-bold">Payment successfull</div>
            <div className="text-gray-500">Auto credit on 25 Mar, 2024</div>
          </div>
          <div className="col-span-2 font-bold">{formatIndianRupee(15413)}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

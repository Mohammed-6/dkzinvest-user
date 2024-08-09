import React, { useState, useEffect } from "react";
import { HeaderOne } from "../layout";
import { Preloader, formatIndianRupee, serverURL } from "@/src/stuff";
import {
  investPlanProp,
  listplanProps,
  planPropertiesProp,
} from "../types/dashboard";
import {
  clientDashboard,
  confirmOrder,
  investPlanNow,
} from "../query/dashboard";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

import useRazorpay from "react-razorpay";
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronRightIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useRouter } from "next/router";

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
  const [collectdata, setcollectdata] = useState(listplanProps);
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    clientDashboard().then((res) => {
      setcollectdata(res.data.data);
      setloading(false);
    });
  }, []);
  return (
    <>
      {loading ? <Preloader /> : ""}
      <div className="px-16 py-10">
        <div className="grid grid-cols-3">
          <div>
            <Link href="/investment">
              <div className="bg-white px-10 py-8 my-6 duration-300 w-full rounded-xl shadow-lg hover:shadow-xl text-2xl font-bold">
                <div className="flex items-center gap-x-4">
                  <div className="">
                    <CircleStackIcon className="w-6" />
                  </div>
                  <div className="">My Investments</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <h2 className="text-3xl pb-4">Investment Plan</h2>
        <div className="grid grid-cols-3 gap-x-6">
          {collectdata.map((data) => (
            <PlanContent data={data} />
          ))}
        </div>
        {/* <ListInvestment /> */}
        <InvestmentCalculator />
      </div>
    </>
  );
};

const ListInvestment = () => {
  return (
    <>
      <div className="bg-gray-100">
        <div className="max-w-lg mx-auto">
          <div className="bg-white m-2 border-b-4 border-b-primary shadow-md">
            <div className="px-6 py-2">
              <div className="flex items-center gap-x-4">
                <div className="">
                  <img
                    src="http://localhost:4004/public/uploads/pexels-apasaric-325185.jpg"
                    className="rounded-full h-16 w-16"
                  />
                </div>
                <div className="py-2">
                  <div className="text-lg">
                    <b>Monthly plan package</b>
                  </div>
                  <div className="text-sm text-gray-500">Profit sharing</div>
                </div>
              </div>
              <div className="py-2 grid grid-cols-2">
                <div className="">
                  <div className="text-sm text-gray-500">Capital Amount</div>
                  <div className="text-lg">
                    <b>{formatIndianRupee(0)}</b>
                  </div>
                </div>
                <div className="">
                  <div className="text-sm text-gray-500">
                    {"Next Pofit Date"}
                  </div>
                  <div className="text-lg">
                    <b>{formatIndianRupee(9)}</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-t-gray-200 py-3 px-3">
              <div className="flex justify-end">
                <button className="flex items-center text-blue-500">
                  View Details{" "}
                  <ChevronRightIcon className="w-5 stroke-blue-500" />
                </button>
              </div>
            </div>
          </div>
          <InvestmentDetail />
        </div>
      </div>
    </>
  );
};

const InvestmentDetail = () => {
  return (
    <>
      <div className="py-10">
        <div className="">
          <ArrowLeftIcon className="w-6" />
        </div>
        <h2 className="text-2xl font-bold py-2">Investment overview</h2>
        <div className="font-bold py-4">Loan details</div>
        <div className="p-4 border bg-white border-gray-200 rounded-3xl shadow-sm">
          <div className="grid grid-cols-2 gap-x-2">
            <div className="py-1">
              <div className="text-sm text-gray-500">Investment Capital</div>
              <div className="text-lg">
                <b>{formatIndianRupee(0)}</b>
              </div>
            </div>
            <div className="py-1">
              <div className="text-sm text-gray-500">Monthly profit</div>
              <div className="text-lg">
                <b>{formatIndianRupee(0)}</b>
              </div>
            </div>
            <div className="py-1">
              <div className="text-sm text-gray-500">Investment ID</div>
              <div className="text-sm text-gray-500">0000000000000</div>
            </div>
            <div className="py-1">
              <div className="text-sm text-gray-500">Profit date</div>
              <div className="text-sm text-gray-500">30th every month</div>
            </div>
          </div>
          <div className="border-t border-t-gray-200 pt-2">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 font-bold">Auto debit</div>
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
          <div className="underline">View all transaction</div>
        </div>
      </div>
      <div className="p-6 border bg-white border-gray-200 rounded-3xl shadow-sm">
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
            <div className="text-gray-500">Paid on 25 Mar, 2024</div>
          </div>
          <div className="col-span-2 font-bold">
            {formatIndianRupee(100000)}
          </div>
        </div>
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
            <div className="font-bold">1 Month - Profit</div>
            <div className="text-gray-500">Paid on 30 May, 2024</div>
          </div>
          <div className="col-span-2 font-bold">{formatIndianRupee(15413)}</div>
        </div>
        <div className="grid grid-cols-12 items-start py-1">
          <div className="col-span-2">
            <div className="grid place-items-center gap-y-1">
              <div>
                <div className="w-6 h-6 rounded-full bg-gray-300" />
              </div>
              <div className="w-1 h-8 bg-gray-200"></div>
            </div>
          </div>
          <div className="col-span-8">
            <div className="font-bold">2 Month - Profit</div>
            <div className="text-gray-500">Due on 30 Jun, 2024</div>
          </div>
          <div className="col-span-2 font-bold">{formatIndianRupee(15413)}</div>
        </div>
      </div>
      <div className="p-6 border bg-white border-gray-200 rounded-3xl shadow-sm">
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

const PlanContent = (props: planPropertiesProp) => {
  const router = useRouter();
  const data = props.data;
  const [Razorpay] = useRazorpay();
  const [collectdata, setcollectdata] = useState<investPlanProp>({
    planId: "",
    amount: 0,
    clientId: "",
  });
  const [showamount, setamount] = useState<boolean>(false);

  const investPlan = () => {
    setcollectdata({
      ...collectdata,
      planId: data._id,
      clientId: localStorage.getItem("dkz_client_token"),
    });
    setamount(true);
  };

  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };

  const investNow = () => {
    if (collectdata.amount < data.minAmount) {
      toast.error("Amount must be greater than minimum amount");
      return;
    } else if (collectdata.amount > data.maxAmount) {
      toast.error("Amount must be less than maximum amount");
      return;
    }

    investPlanNow(collectdata).then(function (res) {
      const options = {
        key: "rzp_test_s7rXzSSkEG43th",
        amount: "50000",
        currency: "INR",
        name: "DKZ Investment",
        description: "incoming order",
        image: "https://www.dikazo.com/assets/images/dikazo-logo-main.png",
        order_id: res.data.data.id,
        handler: function (response: any) {
          //   alert(response.razorpay_payment_id);
          //   alert(response.razorpay_order_id);
          //   alert(response.razorpay_signature);
          confirmOrder(response).then(function (res) {
            // console.log(res);
            //   router.push("/payment?order_id=" + response.razorpay_order_id);
            if (res.data.status === true) {
              toast.success(res.data.message);
              setamount(false);
              router.push("/invest/" + res.data.data.investmentId);
            } else {
              toast.error(res.data.message);
            }
          });
        },
        prefill: {
          name: res.data.detail.firstName + res.data.detail.lastName,
          email: res.data.detail.email,
          contact: res.data.detail.phone,
        },
        notes: {
          address: "investment amount",
        },
        theme: {
          color: "#10A37F",
        },
      };
      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response: any) {
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
        toast.error(response.error.description);
      });

      rzp1.open();
    });
  };
  return (
    <>
      {showamount ? (
        <>
          <div className="fixed inset-0 bg-black/50">
            <div className="max-w-md mx-auto">
              <div className="card">
                <div className="card-header">Invest</div>
                <div className="card-body">
                  <div className="">
                    <label className="">Amount</label>
                    <input
                      type="number"
                      className="border border-gray-300 px-2 py-3 rounded-md w-full"
                      onChange={formChange}
                      name="amount"
                    />
                  </div>
                  <div className="flex justify-between pt-4">
                    <div className="">
                      <button
                        className="btn btn-danger"
                        onClick={() => setamount(false)}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="">
                      <button className="btn btn-primary" onClick={investNow}>
                        Invest
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="">
        <div className="bg-white shadow-lg rounded-3xl">
          <div className="h-[150px]">
            <img
              src={serverURL + "/" + data.banner.path}
              className="object-cover w-full object-center h-[150px] rounded-tl-3xl rounded-tr-3xl"
            />
          </div>
          <div className="p-5">
            <div className="text-xl text-blue-500 pb-3">{data.packageName}</div>
            <table className="w-full border">
              <tr className="border">
                <td className="border w-[50%] p-2">
                  <b>Duration:</b> {data.duration} Month(s)
                </td>
                <td className="border w-[50%] p-2">
                  <b>Profit:</b> {data.percentage}%
                </td>
              </tr>
              <tr className="border">
                <td className="border w-[50%] p-2">
                  <b>Withdraw every:</b> {data.payoutPeriod}
                </td>
                <td className="border w-[50%] p-2">
                  <b>No. withdraw:</b> {data.withdrawInstallment}
                </td>
              </tr>
              <tr className="border">
                <td className="border w-[50%] p-2">
                  <b>Min amount:</b> {formatIndianRupee(data.minAmount)}
                </td>
                <td className="border w-[50%] p-2">
                  <b>Capital return:</b> {data.capitalReturn ? "Yes" : "No"}
                </td>
              </tr>
            </table>
            <div className="text-md underline pt-4">Terms and Conditions:</div>
            <div className="whitespace-pre-line">{data.terms}</div>
          </div>
          <div className="">
            <button
              className="uppercase py-4 text-lg w-full btn btn-primary rounded-none rounded-bl-3xl rounded-br-3xl"
              onClick={investPlan}
            >
              invest
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const InvestmentCalculator = () => {
  const [value, setValue] = useState([5000, 2000000]);
  const [value1, setValue1] = useState([0, 5]);
  const [value2, setValue2] = useState([0, 15]);
  const [profit, setprofit] = useState(0);
  const [chartdata, setchartdata] = useState<any>({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  const dragEnd = (data: any) => {
    // console.log(data);
    setValue(data);
  };

  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    const value = evt.value as any;
    setValue([5000, value]);
  };

  const dragEnd1 = (data: any) => {
    setValue1(data);
  };

  const formChange1 = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    const value = evt.value as any;
    setValue1([1, value]);
  };

  const dragEnd2 = (data: any) => {
    setValue2(data);
  };

  const formChange2 = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    const value = evt.value as any;
    setValue2([1, value]);
  };

  const calculateProfit = () => {
    const profitAmount = (value[1] * value2[1]) / 100;
    const totalProfit = profitAmount * value2[1];
    setprofit(profitAmount);

    let cat = [];
    let sum = [];
    for (let i = 0; i <= value1[1]; i++) {
      const tt: any = profitAmount * 12 * i;
      cat.push(i + " Year");
      sum.push(parseInt(tt));
    }

    setchartdata({
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: cat,
        },
      },
      series: [
        {
          name: "Profit",
          data: sum,
        },
      ],
    });
  };
  return (
    <>
      <div className="w-[50%]">
        <h2 className="text-3xl pt-16">Investment Calculator</h2>
        <div className="grid grid-cols-3 gap-x-4 items-center py-5">
          <div className="">
            <div className="flex items-center justify-between pb-4">
              <div className="text-bold">Amount you invest</div>
              <div className="">
                <input
                  className="border border-gray-300 rounded-md p-2 w-[90px]"
                  value={value[1]}
                  onChange={formChange}
                  type="number"
                />
              </div>
            </div>
            <RangeSlider
              className="single-thumb"
              value={value}
              thumbsDisabled={[true, false]}
              rangeSlideDisabled={true}
              min={5000}
              max={2000000}
              onInput={dragEnd}
            />
            <div className="flex justify-between">
              <div className="px-1 py-1 my-4">{5000}</div>
              <div className="px-1 py-1 my-4">{2000000}</div>
            </div>
          </div>
          <div className="">
            <div className="flex items-center pb-4">
              <div className="text-bold px-2">for</div>
              <div className="">
                <input
                  className="border border-gray-300 rounded-md p-2 w-[45px]"
                  value={value1[1]}
                  onChange={formChange1}
                  type="number"
                />
              </div>
              <div className="text-bold px-2">Years</div>
            </div>
            <RangeSlider
              className="single-thumb"
              value={value1}
              thumbsDisabled={[true, false]}
              rangeSlideDisabled={true}
              min={1}
              max={5}
              onInput={dragEnd1}
            />
            <div className="flex justify-between">
              <div className="px-1 py-1 my-4">1 Year</div>
              <div className="px-1 py-1 my-4">5 Year</div>
            </div>
          </div>
          <div className="">
            <div className="flex items-center justify-between pb-4">
              <div className="text-bold">Percentage rate</div>
              <div className="">
                <input
                  className="border border-gray-300 rounded-md p-2 w-[55px]"
                  value={value2[1]}
                  onChange={formChange2}
                  type="number"
                />
              </div>
              <div className="text-bold px-2">%</div>
            </div>
            <RangeSlider
              className="single-thumb"
              value={value2}
              thumbsDisabled={[true, false]}
              rangeSlideDisabled={true}
              min={6}
              max={15}
              onInput={dragEnd2}
            />
            <div className="flex justify-between">
              <div className="px-1 py-1 my-4">6 %</div>
              <div className="px-1 py-1 my-4">15 %</div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="btn btn-primary uppercase"
            onClick={calculateProfit}
          >
            calculate
          </button>
        </div>
        {profit !== 0 ? (
          <>
            <div className="my-6 bg-gray-300 text-black">
              <div className="text-2xl px-2 py-4">
                Your Monthly PROFIT will be <b>{formatIndianRupee(profit)}</b>{" "}
                per month! <b>Invest Now</b>
              </div>
            </div>
            <Chart
              options={chartdata.options}
              series={chartdata.series}
              type="line"
            />
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Dashboard;

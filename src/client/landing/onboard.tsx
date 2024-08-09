import {
  ExclamationTriangleIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { HeaderOne } from "../layout";
import {
  aadharInformationProp,
  bankInformationProp,
  basicInformationProp,
  customerViewProps,
  onboardProp,
  onboardStageProp,
  panInformationProp,
  profileInformationProp,
} from "../types/onboard";
import { toast } from "react-toastify";
import {
  onboardAI,
  onboardBI,
  onboardBankI,
  onboardPI,
  onboardProfileI,
  onboardStatus,
  uploadFile,
} from "../query/onboard";
import { ClockIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Preloader } from "@/src/stuff";

const OnboardLayout = () => {
  const router = useRouter();
  const [collectdata, setcollectdata] = useState<customerViewProps>();
  const [stages, setstages] = useState<onboardStageProp>({
    stage1: false,
    stage2: false,
    stage3: false,
    stage4: false,
    stage5: false,
    stage6: false,
  });
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    onboardStatus().then((res) => {
      if (res.data.status === true) {
        if (res.data.data.applicationStatus === 1) {
          localStorage.setItem(
            "dkz_client_name",
            res.data.data.firstName + " " + res.data.data.lastName
          );
          router.push("/dashboard");
        }
        setcollectdata(res.data.data);
        if (
          res.data.data.applicationStatus !== null &&
          res.data.data.applicationStatus !== undefined &&
          res.data.data.applicationSubmitted === true
        ) {
          setstages({ ...stages, stage6: true });
        } else {
          setstages({ ...stages, stage1: true });
        }
        setloading(false);
      }
    });
  }, []);

  const submitState1 = () => {
    setstages({ ...stages, stage1: false, stage2: true });
  };

  const submitState2 = () => {
    setstages({ ...stages, stage2: false, stage3: true });
  };

  const submitState3 = () => {
    setstages({ ...stages, stage3: false, stage4: true });
  };

  const submitState4 = () => {
    setstages({ ...stages, stage4: false, stage5: true });
  };

  const submitState5 = () => {
    setstages({ ...stages, stage5: false, stage6: true });
  };

  const startover = () => {
    setstages({ ...stages, stage1: true, stage6: false });
  };

  const preload = () => {
    setloading(false);
    console.log(loading);
  };
  return (
    <>
      <HeaderOne>
        {loading ? <Preloader /> : ""}
        {stages.stage1 ? (
          <BasicInformation
            submitted={submitState1}
            load={preload}
            data={collectdata}
          />
        ) : stages.stage2 ? (
          <AadharInformation
            submitted={submitState2}
            load={preload}
            data={collectdata}
          />
        ) : stages.stage3 ? (
          <PanInformation
            submitted={submitState3}
            load={preload}
            data={collectdata}
          />
        ) : stages.stage4 ? (
          <BankInformation
            submitted={submitState4}
            load={preload}
            data={collectdata}
          />
        ) : stages.stage5 ? (
          <ProfileInformation
            submitted={submitState5}
            load={preload}
            data={collectdata}
          />
        ) : stages.stage6 ? (
          <InformationSuccess
            submitted={submitState5}
            data={collectdata}
            startover={startover}
            load={preload}
          />
        ) : (
          ""
        )}
      </HeaderOne>
    </>
  );
};

const BasicInformation = (props: onboardProp) => {
  const [collectbi, setcollectbi] = useState<basicInformationProp>({
    firstName: "",
    lastName: "",
    motherName: "",
    fatherName: "",
    email: "",
    dob: "",
    gender: "",
    qualification: "",
    maritalStatus: "",
    referenceValue: "",
  });
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    const colte = {
      firstName: props.data?.firstName,
      lastName: props.data?.lastName,
      motherName: props.data?.motherName,
      fatherName: props.data?.fatherName,
      email: props.data?.email,
      dob: props.data?.dob,
      gender: props.data?.gender,
      qualification: props.data?.qualification,
      maritalStatus: props.data?.maritalStatus,
      referenceValue: props.data?.referenceValue,
    };
    setcollectbi(colte);
  }, []);
  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectbi({ ...collectbi, [evt.name]: evt.value });
  };

  const formSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectbi({ ...collectbi, [evt.name]: evt.value });
  };

  const formSubmit = () => {
    setloading(true);
    if (
      collectbi.firstName === "" ||
      collectbi.lastName === "" ||
      collectbi.motherName === "" ||
      collectbi.fatherName === "" ||
      collectbi.email === "" ||
      collectbi.dob === "" ||
      collectbi.gender === "" ||
      collectbi.qualification === "" ||
      collectbi.maritalStatus === ""
    ) {
      setloading(false);
      //   console.log(collectbi);
      toast.error("*Some fields are required");
      return;
    }

    onboardBI(collectbi)
      .then((res) => {
        if (res.data.status === true) {
          toast.success(res.data.message);
          setloading(false);
          props.submitted();
        } else {
          setloading(false);
          toast.error(res.data.message);
        }
      })
      .catch(function (err) {
        setloading(false);
        toast.error(err.message);
      });
  };
  return (
    <>
      {loading ? <Preloader /> : ""}
      <div className="w-full">
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div className="card-header">Basic Information</div>
            <div className="card-body">
              <div className="grid gap-x-4 grid-cols-2">
                <div className="">
                  <label className="font-semibold text-gray-500">
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={formChange}
                    className="p-2 rounded-md border w-full"
                    value={collectbi.firstName}
                  />
                  <small className="text-gray-500">As per your PAN</small>
                </div>
                <div className="">
                  <label className="font-semibold text-gray-500">
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={formChange}
                    className="p-2 rounded-md border w-full"
                    value={collectbi.lastName}
                  />
                </div>
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={formChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.email}
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  DOB<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  onChange={formChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.dob}
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Gender<span className="text-red-500">*</span>
                </label>
                <select
                  className="p-2 rounded-md border w-full"
                  name="gender"
                  onChange={formSelectChange}
                  value={collectbi.gender}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Father Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fatherName"
                  onChange={formChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.fatherName}
                />
                <small className="text-gray-500">Bank required format</small>
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Mother Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="motherName"
                  onChange={formChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.motherName}
                />
                <small className="text-gray-500">Bank required format</small>
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Qualification<span className="text-red-500">*</span>
                </label>
                <select
                  className="p-2 rounded-md border w-full"
                  name="qualification"
                  onChange={formSelectChange}
                  value={collectbi.qualification}
                >
                  <option value="">Select</option>
                  <option value="None">None</option>
                  <option value="10th">10th</option>
                  <option value="12th">12th</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Masters's</option>
                  <option value="Doctorate">Doctorate</option>
                </select>
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Marital Status<span className="text-red-500">*</span>
                </label>
                <select
                  className="p-2 rounded-md border w-full"
                  name="maritalStatus"
                  onChange={formSelectChange}
                  value={collectbi.maritalStatus}
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Reference ID
                </label>
                <input
                  type="text"
                  name="referenceValue"
                  onChange={formChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.referenceValue}
                />
              </div>
              <div className="grid gap-x-4 grid-cols-2">
                <div className=""></div>
                <div className="pt-2">
                  <button
                    className="btn btn-primary w-full"
                    onClick={formSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AadharInformation = (props: onboardProp) => {
  const [collectbi, setcollectbi] = useState<aadharInformationProp>({
    docId: props.data.aadharDetails?.docId,
    aadharNo: props.data.aadharDetails?.aadharNo,
    currentAddress: props.data.aadharDetails?.currentAddress,
    permanentAddress: props.data.aadharDetails?.permanentAddress,
  });
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    // const colte = props.data.panDetails
    // setcollectbi(colte);
  }, []);

  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectbi({ ...collectbi, [evt.name]: evt.value });
  };

  const formTextareaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const evt = e.target as HTMLTextAreaElement;
    setcollectbi({ ...collectbi, [evt.name]: evt.value });
  };

  const handleFileChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setloading(true);
    const event = evt.target as HTMLInputElement;
    const file = event.files[0]; // Get the first selected file
    const maxSize = 1024 * 1024 * 5; // 5 MB (Adjust as needed)
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]; // Allowed file types

    // Check if file size exceeds the maximum size
    if (file.size > maxSize) {
      toast.error(
        "File size exceeds the maximum allowed size (5MB). Please select a smaller file."
      );
      setloading(false);
      event.value = null; // Clear the file input
      return;
    }

    // Check if file type is allowed
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Please select a valid file type (JPEG, PNG, PDF)."
      );
      setloading(false);
      event.value = null; // Clear the file input
      return;
    }

    // File is valid, do something with it (e.g., upload)
    // console.log("Selected file:", file);
    uploadFile(event.files[0])
      .then((res) => {
        if (res.data.status === true) {
          toast.success(res.data.message);
          setloading(false);
          //   props.submitted();
          setcollectbi({ ...collectbi, docId: res.data.data });
        } else {
          setloading(false);
          toast.error(res.data.message);
        }
      })
      .catch(function (err) {
        setloading(false);
        toast.error(err.message);
      });
  };

  const formSubmit = () => {
    setloading(true);
    if (
      collectbi.docId === "" ||
      collectbi.aadharNo === "" ||
      collectbi.currentAddress === "" ||
      collectbi.permanentAddress === ""
    ) {
      console.log(collectbi);
      toast.error("*All fields are required");
      setloading(false);
      return;
    }

    onboardAI(collectbi)
      .then((res) => {
        if (res.data.status === true) {
          setloading(false);
          toast.success(res.data.message);
          props.submitted();
        } else {
          setloading(false);
          toast.error(res.data.message);
        }
      })
      .catch(function (err) {
        setloading(false);
        toast.error(err.message);
      });
  };
  return (
    <>
      {loading ? <Preloader /> : ""}
      <div className="w-full">
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div className="card-header">Aadhar Information</div>
            <div className="card-body">
              <div className="">
                <label className="font-semibold text-gray-500">
                  Aadhar attachment<span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="email"
                  onChange={handleFileChange}
                  className="p-2 rounded-md border w-full"
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Aadhar Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="aadharNo"
                  onChange={formChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.aadharNo}
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Parmanent Address<span className="text-red-500">*</span>
                </label>
                <textarea
                  name="permanentAddress"
                  onChange={formTextareaChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.permanentAddress}
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Current Address<span className="text-red-500">*</span>
                </label>
                <textarea
                  name="currentAddress"
                  onChange={formTextareaChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.currentAddress}
                />
              </div>
              <div className="grid gap-x-4 grid-cols-2">
                <div className=""></div>
                <div className="pt-2">
                  <button
                    className="btn btn-primary w-full"
                    onClick={formSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PanInformation = (props: onboardProp) => {
  const [collectbi, setcollectbi] = useState<panInformationProp>({
    docId: props.data.panDetails?.docId,
    panNo: props.data.panDetails?.panNo,
    nameOnPan: props.data.panDetails?.nameOnPan,
    fatherName: props.data.panDetails?.fatherName,
    dob: props.data.panDetails?.dob,
  });
  const [loading, setloading] = useState<boolean>(false);

  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectbi({ ...collectbi, [evt.name]: evt.value });
  };

  const handleFileChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setloading(true);
    const event = evt.target as HTMLInputElement;
    const file = event.files[0]; // Get the first selected file
    const maxSize = 1024 * 1024 * 5; // 5 MB (Adjust as needed)
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]; // Allowed file types

    // Check if file size exceeds the maximum size
    if (file.size > maxSize) {
      toast.error(
        "File size exceeds the maximum allowed size (5MB). Please select a smaller file."
      );
      setloading(false);
      event.value = null; // Clear the file input
      return;
    }

    // Check if file type is allowed
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Please select a valid file type (JPEG, PNG, PDF)."
      );
      setloading(false);
      event.value = null; // Clear the file input
      return;
    }

    // File is valid, do something with it (e.g., upload)
    // console.log("Selected file:", file);
    uploadFile(event.files[0])
      .then((res) => {
        if (res.data.status === true) {
          setloading(false);
          toast.success(res.data.message);
          //   props.submitted();
          setcollectbi({ ...collectbi, docId: res.data.data });
        } else {
          setloading(false);
          toast.error(res.data.message);
        }
      })
      .catch(function (err) {
        setloading(false);
        toast.error(err.message);
      });
  };

  const formSubmit = () => {
    setloading(true);
    if (
      collectbi.docId === "" ||
      collectbi.panNo === "" ||
      collectbi.nameOnPan === "" ||
      collectbi.dob === "" ||
      collectbi.fatherName === ""
    ) {
      //   console.log(collectbi);
      setloading(false);
      toast.error("*All fields are required");
      return;
    }

    onboardPI(collectbi)
      .then((res) => {
        if (res.data.status === true) {
          setloading(false);
          toast.success(res.data.message);
          props.submitted();
        } else {
          setloading(false);
          toast.error(res.data.message);
        }
      })
      .catch(function (err) {
        setloading(false);
        toast.error(err.message);
      });
  };
  return (
    <>
      {loading ? <Preloader /> : ""}
      <div className="w-full">
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div className="card-header">PAN Information</div>
            <div className="card-body">
              <div className="">
                <label className="font-semibold text-gray-500">
                  PAN attachment<span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="email"
                  onChange={handleFileChange}
                  className="p-2 rounded-md border w-full"
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  PAN Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="panNo"
                  onChange={formChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.panNo}
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Name on PAN<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nameOnPan"
                  onChange={formChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.nameOnPan}
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Father Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fatherName"
                  onChange={formChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.fatherName}
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  DOB<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  onChange={formChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.dob}
                />
              </div>
              <div className="grid gap-x-4 grid-cols-2">
                <div className=""></div>
                <div className="pt-2">
                  <button
                    className="btn btn-primary w-full"
                    onClick={formSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const BankInformation = (props: onboardProp) => {
  const [collectbi, setcollectbi] = useState<bankInformationProp>({
    docId: props.data.bankAccountDetails?.docId,
    bankName: props.data.bankAccountDetails?.bankName,
    accountHolderName: props.data.bankAccountDetails?.accountHolderName,
    bankACnumber: props.data.bankAccountDetails?.bankACnumber,
    ifscCode: props.data.bankAccountDetails?.ifscCode,
    accountType: props.data.bankAccountDetails?.accountType,
    isJointAccount: props.data.bankAccountDetails?.isJointAccount,
  });
  const [loading, setloading] = useState<boolean>(false);

  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectbi({ ...collectbi, [evt.name]: evt.value });
  };

  const formSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const evt = e.target as HTMLSelectElement;
    setcollectbi({ ...collectbi, [evt.name]: evt.value });
  };

  const formScChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    const { checked }: any = e.target;
    setcollectbi({ ...collectbi, [evt.name]: checked });
  };

  const handleFileChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setloading(true);
    const event = evt.target as HTMLInputElement;
    const file = event.files[0]; // Get the first selected file
    const maxSize = 1024 * 1024 * 5; // 5 MB (Adjust as needed)
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]; // Allowed file types

    // Check if file size exceeds the maximum size
    if (file.size > maxSize) {
      toast.error(
        "File size exceeds the maximum allowed size (5MB). Please select a smaller file."
      );
      setloading(false);
      event.value = null; // Clear the file input
      return;
    }

    // Check if file type is allowed
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Please select a valid file type (JPEG, PNG, PDF)."
      );
      setloading(false);
      event.value = null; // Clear the file input
      return;
    }

    // File is valid, do something with it (e.g., upload)
    // console.log("Selected file:", file);
    uploadFile(event.files[0])
      .then((res) => {
        if (res.data.status === true) {
          toast.success(res.data.message);
          //   props.submitted();
          setloading(false);
          setcollectbi({ ...collectbi, docId: res.data.data });
        } else {
          setloading(false);
          toast.error(res.data.message);
        }
      })
      .catch(function (err) {
        setloading(false);
        toast.error(err.message);
      });
  };

  const formSubmit = () => {
    setloading(true);
    if (
      collectbi.docId === "" ||
      collectbi.bankName === "" ||
      collectbi.accountHolderName === "" ||
      collectbi.bankACnumber === "" ||
      collectbi.accountType === "" ||
      collectbi.isJointAccount === null ||
      collectbi.ifscCode === ""
    ) {
      console.log(collectbi);
      toast.error("*All fields are required");
      setloading(false);
      return;
    }

    onboardBankI(collectbi)
      .then((res) => {
        if (res.data.status === true) {
          setloading(false);
          toast.success(res.data.message);
          props.submitted();
        } else {
          setloading(false);
          toast.error(res.data.message);
        }
      })
      .catch(function (err) {
        setloading(false);
        toast.error(err.message);
      });
  };
  return (
    <>
      {loading ? <Preloader /> : ""}
      <div className="w-full">
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div className="card-header">Bank Information</div>
            <div className="card-body">
              <div className="">
                <label className="font-semibold text-gray-500">
                  Bank passbook/statement attachment
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="email"
                  onChange={handleFileChange}
                  className="p-2 rounded-md border w-full"
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Bank Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bankName"
                  onChange={formChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.bankName}
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Account Holder Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="accountHolderName"
                  onChange={formChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.accountHolderName}
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Bank AC number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bankACnumber"
                  onChange={formChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.bankACnumber}
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  IFSC Code<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  onChange={formChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.ifscCode}
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Account type<span className="text-red-500">*</span>
                </label>
                <select
                  name="accountType"
                  onChange={formSelectChange}
                  className="p-2 rounded-md border w-full"
                  value={collectbi.accountType}
                >
                  <option value="">Select</option>
                  <option value="saving">Saving</option>
                  <option value="current">Current</option>
                </select>
              </div>
              <div className="">
                <label className="font-semibold text-gray-500">
                  Is Joint Account?<span className="text-red-500">*</span>
                </label>
                <br />
                <input
                  type="checkbox"
                  name="isJointAccount"
                  onChange={formScChange}
                  className="p-2 rounded-md border w-full"
                  defaultChecked={collectbi.isJointAccount}
                />
              </div>
              <div className="grid gap-x-4 grid-cols-2">
                <div className=""></div>
                <div className="pt-2">
                  <button
                    className="btn btn-primary w-full"
                    onClick={formSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProfileInformation = (props: onboardProp) => {
  const [collectbi, setcollectbi] = useState<profileInformationProp>({
    docId: props.data.profilePhoto?.docId,
  });
  const [loading, setloading] = useState<boolean>(false);

  const handleFileChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setloading(true);
    const event = evt.target as HTMLInputElement;
    const file = event.files[0]; // Get the first selected file
    const maxSize = 1024 * 1024 * 5; // 5 MB (Adjust as needed)
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]; // Allowed file types

    // Check if file size exceeds the maximum size
    if (file.size > maxSize) {
      toast.error(
        "File size exceeds the maximum allowed size (5MB). Please select a smaller file."
      );
      setloading(false);
      event.value = null; // Clear the file input
      return;
    }

    // Check if file type is allowed
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Please select a valid file type (JPEG, PNG, PDF)."
      );
      setloading(false);
      event.value = null; // Clear the file input
      return;
    }

    // File is valid, do something with it (e.g., upload)
    // console.log("Selected file:", file);
    uploadFile(event.files[0])
      .then((res) => {
        if (res.data.status === true) {
          toast.success(res.data.message);
          setloading(false);
          //   props.submitted();
          setcollectbi({ ...collectbi, docId: res.data.data });
        } else {
          setloading(false);
          toast.error(res.data.message);
        }
      })
      .catch(function (err) {
        toast.error(err.message);
      });
  };

  const formSubmit = () => {
    setloading(true);
    if (collectbi.docId === "") {
      console.log(collectbi);
      toast.error("*All fields are required");
      setloading(false);
      return;
    }

    onboardProfileI(collectbi)
      .then((res) => {
        if (res.data.status === true) {
          toast.success(res.data.message);
          props.submitted();
          setloading(false);
        } else {
          setloading(false);
          toast.error(res.data.message);
        }
      })
      .catch(function (err) {
        setloading(false);
        toast.error(err.message);
      });
  };
  return (
    <>
      {loading ? <Preloader /> : ""}
      <div className="w-full">
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div className="card-header">Profile Information</div>
            <div className="card-body">
              <div className="">
                <label className="font-semibold text-gray-500">
                  Profile attachment<span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="email"
                  onChange={handleFileChange}
                  className="p-2 rounded-md border w-full"
                />
              </div>
              <div className="grid gap-x-4 grid-cols-2">
                <div className=""></div>
                <div className="pt-2">
                  <button
                    className="btn btn-primary w-full"
                    onClick={formSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InformationSuccess = (props: onboardProp) => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      loadme();
    }, 10000);
  }, []);

  function loadme() {
    onboardStatus().then((res) => {
      if (res.data.status === true) {
        if (res.data.data.applicationStatus === 1) {
          localStorage.setItem(
            "dkz_client_name",
            res.data.data.firstName + " " + res.data.data.lastName
          );
          router.push("/dashboard");
        }
      }
    });
  }
  return (
    <>
      <div className="w-full py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-xl rounded-xl py-16 border border-gray-100">
            <div className="flex justify-center">
              <div>
                {props.data.applicationStatus === 0 ? (
                  <ClockIcon className="w-28 stroke-white p-6 bg-yellow-500 rounded-full" />
                ) : props.data.applicationStatus === 1 ? (
                  <CheckCircleIcon className="w-28 stroke-white p-6 bg-green-500 rounded-full" />
                ) : props.data.applicationStatus === 2 ? (
                  <ExclamationTriangleIcon className="w-28 stroke-white p-6 bg-red-500 rounded-full" />
                ) : props.data.applicationStatus === 3 ? (
                  <ExclamationTriangleIcon className="w-28 stroke-white p-6 bg-red-500 rounded-full" />
                ) : (
                  <ClockIcon className="w-28 stroke-white p-6 bg-red-500 rounded-full" />
                )}
              </div>
            </div>
            <div className="px-16 pt-6 text-gray-500 font-bold text-3xl text-center">
              {props.data.applicationStatus === 0
                ? "Pending"
                : props.data.applicationStatus === 1
                ? "Approved"
                : props.data.applicationStatus === 2
                ? "Rejected"
                : props.data.applicationStatus === 3
                ? "Deleted"
                : "Pending"}
            </div>
            <div className="px-16 py-3 text-gray-500 font-bold text-xl text-center">
              {props.data.applicationStatus === 0
                ? "Your application submitted and under verification check back in 15 minutes."
                : props.data.applicationReason}
              {props.data.applicationStatus === 1 ? (
                <div className="pt-4">
                  <button className="btn btn-success">Go To Dashboard</button>
                </div>
              ) : props.data.applicationStatus === 2 ? (
                <div className="pt-4">
                  <button
                    className="btn btn-success"
                    onClick={() => props.startover()}
                  >
                    Startover Application
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardLayout;

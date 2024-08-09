

export type basicInformationProp = {
    firstName: string,
    lastName: string,
    motherName: string,
    fatherName: string,
    email: string,
    dob: string,
    gender: string,
    qualification: string,
    maritalStatus: string,
    referenceValue: string, 
}

export type onboardStageProp = {
    stage1: boolean,
    stage2: boolean,
    stage3: boolean,
    stage4: boolean,
    stage5: boolean,
    stage6: boolean,
}

export type onboardProp = {
    submitted: Function,
    data: customerViewProps,
    startover?: Function,
    load?: Function
}

export type aadharInformationProp = {
    docId: string,
    aadharNo: string|number,
    currentAddress: string,
    permanentAddress: string,
}

export type panInformationProp = {
    docId: string,
    panNo: string,
    nameOnPan: string,
    fatherName: string,
    dob: string
}

export type bankInformationProp = {
    docId: string,
    bankName: string,
    accountHolderName: string,
    bankACnumber: string,
    ifscCode: string,
    accountType: string,
    isJointAccount: boolean
}

export type profileInformationProp = {
    docId: string
}


export type customerViewProps = {
    _id: string,
    customerId: string,
    firstName: string,
    lastName: string,
    motherName: string,
    fatherName: string,
    dob: string,
    gender: string,
    qualification: string,
    maritalStatus: string,
    referenceValue: string,
    email: string,
    phone: number,
    password: string,
    nominee: string,
    referredBy: {
      _id: string,
      firstName: string,
      lastName: string,
    },
    currentPlan: {
      _id: string,
      packageName: string,
      payoutPeriod: string,
    },
    payoutDuration: string,
    referralEligibility: boolean,
    franchise: {
      _id: string,
      name: string,
    },
    profilePhoto: {
      docId: string,
      _id: string,
    },
    panDetails: {
      docId: string,
      panNo: string,
      nameOnPan: string,
      fatherName: string,
      dob: string,
      _id: string,
    },
    aadharDetails: {
      docId: string,
      aadharNo: number,
      currentAddress: string,
      permanentAddress: string,
      _id: string,
    },
    aadharBack: {
      docId: {
        _id: string,
        mimetype: string,
        path: string,
        uploadedBy: string,
        docStatus: string,
        status: boolean
      },
      _id: string,
    },
    bankAccountDetails: {
      docId: string,
      bankName: string,
      accountHolderName: string,
      bankACnumber: string,
      ifscCode: string,
      accountType: string,
      isJointAccount: boolean,
      _id: string,
    },
    otherDocument: [
      {
        _id: string,
        mimetype: string,
        path: string,
        uploadedBy: string,
        docStatus: string,
        status: boolean
      }
    ],
    applicationReason: string,
    applicationStatus: number,
    createdBy: {
      _id: string,
      name: string,
    },
    status: boolean,
    created_at: string,
  }
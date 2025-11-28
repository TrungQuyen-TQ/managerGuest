import dayjs from "dayjs";
import LotusClient, { UploadSingleImage } from "../lotus-api";

export const addEmployeeApi = async (employeeData) => {
  const { basicInfo, healthCondition, accessSystem, generalNotes } = employeeData;
  // console.log(basicInfo, healthCondition, accessSystem, generalNotes);
  const birthday = dayjs(basicInfo.birthday).format("YYYY-MM-DD");
  const identificationDate = dayjs(basicInfo.identificationDate).format("YYYY-MM-DD");
  const passportProvideDate = dayjs(basicInfo.passportProvideDate).format("YYYY-MM-DD");
  const passwordExpiredDate = dayjs(basicInfo.passwordExpiredDate).format("YYYY-MM-DD");
  const contractDate = dayjs(basicInfo.contractDate).format("YYYY-MM-DD");
  const visaProvideDate = dayjs(basicInfo.visaProvideDate).format("YYYY-MM-DD");
  const visaExpiredDate = dayjs(basicInfo.visaExpiredDate).format("YYYY-MM-DD");
  const visaTclt = dayjs(basicInfo.visaTclt).format("YYYY-MM-DD");

  const formData = {
    returnValue: 1,
    employeeId: 1,
    hashCode: null,
    employeeCode: basicInfo.employeeCode,
    userName: accessSystem.userName,
    password: accessSystem.password,
    contractDate: contractDate,
    refreshToken: null,
    qrCode: null,
    countFail: null,
    timeStamp: null,
    lastLogin: null,
    status: accessSystem.status,
    employeeType: basicInfo.employeeType,
    description: generalNotes.description,
    field1: null,
    field2: null,
    field3: null,
    field4: null,
    field5: null,
    createdAt: null,
    createdBy: null,
    lastModifedAt: null,
    lastModifedBy: null,
    flag: null,
    firstName: basicInfo.firstName,
    middleName: basicInfo.middleName,
    lastName: basicInfo.lastName,
    sex: basicInfo.sex,
    birthday: birthday,
    marriedStatus: basicInfo.marriedStatus,
    educationLevelId: basicInfo.educationLevelId,
    ethnicity: basicInfo.ethnicity.label,
    religion: basicInfo.religion,
    identification: basicInfo.identification,
    identificationDate: identificationDate,
    identificationLocation: basicInfo.identificationLocation.label,
    passportNumber: basicInfo.passportNumber,
    passportProvideLocation: basicInfo.passportProvideLocation.label,
    passportProvideDate: passportProvideDate,
    passwordExpiredDate: passwordExpiredDate,
    domicileCityId: basicInfo.domicileCityId.value,
    domicileDistrictId: basicInfo.domicileDistrictId.value,
    domicileWardId: basicInfo.domicileWardId.value,
    normallyAddress: basicInfo.normallyAddress,
    temporaryAddress: basicInfo.temporaryAddress,
    email: basicInfo.email,
    telephone: null,
    mobilePhone: basicInfo.mobilePhone,
    avatar: basicInfo.avatar,
    avatarFullBody: null,
    visaNumber: basicInfo.visaNumber,
    visaProvideDate: visaProvideDate,
    visaExpiredDate: visaExpiredDate,
    visaTclt: visaTclt,
    nationality: basicInfo.nationality,
    bmi: healthCondition.weight / (healthCondition.height * healthCondition.height),
    groupBlood: healthCondition.groupBlood,
    height: healthCondition.height,
    weight: healthCondition.weight,
    isDrinkWine: healthCondition.isDrinkWine === "Có" ? true : false,
    isSmoke: healthCondition.isSmoke === "Có" ? true : false,
    eyeSightRight: healthCondition.eyeSightRight,
    eyeSightLeft: healthCondition.eyeSightLeft,
    strongHand: healthCondition.strongHand,
    colorBlindness: healthCondition.colorBlindness,
    sweatyHands: healthCondition.sweatyHands,
    afraidHeight: healthCondition.afraidHeight,
    haveTatoo: healthCondition.haveTatoo,
    detailTatoo: healthCondition.detailTatoo,
    departmentId: basicInfo.department.map((dep) => dep.value),
    // roleId: basicInfo.role.map((role) => role.value),
  };

  console.log(formData);
  try {
    const response = await LotusClient.post("/Employee/insert", formData);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateEmployeeApi = async (employeeData) => {
  const { basicInfo, healthCondition, accessSystem, generalNotes } = employeeData;
  const birthday = dayjs(basicInfo.birthday).format("YYYY-MM-DD");
  const identificationDate = dayjs(basicInfo.identificationDate).format("YYYY-MM-DD");
  const passportProvideDate = dayjs(basicInfo.passportProvideDate).format("YYYY-MM-DD");
  const passwordExpiredDate = dayjs(basicInfo.passwordExpiredDate).format("YYYY-MM-DD");
  const contractDate = dayjs(basicInfo.contractDate).format("YYYY-MM-DD");
  const visaProvideDate = dayjs(basicInfo.visaProvideDate).format("YYYY-MM-DD");
  const visaExpiredDate = dayjs(basicInfo.visaExpiredDate).format("YYYY-MM-DD");
  const visaTclt = dayjs(basicInfo.visaTclt).format("YYYY-MM-DD");

  const formData = {
    returnValue: 1,
    employeeId: basicInfo.employeeId,
    hashCode: null,
    employeeCode: basicInfo.employeeCode,
    userName: accessSystem.userName,
    password: accessSystem.password,
    contractDate: contractDate,
    refreshToken: null,
    qrCode: null,
    countFail: null,
    timeStamp: null,
    lastLogin: null,
    status: accessSystem.status,
    employeeType: basicInfo.employeeType,
    description: generalNotes.description || "",
    field1: null,
    field2: null,
    field3: null,
    field4: null,
    field5: null,
    createdAt: null,
    createdBy: null,
    lastModifedAt: null,
    lastModifedBy: null,
    flag: null,
    firstName: basicInfo.firstName,
    middleName: basicInfo.middleName,
    lastName: basicInfo.lastName,
    sex: basicInfo.sex,
    birthday: birthday,
    marriedStatus: basicInfo.marriedStatus,
    educationLevelId: basicInfo.educationLevelId,
    ethnicity: basicInfo.ethnicity.label,
    religion: basicInfo.religion,
    identification: basicInfo.identification,
    identificationDate: identificationDate,
    identificationLocation: basicInfo.identificationLocation.label,
    passportNumber: basicInfo.passportNumber,
    passportProvideLocation: basicInfo.passportProvideLocation.label,
    passportProvideDate: passportProvideDate,
    passwordExpiredDate: passwordExpiredDate,
    domicileCityId: basicInfo.domicileCityId.value,
    domicileDistrictId: basicInfo.domicileDistrictId.value,
    domicileWardId: basicInfo.domicileWardId.value,
    normallyAddress: basicInfo.normallyAddress,
    temporaryAddress: basicInfo.temporaryAddress,
    email: basicInfo.email,
    telephone: null,
    mobilePhone: basicInfo.mobilePhone,
    avatar: basicInfo.avatar,
    avatarFullBody: null,
    visaNumber: basicInfo.visaNumber,
    visaProvideDate: visaProvideDate,
    visaExpiredDate: visaExpiredDate,
    visaTclt: visaTclt,
    nationality: basicInfo.nationality,
    bmi: null,
    groupBlood: healthCondition.groupBlood,
    height: healthCondition.height,
    weight: healthCondition.weight,
    isDrinkWine: healthCondition.isDrinkWine === "Có" ? true : false,
    isSmoke: healthCondition.isSmoke === "Có" ? true : false,
    eyeSightRight: healthCondition.eyeSightRight,
    eyeSightLeft: healthCondition.eyeSightLeft,
    strongHand: healthCondition.strongHand,
    colorBlindness: healthCondition.colorBlindness,
    sweatyHands: healthCondition.sweatyHands,
    afraidHeight: healthCondition.afraidHeight,
    haveTatoo: healthCondition.haveTatoo,
    detailTatoo: healthCondition.detailTatoo,
    departmentId: basicInfo.department.map((dep) => dep.value),
    // roleId: basicInfo.role.map((role) => role.value),
  };

  console.log(formData);
  try {
    const response = await LotusClient.put("/Employee/update", formData);
    return response;
  } catch (error) {
    return error;
  }
};

export const listEmployeeApi = async () => {
  try {
    const response = await LotusClient.get("/Employee/all?sortByExpression=createdAt%20desc");
    return response;
  } catch (error) {
    return error;
  }
};

export const findEmployeeByIdApi = async (employeeId) => {
  try {
    const response = await LotusClient.get(`/Employee/${employeeId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const uploadAvatar = async (uploadDirectory, fileName) => {
  try {
    const data = {
      file: fileName,
    };
    const response = await UploadSingleImage.post(`?uploadDirectory=${uploadDirectory}`, data);

    return response;
  } catch (error) {
    return error;
  }
};

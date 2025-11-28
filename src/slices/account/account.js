import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  account: [],
  basicInfo: {
    // accountId: 1,
    selectedFile: "",
    avatar: "",
    accountCode: "",
    birthday: dayjs(),
    sex: "Nam",
    nationality: "Việt Nam",
    mobilePhone: "",
    educationLevelId: 1,
    marriedStatus: { label: "Chưa kết hôn", value: 1 },
    ethnicity: { label: "Kinh", value: 1 },
    religion: "",
    email: "",
    identification: "",
    identificationDate: dayjs(),
    identificationLocation: "",
    domicileCityId: "",
    domicileDistrictId: "",
    domicileWardId: "",
    normallyAddress: "",
    temporaryAddress: "",
    touched: {},
    errors: {},
  },
  healthCondition: {
    groupBlood: "",
    weight: "",
    height: "",
    isDrinkWine: "Không",
    isSmoke: "Không",
    eyeSightRight: "",
    eyeSightLeft: "",
    strongHand: "Không lựa chọn",
    colorBlindness: "Không lựa chọn",
    sweatyHands: "Không lựa chọn",
    afraidHeight: "Không lựa chọn",
    haveTatoo: "Không lựa chọn",
    detailTatoo: "",
    touched: {},
    errors: {},
  },
  systemAccess: {
    lastName: "",
    middleName: "",
    firstName: "",
    accountGroup: ["Nhân viên"],
    username: "",
    password: "",
    confirmPassword: "",
    status: "isActive",
    touched: {},
    errors: {},
  },
  generalNotes: {
    description: "",
  },
};

const slice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setTouchedAccount: (state, action) => {
      const { tab, fieldName, newValue } = action.payload;
      state[tab].touched[fieldName] = newValue;
    },
    setErrorsAccount: (state, action) => {
      const { tab, fieldName, newValue } = action.payload;

      state[tab].errors[fieldName] = newValue;
    },
    setInputAccounts: (state, action) => {
      const { tab, fieldName, newValue } = action.payload;

      if (fieldName === "domicileCityId") {
        state[tab].domicileCityId = newValue;
        state[tab].domicileDistrictId = "";
        state[tab].domicileWardId = "";
      } else if (fieldName === "domicileDistrictId") {
        state[tab].domicileDistrictId = newValue;
        state[tab].domicileWardId = "";
      } else {
        state[tab][fieldName] = newValue;
      }
    },
    setValuesForEditAccounts: (state, action) => {
      const { rowData } = action.payload;
      state.basicInfo = {
        ...initialState.basicInfo,
        ...rowData,
        birthday: dayjs(rowData.birthday) || dayjs(),
        identificationDate: dayjs(rowData.identificationDate) || dayjs(),
      };
      state.healthCondition = {
        ...initialState.healthCondition,
        ...rowData,
        isDrinkWine: rowData.isDrinkWine ? "Có" : "Không",
        isSmoke: rowData.isSmoke ? "Có" : "Không",
      };
      state.systemAccess = {
        ...initialState.systemAccess,
        ...rowData,
        confirmPassword: rowData.password || "",
      };
      state.generalNotes.description = rowData.description || "";
    },
    listAccounts: (state, action) => {
      state.account = action.payload;
    },
    resetAccount: () => initialState,
    updateAccount: (state) => state,
    deleteAccount: (state) => {
      state.account = [];
    },
  },
});

export const { reducer } = slice;

export const setTouchedAccountAsync = (tab, fieldName, newValue) => async (dispatch) => {
  dispatch(slice.actions.setTouchedAccount({ tab, fieldName, newValue }));
};

export const setErrorsAccountAsync = (tab, fieldName, newValue) => async (dispatch) => {
  dispatch(slice.actions.setErrorsAccount({ tab, fieldName, newValue }));
};

export const setInputAccountsAsync = (tab, fieldName, newValue) => async (dispatch) => {
  dispatch(slice.actions.setInputAccounts({ tab, fieldName, newValue }));
};

export const setValuesForEditAccountsAsync = (rowData) => async (dispatch) => {
  dispatch(slice.actions.setValuesForEditAccounts({ rowData }));
};

export const listAccountsAsync = (accounts) => async (dispatch) => {
  dispatch(slice.actions.listAccounts(accounts));
};

export const resetAccountAsync = () => async (dispatch) => {
  dispatch(slice.actions.resetAccount());
};

export const updateAccountAsync = () => async (dispatch) => {
  dispatch(slice.actions.updateAccount());
};

export const deleteAccountAsync = () => async (dispatch) => {
  dispatch(slice.actions.deleteAccount());
};

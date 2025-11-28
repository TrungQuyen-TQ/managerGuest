import { createSelector } from "@reduxjs/toolkit";

export const selectBasicInfo = (state) => state.accounts.basicInfo;
export const selectHealthCondition = (state) => state.accounts.healthCondition;
export const selectSystemAccess = (state) => state.accounts.systemAccess;
export const selectGeneralNotes = (state) => state.accounts.generalNotes;

export const selectAllTabs = createSelector(
  selectBasicInfo,
  selectHealthCondition,
  selectSystemAccess,
  selectGeneralNotes,
  (basicInfo, healthCondition, systemAccess, generalNotes) => ({
    basicInfo,
    healthCondition,
    systemAccess,
    generalNotes,
  })
);

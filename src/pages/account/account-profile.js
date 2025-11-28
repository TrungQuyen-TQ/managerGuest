import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import SnackbarAlert from "src/components/action-notification";
import { useTranslation } from "react-i18next";
import AccountProfileEdit from "src/sections/account/account-profile.js/account-profile-edit";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTabs } from "src/slices/account/accountSelector";
import AccountProfile from "src/sections/account/account-profile.js/account-profile-edit";

const Page = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const account = useSelector(selectAllTabs);
  const { basicInfo, healthCondition, accessSystem, generalNotes } = account;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isSuccess, setIsSuccess] = useState(true);

  // const handleAdd = async () => {
  //   Object.keys(basicInfo)
  //     .slice(0, -2)
  //     .forEach((fieldName) => {
  //       actionSetTouched(dispatch, "basicInfo", fieldName);
  //       validateFieldInfobasic(dispatch, "basicInfo", fieldName, basicInfo[fieldName]);
  //     });

  //   Object.keys(healthCondition)
  //     .slice(0, -2)
  //     .forEach((fieldName) => {
  //       actionSetTouched(dispatch, "healthCondition", fieldName);
  //       validateFieldHealthCondition(
  //         dispatch,
  //         "healthCondition",
  //         fieldName,
  //         healthCondition[fieldName]
  //       );
  //     });

  //   Object.keys(accessSystem)
  //     .slice(0, -2)
  //     .forEach((fieldName) => {
  //       actionSetTouched(dispatch, "accessSystem", fieldName);
  //       validateFieldAccessSystem(dispatch, "accessSystem", fieldName, accessSystem[fieldName]);
  //     });

  //   const noErrors =
  //     Object.values(basicInfo.errors).every((error) => error === null) &&
  //     Object.values(accessSystem.errors).every((error) => error === null) &&
  //     Object.values(healthCondition.errors).every((error) => error === null);

  //   console.log(noErrors);

  //   if (noErrors) {
  //     try {
  //       const response = await addEmployeeApi(employee);
  //       if (response.status === 200) {
  //         setSnackbarSeverity("success");
  //         setSnackbarMessage("Dữ liệu đã được gửi thành công.");
  //         setSnackbarOpen(true);
  //         dispatch(resetUserAsync());
  //         setIsSuccess(true);
  //       } else {
  //         console.log(response);
  //         setSnackbarSeverity("error");
  //         setSnackbarMessage("Đã xảy ra lỗi khi gửi dữ liệu!");
  //         setSnackbarOpen(true);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       setSnackbarSeverity("error");
  //       setSnackbarMessage("Thêm thất bại!");
  //       setSnackbarOpen(true);
  //     }
  //   }
  // };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Head>
        <title>{t("MEC_ACCOUNT_INFORMATION")} | Macaron</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={4}
          sx={{
            backdropFilter: "blur(6px)",
            backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
            position: "-webkit-sticky",
            position: "sticky",
            top: 0,
            padding: { xs: "10px 15px", sm: "15px 30px 8px" },
            height: { xs: "120px", sm: "64px" },
            zIndex: 1100,
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h4">{t("MEC_ACCOUNT_INFORMATION")}</Typography>
          </Stack>
        </Stack>
        <Container maxWidth="xl">
          <AccountProfile />
        </Container>
        <SnackbarAlert
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

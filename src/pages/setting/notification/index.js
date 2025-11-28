import { ArrowLongLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import NotificationAdd from "src/sections/setting/notification/notification-add";
import NotificationTable from "src/sections/setting/notification/notification-table";

const Page = () => {
  const { t } = useTranslation();
  const [isOpenAddNotificationDialog, setIsOpenAddNotificationDialog] = useState(false);

  const openAddNotificationDialog = () => setIsOpenAddNotificationDialog(true);
  const closeAddNotificationDialog = () => setIsOpenAddNotificationDialog(false);
  return (
    <>
      <Head>
        <title>{t("MEC_CACHING")} | CsoftLife</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t("Thông báo đơn hàng")} </Typography>
              </Stack>
              <div>
                <Link href="/setting">
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowLongLeftIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    sx={{
                      backgroundColor: "neutral.main",
                      color: "neutral.text",
                      margin: "0px 6px",
                    }}
                  >
                    {t("MEC_GO_BACK")}
                  </Button>
                </Link>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  sx={{
                    backgroundColor: "neutral.main",
                    color: "neutral.text",
                  }}
                  onClick={openAddNotificationDialog}
                >
                  {t("Thêm đơn hàng")}
                </Button>
              </div>
            </Stack>
            <NotificationTable />
            <NotificationAdd open={isOpenAddNotificationDialog} onClose={closeAddNotificationDialog} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

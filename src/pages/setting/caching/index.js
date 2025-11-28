import { ArrowLongLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import CachingAdd from "src/sections/setting/caching/caching-add";
import CachingTable from "src/sections/setting/caching/caching-table";

const Page = () => {
  const { t } = useTranslation();
  const [isOpenAddCachingDialog, setIsOpenAddCachingDialog] = useState(false);

  const openAddCachingDialog = () => setIsOpenAddCachingDialog(true);
  const closeAddCachingDialog = () => setIsOpenAddCachingDialog(false);
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
                <Typography variant="h4">{t("MEC_LIST_OF_CACHING")} </Typography>
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
                  onClick={openAddCachingDialog}
                >
                  {t("MEC_ADD_CACHING")}
                </Button>
              </div>
            </Stack>
            <CachingTable />
            <CachingAdd open={isOpenAddCachingDialog} onClose={closeAddCachingDialog} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

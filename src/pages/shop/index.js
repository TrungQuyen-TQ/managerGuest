import { PlusIcon } from "@heroicons/react/24/solid";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import ShopAdd from "src/sections/shop/shop-add";
import ShopTable from "src/sections/shop/shop-table";

const Page = () => {
  const { t } = useTranslation();
  const [isShopAddDialogOpen, setIsShopAddDialogOpen] = useState(false);

  const openShopAddDialog = () => {
    setIsShopAddDialogOpen(true);
  };

  const closeShopAddDialog = () => {
    setIsShopAddDialogOpen(false);
  };

  return (
    <>
      <Head>
        <title>{t("MEC_SHOP")} | Macaron</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t("MEC_LIST_OF_STORES")} </Typography>
              </Stack>
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
                onClick={() => openShopAddDialog()}
              >
                {t("MEC_ADD_SHOP")}
              </Button>
            </Stack>
            <ShopTable />
          </Stack>
        </Container>

        <ShopAdd isOpen={isShopAddDialogOpen} onClose={closeShopAddDialog} />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

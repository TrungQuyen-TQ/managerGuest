import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import ShopAdd from "src/sections/shop/shop-add";

const Page = () => {
  const { t } = useTranslation();
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
                <Typography variant="h4">{t("MEC_ADD_SHOP")} </Typography>
              </Stack>
              <div>
                <Link href="/shop" passHref>
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
                      marginRight: "12px",
                      marginTop: { xs: "-40px", sm: "0px" },
                    }}
                  >
                    {t("MEC_GO_BACK")}
                  </Button>
                </Link>
              </div>
            </Stack>
            <ShopAdd />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

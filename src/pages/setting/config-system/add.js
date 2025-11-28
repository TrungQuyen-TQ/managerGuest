import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ListBulletIcon, PlusIcon } from "@heroicons/react/24/solid";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import Link from "next/link";
import SystemAdd from "src/sections/setting/configsystem/configsystem-add";
import styles from "../../../style/index.module.scss";

const Page = () => {
  return (
    <>
      <Head>
        <title>Cấu Hình | Csoft</title>
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
                <Typography variant="h4">Cấu Hình</Typography>
              </Stack>
              <div>
                <Link href="/setting/config-system">
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowBack />
                      </SvgIcon>
                    }
                    variant="contained"
                    sx={{
                      backgroundColor: "neutral.main",
                      color: "neutral.text",
                      mr: "5px",
                    }}
                  >
                    Quay lại
                  </Button>
                </Link>
              </div>
            </Stack>
            <SystemAdd />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

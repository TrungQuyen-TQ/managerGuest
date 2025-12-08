import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useState } from "react";
import BoxSetting from "src/sections/setting/general/box-setting";
import AddForm from "src/components/managerguest/Addform";

const Page = () => {
  return (
    <>
      <Head>
        <title>Cấu hình chung | CsoftLife CMS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          
            
            <AddForm />
          
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

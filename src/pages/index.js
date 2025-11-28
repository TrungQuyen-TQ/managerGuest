import React from "react";
import Head from "next/head";
import { Box, Container, Grid2 } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewTotalEarnings } from "src/sections/overview/overview-total-earnings";
import { OverviewTotalOrders } from "src/sections/overview/overview-total-orders";
import { OverviewMostOrders } from "src/sections/overview/overview-most-orders";
import { OverviewTotalSale } from "src/sections/overview/overview-total-sale";
import { OverviewProduct } from "src/sections/overview/overview-product";
import { OverviewRevenue } from "src/sections/overview/overview-revenue";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewProductInventory } from "src/sections/overview/overview-product-inventory";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
const now = new Date();

const Page = () => {
  return (
    <>
      <Head>
        <title>Tổng quan | CSoft</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          backgroundColor: "$primary-color",
        }}
      >
        <Container maxWidth="xl">
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
              <OverviewTotalSale
                difference={12}
                positive
                sx={{ height: "100%" }}
                value="562554999"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
              <OverviewTotalOrders
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value="202554"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
              <OverviewTotalEarnings sx={{ height: "100%" }} value="202554" />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 12 }}>
              <OverviewRevenue sx={{ height: "100%" }} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, lg: 12 }}>
              <OverviewProduct sx={{ height: "100%" }} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, lg: 12 }}>
              <OverviewLatestOrders sx={{ height: "100%" }} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, lg: 8 }}>
              <OverviewProductInventory sx={{ height: "100%" }} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
              <OverviewMostOrders
                chartSeries={[20, 45, 35]}
                labels={["Online", "Offline", "Trade"]}
                sx={{ height: "100%" }}
              />
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

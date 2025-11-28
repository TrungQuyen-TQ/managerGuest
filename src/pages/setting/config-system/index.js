import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import SystemTable from "src/sections/setting/configsystem/configsystem-table";

const Page = () => {
  return (
    <>
      <Head>
        <title>Cấu Hình Hệ Thống | Csoft</title>
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
                <Typography variant="h4">Cấu Hình Hệ Thống</Typography>
              </Stack>
              <div>
                <Link href="/setting">
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
                <Link href="/setting/config-system/add">
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
                  >
                    Thêm
                  </Button>
                </Link>
              </div>
            </Stack>
            <SystemTable />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import Link from "next/link";
// import AccountTable from "src/sections/account/table/account-table";
import AccountTable from "src/sections/account/table/account-table";
import { resetAccountAsync } from "src/slices/account/account";
import { useDispatch } from "react-redux";
import { useModuleData } from "src/hooks/use-module-data";

const Page = () => {
  const { data, tr } = useModuleData("system/account");

  const dispatch = useDispatch();
  const handleResetForm = () => {
    dispatch(resetAccountAsync());
  };

  if (!data) return null;
  const list = data.pages.list;

  return (
    <>
      <Head>
        <title>{tr(data.meta.title.key)} | Macaron</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{tr(list.title.key)}</Typography>
              </Stack>
              <div>
                <Link href="/system/account/add">
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
                    onClick={handleResetForm}
                  >
                    {tr(list.button.key)}
                  </Button>
                </Link>
              </div>
            </Stack>
            <AccountTable />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

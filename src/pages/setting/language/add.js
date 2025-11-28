import Head from "next/head";
import { Box, Container, Stack, Typography, Button, SvgIcon } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ArrowLongLeftIcon, ListBulletIcon, PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import ExamFieldAdd from "src/sections/setting/exam-field/exam-field-add";
import { useTranslation } from "react-i18next";
import LanguageAdd from "src/sections/setting/language/language-add";

const Page = () => {
  const { t } = useTranslation();
  const titlePage = "Thêm ngôn ngữ";
  return (
    <>
      <Head>
        <title>{titlePage} | Csoft</title>
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
                <Typography variant="h4">{titlePage}</Typography>
              </Stack>
              <div>
                <Link href="/setting/language">
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
                    Quay lại
                  </Button>
                </Link>
              </div>
            </Stack>
            <LanguageAdd />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

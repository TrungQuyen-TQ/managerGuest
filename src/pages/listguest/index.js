

import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
// Import Layout (giả định đường dẫn này là đúng)
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";


import PropertyDashboard from "src/components/datagrid/managersoid";

import { useModuleData } from "src/hooks/use-module-data";
import Listguest from "src/components/listguest/listguet";


const Page = () => {
    // Sử dụng useModuleData để lấy dữ liệu metadata
    const { data, tr } = useModuleData("system/account");



    // Giả định key title cho trang này (hoặc tự định nghĩa)


    return (
        <>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 3,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        
                        <Listguest />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

// Đảm bảo getLayout được định nghĩa để sử dụng DashboardLayout
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page; // EXPORT DEFAULT để Next.js Pages Router nhận diện trang
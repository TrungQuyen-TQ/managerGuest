

import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
// Import Layout (giả định đường dẫn này là đúng)
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";


import FileManager from "src/filemanager/filemanager";
import { useModuleData } from "src/hooks/use-module-data";


const Page = () => {
    // Sử dụng useModuleData để lấy dữ liệu metadata
    const { data, tr } = useModuleData("system/account");

    // Xử lý loading: Nếu data chưa tải xong, hiển thị loading hoặc không hiển thị gì
    if (!data) return null;

    // Giả định key title cho trang này (hoặc tự định nghĩa)
    const pageTitleKey = data.meta.title.key || 'addHouseVilla';
    const titleText = tr ? tr(pageTitleKey) : 'Thêm mới House & Villa';

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
                        
                        <FileManager />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

// Đảm bảo getLayout được định nghĩa để sử dụng DashboardLayout
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page; // EXPORT DEFAULT để Next.js Pages Router nhận diện trang
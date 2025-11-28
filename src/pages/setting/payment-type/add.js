import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Button,
    SvgIcon
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import Link from 'next/link';
import { PaymentTypeAdd } from 'src/sections/setting/payment-type/payment-type-add';
import styles from '../../../style/index.module.scss'

const Page = () => {

    return (
        <>
            <Head>
                <title>
                    Thêm hình thức thanh toán | Csoft
                </title>
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
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Thêm hình thức thanh toán
                                </Typography>
                            </Stack>
                            <div>
                                <Link href='/setting/payment-type'>
                                    <Button
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowBackIcon />
                                            </SvgIcon>
                                        )}
                                        className={styles.btnBack}
                                        variant="contained"
                                    >
                                        Quay lại
                                    </Button>
                                </Link>
                            </div>
                        </Stack>
                        <PaymentTypeAdd />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;

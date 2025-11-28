import React, { useState } from "react";
import {
    TextField,
    Grid2,
    Stack,
    Box,
    Button,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { addStatusApi, listStatusApi } from "src/contexts/api/setting/api-status";
import ConfirmAlert from "src/components/confirm-alert";

const validationSchema = Yup.object({
    StatusName: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
    ObjType: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
});

const initialValues = {
    StatusName: '',
    ObjType: '',
    Description: '',
};

export default function StatusAdd() {
    // alert
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    //Alert Confirm
    const [isDialogSave, setIsDialogSave] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleModelOpen = () => {
        setIsDialogSave(true);
    };

    const handleModelClose = () => {
        setIsDialogSave(false);
    };

    // khi người dùng ấn thoát
    const handleCancelSave = () => {
        handleModelClose();
    }

    // khi người dùng xác định lưu 
    const handleConfirmSave = () => {
        setIsSaving(true);
        handleModelClose();
        formik.handleSubmit();
    }
    //end

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    Alias: "1",
                    LastModifiedByHidden: "1",
                    CreatedByHidden: "1",
                    ObjType: values.ObjType.trim(),
                    Flag: "1",
                    CommonStatusId: "1",
                    LastModifiedAt: new Date().toISOString(),
                    LastModifiedBy: "1",
                    TimeStamp: Math.floor(new Date().getTime() / 1000),
                    Field1: "1",
                    Field2: "1",
                    Field3: "1",
                    Field4: "1",
                    CreatedAt: new Date().toISOString(),
                    Field5: "1",
                    Description: values.Description.trim(),
                    StatusName: values.StatusName.trim(),
                    CreatedBy: "1",
                };

                // console.log(formData);

                if (isSaving) {
                    const response = await addStatusApi(formData);
                    if (response.status === 200) {
                        setSnackbarSeverity("success");
                        setSnackbarMessage("Thêm thành công !");
                        setSnackbarOpen(true);

                        formik.resetForm();

                        // call api list after add success
                        const res = await listStatusApi();
                        // dispatch list data
                        // dispatch({
                        //     type: HANDLERS_STATUS.LIST_STATUS,
                        //     payload: res.data,
                        // });
                        setIsSaving(false);
                    } else {
                        setIsSaving(false);
                        setSnackbarSeverity("error");
                        setSnackbarMessage("Có lỗi xảy ra !");
                        setSnackbarOpen(true);
                    }
                } else {
                    handleModelOpen();
                }
            } catch (err) {
                setSnackbarSeverity("error");
                setSnackbarMessage("Thêm thất bại !");
                setSnackbarOpen(true);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid2 container spacing={2}>
                    <Grid2 item size={{ xs: 12, md: 12, sm: 12 }}>
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                            >
                                Thông tin
                            </Typography>
                            <TextField
                                error={formik.touched.ObjType && Boolean(formik.errors.ObjType)}
                                helperText={formik.touched.ObjType && formik.errors.ObjType}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.ObjType}
                                name="ObjType"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Loại"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                error={formik.touched.StatusName && Boolean(formik.errors.StatusName)}
                                helperText={formik.touched.StatusName && formik.errors.StatusName}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.StatusName}
                                name="StatusName"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Tên trạng thái"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                error={formik.touched.Description && Boolean(formik.errors.Description)}
                                helperText={formik.touched.Description && formik.errors.Description}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                multiline
                                rows={2}
                                value={formik.values.Description}
                                name="Description"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Ghi chú"
                                fullWidth
                                variant="outlined"
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    width: '100%',
                                    marginTop: '20px'
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: 'neutral.main',
                                    }}
                                    type="submit"
                                >
                                    Thêm
                                </Button>
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
            </form>
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
            <ConfirmAlert
                onOpen={isDialogSave}
                onClose={handleModelClose}
                onConfirm={handleConfirmSave}
                onCancel={handleCancelSave}
            />
        </Stack>
    );
}

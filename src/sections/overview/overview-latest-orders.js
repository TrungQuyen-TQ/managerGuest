import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  useTheme,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import CustomDataGrid from "src/components/custom-datagrid";

dayjs.extend(utc);
dayjs.extend(timezone);

// Set Vietnam timezone
const vietnamTz = "Asia/Ho_Chi_Minh";

const rows = [
  {
    id: 1,
    stt: 1,
    orderCode: "ORD001",
    orderDate: "2024-11-10T08:45:00Z",
    customerName: "Nguyen Van A",
    totalAmount: 250000,
    paymentStatus: "Chưa thanh toán",
    deliveryStatus: "Chưa giao hàng",
    platform: "Web",
  },
  {
    id: 2,
    stt: 2,
    orderCode: "ORD002",
    orderDate: "2024-11-10T10:30:00Z",
    customerName: "Le Thi B",
    totalAmount: 150000,
    paymentStatus: "Đã thanh toán",
    deliveryStatus: "Đã giao hàng",
    platform: "Draft",
  },
  {
    id: 3,
    stt: 3,
    orderCode: "ORD003",
    orderDate: "2024-11-10T12:15:00Z",
    customerName: "Tran Van C",
    totalAmount: 300000,
    paymentStatus: "Chưa thanh toán",
    deliveryStatus: "Đang giao hàng",
    platform: "Zalo",
  },
  {
    id: 4,
    stt: 4,
    orderCode: "ORD004",
    orderDate: "2024-11-11T09:00:00Z",
    customerName: "Pham Thi D",
    totalAmount: 200000,
    paymentStatus: "Chờ xử lý",
    deliveryStatus: "Chưa giao hàng",
    platform: "Facebook",
  },
  {
    id: 5,
    stt: 5,
    orderCode: "ORD005",
    orderDate: "2024-11-11T14:45:00Z",
    customerName: "Hoang Van E",
    totalAmount: 500000,
    paymentStatus: "Đã thanh toán",
    deliveryStatus: "Đã giao hàng",
    platform: "Shoppe",
  },
  {
    id: 6,
    stt: 6,
    orderCode: "ORD006",
    orderDate: "2024-11-12T07:30:00Z",
    customerName: "Vu Thi F",
    totalAmount: 120000,
    paymentStatus: "Chưa thanh toán",
    deliveryStatus: "Đang giao hàng",
    platform: "Web",
  },
  {
    id: 7,
    stt: 7,
    orderCode: "ORD007",
    orderDate: "2024-11-12T11:00:00Z",
    customerName: "Do Van G",
    totalAmount: 350000,
    paymentStatus: "Chờ xử lý",
    deliveryStatus: "Chưa giao hàng",
    platform: "Draft",
  },
  {
    id: 8,
    stt: 8,
    orderCode: "ORD008",
    orderDate: "2024-11-13T15:20:00Z",
    customerName: "Nguyen Thi H",
    totalAmount: 450000,
    paymentStatus: "Đã thanh toán",
    deliveryStatus: "Đã giao hàng",
    platform: "Zalo",
  },
  {
    id: 9,
    stt: 9,
    orderCode: "ORD009",
    orderDate: "2024-11-14T08:15:00Z",
    customerName: "Pham Van I",
    totalAmount: 280000,
    paymentStatus: "Chưa thanh toán",
    deliveryStatus: "Đang giao hàng",
    platform: "Facebook",
  },
  {
    id: 10,
    stt: 10,
    orderCode: "ORD010",
    orderDate: "2024-11-14T12:00:00Z",
    customerName: "Tran Thi J",
    totalAmount: 320000,
    paymentStatus: "Chưa thanh toán",
    deliveryStatus: "Chưa giao hàng",
    platform: "Shoppe",
  },
];

export const OverviewLatestOrders = (props) => {
  const { sx } = props;
  const theme = useTheme();
  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "orderCode",
      headerName: "Mã đơn hàng",
      width: 150,
    },
    {
      field: "orderDate",
      headerName: "Ngày giờ đặt hàng",
      width: 180,
      renderCell: (params) => {
        return params.value ? dayjs(params.value).tz(vietnamTz).format("HH:mm DD/MM/YYYY") : "";
      },
    },
    {
      field: "customerName",
      headerName: "Khách hàng",
      width: 180,
    },
    {
      field: "totalAmount",
      headerName: "Tổng số tiền",
      width: 100,
      renderCell: (params) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
          minimumFractionDigits: 0,
        }).format(params.value);
      },
    },
    {
      field: "paymentStatus",
      headerName: "Trạng thái thanh toán",
      headerAlign: "center",
      align: "center",
      width: 200,
      renderCell: (params) => {
        let statusText;
        let borderColor;

        switch (params.row.paymentStatus) {
          case "Chưa thanh toán":
            statusText = "Chưa thanh toán";
            borderColor = theme.palette.primary.main;
            break;
          case "Chờ xử lý":
            statusText = "Chờ xử lý";
            borderColor = theme.palette.success.main;
            break;
          case "Đã thanh toán":
            statusText = "Đã thanh toán";
            borderColor = theme.palette.warning.main;
            break;
          default:
            statusText = "Unknown";
            borderColor = "#f0f0f0";
        }

        return (
          <Button
            variant="outlined"
            sx={{
              backgroundColor: borderColor,
              color: "white",
              width: "75%",
              height: "75%",
              mb: "8px",
            }}
          >
            {statusText}
          </Button>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Giao hàng",
      headerAlign: "center",
      align: "center",
      width: 200,
      renderCell: (params) => {
        let statusText;
        let borderColor;

        switch (params.row.deliveryStatus) {
          case "Chưa giao hàng":
            statusText = "Chưa giao hàng";
            borderColor = theme.palette.primary.main;
            break;
          case "Đang giao hàng":
            statusText = "Đang giao hàng";
            borderColor = theme.palette.success.main;
            break;
          case "Đã giao hàng":
            statusText = "Đã giao hàng";
            borderColor = theme.palette.warning.main;
            break;
          default:
            statusText = "Unknown";
            borderColor = "#f0f0f0";
        }

        return (
          <Button
            variant="outlined"
            sx={{
              backgroundColor: borderColor,
              color: "white",
              width: "75%",
              height: "75%",
              mb: "8px",
            }}
          >
            {statusText}
          </Button>
        );
      },
    },
    {
      field: "platform",
      headerName: "Kênh",
      width: 100,
    },
  ];

  return (
    <Card sx={sx}>
      <CardHeader title="Danh sách đơn hàng mới nhất" />

      <Scrollbar sx={{ flexGrow: 1 }}>
        <CustomDataGrid rows={rows} columns={columns} />
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          Xem tất cả
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};

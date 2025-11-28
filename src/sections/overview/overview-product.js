import PropTypes from "prop-types";
import { Autocomplete, Box, Button, Card, CardHeader, Grid2, TextField } from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import CustomDataGrid from "src/components/custom-datagrid";
import CustomDateRangePicker from "src/components/custom-date-range-picker";
import { useState } from "react";
import { addDays } from "date-fns";

const rows = [
  {
    id: 1,
    stt: 1,
    image: "/assets/products/product-1.png",
    productName: "Sản phẩm A",
    price: 200000,
    warehouse: "Trong kho",
    shopName: "Cửa hàng 1",
    shopStatus: "Đang hoạt động",
  },
  {
    id: 2,
    stt: 2,
    image: "/assets/products/product-2.png",
    productName: "Sản phẩm B",
    price: 150000,
    warehouse: "Ngoài kho",
    shopName: "Cửa hàng 2",
    shopStatus: "Chưa hoạt động",
  },
  {
    id: 3,
    stt: 3,
    image: "/assets/products/product-6.png",
    productName: "Sản phẩm C",
    price: 300000,
    warehouse: "Trong kho",
    shopName: "Cửa hàng 1",
    shopStatus: "Khóa",
  },
  {
    id: 4,
    stt: 4,
    image: "/assets/products/product-4.png",
    productName: "Sản phẩm D",
    price: 500000,
    warehouse: "Ngoài kho",
    shopName: "Cửa hàng 3",
    shopStatus: "Đang hoạt động",
  },
  {
    id: 5,
    stt: 5,
    image: "/assets/products/product-5.png",
    productName: "Sản phẩm E",
    price: 250000,
    warehouse: "Trong kho",
    shopName: "Cửa hàng 2",
    shopStatus: "Đang hoạt động",
  },
  {
    id: 6,
    stt: 6,
    image: "/assets/products/product-6.png",
    productName: "Sản phẩm F",
    price: 100000,
    warehouse: "Ngoài kho",
    shopName: "Cửa hàng 3",
    shopStatus: "Chưa hoạt động",
  },
  {
    id: 7,
    stt: 7,
    image: "/assets/products/product-7.png",
    productName: "Sản phẩm G",
    price: 450000,
    warehouse: "Trong kho",
    shopName: "Cửa hàng 1",
    shopStatus: "Đang hoạt động",
  },
  {
    id: 8,
    stt: 8,
    image: "/assets/products/product-7.png",
    productName: "Sản phẩm H",
    price: 120000,
    warehouse: "Ngoài kho",
    shopName: "Cửa hàng 2",
    shopStatus: "Khóa",
  },
  {
    id: 9,
    stt: 9,
    image: "/assets/products/product-4.png",
    productName: "Sản phẩm I",
    price: 220000,
    warehouse: "Trong kho",
    shopName: "Cửa hàng 3",
    shopStatus: "Đang hoạt động",
  },
  {
    id: 10,
    stt: 10,
    image: "/assets/products/product-1.png",
    productName: "Sản phẩm J",
    price: 180000,
    warehouse: "Ngoài kho",
    shopName: "Cửa hàng 1",
    shopStatus: "Chưa hoạt động",
  },
];

export const OverviewProduct = (props) => {
  const { sx } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [stateDate, setStateDate] = useState([
    {
      startDate: addDays(new Date(), -15),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (item) => {
    setStateDate([item.selection]);
  };

  const columns = [
    { field: "stt", headerName: "STT", flex: 0.5 },
    {
      field: "image",
      headerName: "Hình ảnh",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.row.image}
          alt={params.row.productName}
          style={{ width: "50px", height: "60px", borderRadius: "15%" }}
        />
      ),
    },
    { field: "productName", headerName: "Tên sản phẩm", flex: 2 },
    {
      field: "price",
      headerName: "Giá",
      flex: 1,
      renderCell: (params) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
          minimumFractionDigits: 0,
        }).format(params.value);
      },
    },
    { field: "warehouse", headerName: "Kho", flex: 1 },
    { field: "shopName", headerName: "Cửa hàng", flex: 1 },
    { field: "shopStatus", headerName: "Trạng thái", flex: 1 },
  ];

  return (
    <Card sx={sx}>
      <CardHeader
        title="Danh sách sản phẩm bán chạy nhất nhất"
        action={
          <Box>
            <Button variant="outlined" size="small" onClick={handleClick}>
              Lựa chọn ngày
            </Button>
            <CustomDateRangePicker
              anchorEl={anchorEl}
              handleClose={handleClose}
              stateDate={stateDate}
              handleDateChange={handleDateChange}
            />
          </Box>
        }
      />
      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 12, sm: 6, lg: 12 }}>
          <CustomDataGrid rows={rows} columns={columns} />
        </Grid2>
      </Grid2>
    </Card>
  );
};

OverviewProduct.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};

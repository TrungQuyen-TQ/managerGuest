import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  useTheme,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import CustomDataGrid from "src/components/custom-datagrid";

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
    quantity: 10, // Added quantity field
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
    quantity: 15, // Added quantity field
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
    quantity: 20, // Added quantity field
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
    quantity: 5, // Added quantity field
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
    quantity: 30, // Added quantity field
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
    quantity: 25, // Added quantity field
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
    quantity: 40, // Added quantity field
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
    quantity: 8, // Added quantity field
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
    quantity: 12, // Added quantity field
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
    quantity: 18, // Added quantity field
  },
];

export const OverviewProductInventory = (props) => {
  const { sx } = props;
  const theme = useTheme();

  const columns = [
    { field: "stt", headerName: "STT", flex: 0.5, headerAlign: "center", align: "center" },
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
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      flex: 2,
    },
    { field: "quantity", headerName: "Số lượng" },
    {
      field: "warehouse",
      headerName: "Kho",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              params.row.warehouse === "Trong kho"
                ? theme.palette.primary.main
                : theme.palette.success.main,
            color: "white",
            width: "75%",
            height: "75%",
            mb: "7px",
          }}
        >
          {params.row.warehouse === "Trong kho" ? "Trong kho" : "Ngoài kho"}
        </Button>
      ),
    },
  ];

  return (
    <Card sx={sx}>
      <CardHeader title="Báo cáo tồn kho sản phẩm" />
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

OverviewProductInventory.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};

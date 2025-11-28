import PropTypes from "prop-types";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  SvgIcon,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Chart } from "src/components/chart";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { addDays, eachDayOfInterval, format } from "date-fns";
import { checkIfDefinedRange, generateChartData } from "src/utils/chart-date";
import CustomDateRangePicker from "src/components/custom-date-range-picker";

const useChartOptions = (startDate, endDate) => {
  const theme = useTheme();

  const days = eachDayOfInterval({ start: startDate, end: endDate }).map(
    (date) => format(date, "dd") // Định dạng ngày theo kiểu (01 Jan, 02 Jan, ...)
  );

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "40px",
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: days,
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};

// const CustomDateRangePicker = styled(DateRangePicker)`
//   .rdrDefinedRangesWrapper {
//     width: 170px;
//   }
// `;

export const OverviewRevenue = (props) => {
  const { t } = useTranslation();
  const { sx } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const [chartSeries, setChartSeries] = useState({
    series: [
      {
        name: "Revenue",
        data: generateChartData(addDays(new Date(), -15), new Date()), // Tạo dữ liệu
      },
    ],
  });

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

  const chartOptions = useChartOptions(stateDate[0].startDate, stateDate[0].endDate);

  const handleDateChange = (item) => {
    const { startDate, endDate } = item.selection;
    setStateDate([item.selection]);

    const updatedData = generateChartData(startDate, endDate);

    setChartSeries({
      series: [
        {
          name: "Revenue",
          data: updatedData,
        },
      ],
    });
  };

  return (
    <Card sx={sx}>
      <CardHeader
        title={t("MEC_REVENUE")}
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
            <Button
              color="inherit"
              size="small"
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowPathIcon />
                </SvgIcon>
              }
            >
              Sync
            </Button>
          </Box>
        }
      />

      <CardContent>
        <Grid2 container spacing={1}>
          <Grid2 size={{ xs: 12, sm: 6, lg: 12 }}>
            <Chart
              height={350}
              options={chartOptions}
              series={chartSeries.series}
              type="bar"
              width="100%"
            />
          </Grid2>
        </Grid2>
      </CardContent>
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
        >
          Overview
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewRevenue.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object,
};

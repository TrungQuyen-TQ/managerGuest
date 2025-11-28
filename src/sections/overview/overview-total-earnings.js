import PropTypes from "prop-types";
import ListBulletIcon from "@heroicons/react/24/solid/ListBulletIcon";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { DocumentIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "src/utils/format-currency";
import { CurrencyDollar } from "src/icons/currency-dollar";

export const OverviewTotalEarnings = (props) => {
  const { value, sx } = props;
  const { t } = useTranslation();

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" gutterBottom variant="overline">
              {t("MEC_TOTAL_EARNINGS")}
            </Typography>
            <Typography variant="h6">{formatCurrency(value)}đ</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CurrencyDollar />
            </SvgIcon>
          </Avatar>
        </Stack>
        {/* <Box sx={{ mt: 3 }}>
          <LinearProgress
            value={value}
            variant="determinate"
          />
        </Box> */}
      </CardContent>
    </Card>
  );
};

OverviewTotalEarnings.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

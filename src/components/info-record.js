import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useModuleData } from "src/hooks/use-module-data";
import { selectAuth } from "src/slices/auth/authSelector";

// hàm này sẽ hiển thị người chỉnh sửa cuối cùng của bản ghi
const InfoRecord = () => {
  const { data, tr } = useModuleData("common");

  const auth = useSelector(selectAuth);
  const currentDateTime = new Date().toLocaleString();

  if (!data) return null;
  const infoRecord = data.components.infoRecord;
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "16px",
        }}
      >
        {tr(infoRecord.createdBy.key)}&nbsp;
        <Typography variant="body1">
          {auth.user?.name} {currentDateTime}
        </Typography>
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "16px",
        }}
      >
        {tr(infoRecord.lastModifiedBy.key)}:&nbsp;
        <Typography variant="body1">
          {auth.user?.name} {currentDateTime}
        </Typography>
      </Typography>
    </Box>
  );
};

export default InfoRecord;

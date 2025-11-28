/* eslint-disable react/jsx-max-props-per-line */
import { Box, Grid2, Typography, TextField, Autocomplete, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { selectHealthCondition } from "src/slices/account/accountSelector";

export default function TabHealthCondition() {
  const healthCondition = useSelector(selectHealthCondition);
  const {
    groupBlood,
    weight,
    height,
    isDrinkWine,
    isSmoke,
    eyeSightRight,
    eyeSightLeft,
    strongHand,
    colorBlindness,
    sweatyHands,
    afraidHeight,
    haveTatoo,
    detailTatoo,
  } = healthCondition;

  return (
    <Stack spacing={3}>
      <Grid2 container spacing={2}>
        {/* Cột trái */}
        <Grid2 item size={{ xs: 12, md: 6, sm: 12 }}>
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Tình trạng sức khỏe
            </Typography>

            {/* Nhóm máu */}
            <Autocomplete
              value={groupBlood || ""}
              readOnly
              fullWidth
              size="small"
              variant="outlined"
              options={["Không lựa chọn", "A", "B", "O", "AB"]}
              renderInput={(params) => (
                <TextField {...params} label="Nhóm máu" variant="outlined" />
              )}
              sx={{ margin: "4px", marginTop: "12px" }}
            />

            {/* Cân nặng & Chiều cao */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                label="Cân nặng"
                value={weight || ""}
                fullWidth
                size="small"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
              <TextField
                label="Chiều cao"
                value={height || ""}
                fullWidth
                size="small"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
            </Box>

            {/* Uống rượu & Hút thuốc */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                label="Uống rượu"
                value={isDrinkWine || ""}
                fullWidth
                size="small"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
              <TextField
                label="Hút thuốc"
                value={isSmoke || ""}
                fullWidth
                size="small"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
            </Box>

            {/* Thị lực */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                label="Thị lực (trái)"
                value={eyeSightLeft || ""}
                fullWidth
                size="small"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
              <TextField
                label="Thị lực (phải)"
                value={eyeSightRight || ""}
                fullWidth
                size="small"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
            </Box>

            {/* Tay thuận */}
            <Autocomplete
              value={strongHand || ""}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              variant="outlined"
              options={["Không lựa chọn", "Trái", "Phải", "Hai tay"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tay thuận"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                  variant="outlined"
                />
              )}
              sx={{ margin: "4px", marginTop: "12px" }}
            />
          </Box>
        </Grid2>

        {/* Cột phải */}
        <Grid2 item size={{ xs: 12, md: 6, sm: 12 }}>
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Hồ sơ sức khỏe bổ sung
            </Typography>

            <TextField
              label="Mù màu"
              value={colorBlindness || ""}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
            />

            <TextField
              label="Mồ hôi tay"
              value={sweatyHands || ""}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
            />

            <TextField
              label="Sợ độ cao"
              value={afraidHeight || ""}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
            />

            <TextField
              label="Hình xăm"
              value={haveTatoo || ""}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
            />

            <TextField
              label="Chi tiết hình xăm"
              value={detailTatoo || ""}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
            />
          </Box>
        </Grid2>
      </Grid2>
    </Stack>
  );
}

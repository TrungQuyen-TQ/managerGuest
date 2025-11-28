/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-props-per-line */
import { Box, Grid2, Typography, TextField, Autocomplete, Stack } from "@mui/material";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { selectHealthCondition } from "src/slices/account/accountSelector";
import { setErrorsAccountAsync, setInputAccountsAsync } from "src/slices/account/account";
import { useEffect } from "react";
import { actionSetTouched } from "./tab-infobasic";

export function validateFieldHealthCondition(dispatch, tab, fieldName, fieldValue) {
  const validationSchema = Yup.object().shape({
    groupBlood: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    weight: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số vào trường này"),
    height: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số vào trường này"),
    isDrinkWine: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    isSmoke: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    eyeSightLeft: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[1-9]$|^10$/, "Vui lòng nhập một số trong khoảng 1 đến 10"),
    eyeSightRight: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[1-9]$|^10$/, "Vui lòng nhập một số trong khoảng 1 đến 10"),
    strongHand: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    colorBlindness: Yup.string(),
    sweatyHands: Yup.string(),
    afraidHeight: Yup.string(),
    haveTatoo: Yup.string(),
    detailTatoo: Yup.string(),
  });

  let newValue;
  validationSchema
    .validateAt(fieldName, { [fieldName]: fieldValue })
    .then(() => {
      newValue = null;
      dispatch(setErrorsAccountAsync(tab, fieldName, newValue));
    })
    .catch((error) => {
      newValue = error.message;
      dispatch(setErrorsAccountAsync(tab, fieldName, newValue));
    });
}

export default function TabHealthCondition() {
  const tab = "healthCondition";
  const dispatch = useDispatch();
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
    touched,
    errors,
  } = healthCondition;

  //Bắt được value tương ứng của từng field
  useEffect(() => {
    document.querySelector("[name='weight']").value = weight;
    document.querySelector("[name='height']").value = height;
    document.querySelector("[name='eyeSightLeft']").value = eyeSightLeft;
    document.querySelector("[name='eyeSightRight']").value = eyeSightRight;
    document.querySelector("[name='detailTatoo']").value = detailTatoo;
  }, []);
  const handleBlurChange = (event, fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);

    const fieldValue = event.target.value;
    let newValue;

    if (fieldValue.length >= 0) {
      newValue = fieldValue;
    } else {
      newValue = "";
    }
    dispatch(setInputAccountsAsync(tab, fieldName, newValue));

    validateFieldHealthCondition(dispatch, tab, fieldName, fieldValue);
  };

  const handleChange = (event, fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);

    const fieldValue = event.target.value;
    let newValue;

    if (fieldValue.length >= 0) {
      newValue = fieldValue;
    } else {
      newValue = "";
    }
    dispatch(setInputAccountsAsync(tab, fieldName, newValue));

    validateFieldHealthCondition(dispatch, tab, fieldName, fieldValue);
  };

  const handleChangeSelect = (event, fieldName, newValueSelect) => {
    actionSetTouched(dispatch, tab, fieldName);

    let newValue;

    if (newValueSelect !== null) {
      newValue = newValueSelect;
    } else {
      newValue = "";
    }
    dispatch(setInputAccountsAsync(tab, fieldName, newValue));

    validateFieldHealthCondition(dispatch, tab, fieldName, newValue);
  };

  const handleBlur = (fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);
  };

  return (
    <Stack spacing={3}>
      <Grid2 container spacing={2}>
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
            <Autocomplete
              onBlur={() => handleBlur("groupBlood")}
              onChange={(event, newValue) => handleChangeSelect(event, "groupBlood", newValue)}
              value={groupBlood}
              name="groupBlood"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Không lựa chọn", "A", "B", "O", "AB"]}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Nhóm máu"
                  error={!!(touched.groupBlood && errors.groupBlood)}
                  helperText={touched.groupBlood && errors.groupBlood}
                />
              )}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                error={!!(touched.weight && errors.weight)}
                helperText={touched.weight && errors.weight}
                onBlur={(event) => handleBlurChange(event, "weight")}
                name="weight"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Cân nặng"
                fullWidth
              />
              <TextField
                error={!!(touched.height && errors.height)}
                helperText={touched.height && errors.height}
                onBlur={(event) => handleBlurChange(event, "height")}
                name="height"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Chiều cao"
                fullWidth
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                error={!!(touched.isDrinkWine && errors.isDrinkWine)}
                helperText={touched.isDrinkWine && errors.isDrinkWine}
                onBlur={() => handleBlur("isDrinkWine")}
                onChange={(event) => handleChange(event, "isDrinkWine")}
                value={isDrinkWine}
                name="isDrinkWine"
                fullWidth
                sx={{ margin: "4px", marginTop: "12px" }}
                label="Uống rượu"
                select
                slotProps={{ select: { native: true } }}
                variant="outlined"
              >
                <option value="Không">Không</option>
                <option value="Có">Có</option>
              </TextField>
              <TextField
                error={!!(touched.isSmoke && errors.isSmoke)}
                helperText={touched.isSmoke && errors.isSmoke}
                onBlur={() => handleBlur("isSmoke")}
                onChange={(event) => handleChange(event, "isSmoke")}
                value={isSmoke}
                name="isSmoke"
                fullWidth
                sx={{ margin: "4px", marginTop: "12px" }}
                label="Hút thuốc"
                select
                slotProps={{ select: { native: true } }}
                variant="outlined"
              >
                <option value="Không">Không</option>
                <option value="Có">Có</option>
              </TextField>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                error={!!(touched.eyeSightLeft && errors.eyeSightLeft)}
                helperText={touched.eyeSightLeft && errors.eyeSightLeft}
                onBlur={(event) => handleBlurChange(event, "eyeSightLeft")}
                name="eyeSightLeft"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Thị lực (trái)"
                fullWidth
              />
              <TextField
                error={!!(touched.eyeSightRight && errors.eyeSightRight)}
                helperText={touched.eyeSightRight && errors.eyeSightRight}
                onBlur={(event) => handleBlurChange(event, "eyeSightRight")}
                name="eyeSightRight"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Thị lực (phải)"
                fullWidth
              />
            </Box>
            <Autocomplete
              onBlur={() => handleBlur("strongHand")}
              onChange={(event, newValue) => handleChangeSelect(event, "strongHand", newValue)}
              value={strongHand}
              name="strongHand"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Không lựa chọn", "Trái", "Phải", "Hai tay"]}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Tay thuận"
                  error={!!(touched.strongHand && errors.strongHand)}
                  helperText={touched.strongHand && errors.strongHand}
                />
              )}
            />
          </Box>
        </Grid2>
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
              error={!!(touched.colorBlindness && errors.colorBlindness)}
              helperText={touched.colorBlindness && errors.colorBlindness}
              onBlur={() => handleBlur("colorBlindness")}
              onChange={(event) => handleChange(event, "colorBlindness")}
              value={colorBlindness}
              name="colorBlindness"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Mù màu"
              select
              slotProps={{ select: { native: true } }}
              variant="outlined"
            >
              <option value="Không lựa chọn">Không lựa chọn</option>
              <option value="Không">Không</option>
              <option value="Có">Có</option>
            </TextField>
            <TextField
              error={!!(touched.sweatyHands && errors.sweatyHands)}
              helperText={touched.sweatyHands && errors.sweatyHands}
              onBlur={() => handleBlur("sweatyHands")}
              onChange={(event) => handleChange(event, "sweatyHands")}
              value={sweatyHands}
              name="sweatyHands"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Mồ hôi tay"
              select
              slotProps={{ select: { native: true } }}
              variant="outlined"
            >
              <option value="Không lựa chọn">Không lựa chọn</option>
              <option value="Có ít">Có ít</option>
              <option value="Nhiều">Nhiều</option>
            </TextField>
            <TextField
              error={!!(touched.afraidHeight && errors.afraidHeight)}
              helperText={touched.afraidHeight && errors.afraidHeight}
              onBlur={() => handleBlur("afraidHeight")}
              onChange={(event) => handleChange(event, "afraidHeight")}
              value={afraidHeight}
              name="afraidHeight"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Sợ độ cao"
              select
              slotProps={{ select: { native: true } }}
              variant="outlined"
            >
              <option value="Không lựa chọn">Không lựa chọn</option>
              <option value="Có">Có</option>
              <option value="Không">Không</option>
            </TextField>
            <TextField
              error={!!(touched.haveTatoo && errors.haveTatoo)}
              helperText={touched.haveTatoo && errors.haveTatoo}
              onBlur={() => handleBlur("haveTatoo")}
              onChange={(event) => handleChange(event, "haveTatoo")}
              value={haveTatoo}
              name="haveTatoo"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Hình xăm"
              select
              slotProps={{ select: { native: true } }}
              variant="outlined"
            >
              <option value="Không lựa chọn">Không lựa chọn</option>
              <option value="Có">Có</option>
              <option value="Không">Không</option>
            </TextField>
            <TextField
              error={!!(touched.detailTatoo && errors.detailTatoo)}
              helperText={touched.detailTatoo && errors.detailTatoo}
              onBlur={(event) => handleBlurChange(event, "detailTatoo")}
              name="detailTatoo"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Chi tiết hình xăm"
              fullWidth
              variant="outlined"
            />
          </Box>
        </Grid2>
      </Grid2>
    </Stack>
  );
}

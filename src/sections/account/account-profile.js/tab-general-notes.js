/* eslint-disable react/jsx-max-props-per-line */
import { Grid2, Stack, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setInputAccountsAsync } from "src/slices/account/account";
import { selectGeneralNotes } from "src/slices/account/accountSelector";

export default function TabGeneralNotes() {
  const tab = "generalNotes";
  const dispatch = useDispatch();
  const generalNotes = useSelector(selectGeneralNotes);
  const { description } = generalNotes;

  const handleChange = (event, fieldName) => {
    const newValue = event.target.value;
    dispatch(setInputAccountsAsync(tab, fieldName, newValue));
  };

  return (
    <>
      <Stack spacing={3}>
        <Grid2 container spacing={2}>
          <Grid2 item size={{ xs: 12, md: 12, lg: 12 }}>
            <TextField
              onChange={(event) => handleChange(event, "description")}
              value={description}
              name="description"
              multiline
              rows={4.7}
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Ghi chú"
              fullWidth
            />
          </Grid2>
        </Grid2>
      </Stack>
    </>
  );
}

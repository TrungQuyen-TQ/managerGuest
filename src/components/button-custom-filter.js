import { Button, styled } from "@mui/material";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  padding: "6px 12px",
  border: "1px solid",
  backgroundColor: "#F7ACBB",
  borderRadius: "1px",
  "&:hover": {
    backgroundColor: "#F7ACBB",
    color: "black",
    borderColor: "#F7ACBB",
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "none",
    backgroundColor: "neutral.main",
  },
});

export default BootstrapButton;

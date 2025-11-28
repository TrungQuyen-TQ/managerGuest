/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "src/slices/auth/authSelector";
import { logOutUser } from "src/slices/auth/auth";
import { useState } from "react";
import { useModuleData } from "src/hooks/use-module-data";

export const AccountPopover = (props) => {
  const { t } = useTranslation();
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(null);
  const [isPermissionViewOpen, setIsPermissionViewOpen] = useState(false);
  const { data, tr } = useModuleData("layout");

  const handleSignOut = useCallback(() => {
    onClose?.();
    dispatch(logOutUser());
    router.push("/auth/login");
  }, [onClose, auth, router]);

  const handleAccount = useCallback(() => {
    router.push("/account/account-profile");
  });

  const handleChangePassword = useCallback(() => {
    router.push("/account/change-password");
  });

  if (!data) return null;
  const accountPopover = data.accountPopover;

  const openPermissionView = (params) => {
    setSelectedRow({
      id: 1,
      stt: 1,
      avatar: "/images/avatar1.jpg",
      accountCode: "EMP001",
      firstName: "An",
      middleName: "Văn",
      lastName: "Nguyễn",
      accountGroup: ["Nhân viên", "Hệ thống", "Quản lý"],
      userName: "nva",
      email: "nva@example.com",
      mobilePhone: "0909123456",
    });
    setIsPermissionViewOpen(true);
  };

  const closePermissionView = () => {
    setIsPermissionViewOpen(false);
    setSelectedRow(null);
  };

  return (
    <>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        onClose={onClose}
        open={open}
        slotProps={{
          paper: {
            sx: { width: 200 },
          },
        }}
      >
        <Box
          sx={{
            py: 1.5,
            px: 2,
          }}
        >
          <Typography variant="overline"> {tr(accountPopover.account.key)}</Typography>
          <Typography color="text.secondary" variant="body2">
            {auth.user?.name}
          </Typography>
        </Box>
        <Divider />
        <MenuList
          disablePadding
          dense
          sx={{
            p: "8px",
            "& > *": {
              borderRadius: 1,
            },
          }}
        >
          <MenuItem onClick={handleAccount}> {tr(accountPopover.accountInformation.key)}</MenuItem>
          <MenuItem onClick={openPermissionView}> {tr(accountPopover.myPermission.key)}</MenuItem>
          <MenuItem onClick={handleSignOut}> {tr(accountPopover.logout.key)}</MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

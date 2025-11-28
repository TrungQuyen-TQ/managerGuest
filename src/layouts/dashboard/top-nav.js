import React from "react";
import PropTypes from "prop-types";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { usePopover } from "src/hooks/use-popover";
import { AccountPopover } from "./account-popover";
// import { MarketContext } from "src/contexts/market-context";
import { NotifyPopover } from "./notify-popover";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LanguageButton from "src/components/language-button";
import { selectAuth } from "src/slices/auth/authSelector";
import { useModuleData } from "src/hooks/use-module-data";

const SIDE_NAV_WIDTH = 270;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen, open, setOpen, setClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { t } = useTranslation();
  const accountPopover = usePopover();
  const notifyPopover = usePopover();
  // const context = useContext(MarketContext);
  const router = useRouter();
  const auth = useSelector(selectAuth);
  const { data, tr } = useModuleData("layout");

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  if (!data) return null;
  const topNav = data.topNav;

  const handleExamFied = () => {
    router.push("/field");
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${open ? SIDE_NAV_WIDTH : 54}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${open ? SIDE_NAV_WIDTH : 54}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp ? (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={open ? setClose : setOpen}
                edge="start"
                // sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Typography
              size="small"
              sx={{
                fontFamily: (theme) => theme.typography.fontFamily,
                fontSize: 14,
                fontWeight: 600,
                marginTop: "3px",
              }}
            >
              <span style={{ color: "black" }}>
                {tr(topNav.hello.key)}:{" "}
                <span style={{ color: "#0c4da2", fontWeight: "bold" }}>{auth.user?.name}</span>{" "}
                {formattedDate}
              </span>
            </Typography>
            <LanguageButton />
            <Tooltip
              title={tr(topNav.notification.key)}
              onClick={notifyPopover.handleOpen}
              // onMouseEnter={notifyPopover.handleOpen}
              // onMouseLeave={notifyPopover.handleClose}
              ref={notifyPopover.anchorRef}
            >
              <IconButton>
                <Badge badgeContent={4} color="success" variant="dot">
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              src="/assets/avatars/avatar-fran-perez.png"
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: "pointer",
                height: 40,
                width: 40,
              }}
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
      <NotifyPopover
        anchorEl={notifyPopover.anchorRef.current}
        open={notifyPopover.open}
        onClose={notifyPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};

import React, { useContext } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
  List,
  ListItemButton,
  ListItemIcon,
  Collapse,
  IconButton,
  Tooltip,
  CardMedia,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import BootstrapTooltip from "src/components/tooltip";
import { useTranslation } from "react-i18next";
import { convertMenuFromApi, generateDynamicMenu } from "./config";

const mockMenu = [
  {
    link: "/add",
    icon: "AddIcon",
    alias: "setting",
    title: "Add Guest",
    children: null,
  },
  {
    link: "/listguest",
    icon: "BarChartIcon",
    alias: "account",
    title: "List",
    children: null,
  }, 

  
];

export const SideNav = (props) => {
  const { open, onClose, openV2 } = props;
  const { t } = useTranslation();
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [openSubMenu, setOpenSubMenu] = useState({});
  const [yearCopy, setyearCopy] = useState(null);
  const items = convertMenuFromApi(mockMenu, t);

  useEffect(() => {
    setyearCopy(new Date().getFullYear().toString().slice(-2));
  }, []);

  const tagContentDrop = document.querySelector(".css-1wvnli");
  if (tagContentDrop) {
    tagContentDrop.style.setProperty("overflow-x", "hidden", "important");
  }

  useEffect(() => {
    if (!openV2) {
      // Đóng tất cả các submenu khi SideNav được thu lại
      setOpenSubMenu({});
    }
  }, [openV2]);

  useEffect(() => {
    // Tạo một biến để theo dõi xem đã tìm thấy menu mở nào chưa
    let foundOpenMenu = false;

    // Lặp qua danh sách các mục và kiểm tra sự khớp với URL hiện tại
    items.forEach((item) => {
      if (item.submenu) {
        const isOpen = item.submenu.some((subItem) => pathname.startsWith(subItem.path));

        // Nếu menu hiện tại mở và chưa tìm thấy menu mở nào khác
        if (isOpen && !foundOpenMenu) {
          setOpenSubMenu((prevState) => ({
            ...prevState,
            [item.title]: isOpen,
          }));
          foundOpenMenu = true; // Đánh dấu rằng đã tìm thấy menu mở
        }
      }
      if (!openV2) {
        // Đóng tất cả các submenu khi SideNav được thu lại
        setOpenSubMenu({});
      }
    });
  }, [pathname]);

  const toggleNestedList = (item) => {
    if (openV2) {
      setOpenSubMenu((prevState) => ({
        ...prevState,
        [item.title]: !prevState[item.title],
      }));
    }
  };

  const renderNestedList = (submenuItems, parentItem) => {
    return (
      <Collapse in={openSubMenu[parentItem.title]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {submenuItems.map((subItem) => (
            <ListItemButton
              key={subItem.title}
              component={NextLink}
              href={subItem.path || "#"}
              sx={{
                pl: 3,
                "&:hover": {
                  backgroundColor: "#F7ACBB",
                },
                ...(pathname.startsWith(subItem.path) && {
                  backgroundColor: "#F7ACBB",
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "40px",
                }}
              >
                {subItem.icon}
              </ListItemIcon>
              <Box
                component="span"
                sx={{
                  flexGrow: 1,
                  fontFamily: (theme) => theme.typography.fontFamily,
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: "24px",
                  whiteSpace: "nowrap",
                }}
              >
                {subItem.title}
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    );
  };

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            mt: 1,
            textAlign: openV2 ? "center" : "none",
          }}
        >
          {openV2 ? (
            <>
              <Box
                component={NextLink}
                href="/"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img alt="" src="/assets/logos/logo.png" style={{ width: "50%" }} />
              </Box>
            </>
          ) : (
            <>
              <Box
                component={NextLink}
                href="/"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img alt="" src="/assets/logos/logo.png" style={{ width: "60%" }} />
              </Box>
            </>
          )}
        </Box>
        <Divider sx={{ borderColor: "#F7ACBB" }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            // px: 2,
            // py: 3,
          }}
        >
          <List>
            {items.map((item) => {
              return (
                <React.Fragment key={item.title}>
                  {item.submenu ? (
                    <div>
                      {openV2 ? (
                        // Render without Tooltip if openV2 is true
                        <ListItemButton
                          sx={{
                            cursor: "pointer",
                            padding: "4px 16px",
                            "&:hover": {
                              backgroundColor: "#F7ACBB",
                            },
                          }}
                          onClick={() => toggleNestedList(item)}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: "40px",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <Box
                            component="span"
                            sx={{
                              flexGrow: 1,
                              fontFamily: (theme) => theme.typography.fontFamily,
                              fontSize: 13,
                              fontWeight: 600,
                              lineHeight: "24px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.title}
                          </Box>
                          <IconButton size="small">
                            {openSubMenu[item.title] ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                        </ListItemButton>
                      ) : (
                        // Render with Tooltip if openV2 is false
                        <BootstrapTooltip
                          title={
                            <>
                              <Typography
                                sx={{
                                  textAlign: "center",
                                  padding: "8px 0",
                                }}
                              >
                                {item.title}
                              </Typography>
                              <Divider />
                              <List component="div" disablePadding>
                                {item.submenu.map((subItem) => (
                                  <ListItemButton
                                    key={subItem.title}
                                    component={NextLink}
                                    href={subItem.path || "#"}
                                    sx={{
                                      "&:hover": {
                                        backgroundColor: "neutral.400",
                                      },
                                      ...(subItem.path === pathname && {
                                        backgroundColor: "neutral.400",
                                      }),
                                    }}
                                  >
                                    <Box
                                      component="span"
                                      sx={{
                                        flexGrow: 1,
                                        fontFamily: (theme) => theme.typography.fontFamily,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        lineHeight: "24px",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {subItem.title}
                                    </Box>
                                  </ListItemButton>
                                ))}
                              </List>
                            </>
                          }
                          key={item.title}
                          placement="right"
                        >
                          <ListItemButton
                            sx={{
                              cursor: "pointer",
                              padding: "4px 16px",
                              "&:hover": {
                                backgroundColor: "#F7ACBB",
                              },
                              ...(item.submenu.some(
                                (subItem) =>
                                  subItem.path === pathname || pathname.startsWith(subItem.path)
                              ) && {
                                backgroundColor: "#F7ACBB",
                              }),
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: "40px",
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                            <Box
                              component="span"
                              sx={{
                                flexGrow: 1,
                                fontFamily: (theme) => theme.typography.fontFamily,
                                fontSize: 13,
                                fontWeight: 600,
                                lineHeight: "24px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.title}
                            </Box>
                            <IconButton size="small">
                              {openSubMenu[item.title] ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                          </ListItemButton>
                        </BootstrapTooltip>
                      )}
                      {renderNestedList(item.submenu, item)}
                    </div>
                  ) : (
                    <>
                      {!openV2 ? (
                        <Tooltip key={item.title} title={item.title} placement="right">
                          <ListItemButton
                            component={NextLink}
                            href={item.path || "#"}
                            sx={{
                              "&:hover": {
                                backgroundColor: "#F7ACBB",
                              },
                              ...(item.path === pathname && {
                                backgroundColor: "#F7ACBB",
                              }),
                              fontSize: "14px",
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: "40px",
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                            <Box
                              component="span"
                              sx={{
                                flexGrow: 1,
                                fontFamily: (theme) => theme.typography.fontFamily,
                                fontSize: 13,
                                fontWeight: 600,
                                lineHeight: "24px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.title}
                            </Box>
                          </ListItemButton>
                        </Tooltip>
                      ) : (
                        <ListItemButton
                          component={NextLink}
                          href={item.path || "#"}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#F7ACBB",
                            },
                            ...(item.path === pathname && {
                              backgroundColor: "#F7ACBB",
                            }),
                            fontSize: "14px",
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: "40px",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <Box
                            component="span"
                            sx={{
                              flexGrow: 1,
                              fontFamily: (theme) => theme.typography.fontFamily,
                              fontSize: 13,
                              fontWeight: 600,
                              lineHeight: "24px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.title}
                          </Box>
                        </ListItemButton>
                      )}
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </Box>
        <Divider sx={{ borderColor: "#F7ACBB" }} />
        <Typography
          component="span"
          sx={{
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 12,
            color: "#6C737F",
            fontWeight: 600,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          {t("MEC_VERSION")}
        </Typography>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={openV2}
        PaperProps={{
          sx: {
            backgroundColor: "neutral.main",
            color: "common.black",
            width: openV2 ? 270 : 54,
            visibility: "visible !important",
            transform: "none !important",
            overflowX: openV2 && "hidden",
          },
        }}
        variant="persistent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.main",
          color: "black",
          width: 270,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

import NextLink from "next/link";
import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, List, ListItem, ListItemText, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const NotifyPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const { t } = useTranslation();

  // Danh sách thông báo giả định
  const [notifications, setNotifications] = useState([
    { id: 1, content: "Nội dung thông báo 1", time: "08:00 AM", status: "unread" },
    { id: 2, content: "Nội dung thông báo 2", time: "10:30 AM", status: "unread" },
    { id: 3, content: "Nội dung thông báo 3", time: "02:15 PM", status: "unread" },
  ]);

  // Hàm để đánh dấu thông báo là đã xem
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === id) {
        return { ...notification, status: "read" };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      slotProps={{
        paper: { sx: { width: 300 } },
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        {t("MEC_NOTIFICATION")}
      </Typography>
      <Divider />
      <List>
        {notifications.map((notification) => (
          <React.Fragment key={notification.id}>
            <ListItem divider onClick={() => markAsRead(notification.id)}>
              <ListItemText
                primary={""}
                secondary={
                  <>
                    <Typography
                      variant="body2"
                      sx={
                        notification.status === "unread" && {
                          fontWeight: "bold",
                        }
                      }
                    >
                      {notification.content}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={
                        notification.status === "unread" && {
                          fontWeight: "bold",
                        }
                      }
                    >
                      {notification.time}
                    </Typography>
                  </>
                }
                sx={{
                  cursor: "pointer",
                }}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Popover>
  );
};

NotifyPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

import { CreditCardIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import {
  AccessibilityNew,
  SettingsApplications,
  Adjust,
  Translate,
  Language,
  Paid,
  MenuBook,
  Class,
  Login,
  Storage,
  NotificationImportant,
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

const settingsConfig = [
  {
    title: "Cấu hình",
    path: "/setting/config-system",
    icon: (
      <SvgIcon fontSize="medium" style={{ color: "#2196f3" }}>
        <SettingsApplications />
      </SvgIcon>
    ),
    group: "Hệ Thống",
  },
  // {
  //   title: "Menu",
  //   path: "/setting/menu",
  //   icon: (
  //     <SvgIcon fontSize="medium" style={{ color: "#4caf50" }}>
  //       <Squares2X2Icon />
  //     </SvgIcon>
  //   ),
  //   group: "Hệ Thống và Cấu Hình",
  // },
  {
    title: "Caching",
    path: "/setting/caching",
    icon: (
      <SvgIcon fontSize="medium" style={{ color: "#4caf50" }}>
        <Storage />
      </SvgIcon>
    ),
    group: "Khác",
  },
  {
    title: "Log",
    // path: "/setting/educationLevel",
    icon: (
      <SvgIcon fontSize="medium" style={{ color: "#3f51b5" }}>
        <Login />
      </SvgIcon>
    ),
    group: "Khác",
  },
  {
    title: "Trạng thái",
    path: "/setting/status",
    icon: (
      <SvgIcon fontSize="medium" style={{ color: "#ff9800" }}>
        <Adjust />
      </SvgIcon>
    ),
    group: "Khác",
  },
  {
    title: "Ngôn ngữ",
    path: "/setting/language",
    icon: (
      <SvgIcon fontSize="medium" style={{ color: "#4caf50" }}>
        <Language />
      </SvgIcon>
    ),
    group: "Khác",
  },
  {
    title: "Thông báo đơn hàng",
    path: "/setting/notification",
    icon: (
      <SvgIcon fontSize="medium" style={{ color: "#4caf50" }}>
        <NotificationImportant />
      </SvgIcon>
    ),
    group: "Khác",
  },
];

export default settingsConfig;

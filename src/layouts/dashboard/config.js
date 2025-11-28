import { ChartBarIcon, CpuChipIcon } from "@heroicons/react/24/solid";
import {
  Add,
  Settings,
  Assessment,
  Category,
  Storefront,
  Article,
  EmojiTransportation,
  FeaturedVideo,
  Campaign,
  CardGiftcard,
  ShoppingCart,
  Sell,
  BarChart,
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { User } from "src/icons/user";

export const ICON_MAP = {
  BarChartIcon: BarChart,
  ShoppingCartIcon: ShoppingCart,
  EmojiTransportationIcon: EmojiTransportation,
  SellIcon: Sell,
  CardGiftcardIcon: CardGiftcard,
  UserIcon: User,
  StorefrontIcon: Storefront,
  CategoryIcon: Category,
  FeaturedVideoIcon: FeaturedVideo,
  CampaignIcon: Campaign,
  AssessmentIcon: Assessment,
  ArticleIcon: Article,
  SettingsIcon: Settings,
  SystemIcon: CpuChipIcon,
};

export const convertMenuFromApi = (menuApi, tr, isChild = false) => {
  return menuApi.map((item) => {
    // Nếu là item trong submenu thì icon = <Add/>
    const IconComponent = isChild ? Add : ICON_MAP[item.icon];

    const menuItem = {
      title: tr(item.title),
      alias: item.alias,
      path: item.link || undefined,
      icon: IconComponent ? (
        <SvgIcon fontSize="small" sx={{ color: "black" }}>
          <IconComponent />
        </SvgIcon>
      ) : null,
    };

    // Nếu có children → đệ quy và đánh dấu children là isChild = true
    if (Array.isArray(item.children) && item.children.length > 0) {
      menuItem.submenu = convertMenuFromApi(item.children, tr, true);
    }

    return menuItem;
  });
};

// export const generateDynamicMenu = (t) => [
//   {
//     title: t("MEC_OVERVIEW"),
//     path: "/",
//     alias: "overview",
//     icon: (
//       <SvgIcon fontSize="small">
//         <ChartBarIcon color="black" />
//       </SvgIcon>
//     ),
//   },
//   {
//     title: t("MEC_ORDER"),
//     path: "/order",
//     alias: "order",
//     icon: (
//       <SvgIcon fontSize="small" sx={{ color: "black" }}>
//         <ShoppingCart />
//       </SvgIcon>
//     ),
//   },
//   {
//     title: t("MEC_VEHICLE"),
//     alias: "vehicle",
//     icon: (
//       <SvgIcon fontSize="small" sx={{ color: "black" }}>
//         <EmojiTransportation />
//       </SvgIcon>
//     ),
//   },
//   {
//     title: t("MEC_PRODUCT"),
//     path: "/product",
//     alias: "product",
//     icon: (
//       <SvgIcon fontSize="small" sx={{ color: "black" }}>
//         <Sell />
//       </SvgIcon>
//     ),
//   },
//   {
//     title: t("MEC_PROMOTION"),
//     path: "/promotion",
//     alias: "promotion",
//     icon: (
//       <SvgIcon fontSize="small" sx={{ color: "black" }}>
//         <CardGiftcard />
//       </SvgIcon>
//     ),
//   },
//   {
//     title: t("MEC_CUSTOMER"),
//     path: "/customer",
//     alias: "customer",
//     icon: (
//       <SvgIcon fontSize="small" sx={{ color: "black" }}>
//         <User />
//       </SvgIcon>
//     ),
//   },
//   {
//     title: t("MEC_SHOP"),
//     path: "/shop",
//     alias: "shop",
//     icon: (
//       <SvgIcon fontSize="small" sx={{ color: "black" }}>
//         <Storefront />
//       </SvgIcon>
//     ),
//   },
//   {
//     title: t("MEC_CATEGORY"),
//     path: "/categories",
//     alias: "categories",
//     icon: (
//       <SvgIcon fontSize="small" sx={{ color: "black" }}>
//         <Category />
//       </SvgIcon>
//     ),
//   },
//   {
//     title: t("MEC_ADVERTISEMENT"),
//     path: "/advertisement",
//     alias: "advertisement",
//     icon: (
//       <SvgIcon fontSize="small" sx={{ color: "black" }}>
//         <FeaturedVideo />
//       </SvgIcon>
//     ),
//   },
//   {
//     title: t("MEC_MARKETING"),
//     alias: "marketing",
//     icon: (
//       <SvgIcon fontSize="small" sx={{ color: "black" }}>
//         <Campaign />
//       </SvgIcon>
//     ),
//   },
//   {
//     title: t("MEC_STATISTICS"),
//     alias: "statistics",
//     icon: (
//       <SvgIcon fontSize="small" sx={{ color: "black" }}>
//         <Assessment />
//       </SvgIcon>
//     ),
//   },
//   {
//     title: t("MEC_NEWS"),
//     alias: "news",
//     icon: (
//       <SvgIcon fontSize="small" sx={{ color: "black" }}>
//         <Article />
//       </SvgIcon>
//     ),
//     submenu: [
//       {
//         title: t("MEC_NEWS"),
//         path: "/my-news",
//         alias: "my-news",
//         icon: (
//           <SvgIcon fontSize="small" sx={{ color: "black" }}>
//             <Add />
//           </SvgIcon>
//         ),
//       },
//       {
//         title: t("MEC_NEWS_CATEGORY"),
//         path: "/news-category",
//         alias: "news-category",
//         icon: (
//           <SvgIcon fontSize="small" sx={{ color: "black" }}>
//             <Add />
//           </SvgIcon>
//         ),
//       },
//     ],
//   },
//   {
//     title: t("MEC_CONFIGURATION"),
//     alias: "configuration",
//     icon: (
//       <SvgIcon fontSize="small" sx={{ color: "black" }}>
//         <Settings />
//       </SvgIcon>
//     ),
//     submenu: [
//       {
//         title: t("MEC_GENERAL_CONFIGURATION"),
//         path: "/setting",
//         alias: "setting",
//         icon: (
//           <SvgIcon fontSize="small" sx={{ color: "black" }}>
//             <Add />
//           </SvgIcon>
//         ),
//       },
//     ],
//   },
//   {
//     title: t("MEC_SYSTEM"),
//     path: "/system",
//     alias: "system",
//     icon: (
//       <SvgIcon fontSize="small" sx={{ color: "black" }}>
//         <CpuChipIcon />
//       </SvgIcon>
//     ),
//     submenu: [
//       {
//         title: t("MEC_ACCOUNT"),
//         path: "/system/account",
//         alias: "account",
//         icon: (
//           <SvgIcon fontSize="small" sx={{ color: "black" }}>
//             <Add />
//           </SvgIcon>
//         ),
//       },
//       {
//         title: t("MEC_SYSTEM_PERMISSIONS"),
//         path: "/system/permissions",
//         alias: "permissions",
//         icon: (
//           <SvgIcon fontSize="small" sx={{ color: "black" }}>
//             <Add />
//           </SvgIcon>
//         ),
//       },
//       {
//         title: t("MEC_SYSTEM_MODULE"),
//         path: "/system/alias",
//         alias: "alias",
//         icon: (
//           <SvgIcon fontSize="small" sx={{ color: "black" }}>
//             <Add />
//           </SvgIcon>
//         ),
//       },
//       {
//         title: t("MEC_SYSTEM_FEATURE"),
//         path: "/system/feature",
//         alias: "feature",
//         icon: (
//           <SvgIcon fontSize="small" sx={{ color: "black" }}>
//             <Add />
//           </SvgIcon>
//         ),
//       },
//       {
//         title: t("Lịch sử truy cập"),
//         path: "/system/access-history",
//         icon: (
//           <SvgIcon fontSize="small" sx={{ color: "black" }}>
//             {/* <DesktopAccessDisabled /> */}
//             <Add />
//           </SvgIcon>
//         ),
//       },
//     ],
//   },
// ];

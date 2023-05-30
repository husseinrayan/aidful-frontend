import AccountRoundedIcon from "@mui/icons-material/AccountCircle";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
export const mainNavbarItems = [
  {
    id: 0,
    icon: <LeaderboardRoundedIcon />,
    label: "Dashboard",
    route: "dashboard",
  },
  {
    id: 1,
    icon: <AccountRoundedIcon />,
    label: "Admins",
    route: "dashboard-admins",
  },
  {
    id: 2,
    icon: <LocalShippingRoundedIcon />,
    label: "Orders",
    route: "dashboard-orders",
  },
  {
    id: 3,
    icon: <LocalMallRoundedIcon />,
    label: "Products",
    route: "dashboard-products",
  },
  {
    id: 4,
    icon: <FitnessCenterRoundedIcon />,
    label: "Trainings",
    route: "dashboard-trainings",
  },
  {
    id: 5,
    icon: <CategoryRoundedIcon />,
    label: "Categories",
    route: "dashboard-categories",
  },
];

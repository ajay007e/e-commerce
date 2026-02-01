import type {
  NavLink,
  NavbarIconConfig,
  UserMenuItem,
} from "./config.types.ts";

import {
  HiOutlineShoppingCart,
  HiOutlineHeart,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

export const NAV_LINKS: NavLink[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Shop",
    children: [
      {
        label: "Men",
        path: "/s/men",
      },
      {
        label: "Women",
        path: "/s/women",
      },
      {
        label: "Kids",
        path: "/s/kids",
      },
      {
        label: "Accessories",
        path: "/s/accessories",
      },
    ],
  },
  {
    label: "About Us",
    path: "/about",
  },
  {
    label: "Contact Us",
    path: "/contact",
  },
];

export const NAVBAR_ICONS: NavbarIconConfig[] = [
  {
    key: "wishlist",
    label: "Wishlist",
    Icon: HiOutlineHeart,
    enabled: false,
  },
  {
    key: "search",
    label: "Search",
    Icon: HiOutlineMagnifyingGlass,
    enabled: true,
  },
  {
    key: "cart",
    label: "Cart",
    path: "/cart",
    Icon: HiOutlineShoppingCart,
    enabled: true,
  },
];

export const USER_MENU_ITEMS: UserMenuItem[] = [
  {
    label: "Account",
    path: "/app/account",
  },
  {
    label: "Settings",
    path: "/app/settings",
  },
  {
    label: "Logout",
    action: "logout",
  },
];

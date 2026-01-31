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
        path: "/shop/men",
      },
      {
        label: "Women",
        path: "/shop/women",
      },
      {
        label: "Kids",
        path: "/shop/kids",
      },
      {
        label: "Accessories",
        path: "/shop/accessories",
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

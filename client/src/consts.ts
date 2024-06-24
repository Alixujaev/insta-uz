import icons from "./components/icon/icons";

export const BASE_URL = `http://localhost:5000`;

export enum USER_ACTIONS {
  SET_USER = 'SET_USER',
}

export type RegisterBody = {
  email: string,
  password: string,
  username: string
  full_name: string
}

export type VerifyCodeBody = {
  code: string,
  email: string
}

export type LoginBody = {
  username: string,
  password: string
}

export type ForgotPasswordBody = {
  email: string
}



export const sidebarLinks: { icon: keyof typeof icons; label: string; href: string }[] = [
  {
    icon: "home",
    label: "Главная",
    href: "/",
  },
  {
    icon: "search",
    label: "Поисковый запрос",
    href: "/search",
  },
  {
    icon: "explore",
    label: "Интересное",
    href: "/explore",
  },
  {
    icon: "reels",
    label: "Reels",
    href: "/reels",
  },
  {
    icon: "messages",
    label: "Сообщения",
    href: "/messages",
  },
  {
    icon: "notifications",
    label: "Уведомления",
    href: "notifications"
  },  
  {
    icon: "add",
    label: "Создать",
    href: "add"
  },
  {
    icon: "profile",
    label: "Профиль",
    href: "/profile",
  }
]
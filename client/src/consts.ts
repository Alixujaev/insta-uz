import icons from "./components/icon/icons";

export const BASE_URL = `https://insta-uz.onrender.com`;



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

export type CreatePostBody = {
  description: string,
  image: string
}

export type UserType = {
  id: string,
  email: string,
  username: string,
  full_name: string,
  password: string,
  followers: string[],
  following: string[],
  posts: string[],
  stories: string[],
  profile_img: string,
  about: string,
  saved: string[],
  _id: string
}

export type PostType = {
  _id: string,
  author: UserType,
  author_id: string,
  comments: any[],
  createdAt: string,
  description: string,
  image: string,
  likes: string[],
  title: string,
  updatedAt: string,
}

export type StoryType = {
  _id: string,
  author: UserType,
  author_id: string,
  views: string[],
  createdAt: string,
  description: string,
  image: string,
  likes: string[],
  title: string,
  updatedAt: string,
}

export type CommentBodyType = {
  postId: string,
  comment: string
}


export type CommentType = {
  author: {
    id: string,
    username: string,
    profile_img: string
  },
  comment: string,
  post_id: string,
  createdAt: string
}

export type NotificationType = {
  id: string,
  sender: UserType & {_id: string},
  receiver: string,
  type: string,
  post: PostType,
  comment: string,
  updatedAt: string
}


export type MessageType = {
  conversationId: string,
  createdAt: string,
  message: string,
  sender: UserType & {_id: string},
  updatedAt: string,
  _id: string
}

export type MessageBody = {
  sender: string,
  conversationId: string,
  message: string
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
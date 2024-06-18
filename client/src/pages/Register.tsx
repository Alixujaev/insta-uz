import React, { useState } from "react";
import LoginPhone from "@/assets/images/photo_2024-06-17_22-52-44.jpg";
import GooglePLay from "@/assets/images/google_play.png";
import Microsoft from "@/assets/images/microsoft.png";
import logo from "@/assets/icons/instagram-text-logo.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Links from "@/components/Links";

const Register = () => {
  const [isPassword, setIsPassword] = useState<boolean>(true);
  return (
    <div className="bg-white">
      <div className="flex gap-8 w-[935px] mx-auto mt-10 justify-center mb-16">
        <div>
          <div className="border mb-2">
            <img src={logo} alt="logo" className="w-[175px] mt-6 mx-[88px]" />

            <form action="" className="mx-10 text-center max-w-[268px]">
              <p className="mb-4 text-[#808080] font-semibold">
                Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.
              </p>

              <div className="pb-7 border-b mb-8 relative">
                <Button className="w-full rounded-[8px] py-[7px] bg-[#0095f6] hover:bg-[#1877f2] leading-none h-8">
                  Войти через Facebook
                </Button>

                <p className="absolute uppercase text-xs -bottom-2.5 left-1/2 -translate-x-1/2 px-4 bg-white text-[#73737c]">
                  Или
                </p>
              </div>
              <input
                type="email"
                className="w-full bg-[#fafafa] border border-[#dbdbdb] outline-none text-xs py-[9px] pl-2 pb-[7px] mb-1.5"
                placeholder="Эл. адрес"
              />
              <input
                type="text"
                className="w-full bg-[#fafafa] border border-[#dbdbdb] outline-none text-xs py-[9px] pl-2 pb-[7px] mb-1.5"
                placeholder="Имя и фамилия"
              />

              <input
                type="text"
                className="w-full bg-[#fafafa] border border-[#dbdbdb] outline-none text-xs py-[9px] pl-2 pb-[7px] mb-1.5"
                placeholder="Имя пользователя"
              />

              <div className="relative">
                <input
                  type={isPassword ? "password" : "text"}
                  className="w-full bg-[#fafafa] border border-[#dbdbdb] outline-none text-xs py-[9px] pl-2 pb-[7px] mb-4"
                  placeholder="Пароль"
                />

                <span
                  className="absolute right-2 top-1.5 text-sm font-semibold cursor-pointer hover:opacity-[0.5]"
                  onClick={() => setIsPassword(!isPassword)}
                >
                  {isPassword ? "Показать" : "Скрыть"}
                </span>
              </div>

              <p className="text-xs mb-4 text-[#8e8e8e]">
                Люди, которые пользуются нашим сервисом, могли загрузить вашу
                контактную информацию в Instagram.
              </p>

              <Button className="w-full rounded-[8px] py-[7px] bg-[#0095f6] hover:bg-[#1877f2] leading-none h-8 mb-8">
                Регистрация
              </Button>
            </form>
          </div>

          <div className="border mb-4 flex gap-1 py-5 justify-center">
            <p className="text-sm">Есть аккаунт? </p>
            <Link to="/" className="text-sm text-blue-500 font-semibold">
              Вход
            </Link>
          </div>

          <p className="text-center text-sm mb-4">Установите приложение.</p>

          <div className="flex justify-center gap-2">
            <img
              src={GooglePLay}
              alt="google play"
              className="w-28 object-contain"
            />
            <img
              src={Microsoft}
              alt="microsoft"
              className="w-28 object-contain"
            />
          </div>
        </div>
      </div>
      <Links />
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import Lock from "@/assets/images/lock.jpg";
import GooglePLay from "@/assets/images/google_play.png";
import Microsoft from "@/assets/images/microsoft.png";
import logo from "@/assets/icons/instagram-text-logo.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Links from "@/components/Links";

const Reset = () => {
  const [isPassword, setIsPassword] = useState<boolean>(true);
  return (
    <div className="bg-white">
      <div className="flex gap-8 w-[935px] mx-auto mt-10 justify-center mb-16">
        <div>
          <div className="border">
            <img
              src={Lock}
              alt="logo"
              className="w-24 h-[92px] mt-6 mx-auto mb-3"
            />

            <form action="" className="mx-10 text-center max-w-[300px] pb-14">
              <h4 className="mb-4 font-semibold">Не удается войти?</h4>
              <p className="mb-4 text-[#808080] text-sm">
                Введите свой электронный адрес, имя пользователя или номер
                телефона, и мы отправим вам ссылку для восстановления доступа к
                аккаунту.
              </p>

              <input
                type="email"
                className="w-full bg-[#fafafa] rounded-md border border-[#dbdbdb] outline-none  py-2 pl-2 mb-4"
                placeholder="Эл. адрес"
              />

              <div className="pb-7 border-b mb-5 relative">
                <Button className="w-full rounded-[8px] py-[7px] bg-[#0095f6] hover:bg-[#1877f2] leading-none h-8">
                  Получить код
                </Button>

                <p className="absolute uppercase text-xs -bottom-2.5 left-1/2 -translate-x-1/2 px-4 bg-white text-[#73737c]">
                  Или
                </p>
              </div>

              <Link to="/accounts/signup" className="text-sm font-semibold">
                Создать новый аккаунт
              </Link>
            </form>
          </div>
          <Link
            to="/"
            className="py-3 flex justify-center bg-[#fafafa] border -mt-1 cursor-pointer"
          >
            <p className="text-sm font-semibold">Вернуться к входу</p>
          </Link>
        </div>
      </div>
      <Links />
    </div>
  );
};

export default Reset;

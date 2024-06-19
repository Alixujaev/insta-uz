import { useState } from "react";
import GooglePLay from "@/assets/images/google_play.png";
import Microsoft from "@/assets/images/microsoft.png";
import logo from "@/assets/icons/instagram-text-logo.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Links from "@/components/Links";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

const AuthSchema = z.object({
  email: z
    .string({
      required_error: "Это поле обязательно к заполнению",
    })
    .email("Неверный адрес электронной почты"),
  password: z
    .string({
      required_error: "Это поле обязательно к заполнению",
    })
    .min(8, { message: "Пароль должен быть длиной не менее 8 символов" }),
  full_name: z
    .string({
      required_error: "Это поле обязательно к заполнению",
    })
    .min(6, { message: "Имя должно содержать не менее 6 букв." }),
  username: z
    .string({
      required_error: "Это поле обязательно к заполнению",
    })
    .min(6, { message: "Имя пользователя должно содержать не менее 6 букв." }),
});

type FormData = z.infer<typeof AuthSchema>;

const Register = () => {
  const [isPassword, setIsPassword] = useState<boolean>(true);

  const form = useForm<FormData>({
    resolver: zodResolver(AuthSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  };

  return (
    <div className="bg-white">
      <div className="flex gap-8 w-[935px] mx-auto mt-10 justify-center mb-16">
        <div>
          <div className="border mb-2">
            <img src={logo} alt="logo" className="w-[175px] mt-6 mx-[88px]" />

            <form
              action=""
              className="mx-10 text-center max-w-[268px]"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Form {...form}>
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
                  className="w-full bg-[#fafafa] border border-[#dbdbdb] outline-none text-xs py-[9px] pl-2 pb-[7px] mt-1.5"
                  placeholder="Эл. адрес"
                  {...form.register("email")}
                />
                <p className="text-red-400 text-xs text-left">
                  {form.formState.errors.email?.message}
                </p>
                <input
                  type="text"
                  className="w-full bg-[#fafafa] border border-[#dbdbdb] outline-none text-xs py-[9px] pl-2 pb-[7px] mt-1.5"
                  placeholder="Имя и фамилия"
                  {...form.register("full_name")}
                />
                <p className="text-red-400 text-xs text-left">
                  {form.formState.errors.full_name?.message}
                </p>
                <input
                  type="text"
                  className="w-full bg-[#fafafa] border border-[#dbdbdb] outline-none text-xs py-[9px] pl-2 pb-[7px] mt-1.5"
                  placeholder="Имя пользователя"
                  {...form.register("username")}
                />
                <p className="text-red-400 text-xs text-left">
                  {form.formState.errors.username?.message}
                </p>
                <div className="relative mt-1.5">
                  <input
                    type={isPassword ? "password" : "text"}
                    className="w-full bg-[#fafafa] border border-[#dbdbdb] outline-none text-xs py-[9px] pl-2 pb-[7px] mb-4"
                    placeholder="Пароль"
                    {...form.register("password")}
                  />

                  <span
                    className="absolute right-2 top-1.5 text-sm font-semibold cursor-pointer hover:opacity-[0.5]"
                    onClick={() => setIsPassword(!isPassword)}
                  >
                    {isPassword ? "Показать" : "Скрыть"}
                  </span>
                </div>
                <p className="text-red-400 text-xs -mt-4 text-left mb-4">
                  {form.formState.errors.password?.message}
                </p>

                <p className="text-xs mb-4 text-[#8e8e8e]">
                  Люди, которые пользуются нашим сервисом, могли загрузить вашу
                  контактную информацию в Instagram.
                </p>

                <Button className="w-full rounded-[8px] py-[7px] bg-[#0095f6] hover:bg-[#1877f2] leading-none h-8 mb-8">
                  Регистрация
                </Button>
              </Form>
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

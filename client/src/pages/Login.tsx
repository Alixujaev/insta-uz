import Links from "../components/Links";
import LoginPhone from "@/assets/images/photo_2024-06-17_22-52-44.jpg";
import GooglePLay from "@/assets/images/google_play.png";
import Microsoft from "@/assets/images/microsoft.png";
import logo from "@/assets/icons/instagram-text-logo.png";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { handleLogin } from "@/store/auth.store";
import { useDispatch } from "react-redux";
import { createUser } from "@/actions/userActions";

const LoginSchema = z.object({
  username: z
    .string({
      required_error: "Это поле обязательно к заполнению",
    })
    .min(6, { message: "Имя пользователя должно содержать не менее 6 букв." }),
  password: z
    .string({
      required_error: "Это поле обязательно к заполнению",
    })
    .min(8, { message: "Пароль должен быть длиной не менее 8 символов" }),
});

type FormData = z.infer<typeof LoginSchema>;

const Login = () => {
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();

  const form = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const res = await handleLogin(data);

      setErrorMessage("");
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      dispatch(createUser(res.data.data.user));
      window.location.reload();

      setIsLoading(false);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex gap-8 w-[935px] mx-auto mt-10 justify-center mb-16">
        <img
          src={LoginPhone}
          alt="phone"
          className="w-[380px] h-[582px] object-cover"
        />

        <div>
          <div className="border mb-2">
            <img
              src={logo}
              alt="logo"
              className="w-[175px] mt-6 mb-5 mx-[88px]"
            />

            <form
              action=""
              className="mx-10 text-center"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Form {...form}>
                <input
                  type="text"
                  className="w-full bg-[#fafafa] border border-[#dbdbdb] outline-none text-xs py-[9px] pl-2 pb-[7px]"
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
                  <p className="text-red-400 text-xs -mt-4 text-left mb-4">
                    {form.formState.errors.password?.message}
                  </p>

                  <span
                    className="absolute right-2 top-1.5 text-sm font-semibold cursor-pointer hover:opacity-[0.5]"
                    onClick={() => setIsPassword(!isPassword)}
                  >
                    {isPassword ? "Показать" : "Скрыть"}
                  </span>
                </div>

                <div className="pb-7 border-b mb-10 relative">
                  {isLoading ? (
                    <Button
                      type="button"
                      className="w-full rounded-[8px] py-[7px] bg-[#0094f681] hover:bg-[#0094f681] cursor-default leading-none h-8"
                    >
                      Войти
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full rounded-[8px] py-[7px] bg-[#0095f6] hover:bg-[#1877f2] leading-none h-8"
                    >
                      Войти
                    </Button>
                  )}

                  <p className="absolute uppercase text-xs -bottom-2.5 left-1/2 -translate-x-1/2 px-4 bg-white text-[#73737c]">
                    Или
                  </p>
                </div>
                <div className="mb-5">
                  <Link to="/" className="text-sm text-blue-900 font-semibold ">
                    Войти через Facebook
                  </Link>
                </div>

                {errorMessage ? (
                  <p className="text-red-400 text-xs -mt-4 text-center mb-4">
                    {errorMessage}
                  </p>
                ) : null}

                <Link
                  to="/accounts/password/reset"
                  className="text-xs text-blue-900 mb-6 block"
                >
                  Забыли пароль?
                </Link>
              </Form>
            </form>
          </div>

          <div className="border mb-4 flex gap-1 py-5 justify-center">
            <p className="text-sm">У вас ещё нет аккаунта? </p>
            <Link
              to="/accounts/signup"
              className="text-sm text-blue-500 font-semibold"
            >
              Зарегистрироваться
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

export default Login;

import { useEffect, useState } from "react";
import Lock from "@/assets/images/lock.jpg";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Links from "@/components/Links";
import { handleReset } from "@/store/auth.store";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    }
  }, []);

  async function onSubmit(e: any, email: string) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await handleReset({ email });
      if (res.status === 200) {
        navigate("/accounts/verify");
        sessionStorage.setItem("acceptVerify", "true");
        sessionStorage.setItem("email", email);
      }
      setIsLoading(false);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    }
  }
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorMessage ? (
                <p className="text-red-400 text-xs -mt-4 text-left mb-4">
                  {errorMessage}
                </p>
              ) : null}
              <div className="pb-7 border-b mb-5 relative">
                {isLoading ? (
                  <Button className="w-full rounded-[8px] py-[7px] bg-[#0094f681] hover:bg-[#0094f681] cursor-default leading-none h-8">
                    Подтверждение
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => onSubmit(e, email)}
                    className="w-full rounded-[8px] py-[7px] bg-[#0095f6] hover:bg-[#1877f2] leading-none h-8"
                  >
                    Подтверждение
                  </Button>
                )}

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

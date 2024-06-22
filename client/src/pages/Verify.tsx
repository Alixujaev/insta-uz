import { useEffect, useState } from "react";
import Lock from "@/assets/images/lock.jpg";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Links from "@/components/Links";
import { handleVerify } from "@/store/auth.store";

const Verify = () => {
  const [code, setCode] = useState<string>("");
  const [email, setEmail] = useState<string>(() => {
    return sessionStorage.getItem("email") || "";
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = JSON.parse(
      sessionStorage.getItem("acceptVerify") || "false"
    );

    setEmail(sessionStorage.getItem("email") || "");

    if (!verify) {
      navigate("/");
    }
  }, []);

  async function onSubmit(e: any, code: string, email: string) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await handleVerify({ code, email });

      console.log(res);
      setIsLoading(false);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white ">
      <div className="flex gap-8 max-w-[935px] h-[80vh] mx-auto mt-10 justify-center mb-16 items-center">
        <div>
          <div className="border">
            <img
              src={Lock}
              alt="logo"
              className="w-24 h-[92px] mt-6 mx-auto mb-3"
            />

            <form action="" className="mx-10 text-center max-w-[300px] pb-14">
              <h4 className="mb-4 font-semibold">Введите код подтверждения</h4>
              <p className="mb-4 text-[#808080] text-sm">
                Мы отправили код подтверждения на этот адрес электронной почты:{" "}
                <span className="text-[#0095f6]">{email}</span>
              </p>

              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="text"
                className="w-full bg-[#fafafa] rounded-md border border-[#dbdbdb] outline-none  py-2 pl-2 mb-4"
                placeholder="Код подтверждения"
              />

              {errorMessage ? (
                <p className="text-red-400 text-xs -mt-4 text-left mb-4">
                  {errorMessage}
                </p>
              ) : null}

              {code.length < 6 || isLoading ? (
                <Button className="w-full rounded-[8px] py-[7px] bg-[#0094f681] hover:bg-[#0094f681] cursor-default leading-none h-8">
                  Подтверждение
                </Button>
              ) : (
                <Button
                  onClick={(e) => onSubmit(e, code, email)}
                  className="w-full rounded-[8px] py-[7px] bg-[#0095f6] hover:bg-[#1877f2] leading-none h-8"
                >
                  Подтверждение
                </Button>
              )}

              <p className="text-[#0095f6] mt-4 text-sm cursor-pointer">
                Отправить код ещё раз
              </p>
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

export default Verify;

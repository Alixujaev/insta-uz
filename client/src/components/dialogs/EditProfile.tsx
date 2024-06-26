import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import userImage from "@/assets/images/user.jpg";
import upload from "@/assets/images/upload.png";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { UserType } from "@/consts";
import { handleImageUpload } from "@/store/post.store";
import { handleCheckUsername, handleUpdate } from "@/store/user.store";

const EditProfile = ({ user }: { user: UserType }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [username, setUsername] = useState<string>(user.username);
  const [email, setEmail] = useState<string>(user.email);
  const [fullName, setFullName] = useState<string>(user.full_name);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [about, setAbout] = useState<string>(user.about);
  const [isDeletePhoto, setIsDeletePhoto] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    loading: boolean;
    status: number;
    message: string;
  }>({
    loading: false,
    status: 200,
    message: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    let timerId: string | number | NodeJS.Timeout | undefined;

    if (username == user.username) return;

    if (username.length > 30) {
      setMessage({
        loading: false,
        status: 500,
        message: "Слишком длинное имя",
      });
    } else {
      if (username.length > 6) {
        setMessage({ loading: true, status: 300, message: "" });
        setIsLoading(true);
        timerId = setTimeout(() => {
          handleCheckUsername(username)
            .then((res) => {
              setMessage({
                loading: false,
                status: res.status,
                message: res.data.message,
              });
              setIsLoading(false);
            })
            .catch((err) => {
              setMessage({
                loading: false,
                status: 500,
                message: err.response.data.message,
              });
              setIsLoading(false);
            });
        }, 2000);
      } else {
        setMessage({
          loading: false,
          status: 500,
          message: "Недостаточно символов",
        });
      }
    }

    return () => clearTimeout(timerId);
  }, [username]);

  async function handleSetFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setIsDeletePhoto(false);
    }
  }

  async function onSubmit(
    file: File,
    username: string,
    email: string,
    fullName: string,
    about: string,
    token: string | null
  ) {
    if (!token) return;

    setIsLoading(true);

    try {
      let profile_img;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const result = await handleImageUpload(formData, token);

        if (result.status !== 200) {
          throw new Error("Image upload failed");
        }

        profile_img = result.data.data.url;
      }

      if (isDeletePhoto) {
        profile_img = " ";
      }

      const updateData = {
        username,
        email,
        fullName,
        about,
        ...(profile_img && { profile_img }),
      };

      await handleUpdate(updateData, token);

      setFile(null);
      setUsername(username);
      setEmail(email);
      setFullName(fullName);
      setAbout(about);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="bg-[#EFEFEF] hover:bg-[#dbdbdb] text-black px-4 !py-1 !rounded-lg h-8">
          Редактировать профиль
        </Button>
      </DialogTrigger>
      <DialogContent className=" w-full !pt-2 !pb-0 !rounded-2xl !px-0 !gap-0">
        <h4 className="text-center font-medium pb-2 border-b-2 h-fit w-full">
          Редактировать профиль
        </h4>

        <div className="m-3">
          <div className=" mb-3">
            <div className="w-32 h-32 rounded-full overflow-hidden relative group">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : user.profile_img.trim() && !isDeletePhoto
                    ? user.profile_img
                    : userImage
                }
                alt="default user"
                className="w-full h-full absolute object-cover "
              />

              <label htmlFor="upload">
                <div className="w-full h-full absolute bg-[#000000a5] hidden group-hover:flex justify-center items-center cursor-pointer">
                  <img src={upload} alt="upload image" className="w-20" />
                </div>
              </label>

              <input
                type="file"
                id="upload"
                className="hidden"
                onChange={handleSetFile}
              />
            </div>
            {(!isDeletePhoto && user.profile_img.trim()) || file ? (
              <button
                onClick={() => {
                  setIsDeletePhoto(!isDeletePhoto);
                  setFile(null);
                }}
                className="text-red-500 text-sm text-center w-32 "
              >
                Удалить фото
              </button>
            ) : null}
          </div>
          <div className="flex flex-col mb-3">
            <Label htmlFor="username" className="mb-1">
              Имя пользователя
            </Label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              type="text"
              placeholder="Введите имя пользователя"
              className="py-2 px-3 border rounded-md border-[#8e8e8e68] outline-none"
            />
            {username !== user.username ? (
              <span
                className={`text-xs ${
                  isLoading
                    ? "text-yellow-500"
                    : message.status === 200
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message.loading ? "Загрузка..." : message.message}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col mb-3">
            <Label htmlFor="full_name" className="mb-1">
              Полное имя
            </Label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              id="full_name"
              type="text"
              placeholder="Введите полное имя"
              className="py-2 px-3 border rounded-md border-[#8e8e8e68] outline-none"
            />
          </div>
          <div className="flex flex-col mb-3">
            <Label htmlFor="email" className="mb-1">
              Электронная почта
            </Label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="Введите электронная почта"
              disabled
              className="py-2 px-3 border rounded-md border-[#8e8e8e68] outline-none disabled:text-[#8e8e8e68]"
            />
          </div>
          <div className="flex flex-col mb-3">
            <Label htmlFor="about" className="mb-1">
              О себе
            </Label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              id="about"
              placeholder="Введите о себе"
              className="py-2 px-3 border rounded-md border-[#8e8e8e68] outline-none h-20"
            />
          </div>

          {!isLoading &&
          username &&
          email &&
          fullName &&
          message.status === 200 ? (
            <button
              onClick={() =>
                onSubmit(file, username, email, fullName, about, token)
              }
              className="bg-blue-500 w-full text-white py-2 px-2.5 rounded-lg text-sm font-medium"
            >
              Подвердить
            </button>
          ) : (
            <button className="bg-[#0094f681] w-full text-white py-2 px-2.5 rounded-lg text-sm font-medium cursor-auto">
              Подвердить
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;

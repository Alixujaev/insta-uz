import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BaseIcon from "@/components/icon/BaseIcon";
import post from "@/assets/images/post-create.jpg";
import { Label } from "../ui/label";
import { useState } from "react";
import { handleImageUpload } from "@/store/post.store";

const CreatePost = () => {
  const [file, setFile] = useState<any>(null);
  const [title, setTiele] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const token = localStorage.getItem("token");

  async function handleSetFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      console.log(token);

      if (token) {
        const formData = new FormData();
        formData.append("file", event.target.files[0]);

        const result = await handleImageUpload(formData, token);

        console.log(result);
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-3.5 py-2.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md cursor-pointer">
          <BaseIcon name="add" />
          <span className="">Создать</span>
        </div>
      </DialogTrigger>
      <DialogContent className="!rounded-2xl !py-2 !px-0 !gap-0 !w-[482px]">
        <h4 className="text-center font-medium pb-2 border-b-2">
          Создание публикации
        </h4>

        {!file ? (
          <div className="flex flex-col items-center my-40">
            <img src={post} alt="create post" className="w-24" />
            <h3 className="mb-3 text-xl">Перетащите сюда фото и видео</h3>
            <input
              type="file"
              className="hidden"
              accept="image/png, image/gif, image/jpeg, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              id="postFile"
              onChange={handleSetFile}
            />

            <label htmlFor="postFile">
              <div className="bg-blue-500 cursor-pointer text-white py-1 px-2.5 rounded-lg text-sm font-medium">
                Выбрать на компьютере
              </div>
            </label>
          </div>
        ) : (
          <div className="px-3 mt-3">
            <div className="h-60 relative rounded-md mb-3">
              <div className="absolute w-full h-full z-20 bg-[#000000a5]  rounded-md">
                <button
                  className="absolute top-4 right-2 z-30"
                  onClick={() => setFile(null)}
                >
                  <BaseIcon name="close" />
                </button>
              </div>
              <img
                src={URL.createObjectURL(file)}
                alt="post image"
                className="absolute h-full w-full object-cover object-center rounded-md"
              />
            </div>

            <div className="flex flex-col mb-3">
              <Label htmlFor="caption" className="mb-1">
                Заголовок
              </Label>
              <input
                type="text"
                placeholder="Заголовок"
                className="py-2 px-3 border rounded-md border-[#8e8e8e68] outline-none"
                onChange={(e) => setTiele(e.target.value)}
                value={title}
              />
            </div>

            <div className="flex flex-col mb-3">
              <Label htmlFor="caption" className="mb-1">
                Описание
              </Label>
              <textarea
                placeholder="Напишите о чем вы думаете"
                className="py-2 px-3 border rounded-md border-[#8e8e8e68] outline-none max-h-20"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            <button className="bg-blue-500 w-full text-white py-2 px-2.5 rounded-lg text-sm font-medium mb-3">
              Создать
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;

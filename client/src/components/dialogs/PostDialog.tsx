import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BaseIcon from "@/components/icon/BaseIcon";
import { useState } from "react";

const PostDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <BaseIcon name="dots" />
      </DialogTrigger>
      <DialogContent className="!rounded-2xl !py-3 !px-0 !gap-0 !w-[400px]">
        <p className="text-center text-sm cursor-pointer font-bold text-red-500 pb-3 mb-3 border-b">
          Удалить публикацию
        </p>

        <p className="text-center text-sm cursor-pointer pb-3 mb-3 border-b">
          Добавить в избранное
        </p>

        <p className="text-center text-sm cursor-pointer pb-3 mb-3 border-b">
          Поделиться...
        </p>
        <p className="text-center text-sm cursor-pointer pb-3 mb-3 border-b">
          Копировать ссылку
        </p>

        <p className="text-center text-sm cursor-pointer pb-3 mb-3 border-b">
          Об аккаунте
        </p>
        <p
          className="text-center text-sm cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          Отмена
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;

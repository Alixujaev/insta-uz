import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BaseIcon from "@/components/icon/BaseIcon";

const PostDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <BaseIcon name="dots" />
      </DialogTrigger>
      <DialogContent className="!rounded-2xl !py-3 !px-0 !gap-0 !w-[400px]">
        <p className="text-center text-sm cursor-pointer font-bold text-red-500 pb-3 mb-3 border-b">
          Пожаловаться
        </p>
        <p className="text-center text-sm cursor-pointer font-bold text-red-500 pb-3 mb-3 border-b">
          Отменить подписку
        </p>
        <p className="text-center text-sm cursor-pointer pb-3 mb-3 border-b">
          Добавить в избранное
        </p>
        <p className="text-center text-sm cursor-pointer pb-3 mb-3 border-b">
          Перейти к публикации
        </p>
        <p className="text-center text-sm cursor-pointer pb-3 mb-3 border-b">
          Поделиться...
        </p>
        <p className="text-center text-sm cursor-pointer pb-3 mb-3 border-b">
          Копировать ссылку
        </p>
        <p className="text-center text-sm cursor-pointer pb-3 mb-3 border-b">
          Вставить на сайт
        </p>
        <p className="text-center text-sm cursor-pointer pb-3 mb-3 border-b">
          Об аккаунте
        </p>
        <p className="text-center text-sm cursor-pointer">Отмена</p>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;

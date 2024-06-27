import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BaseIcon from "@/components/icon/BaseIcon";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  areYouSureOpenAction,
  editModalOpenAction,
  editPostIdAction,
} from "@/actions/settingsActions";

const PostDialog = ({ id, setPostOpen }: { id: string; setPostOpen: any }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <BaseIcon name="dots" />
      </DialogTrigger>
      <DialogContent className="!rounded-2xl !py-3 !px-0 !gap-0 !w-[400px]">
        <button
          onClick={() => {
            dispatch(areYouSureOpenAction());
            setOpen(!open);
          }}
          className="text-center text-sm cursor-pointer font-bold text-red-500 pb-3 mb-3 border-b"
        >
          Удалить публикацию
        </button>

        <button
          onClick={() => {
            dispatch(editModalOpenAction());
            setOpen(!open);
            setPostOpen(false);
            dispatch(editPostIdAction(id));
          }}
          className="text-center text-sm cursor-pointer pb-3 mb-3 border-b"
        >
          Редактировать
        </button>

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

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BaseIcon from "@/components/icon/BaseIcon";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  aboutModalOpenAction,
  areYouSureOpenAction,
  authorNameAction,
  editModalOpenAction,
  editPostIdAction,
} from "@/actions/settingsActions";
import { handleSavePost } from "@/store/post.store";
import { checkPostAuthor } from "@/lib/utils";
import { UserType } from "@/consts";
import { useLocalStorage } from "usehooks-ts";

const PostDialog = ({
  author,
  id,
  setPostOpen,
  saveds,
  setSaveds,
}: {
  author: UserType;
  id: string;
  setPostOpen?: any;
  saveds?: string[];
  setSaveds?: any;
}) => {
  const [user] = useLocalStorage("user", {} as UserType);
  const [open, setOpen] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  function handleSave(id: string, token: string | null) {
    if (!token || !saveds) return;

    if (saveds.includes(id)) {
      setSaveds(saveds.filter((saved) => saved !== id));
    } else {
      setSaveds([...saveds, id]);
    }

    handleSavePost(id, token)
      .then((res) => {
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        if (saveds.includes(id)) {
          setSaveds([...saveds, id]);
        } else {
          setSaveds(saveds.filter((saved) => saved !== id));
        }
      });
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(`${window.location.origin}/p/${id}`);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <BaseIcon name="dots" />
      </DialogTrigger>
      <DialogContent className="!rounded-2xl !py-3 !px-0 !gap-0 !w-[400px]">
        {checkPostAuthor(author.id, user.id) ? (
          <>
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
          </>
        ) : null}

        <button
          onClick={() => handleSave(id, token)}
          className="text-center text-sm cursor-pointer pb-3 mb-3 border-b"
        >
          {saveds?.includes(id)
            ? "Убрать из избранного"
            : "Добавить в избранное"}
        </button>

        <p className="text-center text-sm cursor-pointer pb-3 mb-3 border-b">
          Поделиться...
        </p>
        <button
          onClick={() => handleCopyLink()}
          className="text-center text-sm cursor-pointer pb-3 mb-3 border-b"
        >
          Копировать ссылку
        </button>

        <p
          onClick={() => {
            setOpen(!open);
            dispatch(aboutModalOpenAction());
            dispatch(authorNameAction(author.username));
          }}
          className="text-center text-sm cursor-pointer pb-3 mb-3 border-b"
        >
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

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
import { checkPostAuthor } from "@/lib/utils";
import { UserType } from "@/consts";
import { useLocalStorage } from "usehooks-ts";
import { handleDeleteStory } from "@/store/story.store";
import { useNavigate } from "react-router-dom";

const StoryMore = ({
  author,
  id,
  setPostOpen,
  saveds,
  setSaveds,
}: {
  author: any;
  id: string;
  setPostOpen?: any;
  saveds?: string[];
  setSaveds?: any;
}) => {
  const [user] = useLocalStorage("user", {} as UserType);
  const [open, setOpen] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleCopyLink() {
    navigator.clipboard.writeText(`${window.location.origin}/story/${id}`);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <BaseIcon name="dots" color="white" />
      </DialogTrigger>
      <DialogContent className="!rounded-2xl !py-3 !px-0 !gap-0 !w-[400px]">
        {checkPostAuthor(author._id, user.id) ? (
          <>
            <button
              onClick={() => {
                dispatch(areYouSureOpenAction());
                setOpen(!open);
              }}
              className="text-center text-sm cursor-pointer font-bold text-red-500 pb-3 mb-3 border-b"
            >
              Удалить сторию
            </button>
          </>
        ) : null}

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

export default StoryMore;

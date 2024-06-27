import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BaseIcon from "@/components/icon/BaseIcon";
import post from "@/assets/images/post-create.jpg";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import {
  handleCreate,
  handleEditPost,
  handleGetPost,
  handleImageUpload,
} from "@/store/post.store";
import { useDispatch, useSelector } from "react-redux";
import { editModalOpenAction, updatePosts } from "@/actions/settingsActions";

const EditPost = () => {
  const { editModalOpen, editPostId } = useSelector(
    (state: any) => state.settings
  );
  const dispatch = useDispatch();
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsLoading(true);
    handleGetPost(editPostId)
      .then((res) => {
        setDescription(res.data.data.description);
        setImage(res.data.data.image);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [editModalOpen]);

  function handleEdit(body: any, token: string | null, id: string) {
    if (!token) return;

    setIsLoading(true);

    handleEditPost(body, token, id)
      .then((res) => {
        dispatch(editModalOpenAction());
        dispatch(updatePosts());
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  return (
    <Dialog open={editModalOpen}>
      <DialogContent className="!rounded-2xl !py-2 !px-0 !gap-0 !w-[482px]">
        <h4 className="text-center font-medium pb-2 border-b-2">
          Редактировать
        </h4>

        <div className="px-3 mt-3">
          <div className="h-60 relative rounded-md mb-3">
            <div className="absolute w-full h-full z-20 bg-[#000000a5]  rounded-md"></div>
            <img
              src={image}
              alt="post image"
              className="absolute h-full w-full object-cover object-center rounded-md"
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

          {description && image && !isLoading ? (
            <button
              onClick={() => handleEdit({ description }, token, editPostId)}
              className="bg-blue-500 w-full text-white py-2 px-2.5 rounded-lg text-sm font-medium mb-3"
            >
              Редактировать
            </button>
          ) : (
            <button className="bg-[#0094f681] w-full text-white py-2 px-2.5 rounded-lg text-sm font-medium mb-3 cursor-auto">
              Редактировать
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;

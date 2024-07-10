import { aboutModalOpenAction } from "@/actions/settingsActions";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { handleGetUser } from "@/store/user.store";
import Avatar from "../Avatar";
import { formatDate } from "@/lib/utils";

const AboutProfile = () => {
  const { aboutModalOpen, authorName } = useSelector(
    (state: any) => state.settings
  );
  const [author, setAuthor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authorName) return;
    setIsLoading(true);
    handleGetUser(authorName)
      .then((res) => {
        setAuthor(res.data.data.user);
        setIsLoading(false);
      })
      .catch(() => {
        dispatch(aboutModalOpenAction());
        setIsLoading(false);
      });
  }, [authorName]);

  return (
    <Dialog
      open={aboutModalOpen}
      onOpenChange={() => dispatch(aboutModalOpenAction())}
    >
      <DialogContent className="!rounded-2xl !py-2 !px-0 !gap-0 !w-96 max-h-[400px]">
        <DialogTitle className="text-center font-medium pb-2 border-b-2">
          Об аккаунте
        </DialogTitle>
        {!isLoading && author ? (
          <div className="m-3">
            <div className="flex justify-center mb-3">
              <Avatar src={author?.profile_img} />
            </div>
            <p className="text-center text-xs pb-3 border-b mb-3">
              Чтобы обеспечить подлинность информации в сообществе, мы
              отображаем сведения об аккаунтах в Instagram.
            </p>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Имя пользователя:</h3>
              <p className="text-sm">{author?.username}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Полное имя:</h3>
              <p className="text-sm">{author?.full_name}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">О себе:</h3>
              <p className="text-sm">
                {author?.about ? author?.about : "Ничего не указано"}
              </p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Дата присоединения:</h3>
              <p className="text-sm">
                {formatDate(new Date(author?.createdAt))}
              </p>
            </div>
          </div>
        ) : (
          <div className="m-3 h-64 flex justify-center items-center">
            <p>Загрузка...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AboutProfile;

import { Dialog, DialogContent } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { areYouSureOpenAction } from "@/actions/settingsActions";

const AreYouSure = ({
  type,
  fn,
}: {
  type: "post" | "user" | "story";
  fn: any;
}) => {
  const { areYouSureOpen } = useSelector((state: any) => state.settings);
  const dispatch = useDispatch();
  return (
    <Dialog open={areYouSureOpen}>
      <DialogContent className="!rounded-xl !py-1 !px-0 !gap-0 !w-[400px]">
        <h4 className="text-center font-medium pb-2 border-b-2">
          {type === "post"
            ? "Вы уверены, что хотите удалить этот пост?"
            : "Вы уверены, что хотите удалить этот сторис?"}
        </h4>

        <div className="flex justify-between">
          <button
            onClick={() => dispatch(areYouSureOpenAction())}
            className="text-center text-sm cursor-pointer font-bold py-1  flex-1 border-r"
          >
            Отменить
          </button>
          <button
            onClick={() => {
              fn();
              dispatch(areYouSureOpenAction());
            }}
            className="text-center text-sm cursor-pointer font-bold text-red-500 py-1  flex-1"
          >
            Удалить
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AreYouSure;

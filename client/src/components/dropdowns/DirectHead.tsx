import { useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { areYouSureOpenAction } from "@/actions/settingsActions";

const DirectHead = () => {
  const dispatch = useDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="text-3xl h-fit">...</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20 p-2">
        <DropdownMenuItem
          onClick={() => dispatch(areYouSureOpenAction())}
          className="cursor-pointer p-2"
        >
          Удалить чат
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DirectHead;

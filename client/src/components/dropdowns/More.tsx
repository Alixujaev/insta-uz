import BaseIcon from "../icon/BaseIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const More = ({ isSmall }: { isSmall?: boolean }) => {
  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="ml-3 flex gap-4 items-center px-3.5 mb-8">
          <BaseIcon name="more" />

          {!isSmall ? <p>Ещё</p> : null}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2">
        <DropdownMenuItem className="cursor-pointer p-3" onClick={handleLogout}>
          Выйти
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer p-3">
          Профиль
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default More;

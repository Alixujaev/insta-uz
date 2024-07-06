import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const DirectHead = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="text-3xl ">...</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20 p-2">
        <DropdownMenuItem className="cursor-pointer p-2">
          Удалить чат
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DirectHead;

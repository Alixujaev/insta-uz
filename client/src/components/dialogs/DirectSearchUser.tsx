import Avatar from "../Avatar";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const DirectSearchUser = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 text-sm font-semibold py-1.5 !rounded-lg">
          Отправить сообщение
        </button>
      </DialogTrigger>
      <DialogContent className="!rounded-2xl !py-2 !px-0 !gap-0 !w-[516px]">
        <h4 className="text-center font-bold pb-2 border-b border-[#dbdbdb]">
          Новое сообщение
        </h4>
        <div className="border-b border-[#dbdbdb] flex ">
          <p className="px-4 py-2 font-semibold">Кому:</p>
          <input
            type="text"
            className="outline-none text-sm"
            placeholder="Поиск..."
          />
        </div>
        <div className="h-[286px] overflow-y-auto">
          <p className="text-sm text-[#737373] p-5">Аккаунты не найдены.</p>
          {/* <div className="flex py-2 px-4 gap-2 items-center hover:bg-slate-100 cursor-pointer">
            <Avatar src="" size="md" />
            <div>
              <h3 className="">Asadbek</h3>
              <p className="text-sm text-[#737373]">Alixujaev Islom</p>
            </div>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DirectSearchUser;

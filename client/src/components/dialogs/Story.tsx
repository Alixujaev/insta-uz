import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import StorySlider from "../StorySlider";

const StoryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>open</DialogTrigger>
      <DialogContent className="w-[450px] max-h-[568px] h-full !rounded-md !py-0 !px-0 !gap-0 flex">
        <StorySlider />
      </DialogContent>
    </Dialog>
  );
};

export default StoryDialog;

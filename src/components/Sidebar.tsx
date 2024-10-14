import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="bg-white flex flex-col justify-between m-3 shadow-md relative z-30 h-[96vh]  rounded-lg p-3">
      <div>
        <div className="font-serif font-bold text-sky-500 text-xl">
          KR MARINES
        </div>
        <div className="my-5">
          <div className="text-lg cursor-pointer hover:bg-blue-100 rounded-md  p-3 font-sans py-2 font-semibold">
            Crew list
          </div>
          <div className="text-lg cursor-pointer hover:bg-blue-100 rounded-md p-3 font-sans py-2 font-semibold">
            Notification inbox
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-100 p-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-lg font-semibold">Account</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

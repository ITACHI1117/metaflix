import { Send } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { useRouter } from "next/navigation";
import { LogUserOut, User } from "@/store/AuthStore";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import useProgressBarNavigation from "@/hooks/useProgressBarNavigation";

export const BottomDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  user,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
}) => {
  const { push } = useProgressBarNavigation();

  // log user out
  const handleLogOut = () => {
    push("auth/login");
    LogUserOut();
    // routerServerGlobal.
  };

  return (
    <Dialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>More Actions</DialogTitle>
        </DialogHeader>

        {/* Comments List */}
        <div className="flex flex-col items-center justify-center px-5 md:px-52 overflow-y-auto  mb-6 gap-2">
          {user && user.role == "Creator" && (
            <Button
              className="cursor-pointer mb-4 w-full h-11 bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white font-medium shadow transition-all duration-300 group"
              onClick={() => push("creator/my-dashboard")}
            >
              My Videos
            </Button>
          )}

          <Button
            className=" cursor-pointer w-full h-11 bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white font-medium shadow transition-all duration-300 group"
            onClick={handleLogOut}
          >
            Sign out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BottomDrawer;

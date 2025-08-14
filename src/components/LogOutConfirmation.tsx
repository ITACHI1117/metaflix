import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { LogUserOut } from "@/store/AuthStore";
import useProgressBarNavigation from "@/hooks/useProgressBarNavigation";

const LogOutConfirmation = ({ isLogoutOpen, setIsLogoutOpen }) => {
  const { push } = useProgressBarNavigation();
  // log user out
  const handleLogOut = () => {
    push("auth/login");
    LogUserOut();
    console.log("logged out");
    // routerServerGlobal.
  };
  return (
    <Dialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to Signout?</DialogTitle>
          <DialogDescription>
            You would be logged out and redirected to the Sign in page
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="w-full">
            <Button variant={"outline"} className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleLogOut} variant={"default"}>
            Signout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogOutConfirmation;

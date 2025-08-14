import { useRouter } from "next/navigation";
import NProgress from "nprogress";

export default function useProgressBarNavigation() {
  const router = useRouter();

  function push(href) {
    console.log("pushing");
    NProgress.start();
    router.push(href);
  }
  function replace(href) {
    NProgress.start();
    router.replace(href);
  }
  function back(href) {
    NProgress.start();
    router.back(href);
  }
  return { push, replace, back };
}

import { useEffect } from "react";
import { useToasterStore, toast } from "react-hot-toast";

const TOAST_LIMIT = 3;

const useToastLimiter = () => {
  const { toasts } = useToasterStore();

  useEffect(() => {
    // limit toasts to 3
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);
};

export default useToastLimiter;

import { IUser } from "@/types";
import { atom, useAtom } from "jotai";

const userDataAtom = atom<IUser | null>(null);

// Actions
export const useUserData = () => {
  const [userData, setUserData] = useAtom(userDataAtom);
  return { userData, setUserData };
};

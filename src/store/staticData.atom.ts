import { IStaticData } from "@/types";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const staticDataAtom = atomWithStorage<IStaticData>("staticData", {
  states: [],
  tags: {
    PRODUCT: [],
    OFFER: [],
    BUSINESS: [],
    EVENT: [],
  },
});

// Actions
export const useStaticData = () => {
  const [staticData, setStaticData] = useAtom(staticDataAtom);
  return { tags: staticData.tags, states: staticData.states, setStaticData };
};

import { RawList, Tag } from "@/constants/type";
import { useLocalStorage } from "@/components/useLocalStorage";
import { createContext, useContext, useState } from "react";

type ContextValue = {
  lists: RawList[];
  setLists: (lists: any) => void; // confusing
  tags: Tag[];
  setTags: (tags: any) => void;
};

const initialState: ContextValue = {
  lists: [],
  setLists: () => {},
  tags: [],
  setTags: () => {},
};
const StateContext = createContext<ContextValue>(initialState);

export function useStateContext() {
  return useContext(StateContext);
}
type Prop = {
  children: React.ReactNode;
};

export function StateProvider({ children }: Prop) {
  const [lists, setLists] = useLocalStorage<RawList[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const contextValue: ContextValue = {
    lists,
    setLists,
    tags,
    setTags,
  };
  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
}

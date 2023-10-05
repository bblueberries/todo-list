import { List, RawList, Tag } from "@/constants/type";
import { useLocalStorage } from "@/components/useLocalStorage";
import { createContext, useContext, useMemo, useState } from "react";

type ContextValue = {
  lists: RawList[];
  setLists: (lists: any) => void; // confusing
  tags: Tag[];
  setTags: (tags: any) => void;
  listsWithTags: List[];
};

const initialState: ContextValue = {
  lists: [],
  setLists: () => {},
  tags: [],
  setTags: () => {},
  listsWithTags: [],
};
const StateContext = createContext<ContextValue>(initialState);

export function useStateContext() {
  return useContext(StateContext);
}
type Prop = {
  children: React.ReactNode;
};

export function StateProvider({ children }: Prop) {
  const [lists, setLists] = useLocalStorage<RawList[]>("LISTS", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const listsWithTags = useMemo(() => {
    if (!lists || !tags) {
      return []; // Handle the case when lists or tags are not defined
    }
    return lists.map((list) => {
      return {
        ...list,
        tags: tags.filter((tag) => list.tagIds.includes(tag.id)),
      };
    });
  }, [lists, tags]);

  const contextValue: ContextValue = {
    lists,
    setLists,
    tags,
    setTags,
    listsWithTags,
  };
  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
}

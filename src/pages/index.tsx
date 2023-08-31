import { ListData, RawList, Tag } from "@/constants/type";
import { useStateContext } from "@/contexts/StateContext";
import { useLocalStorage } from "@/components/useLocalStorage";
import { useMemo } from "react";
import { Lists } from "@/components/Lists";

export default function Home() {
  // const [lists, setLists] = useLocalStorage<RawList[]>("NOTES", []);
  // const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const { lists, setLists, tags, setTags } = useStateContext();

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

  return (
    <>
      <Lists availableTags={tags} />
    </>
  );
}

import { useStateContext } from "@/contexts/StateContext";
import { ShowLists } from "@/components/ShowLists";

export default function Home() {
  // const [lists, setLists] = useLocalStorage<RawList[]>("NOTES", []);
  // const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  return (
    <>
      <ShowLists />
    </>
  );
}

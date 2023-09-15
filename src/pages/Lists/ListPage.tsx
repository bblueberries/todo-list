import { useStateContext } from "@/contexts/StateContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ListContent from "@/components/ListContent";

export default function ListPage() {
  const router = useRouter();
  const { listsWithTags } = useStateContext();
  const { id } = router.query;
  const thisList = listsWithTags.find((list) => list.id === id);
  useEffect(() => {
    if (!id || typeof id !== "string" || thisList === undefined) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      {/* <div>{thisList?.title}</div> */}
      <ListContent />
    </>
  );
}

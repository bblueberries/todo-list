import { ListLayout } from "@/components/ListLayout";
import { useStateContext } from "@/contexts/StateContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ListPage() {
  const router = useRouter();
  const { listsWithTags } = useStateContext();
  const { id } = router.query;
  useEffect(() => {
    if (!id) return;
    if (typeof id !== "string") return;
  }, [router]);

  return (
    <>
      <ListLayout lists={listsWithTags} id={id as string} />
    </>
  );
}

import { List } from "@/constants/type";
import { useStateContext } from "@/contexts/StateContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ListContent from "@/components/ListContent";
type ListPageProps = {
  id: string;
};
export async function getServerSideProps(context: any) {
  const id = context.query.id;
  // const { listsWithTags } = useStateContext();
  // const thisList = listsWithTags.find((list) => list.id === id);
  return {
    props: {
      // thisList,
      id,
    },
  };
}
export default function ListPage({ id }: ListPageProps) {
  const router = useRouter();

  const { listsWithTags } = useStateContext();
  const thisList = listsWithTags.find((list) => list.id === id);
  // console.log(id);
  useEffect(() => {
    if (!id || typeof id !== "string" || thisList === undefined) {
      router.push("/");
    }
  }, [router]);
  return (
    <>
      <ListContent id={id} thisList={thisList as List} />
    </>
  );
}

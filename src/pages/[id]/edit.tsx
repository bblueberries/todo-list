import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "@/contexts/StateContext";
import EditList from "@/components/EditList";
import { List } from "@/constants/type";

type editPageProps = {
  id: string;
};

export async function getServerSideProps(context: any) {
  const id = context.query.id;

  return {
    props: { id },
  };
}
export default function EditPage({ id }: editPageProps) {
  const router = useRouter();
  const { listsWithTags } = useStateContext();
  const thisList = listsWithTags.find((list) => list.id === id);

  useEffect(() => {
    if (!id || typeof id !== "string" || thisList === undefined) {
      router.push("/");
    }
  }, [thisList, router]);

  return (
    <>
      <EditList thisList={thisList as List} />
    </>
  );
}

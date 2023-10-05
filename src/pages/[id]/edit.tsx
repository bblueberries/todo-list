import NoteForm from "@/components/Form";
import { List, ListData, RawList, Tag } from "@/constants/type";
import { useStateContext } from "@/contexts/StateContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type editListProps = {
  id: string;
};
export async function getServerSideProps(context: any) {
  const id = context.query.id;

  return {
    props: { id },
  };
}

export default function EditList({ id }: editListProps) {
  const { setLists, tags, setTags, listsWithTags } = useStateContext();
  const router = useRouter();

  const thisList = listsWithTags.find((list) => list.id === id);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (!id || typeof id !== "string" || thisList === undefined) {
      router.push("/");
    }
    setIsClient(true);
  }, [thisList, router]);

  type setLists = (lists: RawList[]) => void;

  function onUpdateList(id: string, { tags, ...data }: ListData) {
    setLists((prevLists: RawList[]) => {
      return prevLists.map((list) => {
        if (id === list.id) {
          return {
            ...list,
            ...data,
            tagIds: tags.map((tag) => tag.id),
          };
        } else {
          return list;
        }
      });
    });
  }

  function addTag(tag: Tag) {
    setTags((prev: Tag[]) => [...prev, tag]);
  }
  return (
    isClient && (
      <>
        (
        <p className="text-4xl font-bold px-6 xl:px-48 mt-6 mb-14">Edit List</p>
        <NoteForm
          title={thisList?.title}
          body={thisList?.body}
          tags={thisList?.tags}
          onSubmit={(data) => onUpdateList(thisList?.id || "", data)}
          onAddTag={addTag}
          availableTags={tags}
        />
        )
      </>
    )
  );
}

import NoteForm from "@/components/Form";
import { ListData, RawList, Tag } from "@/constants/type";
import { useStateContext } from "@/contexts/StateContext";
import React from "react";
import { v4 as uuidV4 } from "uuid";

export default function NewList() {
  const { lists, setLists, tags, setTags } = useStateContext();
  type setLists = (lists: RawList[]) => void;
  function onCreateList({ tags, ...data }: ListData) {
    setLists((prevLists: any) => {
      const newList: RawList = {
        ...data,
        id: uuidV4(),
        tagIds: tags.map((tag) => tag.id),
      };

      // Concatenate the new list to the previous lists
      return [...prevLists, newList];
    });
  }

  function addTag(tag: Tag) {
    setTags((prev: any) => [...prev, tag]);
  }
  return (
    <>
      <p className="text-4xl font-bold px-6 xl:px-48 mt-6 mb-14">New List</p>
      <NoteForm
        onSubmit={onCreateList}
        onAddTag={addTag}
        availableTags={tags}
      />
    </>
  );
}

import NoteForm from "@/components/Form";
import { List, ListData, RawList, Tag } from "@/constants/type";
import { useStateContext } from "@/contexts/StateContext";
import React from "react";
import { v4 as uuidV4 } from "uuid";
type EditListProps = {
  thisList: List;
};

export default function EditList({ thisList }: EditListProps) {
  const { lists, setLists, tags, setTags } = useStateContext();
  type setLists = (lists: RawList[]) => void;

  function onUpdateList(id: string, { tags, ...data }: ListData) {
    setLists((prevLists: List[]) => {
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
    setTags((prev: any) => [...prev, tag]);
  }
  return (
    <>
      <p className="text-4xl font-bold px-6 xl:px-48 mt-6 mb-14">Edit List</p>
      <NoteForm
        thisList={thisList}
        onSubmit={(data) => onUpdateList(thisList.id, data)}
        onAddTag={addTag}
        availableTags={tags}
      />
    </>
  );
}

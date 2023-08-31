import { ListData, Tag } from "@/constants/type";
import Link from "next/link";
import React, { FormEvent, useRef, useState } from "react";
import Creatable from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { useRouter } from "next/router";

type FormProps = {
  onSubmit: (data: ListData) => void;
  onAddTag: (data: Tag) => void;
  availableTags: Tag[];
};

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    height: "2.5rem",
    minHeight: "2.5rem",
    borderColor: "rgb(209 213 219)",
  }),
};

export default function Form({ onSubmit, onAddTag, availableTags }: FormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const router = useRouter();

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      height: "2.5rem",
      minHeight: "2.5rem",
      borderColor: "rgb(209 213 219)",
    }),
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      body: bodyRef.current!.value,
      tags: selectedTags,
    });

    router.back();
  }

  return (
    <>
      <form
        className="flex justify-center flex-col px-6 xl:px-48"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-4 text-sm">
          <div className=" w-6/12">
            <p className=" text-xl mb-2">Title</p>
            <input
              className=" w-full border border-gray-300 hover:border-gray-400 focus:hover:border-blue-500 focus:outline-blue-500 h-10 rounded px-3 outline-offset-[1.5px]"
              ref={titleRef}
              required
            />
          </div>
          <div className=" w-6/12">
            <p className="text-xl mb-2">Tag</p>
            <Creatable
              isMulti
              styles={customStyles}
              value={selectedTags.map((tag) => {
                // convert our selectedTags (Tag type) into the way react-select use which is {label,value}
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  // set Our SelectedTags from convert tags of react-select into our "Tag" type
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
              onCreateOption={(label) => {
                const newTag = { id: uuidV4(), label };
                onAddTag(newTag);
                setSelectedTags((prev) => [...prev, newTag]);
              }}
              options={
                availableTags
                  ? availableTags.map((tag) => ({
                      label: tag.label,
                      value: tag.id,
                    }))
                  : []
              }
            />
          </div>
        </div>
        <div className="mt-6">
          <p className=" text-xl mb-2">Body</p>
          <textarea
            className="border border-gray-300 rounded w-full focus:outline-blue-500 p-3  focus:hover:border-blue-500 outline-offset-[1.5px]"
            rows={10}
            ref={bodyRef}
            required
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 "
            type="submit"
          >
            Save
          </button>
          <Link href="/">
            <button className="rounded text-gray-400 px-3 py-1 border border-gray-400 hover:bg-slate-100">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </>
  );
}

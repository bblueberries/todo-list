import { Tag } from "@/constants/type";
import Link from "next/link";
import { type } from "os";
import { useState } from "react";
import ReactSelect from "react-select";
const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    height: "2.5rem",
    minHeight: "2.5rem",
    borderColor: "rgb(209 213 219)",
    whiteSpace: "initial",
  }),
};
type ListsProps = {
  availableTags: Tag[];
};
export function Lists({ availableTags }: ListsProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  return (
    <>
      <div className="flex flex-col p-4 xl:px-20 xl:py-16">
        <div className="flex">
          <p className="p-2 font-bold text-xl xl:text-3xl">Lists</p>
          <div className="flex gap-3 ml-auto  text-base xl:text-xl font-light">
            <Link href="/new">
              <button className="rounded border border-gray-400 p-3   bg-blue-500 hover:bg-blue-600 text-white">
                Create
              </button>
            </Link>
            <button className="rounded border p-2 border-gray-400 text-gray-400 hover:bg-slate-100">
              Edit Tags
            </button>
          </div>{" "}
        </div>
        <div className="flex mt-5 p-2 gap-4">
          <div className=" w-6/12">
            <div>
              <p className=" text-xl mb-2">Title</p>
              <input
                className=" w-full border border-gray-300 hover:border-gray-400 focus:hover:border-blue-500 focus:outline-blue-500 h-10 rounded px-3 outline-offset-[1.5px]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className=" w-6/12">
            <p className=" text-xl mb-2">Tags</p>
            <ReactSelect
              isMulti
              styles={customStyles}
              classNamePrefix="lp-copy-sel"
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
      </div>
    </>
  );
}

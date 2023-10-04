import { List, Tag } from "@/constants/type";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ReactSelect from "react-select";
import TagsModal from "./TagsModal";

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
  lists: List[];
};
type listCardProps = {
  id: string;
  title: string;
  tags: Tag[];
};
export function ShowLists({ availableTags, lists }: ListsProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredLists = useMemo(() => {
    if (lists) {
      return lists.filter((list) => {
        return (
          (title === "" ||
            list.title.toLowerCase().includes(title.toLowerCase())) &&
          (selectedTags.length === 0 ||
            selectedTags.every((tag) =>
              list.tags.some((list) => list.id === tag.id)
            ))
        );
      });
    }
    return [];
  }, [title, selectedTags, lists]);
  if (isClient) {
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
          <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-6 mt-5 px-5 lg:px-10">
            {filteredLists.map((list) => (
              <div key={list.id}>
                <ListCard id={list.id} title={list.title} tags={list.tags} />
              </div>
            ))}
          </div>
        </div>
        <TagsModal availableTags={availableTags} />
      </>
    );
  } else return <></>;
}

function ListCard({ id, title, tags }: listCardProps) {
  return (
    <Link href={`/Lists/${id}`}>
      <div className=" h-40 w-full border rounded-xl hover:translate-y-[-5px] hover:shadow-md shadow-black transition-transform-shadow ease-in-out duration-200 ">
        <div className="flex flex-col items-center p-4">
          <p className="text-2xl font-semibold">{title}</p>
        </div>
        {tags.length > 0 && (
          <div className="flex justify-center gap-2">
            {tags.map((tag) => (
              <div
                className="border px-1 rounded-md text-white bg-blue-500 font-semibold text-sm"
                key={tag.id}
              >
                {tag.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

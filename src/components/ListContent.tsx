import { List } from "@/constants/type";
import { useStateContext } from "@/contexts/StateContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type ListContentProps = {
  thisList: List;
  id: string;
};

export default function ListContent({ thisList, id }: ListContentProps) {
  // console.log(id);
  // const { listsWithTags } = useStateContext();
  // const thisList = listsWithTags.find((list) => list.id === id);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    // <div>1</div>
    isClient && (
      <>
        <div className="p-5 xl:py-8 xl:px-20 flex-col">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h1 className=" text-4xl font-bold">{thisList?.title}</h1>
              <div>
                {thisList?.tags.length > 0 && (
                  <div className="flex gap-1 xl:gap-2">
                    {thisList?.tags.map((tag) => (
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
            </div>
            <div className="flex gap-2 justify-center items-center">
              <Link href={"/${id}/edit"}>
                <button className="rounded border border-gray-400 p-2 px-3  bg-blue-500 hover:bg-blue-600 text-white text-sm xl:text-base">
                  Edit
                </button>
              </Link>

              <button className="rounded border border-red-300 p-2   hover:bg-gray-100 text-red-400 text-sm xl:text-base">
                Delete
              </button>
              <Link href={"/"}>
                {" "}
                <button className="rounded border p-2 border-gray-400 text-gray-400 hover:bg-slate-100 text-sm xl:text-base">
                  Back
                </button>
              </Link>
            </div>
          </div>
          <ReactMarkdown>{thisList?.body}</ReactMarkdown>
        </div>
      </>
    )
  );
}
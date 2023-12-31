import { Tag } from "@/constants/type";
import { useStateContext } from "@/contexts/StateContext";
import React from "react";

export default function Modal() {
  const { tags, setTags } = useStateContext();
  const [showModal, setShowModal] = React.useState(false);

  function deleteTags(id: string) {
    setTags((prev: Tag[]) => {
      return prev.filter((tag) => tag.id !== id);
    });
  }

  function updateTags(id: string, label: string) {
    setTags((prev: Tag[]) => {
      return prev.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }
  return (
    <>
      <button
        className="rounded border p-2 border-gray-400 text-gray-400 hover:bg-slate-100"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Edit Tags
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto xl:w-6/12 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Tags</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 xl:p-8 flex-auto w-full ">
                  {tags?.map((tag) => (
                    <div className="flex gap-2 mb-2 xl:mb-4" key={tag.id}>
                      <input
                        type="text"
                        value={tag.label}
                        className=" border border-gray-300 hover:border-gray-400 focus:outline-none rounded p-2 w-full"
                        onChange={(e) => updateTags(tag.id, e.target.value)}
                      />
                      <button
                        className="text-red-500 border border-red-500 rounded px-3.5 hover:bg-red-500 hover:text-white"
                        onClick={() => deleteTags(tag.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-slate-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

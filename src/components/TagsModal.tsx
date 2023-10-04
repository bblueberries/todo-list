import { Tag } from "@/constants/type";
import React from "react";

type tagsModalProp = {
  availableTags: Tag[];
};
export default function Modal({ availableTags }: tagsModalProp) {
  const [showModal, setShowModal] = React.useState(false);
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
                  {availableTags.map((tag) => (
                    <div className="flex gap-2 mb-2 xl:mb-4" key={tag.id}>
                      <input
                        type="text"
                        value={tag.label}
                        className=" border border-gray-300 hover:border-gray-400 focus:outline-none rounded p-2 w-full"
                      />
                      <button className="text-red-500 border border-red-500 rounded px-3.5 hover:bg-red-500 hover:text-white">
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

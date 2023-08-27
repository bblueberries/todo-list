import React from "react";
import Creatable from "react-select/creatable";
type Props = {};

export default function ({}: Props) {
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      height: "2.5rem",
      minHeight: "2.5rem",
      borderColor: "rgb(209 213 219)",
    }),
  };

  return (
    <>
      <div className="flex justify-center flex-col px-6 xl:px-48">
        <div className="flex gap-4 text-sm">
          <div className=" w-6/12">
            <p className=" text-xl mb-2">Title</p>
            <input
              className=" w-full border border-gray-300 focus:outline-blue-500 h-10 rounded px-3"
              required
            />
          </div>
          <div className=" w-6/12">
            <p className="text-xl mb-2">Tag</p>
            <Creatable isMulti styles={customStyles} />
          </div>
        </div>
        <div className="mt-6">
          <textarea
            className="border border-gray-300 rounded w-full focus:outline-blue-500 p-3"
            rows={10}
          />
        </div>
      </div>
    </>
  );
}

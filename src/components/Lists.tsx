import Link from "next/link";

export function Lists() {
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
          </div>
        </div>
      </div>
    </>
  );
}

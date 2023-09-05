import { List } from "@/constants/type";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

type ListLayoutProps = {
  lists: List[];
  id: string;
};
export function ListLayout({ lists, id }: ListLayoutProps) {
  const thisList = lists.find((list) => list.id === id);
  const router = useRouter();
  useEffect(() => {
    if (thisList === undefined) {
      router.push("/"); // Redirect to the index page
    }
  }, [router]);
  return (
    <>
      <p>helloo {id}</p>
    </>
  );
}

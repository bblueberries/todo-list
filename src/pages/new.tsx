import NoteForm from "@/components/NoteForm";
import React from "react";

type Props = {};

export default function NewNote({}: Props) {
  return (
    <>
      <p className="m-4 text-4xl font-bold">New List</p>
      <NoteForm />
    </>
  );
}

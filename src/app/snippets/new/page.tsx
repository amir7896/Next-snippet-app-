"use client";

import { useFormState } from "react-dom";
import * as actions from "@/actions";

export default function SnippetCreate() {
  const [formSate, action] = useFormState(actions.createSnippet, {
    message: "",
  });

  return (
    <form action={action}>
      <h2 className="text-bold m-3">Create a snippet</h2>
      <div className="flex flex-col gap-4">
        {/* Title input */}
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        {/* Code input */}
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        {formSate.message ? (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {formSate.message}
          </div>
        ) : null}
        <button
          type="submit"
          className="rounded p-2 bg-blue-600 text-white text-bold text-xl"
        >
          Create
        </button>
      </div>
    </form>
  );
}

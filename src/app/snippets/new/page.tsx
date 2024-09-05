import { redirect } from "next/navigation";

import { db } from "@/db";

export default function SnippetCreate() {
  async function createSnippet(formData: FormData) {
    // This needs to be a server action
    "use server";

    // Check user inputs and make sure they are valid
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    // Create a new record in the db
    const snippet = await db.snippet.create({
      data: {
        title: title,
        code: code,
      },
    });

    console.log("Created snippetn ====>", snippet);
    // Redirect user to root route page
    redirect("/");
  }
  return (
    <form action={createSnippet}>
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
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}

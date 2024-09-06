"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { redirect } from "next/navigation";

// Create snippet
export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  // Check user inputs and make sure they are valid
  try {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return { message: "Title must be longer" };
    }

    if (typeof code !== "string" || code.length < 5) {
      return { message: "Code must be longer" };
    }

    // Create a new record in the db
    await db.snippet.create({
      data: {
        title: title,
        code: code,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong...",
      };
    }
  }
  revalidatePath("/");
  // Redirect user to root route page
  redirect("/");
}

// Edit snippet
export async function editSnippet(id: number, code: string, title: string) {
  await db.snippet.update({ where: { id }, data: { code, title } });

  revalidatePath(`/snippets/${id}`); // For caching of snippet detail page
  redirect(`/snippets/${id}`);
}

// Delete snippet
export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });

  revalidatePath("/"); // For caching of home page
  redirect("/");
}

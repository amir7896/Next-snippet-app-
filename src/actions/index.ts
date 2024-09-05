"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

// Edit snippet
export async function editSnippet(id: number, code: string, title: string) {
  await db.snippet.update({ where: { id }, data: { code, title } });

  redirect(`/snippets/${id}`);
}

// Delete snippet
export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });
  redirect("/");
}

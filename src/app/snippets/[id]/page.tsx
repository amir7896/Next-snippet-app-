import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import * as actions from "@/actions";

interface SnippetDetailPageProps {
  params: {
    id: string;
  };
}
export default async function SnippetDetailPage(props: SnippetDetailPageProps) {
  await new Promise((r) => setTimeout(r, 2000));
  // Get snippet by id
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);
  return (
    <div>
      <div className="flex mt-5 mb-5 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded bg-yellow-500 text-white tracking-widest	font-bold"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded bg-red-700 text-white tracking-widest	font-bold">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-2 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}

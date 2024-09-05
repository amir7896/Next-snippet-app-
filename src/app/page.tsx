import Link from "next/link";
import { db } from "@/db";
export default async function Home() {
  const sinppets = await db.snippet.findMany();

  const renderSnippets = sinppets.map((snippet) => {
    return (
      <Link
        href={`/snippets/${snippet.id}`}
        key={snippet.id}
        className="flex justify-between items-center p-4 border rounded"
      >
        <div>{snippet.title}</div>
        <div className="border p-2 rounded bg-gray-500 text-white tracking-widest	font-bold">
          View
        </div>
      </Link>
    );
  });
  return (
    <div>
      <div className="flex mt-5 mb-5 justify-between items-center">
        <h1 className="text-2xl font-bold">Snippets</h1>
        <Link
          href="/snippets/new"
          className="border p-2 rounded bg-blue-600 text-white tracking-widest	font-bold"
        >
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2 mt-2">{renderSnippets}</div>
    </div>
  );
}

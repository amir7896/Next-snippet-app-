"use client";

interface SnippetErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function SnippetErrorPage({ error }: SnippetErrorPageProps) {
  return <div>{error.message}</div>;
}

"use client";

import { useParams } from "next/navigation";

export default function BookDetailPage() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  return <div>Book detail {id}</div>;
}

"use client";

import { title } from "@/components/primitives";
import RichTextEditor from "@/components/shared/rich-text-editor";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateBookReviewPage() {
  const router = useRouter();
  const [content, setContent] = useState("");

  const onChangeTextEditor = (value: string) => setContent;

  return (
    <div>
      <div className="mb-6">
        <h1 className={title()}>Create Book Review</h1>
      </div>

      <div>
        <RichTextEditor
          value={content}
          placeholder="Enter value here..."
          onChange={onChangeTextEditor}
        />
      </div>

      <div className="flex justify-end mt-6">
        <Button
          size="md"
          radius="sm"
          variant="bordered"
          onClick={() => router.push("/admin/book-review")}
          className="mr-3"
        >
          Cancel
        </Button>

        <Button color="primary" size="md" radius="sm">
          Save
        </Button>
      </div>
    </div>
  );
}

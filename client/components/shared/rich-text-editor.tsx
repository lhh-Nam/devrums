import React, { useState, useRef, useMemo, FC } from "react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface IRichTextEditorProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const RichTextEditor: FC<IRichTextEditorProps> = (props) => {
  const { value, placeholder, onChange } = props;

  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      enableDragAndDropFileToEditor: true,
      placeholder,
      uploader: {
        url: "http://localhost:8000/api/upload-image",
        imagesExtensions: ["jpg", "png", "jpeg", "gif"],
        //headers: {"token":`${db.token}`},
        withCredentials: false,
        pathVariableName: "path",
        format: "json",
        method: "POST",
      },
      height: 500,
    }),
    []
  );

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onChange={onChange}
    />
  );
};

export default RichTextEditor;

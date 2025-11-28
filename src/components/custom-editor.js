import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const CustomEditor = ({ value, onEditorChange, onBlur }) => {
  return (
    <Editor
      apiKey="gv4byjmf4hkes25frujmhurfk0fi6b53k22h7nxn6g1ezstt"
      init={{
        height: 350,
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table",
      }}
      value={value}
      onEditorChange={onEditorChange}
      onBlur={onBlur}
    />
  );
};

export default CustomEditor;

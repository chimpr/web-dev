import { useState } from "react";
import { Button } from "@mui/material";

interface FileUploadProps {
  id: string;
  text: string;
  onUpload: (file: File) => void;
}

export default function FileUpload({ id, text, onUpload }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed!");
        return;
      }

      setSelectedFile(file);
      onUpload(file);
    }
  };

  return (
    <div>
      <input
        accept="application/pdf"
        style={{ display: "none" }}
        id={id}
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor={id}>
        <Button variant="contained" component="span">
          {text}
        </Button>
      </label>
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
}

"use client";

import toast from "react-hot-toast";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {
  return (
    <UploadButton
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
        console.log(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.log(error)
        toast.error(`${error?.message}`);
      }}
    />
  )
}

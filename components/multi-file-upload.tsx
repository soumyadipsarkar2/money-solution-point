"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Trash2, Plus } from "lucide-react"

interface MultiFileUploadProps {
  id: string
  label: string
  hindiLabel?: string
  required?: boolean
  accept?: string
  multiple?: boolean
  onChange: (files: File[]) => void
  maxFiles?: number
  initialFiles?: File[]
  error?: boolean
}

export default function MultiFileUpload({
  id,
  label,
  hindiLabel,
  required = false,
  accept = "image/*",
  multiple = true,
  onChange,
  maxFiles = 10,
  initialFiles = [],
  error = false,
}: MultiFileUploadProps) {
  const [files, setFiles] = useState<File[]>(initialFiles)
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize previews when component mounts or initialFiles change
  useEffect(() => {
    const newPreviews = initialFiles.map(file => URL.createObjectURL(file))
    setPreviews(newPreviews)
    
    // Cleanup function to revoke object URLs
    return () => {
      newPreviews.forEach(url => URL.revokeObjectURL(url))
    }
  }, [initialFiles])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      const newFiles = [...files, ...selectedFiles].slice(0, maxFiles)
      setFiles(newFiles)

      // Create previews
      const newPreviews = [...previews]
      selectedFiles.forEach((file) => {
        if (newPreviews.length < maxFiles) {
          const fileUrl = URL.createObjectURL(file)
          newPreviews.push(fileUrl)
        }
      })

      setPreviews(newPreviews.slice(0, maxFiles))
      onChange(newFiles)

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    const newPreviews = [...previews]

    // Revoke object URL to avoid memory leaks
    if (newPreviews[index]) {
      URL.revokeObjectURL(newPreviews[index])
    }

    newFiles.splice(index, 1)
    newPreviews.splice(index, 1)

    setFiles(newFiles)
    setPreviews(newPreviews)
    onChange(newFiles)
  }

  const viewFile = (index: number) => {
    if (previews[index]) {
      window.open(previews[index], "_blank")
    }
  }

  const isImage = (file: File) => {
    return file.type.startsWith("image/")
  }

  const isVideo = (file: File) => {
    return file.type.startsWith("video/")
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
  <span>
    {label} {required && <span className="text-red-500">*</span>}
  </span>
  {hindiLabel && (
    <div className="text-muted-foreground text-xs">{hindiLabel}</div>
  )}
</label>

      <input
        ref={fileInputRef}
        id={id}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        required={required && files.length === 0}
      />

      <div className={`multi-file-upload ${error && required && files.length === 0 ? 'border-2 border-red-500 rounded-md' : ''}`}>
        {previews.map((preview, index) => (
          <div key={index} className="file-preview">
            {isImage(files[index]) ? (
              <img
                src={preview || "/placeholder.svg"}
                alt={`Preview ${index}`}
                className="h-32 w-full object-cover rounded-md"
              />
            ) : isVideo(files[index]) ? (
              <video src={preview} controls className="h-32 w-full object-cover rounded-md" />
            ) : files[index].type === "application/pdf" ? (
              <iframe
                src={preview}
                title={`PDF Preview ${index}`}
                className="h-32 w-full object-cover rounded-md"
              ></iframe>
            ) : (
              <div className="h-32 w-full flex items-center justify-center bg-muted rounded-md">
                <span className="text-sm text-muted-foreground">{files[index].name}</span>
              </div>
            )}
            <div className="file-preview-overlay">
              <div className="file-preview-actions">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/90"
                  onClick={() => viewFile(index)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => removeFile(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {files.length < maxFiles && (
          <div
            className={`upload-placeholder h-32 flex flex-col items-center justify-center cursor-pointer ${
              error && required && files.length === 0 ? 'border-2 border-red-500 rounded-md' : ''
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-xs text-center text-muted-foreground">
              {files.length === 0 ? "Upload Files" : "Add More"}
            </span>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="text-xs text-muted-foreground mt-2">
          {files.length} {files.length === 1 ? "file" : "files"} selected
        </div>
      )}
    </div>
  )
}

import {Input} from '@/components/ui/input.tsx'
import {Label} from '@/components/ui/label'
import React, {useRef} from 'react'
import {ToastAction} from '@/components/ui/toast.tsx'
import {useToast} from '@/components/ui/use-toast.ts'

interface IProps {
  setFile: (file: File | null) => void
}

export const UploadPic = ({setFile}: IProps) => {
  const {toast} = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      
      // Check file type
      if (
        !file.name.endsWith('.jpg') &&
        !file.name.endsWith('.png') &&
        !file.name.endsWith('.jpeg')
      ) {
        toast({
          variant: 'destructive',
          title: 'Invalid file format',
          description: 'Please upload a JPG or PNG image.',
          action: <ToastAction altText='Try again'>Try again</ToastAction>,
        })
        return
      }
      
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload an image smaller than 10MB.',
          action: <ToastAction altText='Try again'>Try again</ToastAction>,
        })
        return
      }
      
      setFile(file)
    } else {
      setFile(null)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0]
      
      // Check file type
      if (
        !file.name.endsWith('.jpg') &&
        !file.name.endsWith('.png') &&
        !file.name.endsWith('.jpeg')
      ) {
        toast({
          variant: 'destructive',
          title: 'Invalid file format',
          description: 'Please upload a JPG or PNG image.',
          action: <ToastAction altText='Try again'>Try again</ToastAction>,
        })
        return
      }
      
      // Check file size
      if (file.size > 10 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload an image smaller than 10MB.',
          action: <ToastAction altText='Try again'>Try again</ToastAction>,
        })
        return
      }
      
      setFile(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div className='w-full'>
      <div
        className='border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-accent/50 transition-colors'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-4 text-muted-foreground"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <Label htmlFor='picture' className='cursor-pointer'>
          <span className='text-lg font-semibold block mb-2'>
            Click to upload or drag and drop
          </span>
          <span className='text-sm text-muted-foreground block'>
            JPG or PNG (max. 10MB)
          </span>
        </Label>
        <Input
          ref={fileInputRef}
          id='picture'
          type='file'
          accept='image/jpeg,image/jpg,image/png'
          onChange={handleFile}
          className='hidden'
        />
      </div>
    </div>
  )
}

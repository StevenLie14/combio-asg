import {Input} from '@/components/ui/input.tsx'
import {Label} from '@/components/ui/label'
import React from 'react'
import {ToastAction} from '@/components/ui/toast.tsx'
import {useToast} from '@/components/ui/use-toast.ts'

interface IProps {
  setFile: (file: File | null) => void
}

export const UploadPic = ({setFile}: IProps) => {
  const {toast} = useToast()

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      if (
        !event.target.files[0].name.endsWith('.jpg') &&
        !event.target.files[0].name.endsWith('.pneg') &&
        !event.target.files[0].name.endsWith('.png') &&
        !event.target.files[0].name.endsWith('.jpeg')
      ) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'File must be images.',
          action: <ToastAction altText='Try again'>Try again</ToastAction>,
        })
        return
      }
      setFile(event.target.files[0])
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Photo must be exist.',
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      })
      setFile(null)
    }
  }

  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='picture'>Picture</Label>
      <Input
        id='picture'
        type='file'
        onChange={handleFile}
      />
    </div>
  )
}

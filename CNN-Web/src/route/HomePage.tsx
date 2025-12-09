import { FormEvent, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import axios from 'axios'
import { UploadPic } from '@/component/UploadPic.tsx'
import { LoadingButton } from '@/component/LoadingButton.tsx'
import { Button } from '@/components/ui/button.tsx'
import { ToastAction } from '@/components/ui/toast.tsx'
import { useToast } from '@/components/ui/use-toast.ts'

export const HomePage = () => {
  // const videoRef = useRef<HTMLVideoElement>(null)
  // const photoRef = useRef(null)

  // const [data, setData] = useState()
  const { toast } = useToast()
  const [isLoading, setLoading] = useState(false)
  const [results, setResults] = useState<{
    model1: string
    model2: string
    model3: string
  } | null>(null)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (photo === null) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Photo must be exist.',
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      })
      return
    }
    console.log(photo)

    const dataForm = new FormData()
    dataForm.append('files', photo)
    setLoading(true)
    axios
      .post(
        import.meta.env.VITE_API_URL + `/getresult`,
        dataForm,

        // headers: {
        //   'Content-Type': 'multipart/form-data',
        //   'Access-Control-Allow-Origin': '*',
        // },
        // body: dataForm,
        // method: 'POST',
      )
      .then((res) => {
        setLoading(false)
        setResults(res.data)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: err.message,
          action: <ToastAction altText='Try again'>Try again</ToastAction>,
        })
        setLoading(false)
      })
  }

  const [photo, setPhoto] = useState<File | null>(null)

  return (
    <div className='p-5'>
      {/* <div className="camera">
                <video ref= {videoRef}></video>
                <button onClick={takePhoto}>SNAP!</button>
              </div>
              <div className={'result ' + (hasPhoto ? ' hasPhoto' : '')}>
                <canvas ref = {photoRef}></canvas>
                <button onClick={closePhoto}>CLOSE!!!</button>
              </div>
            */}

      <div>
        <Card
          className='overflow-hidden'
          x-chunk='dashboard-07-chunk-4'>
          <CardHeader>
            <CardTitle>Skin Lesion Categories</CardTitle>
            <CardDescription>
              Three types of skin lesions analyzed by the AI models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 gap-4 items-stretch sm:grid-cols-2 lg:grid-cols-3'>
              <Card
                x-chunk='dashboard-05-chunk-1'
                className='flex flex-col items-center p-4'>
                <CardTitle className='p-2 min-h-16 text-center'>Melanoma</CardTitle>
                <img
                  src='./src/assets/mel.jpg'
                  alt='Melanoma'
                  className='aspect-square w-full rounded-md object-fit h-72'
                />
                <CardDescription className='mt-3 text-center'>
                  A serious type of skin cancer that develops from melanocytes. 
                  It can be deadly if not detected and treated early, but is 
                  highly treatable when caught in early stages.
                </CardDescription>
              </Card>
              <Card
                x-chunk='dashboard-05-chunk-1'
                className='flex flex-col items-center p-4'>
                <CardTitle className='p-2 min-h-16 text-center'>Nevus (Melanocytic Nevi)</CardTitle>
                <img
                  src='./src/assets/nv.jpg'
                  alt='Nevus'
                  className='aspect-square w-full rounded-md object-fit h-72'
                />
                <CardDescription className='mt-3 text-center'>
                  Commonly known as moles, these are benign (non-cancerous) 
                  growths of melanocytes. They appear in various shapes, sizes, 
                  and colors, and are generally harmless.
                </CardDescription>
              </Card>
              <Card
                x-chunk='dashboard-05-chunk-1'
                className='flex flex-col items-center p-4'>
                <CardTitle className='p-2 min-h-16 text-center'>Seborrheic Keratosis</CardTitle>
                <img
                  src='./src/assets/bkl.png'
                  alt='Seborrheic Keratosis'
                  className='aspect-square w-full rounded-md object-fit h-72'
                />
                <CardDescription className='mt-3 text-center'>
                  A common benign skin growth that appears as a brown, black, 
                  or tan growth. Often looks like a wart or skin cancer but is 
                  completely harmless and doesn't require treatment unless desired.
                </CardDescription>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2'>
        <Card x-chunk='dashboard-05-chunk-0'>
          <form
            onSubmit={handleSubmit}
            encType='multipart/form-data'>
            <CardHeader className='pb-3'>
              <CardTitle>Upload Skin Lesion Image</CardTitle>
              <CardDescription className='max-w-lg text-balance leading-relaxed'>
                Upload a clear image of the skin lesion to get AI-powered predictions from 3 different deep learning models
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <UploadPic setFile={setPhoto} />
                <p className='text-xs text-muted-foreground'>
                  Supported formats: JPG, PNG • Max size: 10MB • For best results, use well-lit, focused images
                </p>
              </div>
              {photo && (
                <div className='mt-4 space-y-2'>
                  <h4 className='text-sm font-medium'>Image Preview:</h4>
                  <div className='relative border-2 border-dashed rounded-lg p-2 bg-muted/20'>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt='Preview'
                      className='w-full max-h-96 object-contain rounded-lg'
                    />
                    <div className='absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs'>
                      {photo.name}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className='flex flex-col items-start gap-4 w-full'>
              <div className='flex gap-2 w-full'>
                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <>
                    <Button type='submit' className='flex-1' disabled={!photo}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Analyze Image
                    </Button>
                    {photo && (
                      <Button
                        type='button'
                        variant='outline'
                        onClick={() => setPhoto(null)}
                      >
                        Clear
                      </Button>
                    )}
                  </>
                )}
              </div>
              
              {results && (
                <div className='w-full space-y-3 pt-2'>
                  <div className='flex items-center gap-2'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <h3 className='font-semibold text-lg'>Analysis Result: </h3>
                  </div>
                  <div className='grid gap-3'>
                    <Card className='p-4 from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800'>
                      <div className='flex justify-between items-center'>
                        <div>
                          <p className='text-xs text-muted-foreground'>Model 1</p>
                          <span className='font-medium'>EfficientNet-B0</span>
                        </div>
                        <span className='font-bold text-lg text-blue-700 dark:text-blue-300'>
                          {results.model1}
                        </span>
                      </div>
                    </Card>
                    <Card className='p-4 from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800'>
                      <div className='flex justify-between items-center'>
                        <div>
                          <p className='text-xs text-muted-foreground'>Model 2</p>
                          <span className='font-medium'>ShuffleNetV2</span>
                        </div>
                        <span className='font-bold text-lg text-green-700 dark:text-green-300'>
                          {results.model2}
                        </span>
                      </div>
                    </Card>
                    <Card className='p-4 from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800'>
                      <div className='flex justify-between items-center'>
                        <div>
                          <p className='text-xs text-muted-foreground'>Model 3</p>
                          <span className='font-medium'>MobileNetV3</span>
                        </div>
                        <span className='font-bold text-lg text-purple-700 dark:text-purple-300'>
                          {results.model3}
                        </span>
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </CardFooter>
          </form>
        </Card>

        <Card x-chunk='dashboard-05-chunk-1' className='h-fit'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-2xl'>Model Information</CardTitle>
            <CardDescription>
              Ensemble of 3 CNN models for accurate predictions
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {/* <div>
              <div className='flex justify-between mb-2'>
                <span className='text-sm font-medium'>Ensemble Accuracy</span>
                <span className='text-sm font-bold'>57.33%</span>
              </div>
              <Progress value={57.33} aria-label='57.33% accuracy' />
            </div> */}
            
            <div className='space-y-2'>
              <h4 className='font-semibold text-sm'>Models Used:</h4>
              <div className='space-y-2'>
                <div className='flex items-start gap-2 text-sm'>
                  <div className='w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0'></div>
                  <div>
                    <p className='font-medium'>EfficientNet-B0</p>
                    <p className='text-xs text-muted-foreground'>Lightweight & Efficient</p>
                  </div>
                </div>
                <div className='flex items-start gap-2 text-sm'>
                  <div className='w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0'></div>
                  <div>
                    <p className='font-medium'>ShuffleNetV2</p>
                    <p className='text-xs text-muted-foreground'>Fast Inference</p>
                  </div>
                </div>
                <div className='flex items-start gap-2 text-sm'>
                  <div className='w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0'></div>
                  <div>
                    <p className='font-medium'>MobileNetV3-Small</p>
                    <p className='text-xs text-muted-foreground'>Mobile-Optimized</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='space-y-2'>
              <h4 className='font-semibold text-sm'>Detected Classes:</h4>
              <div className='grid grid-cols-1 gap-2'>
                <div className='flex items-center gap-2 text-sm bg-muted/50 rounded-md p-2'>
                  <span className='text-red-600'>●</span>
                  <span>Melanoma (Skin Cancer)</span>
                </div>
                <div className='flex items-center gap-2 text-sm bg-muted/50 rounded-md p-2'>
                  <span className='text-yellow-600'>●</span>
                  <span>Nevus (Mole)</span>
                </div>
                <div className='flex items-center gap-2 text-sm bg-muted/50 rounded-md p-2'>
                  <span className='text-orange-600'>●</span>
                  <span>Seborrheic Keratosis</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex flex-col items-start pt-2 border-t'>
            <p className='text-xs text-muted-foreground'>Developed by</p>
            <p className='font-semibold'>Steven Liementha</p>
          </CardFooter>
        </Card>
      </div>

    </div>
  )
}

// const getVideo = () => {
//   navigator.mediaDevices
//       .getUserMedia({video: {width: 1920, height: 1080}})
//       .then((stream) => {
//         const video = videoRef.current
//         if (video) {
//           video.srcObject = stream
//           // video.play()
//           //   .then(() => {
//           //     // Video is playing
//           //   })
//           //   .catch(err => {
//           //     console.error("Error playing video:", err);
//           //   });
//         }
//       })
//       .catch((err) => {
//         console.error('Error accessing media devices:', err)
//       })
// }
//
// useEffect(() => {
//   // getVideo();
// }, [videoRef])
//
// const takePhoto = () => {
//   const width = 414
//   const height = width / (16 / 9)
//   const video = videoRef.current
//   const photo = photoRef.current
//   photo.width = width
//   photo.height = height
//
//   const ctx = photo.getContext('2d')
//   ctx.drawImage(video, 0, 0, width, height)
//   setHasPhoto(true)
// }
//
// const closePhoto = () => {
//   const photo = photoRef.current
//   const ctx = photo.getContext('2d')
//   ctx.clearRect(0, 0, photo.width, photo.height)
//   setHasPhoto(false)
// }

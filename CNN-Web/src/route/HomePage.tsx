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
import { Progress } from '@/components/ui/progress.tsx'
import { ToastAction } from '@/components/ui/toast.tsx'
import { useToast } from '@/components/ui/use-toast.ts'

export const HomePage = () => {
  // const videoRef = useRef<HTMLVideoElement>(null)
  // const photoRef = useRef(null)

  // const [data, setData] = useState()
  const { toast } = useToast()
  const [isLoading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
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
        `http://localhost:5000/getresult`,
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
        setResult(res.data.result)
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
            <CardTitle>Cancer Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 gap-2 items-stretch sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
              <Card
                x-chunk='dashboard-05-chunk-1'
                className='flex flex-col items-center p-2 w-full max-w-xs'>
                <CardTitle className='p-2 min-h-16'>
                  Actinic Keratoses
                </CardTitle>
                <img
                  src='./src/assets/akiec.png'
                  alt='Preview'
                  className='aspect-square w-full rounded-md object-cover h-48'
                />
                <CardDescription>
                  Types of squamous cell carcinoma that are noninvasive and can
                  be treated locally without surgery
                </CardDescription>
              </Card>
              <Card
                x-chunk='dashboard-05-chunk-1'
                className='flex flex-col items-center p-2 w-full max-w-xs'>
                <CardTitle className='p-2 min-h-16'>
                  Basal Cell Carcinoma
                </CardTitle>
                <img
                  src='./src/assets/bcc.png'
                  alt='Preview'
                  className='aspect-square w-full rounded-md object-cover h-48'
                />
                <CardDescription>
                  A type of epithelial skin cancer that seldom spreads but, if
                  lef untreated, can be fatal.
                </CardDescription>
              </Card>
              <Card
                x-chunk='dashboard-05-chunk-1'
                className='flex flex-col items-center p-2 w-full max-w-xs'>
                <CardTitle className='p-2 min-h-16'>
                  Benign Keratosis-like Lesions
                </CardTitle>
                <img
                  src='./src/assets/bkl.png'
                  alt='Preview'
                  className='aspect-square w-full rounded-md object-cover h-48'
                />
                <CardDescription>
                  Seborrheic keratoses, lichen-planus like keratoses, and solar
                  lentigo, correlate to a seborrheic keratosis or a sun lentigo
                  with regression and infammation, are all examples of “benign
                  keratosis”
                </CardDescription>
              </Card>
              <Card
                x-chunk='dashboard-05-chunk-1'
                className='flex flex-col items-center p-2 w-full max-w-xs'>
                <CardTitle className='p-2 min-h-16'>Dermatofibroma</CardTitle>
                <img
                  src='./src/assets/df.jpg'
                  alt='Preview'
                  className='aspect-square w-full rounded-md object-cover h-48'
                />
                <CardDescription>
                  Skin lesions that are either benign growth or an infammatory
                  response to minor trauma
                </CardDescription>
              </Card>
              <Card
                x-chunk='dashboard-05-chunk-1'
                className='flex flex-col items-center p-2 w-full max-w-xs'>
                <CardTitle className='p-2 min-h-16'>Melanoma</CardTitle>
                <img
                  src='./src/assets/mel.jpg'
                  alt='Preview'
                  className='aspect-square w-full rounded-md object-cover h-48'
                />
                <CardDescription>
                  Melanoma is a cancerous tumour that develops from melanocytes
                  and can take many diferent forms. If caught early enough, it
                  can be treated with a basic surgical procedure
                </CardDescription>
              </Card>
              <Card
                x-chunk='dashboard-05-chunk-1'
                className='flex flex-col items-center p-2 w-full max-w-xs'>
                <CardTitle className='p-2 min-h-16'>Melanocytic Nevi</CardTitle>
                <img
                  src='./src/assets/nv.jpg'
                  alt='Preview'
                  className='aspect-square w-full rounded-md object-cover h-48'
                />
                <CardDescription>
                  Skin lesions are benign neoplasms of melanocytes and appear in
                  a variety of shapes and sizes. From a dermatoscopic
                  standpoint, the variants may difer dramatically
                </CardDescription>
              </Card>
              <Card
                x-chunk='dashboard-05-chunk-1'
                className='flex flex-col items-center p-2 w-full max-w-xs'>
                <CardTitle className='p-2 min-h-16'>Vascular Lesions</CardTitle>
                <img
                  src='./src/assets/vasc.jpg'
                  alt='Preview'
                  className='aspect-square w-full rounded-md object-cover h-48'
                />
                <CardDescription>
                  Cherry angiomas, angiokeratomas, and pyogenic granulomas are
                  examples of benign or malignant angiomas
                </CardDescription>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <Card x-chunk="dashboard-05-chunk-0">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col lg:flex-row">
            <div className="flex-1">
              <CardHeader className="pb-3">
                <CardTitle>Upload Cancer Picture</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  <UploadPic setFile={setPhoto} />
                </CardDescription>
              </CardHeader>
              <CardFooter>
                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <Button type="submit">Get Result</Button>
                )}
                <div className="block">
                  <pre>
                    {'-> Result : '}{result}
                  </pre>
                </div>
              </CardFooter>
            </div>
              {photo && (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Preview"
                  className="m-2 object-cover rounded-lg shadow-sm"  
                />
              )}
          </form>
        </Card>

        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>CNN Model Accuracy</CardDescription>
            <CardTitle className="text-4xl">79.5%</CardTitle>
            <Progress value={79.5} aria-label="79.5% increase" />
          </CardHeader>
          <CardFooter>
            <CardDescription>Made By:</CardDescription>
            <CardDescription>- Steven Liementha</CardDescription>
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

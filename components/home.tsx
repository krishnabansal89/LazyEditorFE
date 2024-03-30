"use client"
import { useState  , useRef , useEffect} from "react"
import { UploadIcon , ArchiveX , FileOutput } from "lucide-react";
import toast from "react-hot-toast";


export default function Home() {
  const [file , setFile] = useState<any>(null)
  const [id , setId] = useState<string>("")
  const [video , setVideo] = useState<any>(null)
  const DragandDropRef = useRef<HTMLDivElement>(null)
  const data:FormData = new FormData()
  const handleChange = function(event:any) {
    setFile(Array.from(event.target.files))
    // console.log(file)
    for(const files in file)
    {
      data.append('file', files)
    }
    // console.log(data)
  }
  const Toast = {
    SuccessshowToast: (message: string) => {
        toast.success(message, {
            style: {
                border: "1px solid #28a745",
                padding: "16px",
                color: "#fff",
                backgroundColor: "#000",
                
            },
            iconTheme: {
                primary: "#000",
                secondary: "#28a745",
            },
        });
    },

    ErrorshowToast: (message: string) => {
        toast.error(message, {
            style: {
                border: "1px solid #dc3545",
                padding: "16px",
                color: "#fff",
                backgroundColor: "#000",
            },
            iconTheme: {
                primary: "#000",
                secondary: "#dc3545",
            },
        });
    },
    InfoshowToast: (message: string) => {
        toast(message, {
            style: {
                border: "1px solid #17a2b8",
                padding: "16px",
                color: "#fff",
                backgroundColor: "#000",
            },
            iconTheme: {
                primary: "#000",
                secondary: "#17a2b8",
            },
        });
    },  
  }

  const handleSubmit = async function(event:any) {
    event.preventDefault()
    Toast.InfoshowToast("Helloooo")
    if (file === null || file.length === 0) return;
    console.log("Submitted")
    const data_: FormData = new FormData()
    // data_.append('file', file[0])
    for (const files in file) {
      console.log(files)
      data_.append('file', file[files])
    }
    console.log(data_)
    const res = await fetch('http://13.60.46.147:80/uploadfiles/', {
      headers: {
        'uId': id,
      },
      method: 'POST',
      body: data_,
    })
    console.log(res)
  }
  const getVideo = async function() {
    const res = await fetch('http://13.60.46.147:80/get-video/' , {headers: {'uId': id,}})
    var value = URL.createObjectURL(await res.blob());
    setVideo(value)
    const doc = document.createElement('a')
    doc.href = value
    doc.download = 'video.mp4'
    doc.click()
    console.log("respose is this " ,value)
  }

  
  const handleDragOver = function(event:any) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
    DragandDropRef.current? DragandDropRef.current.style.backgroundColor = "red" :
    console.log("Dragging")
  }
  const handleDrop = function(e:any)
  {
    console.log("Dropeed")
    e.preventDefault()
    setFile(Array.from(e.dataTransfer.files))
    // for(const files in file)
    // {
    //   data.append('file', file[files])
    // }
  }
  const handleInputClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.addEventListener('change', (event:any) => {
      setFile(Array.from(event.target.files))
    });
    fileInput.click();
  };

  const deleteFiles = async function() {
    const res = await fetch('http://13.60.46.147:80/delete-files/', {
      headers: {
        'uId': id,
      },
      method: 'DELETE',
    })
    console.log(res)
  }

  useEffect(() => {
    const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('myCookie='))
    ?.split('=')[1];

    
    if (!cookieValue) {
      
      const genId = makeid(10)
      document.cookie = 'myCookie='+genId;
      console.log('Cookie has been set ' + genId)
      setId(genId)
    }
    else{
      console.log('Cookie is already set ' + cookieValue)
      setId(cookieValue)
    }
    // console.log(cookieStore)
  }
  , [])


  return <div className="flex flex-col items-center space-y-14">
    {/* <form onSubmit={handleSubmit}>
    <input type="file" onChange={handleChange} name="input_file" multiple />
    <button type="submit">Submit</button>
    </form> */}
    <div className="w-[80%] h-[40vh] mx-auto mt-[20vh] rounded-[10vw] bg-gray-950 flex justify-center items-center custom-font text-white text-3xl border-2 border-dashed border-gray-500"
        ref={DragandDropRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop} 
        onDropCapture={handleDrop}
        onClick={handleInputClick}
        >
      Upload
    </div>
    <div className=" flex justify-center space-x-20 ">
      <button onClick={handleSubmit} >
        <UploadIcon size={38} color="white"></UploadIcon>
      </button>
      {id && <button onClick={deleteFiles}>
        <ArchiveX size={38} color="white"></ArchiveX>
      </button>}
      
    </div>
    <div className="w-36 mx-auto flex mt-20 custom-font items-center justify-center h-16 rounded-2xl text-white text-2xl bg-gray-950 border-2 border-dotte border-gray-900 ">
      <button onClick={getVideo}>Render</button>
    </div>
    
  </div>
}


function makeid(length:number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
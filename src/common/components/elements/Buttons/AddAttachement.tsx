/**
 * AddAttachment is a button that will allow a user add attachments to
 * posts created. The element will update attachment array 
 * (containing the actual files) and metadata (containing data about the 
 * file used by the post to fetch the files from an S3 bucket)
 */
import { useState } from "react"
import {BiImageAlt} from 'react-icons/bi';
import {AiOutlineCloudUpload} from 'react-icons/ai'
import {VscClose, VscMarkdown} from 'react-icons/vsc'
import {AiOutlineFileMarkdown} from 'react-icons/ai'

type Props = {
  postAttachement: File[]
  setPostAttachements: (p) => void
  attachmentMetadata: string[][]
  setAttachmentMetadata: (p:any) => void
  type: string
}


const AddAttachement:React.FC<Props> = ({postAttachement, setPostAttachements, attachmentMetadata, setAttachmentMetadata, type}) => {

  const [showFileUpload, setShowFileUpload] = useState<boolean>(false)
  const [dragActive, setDragActive] = useState<boolean>(false)

  /**
   * handleDrag is called whenever a drag event is recoded above the 
   * fileupload square. It is used to update the styling of the upload
   * square to give the user feedback on their actions.
   * @param e 
   */
  const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(e.type === "dragenter" || e.type === "dragover"){
            setDragActive(true)
        }
        else if(e.type === "dragleave"){
            setDragActive(false)
        }
    }

    /**
     * handleDrop is called whenever a user has drops a file into the 
     * upload square.
     * @param e event that contains a dataTransfer object
     */
    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if(e.dataTransfer.files && e.dataTransfer.files[0]){
            handleMetaData(e.dataTransfer.files[0])
        }
    }

    /**
     * handleChange is called when a user has chosen a file from a 
     * file slector on their OS.  
     * @param e 
     */
    const handleChange = (e) => {
        e.preventDefault()
        if(e.target.files && e.target.files[0]){
            handleMetaData(e.target.files[0])
        }
    }

    /**
     * handleMetaData will extract necessary data from the uploaded file
     * and append it to the metadata array provided to the element.
     * @param f 
     */
    const handleMetaData = (f:File) => {
      setPostAttachements(p => [...p, f])
      var t = (new Date()).toLocaleDateString("sv-SV")

      // Standard naming convention for uploaded files in f4rmhouse
      const remoteFilename:string = `https://f4-public.s3.eu-central-1.amazonaws.com/posts/${t}/${f.name}`

      if(f.type.split("/")[0] === "image"){
        // Append filename, file Mime type and dimensions to metadata array
        extractImageData(remoteFilename, f)
      }
      else if (f.type.split("/")[0] === "video"){
        // Append filename, file Mime type and dimensions to metadata array
        extractVideoData(remoteFilename, f)
      }
      else{
        setAttachmentMetadata(p => [...p, [remoteFilename, f.type, "na"]])
      }
    }

    /**
     * Depending on the MIME type give a preview of the file uploaded.
     * Currently only videos and images supported, if file not an image
     * show the MIME type
     * @param f 
     * @returns either <video> <img> or <p> component
     */
    const filePreview = (f) => {
      const t = f.type.split("/")[0]
      const objectUrl = URL.createObjectURL(f)
      switch(t){
        case "video":
          return (
          <video muted controls loop className="rounded-xl">
            <source src={objectUrl}/>
          </video>
          )
        case "image":
          return <img src={objectUrl} className="rounded-xl"/>
        default:
          return <p className="m-auto">{f.name}<br/>{f.type}</p>
      }
    }

    /**
     * Removes an attachement from both attachement and metadata arrays
     * @param i index to remove
     */
    const removeAttachement = (i) => {
       setPostAttachements([...postAttachement.slice(0,i), ...postAttachement.slice(i+1)]) 
       setAttachmentMetadata([...attachmentMetadata.slice(0,i), ...attachmentMetadata.slice(i+1)]) 
    }

    /**
     * extractImageData will extract dimensions of image in pixels and the MIME type of the file
     * and append it to the attachment metadata
     * @param remoteFilename the filename to be created
     * @param f the file
     */
    const extractImageData = (remoteFilename:string, f:File) => {
      var reader = new FileReader()
        reader.onload = (file) => {
          var image = new Image()
          if(file.target?.result){
            image.src = String(file.target?.result)
            image.onload = () => {
              var dimensions = image.width + "," + image.height
              setAttachmentMetadata(p => p.concat([[remoteFilename, f.type, dimensions]]))
            }
          }
        }
        reader.readAsDataURL(f)
    }

    /**
     * extractVideoData will extract dimensions of video in pixels and the MIME type of the file
     * and append it to the attachment metadata
     * @param remoteFilename the filename to be created
     * @param f the file
     */
    const extractVideoData = (remoteFilename:string, f:File) => {

      var video = document.createElement("video")
      video.onloadedmetadata = () => {
        var dimensions = video.videoWidth + "," + video.videoHeight 
        setAttachmentMetadata(p => [...p, [remoteFilename, f.type, dimensions]])
      }
      video.onerror = () =>{
        console.error("Can't upload video")
      }
      video.src = URL.createObjectURL(f)

    }

  return(
    <div className="mr-2">
      {type == "text" ?
        <div className="flex cursor-pointer transition-all hover:text-pink-500" onClick={() => setShowFileUpload(p => !p)}>
          <p className="text-md">Upload markdown document</p> 
          <AiOutlineFileMarkdown size={30}/>
        </div>
        :
        <BiImageAlt size={20} onClick={() => setShowFileUpload(p => !p)}/>
      }
      {showFileUpload ?
        <div className="grid grid-cols-4 gap-3" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
          <input id="input-file-upload" type="file" multiple={true} className="hidden" onChange={handleChange}/>
          <label htmlFor='input-file-upload'>
            <div className={ !dragActive ? "grid col-start-0 col-span-1 w-[100%] h-[100%] bg-gray-100 hover:bg-gray-50 dark:bg-gray-800 rounded-md mb-2 dark:hover:bg-gray-700 transition-all border-gray-300 dark:border-gray-600 border-dashed border-2 cursor-pointer" : "w-[20vh] h-[20vh] bg-gray-700 rounded-md mb-2 border-gray-600 border-dashed border-2"}>
              <div className="p-2 pt-[38%] text-center">
                {type == "text" ?
                  <>
                    <AiOutlineFileMarkdown className="text-2xl m-auto"/>
                    <p className="text-sm">Drag or click here to upload you're <b>.md</b> file</p>
                  </>
                  :
                  <>
                    <AiOutlineCloudUpload className="text-2xl m-auto"/>
                    <p className="text-sm">Drag file or click here to upload</p>
                  </>
                }
              </div>
            </div>
          </label>
          {postAttachement.map((f,i) => {
            return(
              <div className="relative grid col-span-1 gap-5 rounded-xl border-gray-300 dark:border-gray-600 border-dashed">
                <div >
                  <div onClick={() => removeAttachement(i)}className="absolute right-0 text-2xl cursor-pointer transition-all hover:bg-gray-100 hover:bg-opacity-25 rounded-full">
                    <VscClose className="text-gray-100"/>
                  </div>
                  {filePreview(f)}
                </div>
              </div>
            )
          })}
        </div>
        :
        <></>
      }
    </div>
  )
}

export default AddAttachement
import { useState, useEffect, useContext } from 'react' 
import Image from 'next/image'
import { AppContext } from '../../../../context/state'

type Props = {
  content:string 
  creator:string
}

const Post: React.FC<Props> = ({creator, content}) => {

  const {user, setUser, activeEdit, setActiveEdit} = useContext(AppContext); 
  
  const [profileSrc, setProfileSrc]         = useState<string>("sofie.png")
  const [headerImg, setHeaderImg]           = useState("")
  const [hasAttachement, setHasAttachement] = useState<boolean>(false)
  const [focus, setFocus]                   = useState<boolean>(false)
  const [editActive, setEditActive]         = useState<boolean>(false)
  const [showSettings, setShowSettings]     = useState<boolean>(false)
  const [mainBody, setMainBody]             = useState<string>("")

  useEffect(() => {
    
    // Temporary, users not defined yet, using placeholders for now
    var image:any = ["sofie.png", "38.png"][Math.round(Math.random())]

    setProfileSrc(image)

    // If post has header set header image here
  }, [])

  /**
   * Load a profile image 
   * @param param0 filename
   * @returns a URL like to the profile image
   */
  const profileLoader = ({src}) => {
    return `https://f4-public.s3.eu-central-1.amazonaws.com/${src}`
  }


  return(
    <div className="border dark:border-gray-800">
      <a 
        className={focus ? "z-0 grid grid-cols-10 w-[100%] bg-red-100 transition-all dark:bg-red-900 rounded-2xl" : "grid grid-cols-10 w-[100%] transition-all dark:border-zinc-800"}
      >
        <div className="col-span-10 pl-4 pt-2 pb-0">
          <>
          {
            headerImg.length > 0 ?
              <div className="flex relative h-[20em] mb-6">
                <img 
                  src={headerImg} 
                  className="object-cover rounded-xl h-[100%] w-full" 
                />
              </div>
              :
              <div className="h-0"></div>
          }
          </>
          <div className="grid grid-cols-2">
            <p className="grid col-start-1 col-span-1 text-xs text-gray-900 dark:text-gray-400">
              {creator}{" "}
              <span className="
                dark:hover:text-gray-50 
                hover:text-gray-900 
                hover:underline
                ">
                {creator}
              </span>
            </p>
          </div>
        </div>
        <div className="
          grid
          col-start-0
          col-span-2
          sm:col-span-1
          place-items-start
          pr-5
          pl-5
          ">
          <Image 
            className="
            inline 
            object-cover 
            rounded-tl-xl 
            rounded-tr-xl
            rounded-bl-xl 
            rounded-br-xl
            transition-all
            group-hover:rounded-tl-3xl 
            group-hover:rounded-tr-4xl
            group-hover:rounded-bl-3xl 
            group-hover:rounded-br-3xl
            " 
            loader={profileLoader}
            src={profileSrc} 
            width="100%"
            height="100%"
            alt="Profile image"
          />
        </div>
        <div className="grid col-start-2 col-span-9">
          <>
            <p>{content}</p>
          </>
        </div>
      </a>
    </div>
   )
}

export default Post;

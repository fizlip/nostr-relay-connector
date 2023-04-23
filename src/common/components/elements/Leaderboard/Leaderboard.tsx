/**
Author: Filip Zlatoidsky

Leaderborad shows a list of a set of specific users and their accomlishments.
This components should, based on a list of users, fetch the correct informantion
and through an animation show the next user inline until the animation gets 
to the last user where we will show the 1st user again.
*/
import Image from 'next/image'
import {useState} from 'react'

const Leaderboard: React.FC = () => {

  const [src, setSrc] = useState("sofie.jpg")
  const [imgSrc, setImgSrc] = useState<string>("sofie.png")

  const imgLoader = ({src}: {src: string}) => {
    return `https://f4-public.s3.eu-central-1.amazonaws.com/${src}`
  }

  return(
    <div className="
      h-[100%] 
      rounded 
      bg-gray-50
      dark:bg-transparent
      font-mono
      text-gray-900
      ">
      <div className="p-2">
        <div className="m-2 p-2">
          <p className="text-md text-gray-900 dark:text-white">
            <p className="text-md font-headline text-teal-500"><b>HALL OF FAME</b></p>
          </p>
        </div>
        <div className="
          grid
          grid-cols-10
          p-4 
          rounded-md 
          shadow 
          text-gray-900 
          dark:text-gray-50
          dark:bg-gradient-to-tr
          dark:from-slate-800
          dark:to-slate-900
          ">
            <div className="
            grid
            col-start-0
            col-span-2
            ">
              <Image 
                className="inline object-cover rounded-full" 
                loader={imgLoader}
                src={imgSrc} 
                width="100%"
                height="100%"
                alt="Profile image"
                />
            </div>
            <div className="grid col-start-3 col-span-8 text-xs p-2">
              <p>Created F4rmhouse.</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard;
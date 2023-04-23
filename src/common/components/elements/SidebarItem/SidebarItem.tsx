import { useState, useEffect } from 'react' 

export default function SidebarItem(params){
  const [content, setContent] = useState(params.content)
  const [url, setUrl] = useState(params.url)
  const [icon, setIcon] = useState(params.icon)

  return(
    <div className="
      grid
      text-right
      dark:text-gray-300
      hover:font-bold
      p-1
      mt-5
      flex
      group
      " 
    >
      <a href={url} className="grid place-items-end dark:hover:text-white">
        <div className="flex flex-row">
          <p className="
            pr-2 
            text-gray-50 
            dark:text-black
            dark:group-hover:text-white
            group-hover:text-black
            text-white
            transition-all
            ">{content}</p> <div>{icon}</div>
        </div>
      </a>
    </div>

  )
}


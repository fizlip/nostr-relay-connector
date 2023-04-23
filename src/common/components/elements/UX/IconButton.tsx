import {useState} from 'react'

const IconButton = ({children, onClick}) => {
    return(
        <button onClick={() => onClick()} className="transition-all rounded-full hover:bg-zinc-700 p-4">
            {children}
        </button>
    )
}

export default IconButton;
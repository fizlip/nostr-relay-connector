import { useState } from "react"

type Props = {
    tip: string
}

const Tooltip:React.FC<Props> = ({tip}) => {
    return (
        <div className="delay-250 transition-all absolute w-[10vw] bg-zinc-800 text-white mt-[250%] text-center opacity-0 rounded-md group-hover:opacity-75 p-1">
            <div className="absolute top-[-20%] left-[45%] border-solid border-b-black border-b-8 border-x-transparent border-x-8 border-t-0 rounded-full"></div>
            <div className="">{tip}</div>
        </div>
    )
}

export default Tooltip;
import {useState} from 'react';

type Props = {
    action: (() => void)
}

const DropDownItem:React.FC<Props> = ({action, children}) => {
    return(
        <div onClick={() => action()} className="cursor-pointer transition-all dark:hover:bg-zinc-800 hover:bg-gray-200 text-left bg-white dark:bg-zinc-900 w-[100%] p-1 pl-4">
            <button onClick={() => action()}>
                {children}
            </button>
        </div>
    )
}

export default DropDownItem;
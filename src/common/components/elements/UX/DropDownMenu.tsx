import {useState} from 'react';

import {MdOutlineExpandMore} from "react-icons/md";


const DropDownMenu = ({content, children}) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div>
            <button onClick={() => setOpen(true)} className="p-1 hover:bg-gray-200 dark:hover:bg-neutral-700 relative flex border border-neutral-200 dark:border-neutral-700 w-[100%] text-sm rounded text-left">
                {content}
                <div className="absolute right-0 p-1">
                    <MdOutlineExpandMore />
                </div>
            </button>
            {open ?
                <div onMouseLeave={() => setOpen(false)} className="relative">
                    <div className='absolute w-[10vw] z-10 shadow'>
                        {children}
                    </div>
                </div>
                :
                <></>
            }
        </div>
    )
}

export default DropDownMenu;
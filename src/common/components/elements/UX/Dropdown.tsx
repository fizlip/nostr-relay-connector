import {useState} from 'react'

import {IoMdArrowDropdown} from 'react-icons/io'
import { IconType } from 'react-icons/lib'

type Props = {
    items: string[],
    icons: any[][],
    actions: (() => (void))[][]
}

const Dropdown:React.FC<Props> = ({items, icons, actions}) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleAction = (id:number, fid: number) => {
        actions[id][fid]();
        setOpen(false);
    }

    return(
        <>
        {!open ? 
            <button onClick={() => (setOpen(true))} onMouseEnter={() => setOpen(true)}
                className="transition-all rounded-full cursor-pointer rounded-full p-1"><IoMdArrowDropdown size={20} />
            </button>
            :
            <div className="relative rounded" onMouseLeave={() => setOpen(false)}>
                <button onClick={() => (setOpen(false))}
                    className="transition-all rotate-180 text-red-500 rounded-full cursor-pointer rounded-full"><IoMdArrowDropdown size={20} />
                </button>
                <div className="border bg-white dark:bg-black dark:border-zinc-900 rounded absolute w-[10vw] z-10 top-5 right-0">
                    {items.map((e,i) => (
                        <div className="flex relative hover:text-white dark:bg-black dark:hover:bg-red-500 hover:bg-red-500 cursor-pointer">
                            <p className="p-2">{e}</p>
                            <div className="absolute flex right-0 h-[100%]">
                            {icons[i].map((icon,j) => (
                                <div onClick={() => handleAction(i,j)} className="p-3 hover:bg-red-300">
                                    {icon}
                                </div>
                            ))
                            }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        }
        </>
    )
}

export default Dropdown;
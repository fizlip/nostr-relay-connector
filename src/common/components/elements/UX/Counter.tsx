import {useState} from 'react';
import {MdRemove, MdAdd} from 'react-icons/md';

const Counter = ({action}) => {
    const [current, setCurrent] = useState<number>(16);
    const ICON_SIZE = 13;
    const MAX_VALUE = 512;
    const MIN_VALUE = 4; 

    const updateCurrent = (num:number) => {
        if(isNaN(num)){
            setCurrent(MIN_VALUE);
            return;
        }
        else if(num > MAX_VALUE) {
            console.log("DEBUG: max");
            setCurrent(MAX_VALUE);
        }

        else if(num < MIN_VALUE) {
            setCurrent(MIN_VALUE)
        }
        else{
            setCurrent(num);
            action(num);
        }
    }

    return (
        <div className="">
            <div className="p-2 flex">
                <button className="transition-all hover:bg-gray-200 dark:hover:bg-zinc-800 border dark:border-zinc-700 p-2 rounded-l" onClick={() => updateCurrent(current - 1)}><MdRemove size={ICON_SIZE}/></button>
                <input className="w-[50px] dark:bg-zinc-900 h-auto text-sm text-center pt-0 border-t border-b dark:border-zinc-700" type="text" onBlur={() => updateCurrent(current)} onChange={(e) => setCurrent(Number(e.target.value))} value={String(current)}/>
                <button className="transition-all border p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-r dark:border-zinc-700" onClick={() => updateCurrent(current + 1)}><MdAdd size={ICON_SIZE}/></button>
            </div>
        </div>
    )
}

export default Counter;
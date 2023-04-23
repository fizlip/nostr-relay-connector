import { useState } from "react"
import Tooltip from "../UX/Tooltip";

type Props = {
    action: (e) => void
    tooltip: string
}

const CircularIconButton:React.FC<Props> = ({tooltip, action, children}) => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    return (
        <div className="relative group flex items-center justify-center">
            <button onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className="transition-all rounded-full text-zinc-600 dark:text-zinc-200 hover:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-400 dark:hover:text-zinc-400 mr-1 p-2 p-3" onClick={action}>{children}</button>
            <Tooltip tip={tooltip}/>
        </div>
        )
}

export default CircularIconButton;
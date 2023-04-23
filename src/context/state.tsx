/**
 * state.tsx stores shared state variables that are available 
 * in all components of the F4rmhouse.
 * 
 * It is provided by enclosing the components that should
 * be able to access the state with the <AppProvider> component.
 * And then using the useContext function to access the state you
 * want to access.
 * 
 * Some helpful tricks:
 * 1. always import: 
 * import { AppContext } from "../../../../context/state";
 * import { AppContextType } from "../../../types/appContext";
 * and useContext from 'react'
 * 2. then use:
 * const {... whatever variable,...} = useContext(AppContext) as AppContextType
 */
import * as React from "react";
import {IUser} from "../common/types/user";
import {AppContextType} from "../common/types/appContext"
import { stringify } from "querystring";
import { BlockType } from "../common/types/BlockType";

// Create context and temporarily set value of context to 'null'
export const AppContext = React.createContext<AppContextType>({} as AppContextType);

// Create context and set default value to state
const AppProvider: React.FC<React.ReactNode> = ({ children }):any => {

    const [user, setUser]               = React.useState<IUser>({address: "", nick: "", lastLogin: 0, reputation: 0}) 
    const [theme, setTheme]             = React.useState<string>("dark") 
    const [activeEdit, setActiveEdit]   = React.useState<string>("") 
    const [article, setArticle]         = React.useState<BlockType[][]>([])
    const [relay, setRelay]             = React.useState<any>(null)
    const [sk, setSK]             = React.useState<string>("")
    const [pk, setPK]             = React.useState<string>("")
    const [currentRelay, setCurrentRelay]             = React.useState<string>("")

    const [articleStatus, setArticleStatus]         = React.useState<string>("writing")
    const [sub, setSub]         = React.useState<any>(null)

    return (
        <AppContext.Provider value={
            {
                user, setUser, 
                theme, setTheme, 
                activeEdit, setActiveEdit, 
                article, setArticle, 
                articleStatus, setArticleStatus,
                relay, setRelay,
                sk, setSK,
                pk, setPK,
                currentRelay, setCurrentRelay,
                sub, setSub,
            }
        }>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
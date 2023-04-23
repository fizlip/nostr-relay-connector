/**
 * MetaMashAuth.tsx is a commponent that allows a user to login
 * using their MetaMask browser wallet. 
 * 
 * The component utilises functions given in the window.ethereum API.
 * By sending requests to the API we activate the needed functions of
 * the wallet.
 */

import {useEffect, useState, useContext} from "react"
import { AppContext } from "../../../../context/state";
import { AppContextType } from "../../../types/appContext";

import UsersAPI from '../../../utils/Users'

/**
 * getUser will get a user given an address 
 * @param address -- address of user you want to get
 * @returns -- promise containing user item
 */
const getUser = (address) => {
    var us = new UsersAPI()
    us.setParams([address])
    return us.getAddress()
}

/**
 * createUser will create a new user item 
 * @param address -- address of new user
 */
const createUser = (address) => {
    var us = new UsersAPI()
    us.setBody({"Address": address})
    us.create()?.then(r => {
    })
    .catch(err => {
        console.error("There was an error creating a new user", err)
    })
}

/**
 * updateUser will update a users last login
 * @param address -- address of user
 * @param nick -- f4rmhouse nick of user
 */
const updateUser = (address: string, nick: string) => {
    var us = new UsersAPI()
    var ms = (new Date()).getTime()
    us.setBody({
        "Address": address, 
        "Nick": nick, 
        "Column": "LastLogin", 
        "Value": String(ms)
    })
    us.update()?.then(_ => {
    })
    .catch(err => {
        console.error(err)
    })
}

/**
 * Connect will communicate with the wallet API by sending a 
 * 'eth_rquestAccounts' request. This will initiate a login sequence
 * which will prompt the user to login 
 * @param onConnected -- callback used to set account name when login done
 * @param setRequestInProgress -- determines when 'in progress' state of button should be activated
 */
const connect = async (onConnected, setRequestInProgress)=>{
    // Activate loading
    setRequestInProgress(true)
    try{
        // Request login and when done store output in variable
        let reqAccs = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Set login address
        const address = reqAccs[0]
        onConnected({address: address})
        const user = getUser(address).then(r => {
            if(r?.data.User.address == ""){
                // user does not exists, first time login
                createUser(address)
            }
            else{
                onConnected({
                    address: address, 
                    nick: r?.data.User.nick, 
                    lastLogin: r?.data.User.lastLogin, 
                    reputation: r?.data.User.reputation
                })
                updateUser(address, r?.data.User.nick)
            }
        })
        // Login process is done
        setRequestInProgress(false)
    }
    catch(err) {
        // Login process is done
        setRequestInProgress(false)
    }
}

/**
 * Main button for login. Has two states 'logged in' and 'login in progress'.
 * Different values shown based on login status
 * @returns 
 */
const Connect = () => {
    const [requestInProgress, setRequestInProgress] = useState(false)
    const {setUser} = useContext(AppContext) as AppContextType;

    return(
        <>
        {!requestInProgress ?
            <button 
            className="
            md:flex
            justify-center
            border-2
            border-orange-200
            dark:border-orange-900
            dark:bg-zinc-900
            rounded
            dark:text-gray-200
            p-2
            hover:shadow-f4-light
            transition-all
            dark:hover:shadow-f4-dark
            "
            onClick={() => connect(setUser, setRequestInProgress)}
            >
                <img className="w-[25px] mr-2"src="https://raw.githubusercontent.com/MetaMask/brand-resources/c3c894bb8c460a2e9f47c07f6ef32e234190a7aa/SVG/metamask-fox.svg" />
                Login with MetaMask
            </button>
        :
            <p className="
            md:flex
            justify-center
            border-2
            border-pink-500
            dark:border-pink-700
            dark:bg-zinc-900
            rounded
            dark:text-gray-200
            p-2
            transition-all
            animate-pulse
            ">
                Login in progress... 🕵️
            </p>
        }
        </>
    );
}

type Props = {
    address: string
}

/**
 * Shows the address they used to login in with
 * @param param0 
 * @returns 
 */
const Address: React.FC<Props> = ({address}) => {
    return(
        <span>{address.substring(0,5)}...{address.substring(address.length-4)}</span>
    )
}

/**
 * Main wrapper for all login logic, will check that MetaMask is installed
 * if not a message is shown otherwise the <Connect> button is shown.
 * @returns 
 */
const MetaMaskAuth = () => {
    const [address, setAddress] = useState<string>("")
    const [metaMaskInstalled, setMetaMaskInstalled] = useState(false)
    const {user} = useContext(AppContext) as AppContextType;

    useEffect(() => {
        // Ensure MetaMask is installed on machine
        if(!window.ethereum){
            setMetaMaskInstalled(false)
        }
        else{
            setMetaMaskInstalled(true)
        }
        // Check if user already authenticated
        if(user.address!= null && user.address.length > 0){
            setAddress(user.address)
        }
    },[user])

    return user.address ? (
        <div>
            <p className="text-xs text-green-600 dark:text-teal-300">Connected with <Address address={address} /></p>
        </div>
    ): (
        metaMaskInstalled ? 
            <Connect />
            :
            <p className="
            md:flex
            justify-center
            border-2
            border-pink-500
            dark:border-pink-700
            dark:bg-zinc-900
            rounded
            dark:text-gray-200
            p-2
            transition-all
            shadow-f4-dark
            ">
                No browser wallet detected 🤖
            </p>
    )


} 

export default MetaMaskAuth;
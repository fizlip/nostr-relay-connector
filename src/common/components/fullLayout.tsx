import SidebarItem from './elements/SidebarItem/SidebarItem'
import Head from 'next/head'
import { useState, useEffect, useContext } from 'react' 

import ThemeToggle from './elements/ToggleTheme/ToggleTheme'

import { BiHomeAlt, BiUser } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import {FcFlashAuto} from 'react-icons/fc';
import { AiOutlineSend, AiOutlineClose } from 'react-icons/ai'
import { AppContext } from '../../context/state'
import {MdNavigateNext} from 'react-icons/md';

import MetaMaskAuth from './elements/Web3Auth/MetaMaskAuth'

import Image from 'next/image'

import UserAPI from '../utils/Users'

import OpenAiWrapper from '../utils/OpenAiWrapper'

import { VscUnverified } from 'react-icons/vsc'
import { GoVerified } from 'react-icons/go'

const LeftColumn: React.FC = () => {

  const {user, setUser} = useContext(AppContext); 
  const [hasAccount, setHasAccount] = useState(false)

  /**
   * profileLoader is needed for Image
   * @param param0 image name in f4-public 
   * @returns a url for the path to the image in the f4-public S3 bucket
   */
  const profileLoader = ({src}) => {
    return `https://f4-public.s3.eu-central-1.amazonaws.com/${src}`
  }

  useEffect(() => {
    if(window.ethereum && window.ethereum.selectedAddress){
      var us = new UserAPI()
      us.setParams([window.ethereum.selectedAddress])
      us.getAddress()?.then(r => {
        console.log("r: ", r)
        setUser({
          address: window.ethereum.selectedAddress, 
          nick: r?.data.User.nick,
          lastLogin: r?.data.User.lastLogin,
          reputation: r?.data.User.reputation,
        })
      })
      .catch(err => {
        setUser({
          address: window.ethereum.selectedAddress, 
          nick: "anon",
          lastLogin: 0,
          reputation: 0
        })
      }) 
    }
    else{
      setUser({address:"", nick: "", lastLogin: 0, reputation: 0})
    }
  },[]) 

  return(
    <div className="
      h-[100%]
      col-start-0 
      col-span-10 
      sm:col-span-2 
      flex
      flex-row
      sm:flex-col
      pr-5
      "
    >
      <div className="
        md:fixed 
        flex
        flex-row
        sm:flex-col 
        pr-5 
        col-start-0 
        col-span-2 
        w-[100%]
        sm:w-[20%]
        sm:h-screen
        ">
        <div className="hidden sm:block text-right">
          <a href="/help" className="text-right sm:pt-4"><b>GRASSR00T</b></a>
          <p className="text-xs text-right">Let the People Write!</p>
        </div>
        <div className="flex flex-row sm:flex-col sm:mt-[80%]">
          <SidebarItem content="Home" icon={<BiHomeAlt size={22}/>} url="/"/>
          <SidebarItem content="Profile" icon={<BiUser size={22} />} url="x"/>
          <SidebarItem content="Settings" icon={<FiSettings size={20} />} url="/settings"/>
          <SidebarItem content="Contribute" icon={'🧑‍🌾'} url="/draft"/>
        </div>
        <div className="w-[100%] grid place-items-end mt-2">
          <ThemeToggle />
        </div>

        {hasAccount ?
          <div className="hidden sm:block grid grid-cols-10 mt-[0%] pt-4 pb-4 pl-4">
            <div className="grid col-start-0 sm:col-span-2 h-12 w-12 relative">
              <Image 
                className="rounded-full" 
                loader={profileLoader}
                src="russia.jpg"
                objectFit="cover"
                layout="fill"
                width="10"
                height="10"
                alt="Profile image"
              />
            </div>
            <div className="grid col-start-3 col-span-7 text-right">
              <h1 className="text-xl">anon</h1>
              <p>@anon-0x31343292</p>
            </div>
          </div>
          :
          <div className="hidden sm:block grid grid-cols-10 absolute bottom-0 right-5 w-[100%] pt-4 pb-4 pl-4">
            <div className="grid col-start-3 col-span-7 text-right">
              {user.address ?
                <div className="transition-all">
                  <p>@{user.nick}</p>
                  <div className="flex justify-end">
                    {user.reputation < 2 ?
                      <p className="flex p-3">{user.reputation} <VscUnverified/></p>
                      :
                      <p className="flex p-3">{user.reputation} <GoVerified className="text-teal-500"/></p>

                    }
                    <Image 
                      className="blob inline object-cover hover:rounded-full transition-all" 
                      loader={profileLoader}
                      src="sofie.png" 
                      width="50%"
                      height="50%"
                      alt="Profile image"
                    />
                  </div>
                </div>
                :
                <></>
              }
              <MetaMaskAuth/>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

const RightColumn: React.FC = () => {

  const [showAutoWrite, setShowAutoWrite] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");

  const {articleStatus, setArticleStatus} = useContext(AppContext); 

  const [content, setContent] = useState<string>("")


  const profileLoader = ({src}) => {
    return `https://f4-public.s3.eu-central-1.amazonaws.com/${src}`
  }

  const createOpenAiQuery = () => {
    console.log("[DEBUG] content: ", content);

    console.log("[DEBUG] ", content);
    const openai = new OpenAiWrapper();

    //setArticle("test\ntest");
    openai.completeText(content).then(r => {
      if(r?.data != undefined) {
        //setArticle(r.data.choices[0].text);
        setAnswer(r.data.choices[0].text);
      }
    })
  };
  
  const articleDone = () => {
    if(articleStatus == "writing") {
      setArticleStatus("edit");
    }
    else {
      setArticleStatus("writing");
    }
  }

  return(
    <div className="
      invisible
      md:visible
      col-start-8 
      invisible 
      lg:col-span-3
      lg:visible
      pl-5
      ">
      <div className="fixed hidden sm:block grid grid-cols-2 w-[20%]">
        <div className="hidden sm:block">
          <div className="grid col-span-2">
            <div className="
            h-screen
            rounded 
            bg-gray-50
            dark:bg-transparent
            text-gray-50
            "
            >
            <div className="p-2 text-gray-900 dark:text-gray-50">
              <div className="m-2 p-2 flex border-b border-zinc-500">
                <p className="text-sm dark:text-zinc-200 text-gray-800">Table of Content</p>
              </div>
              <div className="flow-root absolute bottom-0 right-0 m-2 p-4 w-[100%]">
                <div>
                  <button onClick={() => setArticleStatus("edit")} className="transition-all float-right border border-teal-500 hover:border-teal-300 text-teal-500 hover:text-teal-300 p-4 rounded-full"><AiOutlineSend/></button>
                  {articleStatus == "edit" ? 
                    <button onClick={() => setArticleStatus("writing")} className="rotate-180 transition-all float-right border border-red-500 hover:border-red-300 text-red-500 hover:text-red-300 p-4 rounded-full mr-3"><AiOutlineSend/></button>
                    :
                    <></>
                  }
                </div>
              </div>
              <div className="m-2 p-2 border-b border-zinc-500">
                <p className="text-sm dark:text-zinc-200 text-gray-800">Contributors</p>
              </div>
              <div className="ml-5">
                <div className="flex">
                <Image 
                      className="blob inline object-cover rounded-full transition-all" 
                      loader={profileLoader}
                      src="sofie.png" 
                      width="50%"
                      height="50%"
                      alt="Profile image"
                />
                </div>
              </div>
              <div>
                <hr />
                {showAutoWrite ? 
                  <div className="border dark:border-zinc-900 p-2 rounded">
                    <div className="flex w-[100%] text-right justify-end items-end"><button onClick={() => setShowAutoWrite(false)}><AiOutlineClose size={20}/></button></div>
                      <input onChange={(e) => setContent(e.target.value)} placeholder="How many cats in a litre..."   className="bg-transparent w-[95%] m-1 p-2 rounded border dark:border-zinc-900" id="who" type="text"/>
                      <div className="flex width-[100%] text-right justify-end items-end"><button onClick={() => createOpenAiQuery() }className="transition-all dark:hover:bg-zinc-900 border dark:border-zinc-900 text-xs hover:bg-white rounded-full flex text-red-500 mr-4 p-2 pr-3 pl-3"><b className="">⚡</b></button></div>
                      <div className="border-l-4 border-pink-200 flex bg-white dark:bg-zinc-900 p-2">
                        <p className="p-2">{answer}</p>
                      </div>
                  </div>
                  :
                  <div className="flex width-[100%] justify-center items-center">
                    <button onClick={() => setShowAutoWrite(true)} className="mt-4 transition-all flex border dark:border-zinc-800 dark:hover:bg-zinc-900 border-zinc-200 dark:text-zinc-300 text-zinc-500 hover:text-zinc-900 hover:border-zinc-500 rounded-full p-2 pl-3 pr-3 justify-center items-center">⚡</button>
                  </div>
                }
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default function FullLayout({children}){

  const {theme, setUser} = useContext(AppContext); 

  const darkTheme = () => {
    if(localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } 
    else {
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    darkTheme()
    if(window.ethereum && window.ethereum.selectedAddress){
      var us = new UserAPI()
      us.setParams([window.ethereum.selectedAddress])
      us.getAddress()?.then(r => {
        setUser({
          address: window.ethereum.selectedAddress, 
          nick: r?.data.User.nick,
          lastLogin: r?.data.User.lastLogin,
          reputation: r?.data.User.reputation,
        })
      })
      .catch(err => {
        console.error(err)
        setUser({
          address: window.ethereum.selectedAddress, 
          nick: "anon",
          lastLogin: 0,
          reputation: 0
        })
      }) 
    }
    else{
      setUser({address:"", nick: "", lastLogin: 0, reputation: 0})
    }
  },[]) 

  return(
    <div className="bg-gray-50 bg-gray-50 dark:bg-black">
      <Head>
        <title>GRASSR00T | Draft </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="
        dark:text-white
        transition-all
        ">
        <div className="max-w-full w-screen">
          <div className="grid grid-cols-10 gap-1">
            <LeftColumn />
            <div className="
              col-start-0
              md:col-span-5
              lg:col-span-5">
              {children}
            </div>
            <RightColumn />
          </div>
        </div>
      </main>
    </div>
  )
}

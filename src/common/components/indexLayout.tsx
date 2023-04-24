import {useEffect, useState, useContext} from 'react'
import ThemeToggle from './elements/ToggleTheme/ToggleTheme'
import SidebarItem from './elements/SidebarItem/SidebarItem'
import Head from 'next/head'
import MetaMaskAuth from './elements/Web3Auth/MetaMaskAuth'
import { AppContext } from '../../context/state'

import { BiHomeAlt, BiUser } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { VscUnverified } from 'react-icons/vsc'
import { GoVerified } from 'react-icons/go'

import {TbPlugConnected} from 'react-icons/tb';
import {AiOutlineSearch} from 'react-icons/ai';

import Image from 'next/image'

import Router from "next/router";

import {
  relayInit,
  generatePrivateKey,
  getPublicKey,
  getEventHash,
  signEvent
} from 'nostr-tools'

const LeftColumn: React.FC = () => {

  const {user, setUser} = useContext(AppContext); 
  const [hasAccount, setHasAccount] = useState(false)

  const {relay, setRelay} = useContext(AppContext); 

  /**
   * profileLoader is needed for Image
   * @param param0 image name in f4-public 
   * @returns a url for the path to the image in the f4-public S3 bucket
   */
  const profileLoader = ({src}) => {
    return `https://f4-public.s3.eu-central-1.amazonaws.com/${src}`
  }

  const publishEvent = async () => {
    let sk = generatePrivateKey()
    let pk = getPublicKey(sk)

    let sub = relay.sub([
      {
        kinds: [1],
        authors: [pk]
      }
    ])

    sub.on('event', event => {
      console.log('got event:', event)
    })

    let evt = {
      id: "0",
      sig: "0",
      kind: 1,
      pubkey: pk,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: 'hello world'
    }
    evt.id = getEventHash(evt)
    evt.sig = signEvent(evt, sk)

    let pub = relay.publish(evt)
    pub.on('ok', () => {
      console.log(`${relay.url} has accepted our event`)
    })
    pub.on('failed', reason => {
      console.log(`failed to publish to ${relay.url}: ${reason}`)
    })

    let events = await relay.list([{kinds: [0, 1]}])
    let event = await relay.get({
      ids: ['44e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245']
    })
  }

  return(
    <div className="
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
          <p className="text-xs text-right">Fastest News in the World!</p>
        </div>
        <div className="flex flex-row sm:flex-col sm:mt-[80%]">
          <SidebarItem content="Home" icon={<BiHomeAlt size={22}/>} url="/"/>
          <SidebarItem content="Profile" icon={<BiUser size={22} />} url="/"/>
          <SidebarItem content="Settings" icon={<FiSettings size={20} />} url="/"/>
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
            </div>
          </div>
        }
      </div>
    </div>
  )
}

const CenterColumn: React.FC = ({children}) => {
  return(
    <div className="
      col-start-0 
      col-span-12 
      md:col-span-5 
      lg:col-span-5">
      {children}
    </div>
  )
}

const RightColumn: React.FC = () => {

  const [searchRelay, setSearchRelay] = useState("")
  const {setPK, setSK, relay, setRelay, setSub} = useContext(AppContext); 


  const connectRelay = async (relayURL:string) => {
    const r = relayInit(relayURL)
      r.on('connect', () => {
        console.log(`connected to ${r.url}`)
        setRelay(r);
      })
      r.on('error', () => {
        console.log(`failed to connect to ${r.url}`)
    })

    await r.connect()
  }

  useEffect(() => {
    if(relay) {
      publishEvent();
    }
  },[relay])

  const publishEvent = async () => {
    let sk = generatePrivateKey()
    let pk = getPublicKey(sk)

    setSK(sk);
    setPK(pk);

    let sub = relay.sub([
      {
        kinds: [1],
        authors: [pk]
      }
    ])

    let evt = {
      id: "0",
      sig: "0",
      kind: 1,
      pubkey: pk,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: `${sk} has connected to the relay. Say hello!`
    }
    evt.id = getEventHash(evt)
    evt.sig = signEvent(evt, sk)

    let pub = relay.publish(evt)
    pub.on('ok', () => {
      console.log(`${relay.url} has accepted our event`)
    })
    pub.on('failed', reason => {
      console.log(`failed to publish to ${relay.url}: ${reason}`)
    })

    sub = relay.sub([
      {
        kinds: [1],
        since: 0
      }
    ])


    setSub(sub)

  }

  return(
    <div className="
      invisible
      md:visible
      col-start-5 
      invisible 
      col-span-0 
      lg:col-span-3
      lg:visible
      pl-5
      w-[100%]
      ">
      <div className="fixed hidden sm:block grid grid-cols-4 w-[25%]">
        <div className="hidden w-[100%] sm:block">
          <div className="grid col-span-2">
            <div className="
            h-[100%] 
            rounded 
            bg-gray-50
            dark:bg-transparent
            text-gray-50
            "
            >
            <div className="p-2 text-gray-900 dark:text-gray-50">
              <div><p className="text-xl">Join any discussion</p></div>
              <div className="p-4">
                <p>Relay created for this hackathon (please DM on discord if not working)</p>
                <div className="rounded text-md hover:text-red-500 cursor-pointer">
                  <button onClick={() => connectRelay("wss://bellingcathackathon-relay.com")} className="p-4 text-lg flex"> <GoVerified className="m-1 text-teal-500" size={15}/> bellingcathackathon-relay</button>
                </div>
                <p>Popular relay that people use</p>
                <div className="rounded text-md hover:text-red-500 cursor-pointer">
                  <button onClick={() => connectRelay("wss://nostr.supremestack.xyz")} className="p-4 text-lg flex"> <GoVerified className="m-1 text-teal-500" size={15}/>wss://nostr.supremestack.xyz</button>
                </div>
              </div>
            </div>
            </div>
            <div className="flex pl-6">
              <input 
                placeholder="Find relay" 
                className="border rounded-full p-2 pl-4 w-[100%] dark:bg-transparent dark:border-zinc-700" 
                onChange={(e) => setSearchRelay(e.target.value)}
              />
              <button onClick={() => connectRelay(searchRelay)} className="transition-all border rounded-full p-3 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"><AiOutlineSearch /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const IndexLayout: React.FC = ({children}) => {

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
  },[])

  return(
    <div className="h-[100vh]">
      <Head>
        <title>GRASSR00T | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="
        dark:bg-black
        bg-opacity-10
        bg-gray-50
        dark:text-white
        transition-all
        ">
          <div className="
          bg-[url('https://f4-public.s3.eu-central-1.amazonaws.com/imageedit_19_3200557394.png')]
          dark:bg-[url('https://f4-public.s3.eu-central-1.amazonaws.com/imageedit_3_8959513005.png')]
          ">
            <div className="visible sm:invisible place-items-center absolute text-center">
              <a href="/help" className="visible sm:invisible"><b>F4RMHOUSE</b></a>
              <p className="visible sm:invisible">Like Bellingcat found a Bloomberg terminal!</p>
            </div>
            <div className="max-w-full sm:max-w-[100%]">
            <div className="grid grid-cols-10 gap-1">
              <LeftColumn /> 
              <CenterColumn>{children}</CenterColumn>
              <RightColumn /> 
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default IndexLayout;
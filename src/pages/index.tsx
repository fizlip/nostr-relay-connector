import type { NextPage, GetServerSideProps } from 'next'
import { useState, useEffect, useContext } from 'react' 

import IndexLayout from '../common/components/indexLayout'
import Feed from '../modules/feed/Feed'
import 'emoji-mart/css/emoji-mart.css'

import CreatePost from '../common/components/elements/CreatePost/CreatePost'

import {AiFillPlayCircle} from 'react-icons/ai'

import AppProvider from '../context/state';
import { AppContext } from '../context/state'

export default function Home({ data }){

  const [showEmoji, setShowEmoji] = useState(false)
  const {theme, setTheme, relay} = useContext(AppContext)
  const [update, setUpdate] = useState(false)
  const [feedType, setFeedType] = useState("latest")

  useEffect(() => {
    getTheme()
  },[])

  const getTheme = () => {
    if (localStorage.getItem('color-theme')) {
      let item = String(localStorage.getItem('color-theme'))
      setTheme(item)
    }
    else{
      if (document.documentElement.classList.contains('dark')) {
        setTheme("dark")
      }
      else{
        setTheme("light")
      }
    }
  }

  return (
    <div className="grid">
      <CreatePost 
        theme={theme} 
        setUpdate={(e) => setUpdate(e)}
      />
      <Feed posts={[]} nt={0} update={false} feedType={""}/>
      </div>
  )
}

Home.getLayout = function getLayout(page){
  return(
    // Shared app context for all children of index layout
    <AppProvider>
      <IndexLayout>{page}</IndexLayout>
    </AppProvider>
  )
}

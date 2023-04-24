/**
 * Shows a list of all posts the user will see
 */
import {useRef, useState, useEffect, useCallback, useContext} from "react"
import PostComponent from '../../common/components/elements/Post/Post'
import {IPost, INextToken} from '../../common/types/post'
import { AppContext } from '../../context/state'

import {AiFillPlayCircle, AiFillPauseCircle} from 'react-icons/ai'

export default function Feed({posts, nt, update, feedType}){

  const [ps, setPosts] = useState<any[]>([])
  const [nextToken, setNextToken] = useState<INextToken>(nt)
  const [currentDate, setCurrentDate] = useState<string>("")
  const [thresholdDate, setThresholdDate] = useState<string>("")

  const [msgs, setMsgs] = useState<any[]>([]);

  const [type, setType] = useState<string>("latest")
  const {relay, pk, sub, setSub} = useContext(AppContext); 

  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if(sub){
      // let's query for an event that exists
      sub.on('event', event => {
        setMsgs(p => [event, ...p])
      })
    }
  },[sub])

  useEffect(() => {
    if(!isPlaying){
      sub.unsub();
    }
    else if (sub){
      let s = relay.sub([
        {
          kinds: [1],
          since: 1682325268
        }
      ])
      s.on('event', event => {
        setMsgs(p => [event, ...p])
      })

      setSub(s)
    }
  }, [isPlaying])

  return(
    <div>
      <div className="flex justify-center items-center">
      <button onClick={() => setIsPlaying(p => !p)}>{isPlaying ? <AiFillPauseCircle size={30}/>: <AiFillPlayCircle size={30}/>}</button>
      </div>
      { 
        msgs.reverse().map((post, i) => {
          return <div><PostComponent createdAt={post.created_at} creator={"Currentuser"} content={post.content}/></div>
        })
      }
    </div>
  )
}

import {useEffect, useState, useContext} from 'react'
import {useRouter} from 'next/router'
import PostAPI from '../../common/utils/Posts'

import TopBar from '../../common/components/elements/PostPage/TopBar'
import Footer from '../../common/components/elements/PostPage/Footer'
import CreateComment from '../../common/components/elements/CreateComment/CreateComment'
import Comments from '../../common/components/elements/PostPage/Comments'
import Content from '../../common/components/elements/PostPage/Content'

import {IPost} from "../../common/types/post"

import { AppContext } from "../../context/state";
import { AppContextType } from "../../common/types/appContext";

/**
 * Post is the main module of the 'post' page. It uses the indexLayout with 
 * the sidebars and the main content is the post written by the user and 
 * comments written in response.
 * 
 * A functioning post module will allow a user to 
 *  - read a post written by a user
 *  - show all comments written in response (with infinite scroll)
 *  - write a non-empty comment in response (with emojis 😊)
 * @returns 
 */
export default function Post(){
  // Context
  const {user} = useContext(AppContext) as AppContextType;
  // Use nextjs router
  const {query:{postid}}= useRouter()

  const [activePost, setActivePost] = useState<IPost>()
  const [newComment, setNewComment] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [update, setUpdate] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  /**
   *  On render read the post given by the router
  */
  useEffect(() => {
    let ps = new PostAPI()
    if(Array.isArray(postid)){
      // postid is an array: [<POST_CREATOR_ADDRESS>, <POST_CREATED>]
      ps.setParams(postid)
      ps.readId().then(r => {
        setActivePost(r?.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
    }
  },[postid])

  /**
   * updateCurrentPost will append a new comment to the comments rendered
   * on the current page when a new comment is created.
   */
  const updateCurrentPost = () => {
    if(activePost){
      // Update comment amount on current page
      setActivePost({...activePost, ["CommentsAmt"]: Number(activePost.CommentsAmt)+1})
    }
  }

  /**
   * Update the amount of comments on the current post item when a new comment
   * is created
   */
  const updateResponseAmt = () => {
    if(postid){
      let ps = new PostAPI()
      // Update post with new comment amount
      ps.setBody({
        "creator": postid[0],
        "date": postid[1],
        "column": "CommentsAmt",
        "value": String(Number(activePost?.CommentsAmt) + 1)
      })
      ps.update()
      setUpdate(p => !p)
      updateCurrentPost()
    }
  }

  return (
    <div className="w-[50vw]">
      <div className="border border-2 border-t-2 w-[100%] dark:border-zinc-800">
        <TopBar />
        <div className="w-[100%]">
          {!loading?
            <Content activePost={activePost}/>
          :
          <div className="
            w-[50vw]
            flex
            justify-center
            align-center
          ">
            <div className="text-center m-20">
              <svg role="status" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            </div>
          </div>
          }
          <div className="flex w-[100%] pt-10 pb-5">
            {activePost ? 
              <p className="text-xs text-gray-500">{(new Date(activePost.Date)).toDateString()}</p>
            :
              <></>
            }
          </div>
        </div>
      </div>
      <Footer post={activePost}/>
      {postid ?
        <CreateComment 
          textDescription="Comment"
          errorMessage="No empty comments please"
          updateResponseAmt={() => updateResponseAmt()}
          postid={postid[0] + "-" + postid[1]}
          cancel={null}
        />
        :
        <></>
      }
      <div className="h-[100%]">
        {postid ?
          <Comments 
            depth={0} 
            update={update} 
            parent={{
              "CommentID": postid[0] + "-" + postid[1]
            }}
            cs={[]}
            nt={0}
            setUpdate={() => {}}
          />
          :
          <></>
        }
      </div>
    </div>
  )
}
/**
 * Shows a list of all posts the user will see
 */
import {useRef, useState, useEffect, useCallback} from "react"
import {useRouter} from 'next/router'
import PostComponent from '../../common/components/elements/Post/Post'
import {IPost, INextToken} from '../../common/types/post'
import PostAPI from '../../common/utils/Posts'
import { AppContext } from '../../context/state'

export default function TagFeed({posts, nt, update, _tag}){

  const router = useRouter()

  const [ps, setPosts] = useState<IPost[]>([])
  const [nextToken, setNextToken] = useState<INextToken>(nt)
  const [currentDate, setCurrentDate] = useState<string>((new Date()).toLocaleDateString("se-SE"))
  const [thresholdDate, setThresholdDate] = useState<string>("")

  const [tag, setTag] = useState(_tag)

  const observer = useRef<any>()
  const lastPostElement = useCallback(node => {
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        updatePosts()
      }
    })
    if (node) observer.current.observe(node)
  },[nextToken])

  useEffect(() => {
    const tmp = new Date()
    setCurrentDate(tmp.toLocaleDateString("se-SE"))
    tmp.setDate(tmp.getDate()-10)
    setThresholdDate(tmp.toLocaleDateString("se-SE"))
  },[])

  useEffect(() => {
    let current = new Date()
    if(router.query.tag && router.query.tag.length > 0){
      if(currentDate !== current.toLocaleDateString("se-SE")){
        window.location.reload()
      }
      updatePosts()
    }
  },[router.query.tag])

  const decrementDate = (dateString:string, amt:number) => {
    var d = new Date(dateString)
    d.setDate(d.getDate()-amt)
    setCurrentDate(d.toLocaleDateString("se-SE"))
    return d.toLocaleDateString("se-SE")
  }

  /**
   * Update the posts in the feed. There are 2 possibilities:
   * 1. No posts left for the current day in which case we 
   * decrement the current day getting the first page of previous
   * day
   * 2. Read next page as given by the next token
   */
  const updatePosts = async () => {
    // Empty nextToken means no more posts from current
    // day, get first page from previous day
    if(Object.keys(nextToken).length == 0){
      getFirstPageFromDay()
    }
    // Otherwise fetch page based on nextToken
    else{
      getNextPage()
    }
  }

  const getFirstPageFromDay = async () => {
    const p = new PostAPI()
    var dateString:string = currentDate 
    var _nextToken = nextToken
    var resPosts = []

    // This loop will fetch successive days until it finds a day
    // with posts. This is done due to the fact that we use a 
    // distributed database
    console.log(dateString, router.query.tag)
    while ((dateString !== thresholdDate && resPosts.length == 0) && dateString !== "2022-06-01"){
      // Fetch posts for dateString
      var response:any = {}
      p.setParams([dateString, router.query.tag]) 
      response = await p.readTagsDay()
      _nextToken = response?.data.NextToken
      resPosts = response?.data.Posts 

      dateString = decrementDate(dateString, 1)

      console.log("res posts", resPosts)
      if(resPosts == undefined){
        resPosts = []
      }
    }

    // If we find a day with posts record the next token and update the 
    // threshold date
    if(resPosts.length > 0){
      setPosts(p => p.concat(resPosts))
      setNextToken(_nextToken)

      var d = new Date(thresholdDate)
      d.setDate(d.getDate()-5)
      setThresholdDate(d.toLocaleDateString("se-SE"))

    }
  }

  const getNextPage = () => {
    const p = new PostAPI()
    p.setParams([tag, nextToken.Creator, nextToken.Date, nextToken.Status]) 
    p.readTagsDayPage()?.then(response => {
      setNextToken(response?.data.NextToken)
      setPosts(p => p.concat(response?.data.Posts))
    })
    .catch(err => {
      console.error(err)
    })
  }

  return(
    <div>
      <p className="text-4xl text-teal-500">#{router.query.tag}</p>
      { 
        ps.map((post, i) => {
          if(ps.length === i + 1){
            return (
              <div 
                key={String(post.Date)} 
                ref={lastPostElement}
              >
                <PostComponent key={String(post.Date)} post={post} index={-1}/>
              </div>
            )
          }
          else{
            return <PostComponent key={String(post.Date)} post={post} index={i}/>
          }
        })
      }
      <div className="
        flex
        justify-center
        align-center
        w-[50vw]
      ">
        <div className="text-center m-20">
          <svg role="status" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

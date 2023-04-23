/**
 * Author Filip Zlatoidsky
 * 
 * Create post will create a post in the database, users can only 
 * post non-empty items. Emojies are allowed.
 */
import {useState, useRef, useContext, useEffect} from 'react'
import { AppContext } from '../../../../context/state'
import EmojiButton from '../Buttons/EmojiButton'

import {
  getEventHash,
  signEvent
} from 'nostr-tools'

const CreatePost = ({theme, setUpdate}) => {
    const [postBody, setPostBody]                   = useState<string>("")
    const [cursorPosition, setCursorPosition]       = useState<number>(0)
    const [error, setError]                         = useState<boolean>(false)
    const [postAttachement, setPostAttachements]    = useState<File[]>([])
    const [attachementMetadata, setAttachmentMetadata] = useState<string[][]>([])
    const [tags, setTags]                              = useState<string[]>([])
    const [tag, setTag]                              = useState<string>("")

    const {user, relay, pk, sk} = useContext(AppContext)

    const textareaRef = useRef()

    /**
     * Send request to create a post and upload files that
     * have been included as attachements
     * @param event contains the value of the post to be created
     */
    const createPost = (event) => {
        event.preventDefault()

        const post: string = event.target.post.value

        // Only allow non-empty posts to be created
        // otherwise show an error
        if(post.length > 0 && relay){

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
            content: postBody
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
        }
        else{
            setError(true)
            setTimeout(() => setError(false), 2000)
        }
    }

    /**
     * detectTag will check whether SPACE (32) or ENTER (13) has 
     * been pressed. This will add a tag to the taglist 
     * @param e an event object
     */
    const detectTag = (e) => {
        if ((e.keyCode === 32 || e.keyCode === 13) && tag.length > 1) {
          setTag("");
          setTags(p => [...p, "#" + tag.replace(" ", "")])
        }
    }

    const removeTag = (i) => {
        setTags([...tags.slice(0,i), ...tags.slice(i+1)]) 
    }

    /**
     * updateTag will set the value of current tag, ignoring SPACE 
     * @param e 
     */
    const updateTag = (e) => {
        if(e.target.value != " "){
            setTag(e.target.value)
        }
    }

    return (
        <>
        <form onSubmit={createPost} className="relative w-[100%]">
            <div className="w-[100%] flex justify-center align-center">
                <textarea 
                    className={
                        error ? 
                            "p-2 w-[100%] border dark:border-zinc-900 rounded-xl border-2 border-rose-500 text-2xl bg-transparent"
                            :
                            "p-2 w-[100%] border dark:border-zinc-700 rounded-xl bg-transparent"
                        }
                    rows={1} 
                    placeholder="What's happening?"
                    id="post" 
                    name="post" 
                    value={postBody}
                    onChange={e => setPostBody(e.target.value)}
                    onBlur={e => setCursorPosition(e.target.selectionStart)}
                />
            </div>
            <div className="grid grid-cols-8 w-[100%] mt-1">
                <div className="grid col-start-0 col-span-7">
                    <div className="flex w-[100%]">
                        <div className="">
                            <EmojiButton 
                                updateText={p => setPostBody(p)}
                                text={postBody}
                                cursorPosition={cursorPosition}
                            />
                        </div>
                    </div>
                </div>
                <div className="
                col-start-9
                place-items-end
                flex
                ">
                    {postBody.length > 0 ?
                        <div className="flex h-[100%] pl-2 rounded-l-md shadow" onClick={e => e.preventDefault()}>
                            <p className="pr-2 m-auto animate-pulse">#</p>
                            <input 
                                type="text"
                                value={tag} 
                                className="w-[100#] rounded pl-1 dark:bg-gray-800" 
                                onKeyDown={e => detectTag(e)}
                                onChange={e => updateTag(e)}
                            />
                            {tags.map((e,i) => {
                                return(<p key={i} className="text-teal-500 m-auto mr-2 ml-2 hover:animate-bounce transition-all cursor-pointer" onClick={() => removeTag(i)}>{e}</p>)
                            })}
                        </div>
                        :
                        <></>
                    }
                    <button className="
                        p-2 
                        bg-gray-900
                        text-gray-50
                        dark:bg-zinc-800 
                        rounded-md
                        pl-8
                        pr-8
                        text-xs
                        transition-all
                        dark:hover:bg-red-600
                        hover:bg-red-500
                        ">
                        {error ?
                        <b>Your post is empty...🥺</b>
                        :
                        <b>Post</b>
                        }
                    </button>
                </div>
            </div>
        </form>
        </>
    )
}

export default CreatePost;
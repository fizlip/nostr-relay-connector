import {useState, useRef, useEffect, useContext} from 'react'

import {Twemoji} from "react-emoji-render";
import { Picker } from 'emoji-mart'
import {emojiSet} from '../../../utils/emojiset'

import { AppContext } from '../../../../context/state'

/**
 * This component implements a button what shows an emoji menu and shows
 * a random emoji whenever a cursor hovers over it. Pressing an emoji in the 
 * menu will add an emoji to the text given in the parameters
 * @param updateText callback funciton that updates text and allows the component to insert emojis
 * @param text the actual text 
 * @param cursorPosition the position of the text cursor. Allows the function to insert emojis in the middle of text
 * @returns void
 */
export default function EmojiButton({updateText, text, cursorPosition}){
  const {theme} = useContext(AppContext); 
  const [showEmoji, setShowEmoji] = useState<boolean>(false)
  const [currentEmoji, setCurrentEmoji] = useState<string>(emojiSet[Math.floor(Math.random()*emojiSet.length)])
  const ref = useRef<any>(null)

  /**
   * handleClickOutside will close the emoji menu is mous is pressed outside
   * the menu
   * @param event 
   */
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current?.contains(event.target)) {
      setShowEmoji(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);


  /**
  * Insert an emoji into the current cursorposition of post body 
  * @param emoji an emojie
  */
  const insertEmoji = (e) => {
    const start = text.slice(0, cursorPosition)
    const end = text.slice(cursorPosition) 
    updateText(start + e.native + end)
  }

  /**
   * getTheme returns the theme so that <Picker> doesn't give errors
   * @returns 
   */
  const getTheme = () => {
    if(theme === "dark" || theme === "light"){
      return theme
    }
    return "auto"
  }

  return(
    <div className="relative" onMouseEnter={() => setCurrentEmoji(emojiSet[Math.floor(Math.random()*emojiSet.length)])}>
      <div onClick={() => setShowEmoji(p => !p)}>
        <Twemoji className="cursor-pointer text-lg transition-all hover:text-2xl" text={currentEmoji}/>
      </div>
      <div className="absolute z-10" ref={ref}>
        {showEmoji ?
          <Picker 
            emoji=":point_up:"
            title="Pick an emoji"
            onSelect={e => insertEmoji(e)}
            theme={getTheme()}
            set="twitter"
          />
          :
          <></>
        }
      </div>
    </div>
  )
}
import { BlockType } from "./BlockType";
import {IUser} from "./user"

// Here we store all context values that should be 
// available in all parts of the app.
export type AppContextType = {
  user: IUser;
  setUser: (userAddress: IUser) => void;
  theme: string
  setTheme: (s: string) => void
  activeEdit: string
  setActiveEdit: (s: string) => void
  article: BlockType[][],
  setArticle: (s: BlockType[][]) => void
  articleStatus: string
  setArticleStatus: (s: string) => void
  relay: any
  setRelay: (s: any) => void
  pk: string,
  setPK: (s: string) => void,
  sk: string,
  setSK: (s: string) => void
  currentRelay: string
  setCurrentRelay: (s: string) => void
  sub: any,
  setSub: (s: any) => void
};
import { ITextStyle } from "./ITextStyle";

/**
 * A block is a the most primitive type of an article. It can
 * contain any type of content and should be able to render 
 * this by using a specified function.
 */
export interface IBlock {
  id: number,
  content: string,
  renderContent (event: any): any,
  handleChange (event: any): any,
  keyPress (event: any): any,
  selected: boolean,
}
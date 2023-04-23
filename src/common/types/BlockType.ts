import { ITextStyle } from "./ITextStyle"

export type BlockType = {
    content: string,
    media: File|null,
    id: number,
    selected: boolean,
    type: string,
    render:string,
    raw: string,
    style: ITextStyle 
}
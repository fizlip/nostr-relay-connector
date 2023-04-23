import { BlockType } from "./BlockType"
export type ArticleRowType = {
    id: number,
    selected: boolean,
    content: BlockType[],
    raw: string,
}
export interface IPost {
  Creator:          string,
  Date:             number,
  Title:            string,
  ExpectationsDate: number,
  CreatorNick:      string,
  CommentsAmt:      number,
  Updated:          number,
  ProfileUrl:       string,
  Abstract:         string,
  Dislikes:         string,
  Likes:            string,
  Img:              string,
  Attachement:      any,
  Tags:             string[],
}

export interface IPostItem {
  Creator:  string,
  Date:     number,
}

export interface IPatchPost{
  Creator: string,
  Date:    number,
  Column:  string,
  Value:   any 
} 

export interface INextToken{
  Creator:  string,
  Date:     string,
  Status:   string
}

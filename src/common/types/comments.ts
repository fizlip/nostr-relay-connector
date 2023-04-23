export interface IComment{
  PostID:           string,
  CommentID:        string,
  Content:          string,
  Created:          number,
  Creator:          string,
  Responses:        string,
  Likes:            number,
  Dislikes:         number,
}

export interface ICommentsItem {
  PostID:        string,
  CommentID:     string,
}

export interface IPatchComment{
  PostID:       string,
  CommentID:    string,
  Column:       string,
  Value:        any 
} 

export interface INextToken{
  PostID:        string,
  CommentID:     string,
}
/**
 * Author: Filip Zlatoidsky 
 * 
 * This class communicates with the Comments service allowing
 * the frontend to interact with the Comments table 
 * Each request can have URL parameters and a body.
 */

import axios from 'axios'
import Endpoint from './Endpoint';

export default class CommentsAPI extends Endpoint{
  // Init env
  readonly URL    = process.env.STAGE == "production" ? "https://posts.f4rmhouse.com" : "http://localhost"
  readonly PORT   = process.env.STAGE == "production" ? "" : "8080"
  readonly ENDPOINT = this.URL + ":" + this.PORT;

  /**
   * create will create a comment. Returns error if body is not initialized
   */
  async create(){
    if(this.hasBody()){
      // Create POST request
      try{
        return await axios.post(this.ENDPOINT + "/comments/post", this.body)
      }
      catch(err){
        console.error(err)
      }
    }
    else{
      // Create error message if there is no body
      console.error("Please set a body for the create post request to be valid.")
    }
  }

  /**
   * getPost will get all comments for a certain post paginated. To read a cetain
   * page initialized the parameters with the next token which is 
   * the ID of the last element on the page.
   */
  async getPost(){
    if(this.hasParams()){
      const url: string = this.ENDPOINT + "/comments/get/post/" + this.paramsConstructor()
      try{
        return await axios.get(url)
      }
      catch(err){
        console.error(err)
      }
    }
  }

  /**
   * getID will get a comment by ID
   */
  async getID(){
    if(this.hasParams()){
      const url: string = this.ENDPOINT + "/comments/" + this.paramsConstructor()
      try{
        return await axios.get(url)
      }
      catch(err){
        console.error(err)
      }
    }
  }

  /**
   * update will update a comment. Needs to have a json body containing 
   * the keys: commentid, postid, column and value
   */
  async update(){
    if(this.hasBody()){
      try{
        return axios.patch(this.ENDPOINT + "/comments/update", this.body)
      }
      catch(err){
        console.error(err)
      }
    }
    else{
      console
        .error("Please use 'setBody' to populate the body for the patch request.")
    }
  }

  /**
   * delete will Delete a comment
   */
  async delete(){
    if(this.hasBody()){
      // Create get request
      try{
        return await axios.delete(this.ENDPOINT + "/comments/delete", {data: this.body})
      }
      catch(err){
        console.error(err)
      }
    }
    else{
      return {"msg": "Can't send delete request, no body given"}
    }
  }
}


/**
 * Author: Filip Zlatoidsky 
 * 
 * This class communicates with the Post service allowing
 * the frontend to interact with the Posts database 
 * Each request can have URL parameters and a body.
 */

import axios from 'axios'
import {IPost, IPatchPost} from '../types/post'
import Endpoint from './Endpoint';

export default class PostAPI extends Endpoint{

    // Initalize environment variables
    readonly URL    = process.env.STAGE == "production" ? "https://posts.f4rmhouse.com" : "http://localhost"
    readonly PORT   = process.env.STAGE == "production" ? "" : "8080"
    readonly ENDPOINT = this.URL + ":" + this.PORT;

    /**
     * Create a new Post. A body must be initialized before calling this function
     * otherwise an error is returnerd 
     * @returns a promise containing the result 
     */
    async create(){
      if(this.hasBody()){
        // Create POST request
        try{
          return await axios.post(this.ENDPOINT + "/api/post", this.body)
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
     * Read a specific item given a Creator and Date
     * @returns a promise containing the result
     */
    async readId(){
      if(this.hasParams()){
        const url: string = this.ENDPOINT + "/api/post/" + this.paramsConstructor()
        try{
          return await axios.get(url)
        }
        catch(err){
          console.error(err)
        }
      }
    }

    /**
     * Will read the latest posts from a certain time interval sorted 
     * in the correct order
     */
    async readLatestFrom(){
      if(this.hasParams()){
        const url: string = this.ENDPOINT + "/api/post/from/" + this.paramsConstructor()
        try{
          return await axios.get(url)
        }
        catch(err){
          console.error(err)
        }
      }
    }

    async readLatestCreated(){
      const url: string = this.ENDPOINT + "/api/post/latest"
      try{
        return await axios.get(url)
      }
      catch(err){
        console.error(err)
      }
    }

    /**
     * Read a single page of posts 
     * @returns promise
     */
    async readAll(){
      // Create GET request
      return await axios.get(this.ENDPOINT + "/api/post/page")
    }

    /**
     * Read first page of posts from a certain day 
     * @returns posts
     */
    async readAllDay(){
      // Create GET request
      if(this.hasParams()){
        console.log(this.paramsConstructor())
        const url:string = this.ENDPOINT + "/api/post/page/" + this.paramsConstructor() 
        try{
          return await axios.get(url)
        }
        catch(err){
          console.error(err)
        }
      }
    }

    /**
     * Same as readAll but will get the next page starting from an item given 
     * in the params array 
     * @returns a promise
     */
    async readPage(){
      if(this.hasParams()){
        // Create GET request
        var url:string = this.ENDPOINT + "/api/post/page/next/" + this.paramsConstructor()
        try{
          return await axios.get(url)
        }
        catch(err){
          console.error(err)
        }
      }
      else{
        console.error("params not set for 'readPage'.")
      }
    }

    async readTrendingDay(){
      if(this.hasParams()){
        const url:string = this.ENDPOINT + "/api/post/page/trending/" + this.paramsConstructor() 
        try{
          return await axios.get(url)
        }
        catch(err){
          console.error(err)
        }
      }
    }

    async readTrendingDayPage(){
      if(this.hasParams()){
        const url:string = this.ENDPOINT + "/api/post/page/trending/" + this.paramsConstructor() 
        try{
          return await axios.get(url)
        }
        catch(err){
          console.error(err)
        }
      }
    }

    async readTagsDay(){
      if(this.hasParams()){
        const url:string = this.ENDPOINT + "/api/post/page/tags/" + this.paramsConstructor() 
        try{
          return await axios.get(url)
        }
        catch(err){
          console.error(err)
        }
      }
    }

    async readTagsDayPage(){
      if(this.hasParams()){
        const url:string = this.ENDPOINT + "/api/post/page/tags/" + this.paramsConstructor() 
        try{
          return await axios.get(url)
        }
        catch(err){
          console.error(err)
        }
      }
    }

    /**
     * Update an item given a body contining Creator, Date, Column and Value
     * @returns promise
     */
    update(){
      if(this.hasBody()){
        try{
          return axios.patch(this.ENDPOINT + "/api/post", this.body)
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
     * Delete an item, expects body to contain Creator and Date 
     * @returns a promise
     */
    async delete(){
      if(this.hasBody()){
        // Create get request
        try{
          return await axios.delete(this.ENDPOINT + "/api/post", {data: this.body})
        }
        catch(err){
          console.error(err)
        }
      }
      else{
        return {"msg": "Can't send delete request, no body given"}
      }

    }

    /**
     * Get the status of the Post service
     */
    async serviceStatus(){
      // Create GET request
      try{
        return await axios.get(this.ENDPOINT + "/api/status")
      }
      catch(err){
        console.error(err)
      }
    }
}

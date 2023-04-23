/**
 * Users will handle interactions with the usersvc. Allowing
 * the frontend to create, update and get user items.
 * 
 * 
 */

import axios from 'axios'
import Endpoint from './Endpoint'

export default class MediaAPI extends Endpoint{
  readonly URL    = process.env.STAGE == "production" ? "https://reactions.f4rmhouse.com" : "http://localhost"
  readonly PORT   = process.env.STAGE == "production" ? "" : "8082"
  readonly ENDPOINT = this.URL + ":" + this.PORT;
  /**
   * Create a new user item requires an address and nickname
   */
  async upload(file, fileID){
    if(file){
      var formData = new FormData()
      formData.append("file", file)
      formData.append("fileID", fileID)
      try{
        return await axios.post(this.ENDPOINT + "/upload/", formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        })
      }
      catch(err){
        console.error(err)
      }
    }
    else{
      console.error("Please set a body in Media.upload.")
    }
  }
}
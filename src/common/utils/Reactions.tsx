/**
 * Reactions contains the integration of the reactionsvc
 * into the frontend.
 * 
 * A function integration will allow three operations: GET
 * , POST, DELETE which will fetch, create and remove a 
 * reaction respectively. 
 * 
 */

import axios from 'axios'
import Endpoint from './Endpoint';

export default class ReactionAPI extends Endpoint{
    // Initalize environment variables
    readonly URL    = process.env.STAGE == "production" ? "https://reactions.f4rmhouse.com" : "http://localhost"
    readonly PORT   = process.env.STAGE == "production" ? "" : "8081"
    readonly ENDPOINT = this.URL + ":" + this.PORT;

    /**
     * Ask the reactionsvc if a user has reacted to content by seeing if 
     * there are any mathces to the address + postId pair
     * @returns a reaction object containing the PostId and address
     */
    async get(){
        if(this.hasParams()){
            const url: string = this.ENDPOINT + "/get/" + this.paramsConstructor()
            try{
                return await axios.get(url)
            }
            catch(err){
                console.error(err)
            }
        }
    }

    /**
     * Create a new reaction item by providing a address and a postId
     * @returns {}
     */
    async create(){
        if(this.hasBody()){
            try{
                return await axios.post(this.ENDPOINT + "/create/", this.body,
                    {
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                    }
                )
            }
            catch(err){
                console.error(err)
            }
        }
        else{
            console.error("Please set a body.")
        }
    }

    /**
     * Delete a reaction by providing a reaction item
     * @returns {}
     */
    async delete(){
        if(this.hasBody()){
            try{
                return await axios.delete(this.ENDPOINT + "/delete/", {
                    headers: {"content-type": "application/json"},
                    data: this.body
                })
            }
            catch(err){
                console.error(err)
            }
        }
        else{
            console.error("Please set a body.")
        }
    }
}
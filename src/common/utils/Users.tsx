/**
 * Users will handle interactions with the usersvc. Allowing
 * the frontend to create, update and get user items.
 * 
 * 
 */

import axios from 'axios'
import Endpoint from './Endpoint'

export default class UserAPI extends Endpoint{
    readonly URL    = process.env.STAGE == "production" ? "https://reactions.f4rmhouse.com" : "http://localhost"
    readonly PORT   = process.env.STAGE == "production" ? "" : "8082"
    readonly ENDPOINT = this.URL + ":" + this.PORT;

    /**
     * Create a new user item requires an address and nickname
     */
    async create(){
        if(this.hasBody()){
            try{
                return await axios.post(this.ENDPOINT + "/create/", this.body,
                {
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                })
            }
            catch(err){
                console.error(err)
            }
        }
        else{
            console.error("Please set a body in Users.create.")
        }

    }

    /**
     * Get a user item by using the primary key. This will include the 
     * address and the nickname
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
     * Delete a user item by supplying an address and a nickname
     */
    async delete(){
        if(this.hasBody()){
            try{
                return await axios.delete(this.ENDPOINT + "/delete/",
                    {
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

    /**
     * Get a user by the users public key 
     */
    async getAddress(){
        if(this.hasParams()){
            const url: string = this.ENDPOINT + "/address/" + this.paramsConstructor()
            try{
                let response = await axios.get(url) 
                return await axios.get(url) 
            }
            catch (err){

            }
        }
    }

    /**
     * Get user by its f4rmhouse nickname
     */
    async getNick(){
        if(this.hasParams()){
            const url: string = this.ENDPOINT + "/nick/" + this.paramsConstructor()
            try{
                return await axios.get(url)
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            console.error("No body has been set for 'getNick'")
        }
    }

    /**
     * Delete a user item by supplying an address and a nickname
     */
    async update(){
        if(this.hasBody()){
            try{
                return await axios.patch(this.ENDPOINT + "/update/", this.body)
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
/**
 * Endpoint is a parent class that of all microservice 
 * integrations
 */

export default class Endpoint {
    params: string[] = [];
    body: {} = {}
    constructor(){}
    /**
     * Set the body parameter that will be sent in the request, this 
     * function needs to be called before any request that requires 
     * some data sent in the body 
     * @param body an object 
    */
    setBody(body: object){
        this.body = body
    }

    /**
     * Check wheter body has been set for current Post instance 
     * @returns boolean indicating whether the body variable has been set
     * in the object 
    */
    hasBody(){
        return Object.keys(this.body).length > 0
    }

    /**
     * Check if URL parameters have been set for current instance 
     * @returns a bool
    */
    hasParams(){
        return this.params.length > 0
    }

    /**
     * Set URL parameters to be used when conducting a request
     * this function must be called before any request that
     * requires URL parameters 
     * @param params array of string
    */
    setParams(params:string[]){
        this.params = params
    }

    /**
     * Create a string out of the params in the body
     * @returns the elements in the params joined with '/'
    */
    paramsConstructor(){
        return this.params.join("/")
    }
}
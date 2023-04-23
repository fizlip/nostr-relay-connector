import axios from 'axios'

export default class OpenAiWrapper {

    readonly URL = "https://api.openai.com/v1/";
    readonly ENDPOINT = "completions";
    readonly key = process.env.REACT_APP_OPENAI_KEY;

    readonly evtSource = new EventSource(this.URL + this.ENDPOINT, {
        withCredentials: true
    });

    async createImage(prompt: string) {
        let data = {
            "prompt": prompt,
            "n": 2,
            "size": "1024x1024"
        }
        try{
            return await axios.post(this.URL + "images/generations", data,
                {
                    headers: {
                        'Authorization': `Bearer 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`
                    }
                })
        }
        catch(err) {
            console.log(err);
        }
    }

    async completeText(prompt: string) {
        let data = {
            "model": "text-davinci-003",
            "prompt": prompt,
            "temperature": 0.7,
            "max_tokens":512,
            "top_p": 1,
            "frequency_penalty":0,
            "presence_penalty":0
        }
        console.log("[DEBUG] OpenAi key: ", this.key)
        try{
            return await axios.post(this.URL + this.ENDPOINT, data,
                {
                    headers: {
                        'Authorization': `Bearer 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`
                    }
                })
        }
        catch(err) {
            console.log(err);
        }
    }

    async completionStream() {
        let data = {
            "model": "text-davinci-003",
            "prompt": prompt,
            "max_tokens": 256,
            "temperature": 0.7,
            "top_p": 1,
            "frequency_penalty":0,
            "presence_penalty":0
        }
        try{
            return await axios.post(this.URL + this.ENDPOINT, data,
                {
                    headers: {
                        'Authorization': `Bearer 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`
                    },
                    responseType: 'stream'
                })
        }
        catch(err) {
            console.log(err);
        }

    }
}
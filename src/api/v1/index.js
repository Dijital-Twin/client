import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'

export async function sendToGpt (messages) { 
    const stringifiedMessages = JSON.stringify(messages)
    console.log('stringifiedMessages', stringifiedMessages);
    const response = await axios.post('ai/', {context: stringifiedMessages})

    if(response.data.status !== 'success') {
        throw new Error('Failed to send message to Mistral')
    }

    return response.data.data
}
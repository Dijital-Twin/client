import axios from 'axios'

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}/` ?? 'http://localhost:3000/'

export async function sendToGpt(messages) {
    const stringifiedMessages = JSON.stringify(messages)
    console.log('stringifiedMessages', stringifiedMessages)
    const response = await axios.post('ai/', { context: stringifiedMessages })

    if (response.data.status !== 'success') {
        throw new Error('Failed to send message to Mistral')
    }

    return response.data.data
}

export async function sendToXtts(message) {
    const encodedMessage = encodeURIComponent(message)

    const axiosResponse = await axios.get(`ai/audio?text=${encodedMessage}`, {
        responseType: 'arraybuffer',
    })

    return axiosResponse.data
}

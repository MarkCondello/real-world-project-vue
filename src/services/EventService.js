import axios from 'axios';
import NProgress from 'nprogress';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

//when response is sent, start progress bar
apiClient.interceptors.request.use(config => {
    NProgress.start();
    return config;
})

//when response is received, end progress bar
apiClient.interceptors.request.use(response => {
    NProgress.done();
    return response;
})
//More info on interceptors here: https://stackoverflow.com/questions/52737078/how-can-you-use-axios-interceptors
export default {
    getEvents(perPage, page){
        return apiClient.get(`/events?_limit=${perPage}&_page=${page}`)    
    },
    getEvent(id){
        return apiClient.get(`/events/${id}`)
    },
    postEvent(event){
        return apiClient.post('/events', event)
    },
}
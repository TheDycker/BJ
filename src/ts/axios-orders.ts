import axios from 'axios';


const instance = axios.create({
    baseURL: "https://deckofcardsapi.com/api/deck/"
});

export default instance;
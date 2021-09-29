import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
})

export const weatherApi = {
    getCityWeather(data :string){
        return instance.get(`weather?q=${data}&appid=3123bb7bb014e9442d795d8cfd1b27ff`)
    }
}


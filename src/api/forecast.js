import ServerAdapter from './httpclient';

const URL = 'http://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '6001411fa65d79ed79a524471f291ae5';

export function getTokyoForecast() {
    const url = `${URL}/?q=Kawasaki-shi,jp&APPID=${API_KEY}`;
    const response = ServerAdapter.get(url).then(res => {
        console.log(url)
        return res
    });
    return response;
}
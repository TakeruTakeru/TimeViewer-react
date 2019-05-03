import ServerAdapter from './httpclient';
import {cities} from './cities';

const URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '6001411fa65d79ed79a524471f291ae5';

export async function getForecast(city) {
    const url = `${URL}/?id=${cities[city].id}&APPID=${API_KEY}&units=metric`;
    const response = await ServerAdapter.get(url).then(res => {
        return res;
    });
    return response;
}
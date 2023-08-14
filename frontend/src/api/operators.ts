import axios from 'axios';
import { convertToQueryParams } from '../helpers/queryParams';

axios.defaults.baseURL = "http://127.0.0.1:8000/"

export const getOperatorsStat = async (params?: any) => {
    try {
        const queryParams = convertToQueryParams(params);
        const {data} = await axios.get('api_v1/operators-stat/' + queryParams);
        return data;
    } catch (error) {
        console.log(error);
    }
}

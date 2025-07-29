import apiUrl from '../api.config';
import axios from 'axios';

export async function fetchIds(type: string, setFunction: (data: any) => void): Promise<void> {
      try {
        const url = `${apiUrl}/${type}`
        const response = await axios.get(url);
        setFunction(response.data)
      } catch (error) {
        console.error(error);
      }
    }
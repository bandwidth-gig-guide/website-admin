import apiUrl from '../api.config';
import axios from 'axios';
import { PageType } from '../types/enums/PageType';

export async function fetchIds(type: PageType, setFunction: (data: any) => void): Promise<void> {
      try {
        const url = `${apiUrl}/${type}`
        const response = await axios.get(url);
        setFunction(response.data)
      } catch (error) {
        console.error(error);
      }
    }
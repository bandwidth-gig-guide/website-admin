import getConfig from "next/config";
import axios from 'axios';
import { PageType } from '../types/enums/PageType';

export async function fetchIds(type: PageType, setFunction: (data: any) => void): Promise<void> {
  try {
    const api = getConfig().publicRuntimeConfig.SERVICE_ADMIN_API_URL
    const url = `${api}/${type}/`
    const response = await axios.get(url);
    setFunction(response.data)
  } catch (error) {
    console.error(error);
  }
}
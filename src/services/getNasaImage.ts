import axios from 'axios';
import { NasaItem } from '../features/Home/components/NasaSlider';


const apiKey = "h5BLIJbtnIjVgeNUo4xLEoIy8FfO4ejgmdgqRTsl";

export const getNasaImage = async (date?: string): Promise<NasaItem> => {
  let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  if (date) url += `&date=${date}`;

  const response = await axios.get(url);
  return response.data;
};

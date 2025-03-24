import axios from 'axios';


const apiKey = "h5BLIJbtnIjVgeNUo4xLEoIy8FfO4ejgmdgqRTsl";

export const getNasaImage = async (date?: string) => {
  let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  if (date) url += `&date=${date}`;

  const response = await axios.get(url);
  return {
    date: response.data.date,
    imageUrl: response.data.url,
    explanation: response.data.explanation,
  };
};

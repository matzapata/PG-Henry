import axios, { AxiosResponse } from "axios";
import { New, ApiNew, Response } from "./newsInterfaces";

export const getNews = () => {
  return axios
    .get(
      `https://newsdata.io/api/1/news?apikey=${process.env.REACT_APP_NEWS_API_KEY}&category=sports&country=ar&language=es`
    )
    .then((response: AxiosResponse) => {
      const dataMap = response.data.results.map((el: ApiNew) => {
        return {
          title: el.title,
          link: el.link,
          description: el.description,
          image: el.image_url,
        };
      });
      console.log(dataMap);
    });
};

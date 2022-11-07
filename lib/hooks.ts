import useSWR from "swr"
import fetcher from "./fetcher";

export const useFilmaffinityMovie = () => {
    const { data, error } = useSWR("http:localhost:3001/api/filmaffinity-movie", fetcher);
  
    return {
      user: data,
      isLoading: !data && !error,
      isError: error,
    }
  }
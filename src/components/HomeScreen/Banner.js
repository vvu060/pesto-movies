import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { selectUserSubscription } from "../../features/user/userSlice";

const Banner = () => {
  const history = useHistory();
  const userSubscription = useSelector(selectUserSubscription);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const getTrendingMovies = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);

    setTrendingMovies(data.results);
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const checkSubscription = (id) => {
    if (userSubscription) {
      history.push(`/details/${id}`);
    } else {
      alert("Subscription Plan is required to continue further.");
      history.push("/plans");
    }
  };

  return (
    <div id="banner" className="relative opacity-80 mb-4">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-800 to-transparent bottom-0" />
      <Carousel
        autoPlay={true}
        infiniteLoop
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
        interval={4000}
      >
        {trendingMovies &&
          trendingMovies.slice(0, 10).map((trendingMovie) => (
            <div key={trendingMovie.id} className="relative">
              <img
                loading="lazy"
                className="h-60 lg:h-screen w-full object-cover object-center"
                src={`https://image.tmdb.org/t/p/original/${trendingMovie.backdrop_path}`}
                alt={trendingMovie.title}
              />
              <div
                onClick={() => checkSubscription(trendingMovie.id)}
                className="absolute left-5 top-10 lg:top-32 lg:left-20 justify-self-start max-w-2xl space-y-3 text-left cursor-pointer"
              >
                <h1 className="text-xl font-semibold lg:text-5xl lg:font-bold text-white">
                  {trendingMovie.title}
                </h1>

                <div className="inline-flex items-center text-gray-200 text-md font-semibold">
                  <p className="text-xs lg:flex">
                    {trendingMovie.original_language === "en"
                      ? "English"
                      : "Others"}{" "}
                    &bull;
                  </p>
                  <p className="text-xs lg:flex">
                    &nbsp;
                    {trendingMovie.release_date.slice(0, 4)} &bull;
                  </p>
                  <div className="flex items-center justify-self-start">
                    &nbsp;
                    <h3 className="lg:flex p-1 rounded-sm bg-gradient-to-r from-yellow-300 to-yellow-500 text-xs font-bold">
                      IMDb
                    </h3>
                    <p className="text-xs lg:flex">
                      &nbsp; {trendingMovie.vote_average}
                    </p>
                  </div>
                </div>

                <div className="line-clamp-4 text-gray-200 text-md font-semibold text-start">
                  <p className="hidden lg:flex">{trendingMovie.overview}</p>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default Banner;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { HashLink as Link } from "react-router-hash-link";
import { useSelector } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/solid";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
import SearchResult from "./SearchResult";
import { selectUserName, selectUserPhoto } from "../features/user/userSlice";
import { useHistory } from "react-router";
import { BeatLoader } from "react-spinners";

const Header = ({ hide, searchHide }) => {
  const history = useHistory();
  const userPhoto = useSelector(selectUserPhoto);
  const userName = useSelector(selectUserName);

  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    const searchMovie = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${debouncedTerm}&page=1`
      );

      setSearchResults(data.results);
      setLoading(false);
    };

    if (debouncedTerm) {
      searchMovie();
    }
  }, [debouncedTerm]);

  const smoothScroll = (el) => {
    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-gray-700 p-3">
      {/* Left */}
      <div
        onClick={() => history.push("/")}
        className="flex items-center cursor-pointer"
      >
        <img
          loading="lazy"
          className="h-5 rounded-full object-contain sm:h-8"
          src="https://pesto.tech/pesto-logo-black.png"
          alt="vmovies"
        />
      </div>

      {/* Middle */}
      {!hide && (
        <div className="hidden lg:inline-flex text-gray-200 ml-10 flex-grow">
          <ul className="flex space-x-4">
            <li className="categories">
              <Link to="#pesto" scroll={smoothScroll}>
                Originals
              </Link>
            </li>
            <li className="categories">
              <Link to="#fantasy" scroll={smoothScroll}>
                Fantasy
              </Link>
            </li>
            <li className="categories">
              <Link to="#action" scroll={smoothScroll}>
                Action
              </Link>
            </li>
            <li className="categories">
              <Link to="#comedy" scroll={smoothScroll}>
                Comedy
              </Link>
            </li>
            <li className="categories">
              <Link to="#horror" scroll={smoothScroll}>
                Horror
              </Link>
            </li>
            <li className="categories">
              <Link to="#thriller" scroll={smoothScroll}>
                Thriller
              </Link>
            </li>
            <li className="categories">
              <Link to="#romance" scroll={smoothScroll}>
                Romance
              </Link>
            </li>
            <li className="categories">
              <Link to="#documentaries" scroll={smoothScroll}>
                Documentaries
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Right */}

      <div className="flex items-center justify-end ml-5">
        {!searchHide && (
          <div className="relative flex items-center space-x-2 py-2 lg:py-1 border-b lg:border-b-2 border-gray-400">
            <SearchIcon className="h-4 md:h-5 w-5 text-gray-200 cursor-pointer" />
            <input
              className="text-xs w-28 md:h-10 lg:w-64 bg-transparent outline-none md:text-sm text-gray-200"
              type="text"
              value={term}
              placeholder="Search"
              onChange={(e) => setTerm(e.target.value)}
            />

            {term && (
              <div className="absolute  top-12 -left-10 h-auto w-60 lg:top-14 lg:-left-2 lg:w-full  overflow-hidden bg-gray-800 p-1 rounded-b-md border-gray-700">
                {searchResults.length && !loading ? (
                  searchResults
                    .slice(0, 3)
                    .map((result) => (
                      <SearchResult key={result.id} result={result} />
                    ))
                ) : (
                  <div className="text-lg font-bld text-gray-500 text-center p-2 mt-2">
                    {!searchResults.length && <h3>No Results Found</h3>}
                    <BeatLoader loading={loading} size={20} color="gray" />
                  </div>
                )}
                {searchResults.length && (
                  <div className="text-center text-md rounded-sm font-semibold text-gray-200 py-1 bg-gray-700">
                    <button className="outline-none border-none">
                      More Results
                    </button>
                  </div>
                )}
              </div>
            )}
            <XIcon
              onClick={() => setTerm("")}
              className="h-4 text-gray-200 cursor-pointer"
            />
          </div>
        )}

        <div
          onClick={() =>
            userName ? history.push("/plans") : history.push("/login")
          }
          className="ml-5"
        >
          {userName ? (
            <img
              loading="lazy"
              className="h-10 w-10 lg:flex lg:h-8 lg:w-8 rounded-full cursor-pointer"
              src={userPhoto}
              alt={userName}
            />
          ) : (
            <button className="py-1 px-2 lg:px-3 text-gray-200 bg-blue-500 font-semibold border-none outline-none opacity-80 hover:opacity-100 rounded-sm cursor-pointer">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

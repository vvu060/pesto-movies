import React from "react";
import Row from "../Row";
import Banner from "./Banner";
import requests from "../../requests";

function HomeScreen() {
  return (
    <div className="bg-gray-800">
      <Banner />
      <Row
        title="PESTO ORIGINALS"
        fetchUrl={requests.fetchTrending}
        isLargeRow={true}
      />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Fantasy Movies" fetchUrl={requests.fetchFantasyMovies} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Thriller Movies" fetchUrl={requests.fetchThrillerMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumetaries} />
    </div>
  );
}

export default HomeScreen;

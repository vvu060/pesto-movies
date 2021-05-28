import React from "react";
import Row from "../Row";
import Banner from "./Banner";
import requests from "../../requests";

function HomeScreen() {
  return (
    <div className="bg-gray-800">
      <Banner />
      <Row
        id="pesto"
        title="PESTO ORIGINALS"
        fetchUrl={requests.fetchTrending}
        isLargeRow={true}
      />
      <Row id="top" title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row
        id="fantasy"
        title="Fantasy Movies"
        fetchUrl={requests.fetchFantasyMovies}
      />
      <Row
        id="action"
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        id="comedy"
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        id="horror"
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        id="thriller"
        title="Thriller Movies"
        fetchUrl={requests.fetchThrillerMovies}
      />
      <Row
        id="romance"
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        id="documentaries"
        title="Documentaries"
        fetchUrl={requests.fetchDocumetaries}
      />
    </div>
  );
}

export default HomeScreen;

import React from "react";
import "./styles.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "axios";
import DetailsMovie from "../components/detailsMovie";
import ViewMovies from "../components/viewMovies";

const muestra = [
  {
    Title: "Joker",
    Year: "2019",
    imdbID: "tt7286456",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
  },
  {
    Title: "Avengers: Endgame",
    Year: "2019",
    imdbID: "tt4154796",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
  },
  {
    Title: "Captain Marvel",
    Year: "2019",
    imdbID: "tt4154664",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg"
  },
  {
    Title: "Spider-Man: Far from Home",
    Year: "2019",
    imdbID: "tt6320628",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg"
  },
  {
    Title: "Toy Story 4",
    Year: "2019",
    imdbID: "tt1979376",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTYzMDM4NzkxOV5BMl5BanBnXkFtZTgwNzM1Mzg2NzM@._V1_SX300.jpg"
  },
  {
    Title: "Spider-Man: Homecoming",
    Year: "2017",
    imdbID: "tt2250912",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_SX300.jpg"
  }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: muestra,
      visibility: ""
    };
    this.getData = this.getData.bind(this);
    this.loading = this.loading.bind(this);
    this.initial = this.initial.bind(this);
  }
  componentDidMount() {
    window.addEventListener("keydown", e => {
      let press = e.keyCode;
      if (press === 13) {
        this.getData();
      }
    });
    this.containerInput.style.animation = "showInput 2s ease-out 1s 1 forwards";
  }
  getData(e) {
    this.loadingGif.style.display = "flex";
    this.setState({
      visibility: "hidden"
    });
    let movie = this.inputValue.value;
    if (movie === "") {
      return;
    }

    axios
      .get("https://www.omdbapi.com/?s=" + movie + "&apikey=be99f5f2")
      .then(res => {
        if (res.data.Response === "True") {
          this.setState({
            movies: res.data.Search
          });

          this.loading();
          return;
        }
        this.loading();
        alert("Be more specific with the name of the movie");
      })
      .catch(err => {
        this.loading();
        alert("There is not connection to the server");
      });
  }
  loading(e) {
    this.setState({
      visibility: ""
    });
    this.loadingGif.style.display = "none";
  }
  initial() {
    this.setState({
      movies: muestra
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <div id="header" onClick={this.initial}>
            <Link to="/">
              <i className="fa fa-film" />
              Pelis
              <i className="fa fa-film" />
            </Link>
          </div>
          <div
            id="containerInput"
            ref={div => (this.containerInput = div)}
            className="centradoPerfecto"
          >
            <input
              placeholder="Escribe la pelicula"
              className="form-control"
              ref={input => (this.inputValue = input)}
            />
            <button className="btn btn-primary" onClick={this.getData}>
              <Link to="/">Search</Link>
            </button>
          </div>
          <div id="loadingGif" ref={div => (this.loadingGif = div)}>
            <img
              src="https://s7.gifyu.com/images/5649506effec34527.gif"
              alt="5649506effec34527.gif"
              border="0"
            />
          </div>
          <Route path="/" exact>
            <ViewMovies
              state={this.state}
              ref={viewPeliculas => (this.viewPeliculas = viewPeliculas)}
            />
          </Route>
          <Route path="/movie/:id">
            <DetailsMovie App={this} />
          </Route>
          <div id="footer" className="centradoPerfecto">
            <div id="explanationPage">
              <h2>Explanation on the page</h2>
              <p>
                This page was made with a public api to demonstrate my knowledge
                in obtaining data from an api for the interactive operation of
                the user with the web application
              </p>
            </div>
            <div id="contact">
              <h2>Contact</h2>
              <div id="contenedorIconosContacto">
                <a
                  href="https://www.facebook.com/HamFreesRam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-facebook-square" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ilemar-andrade-0b261818b/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-linkedin-square" />
                </a>
                <a
                  href="https://github.com/ilemarandrade"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-github-square" />
                </a>
                <a
                  href="https://www.instagram.com/ilemar_andrade07/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-instagram" />
                </a>
              </div>
            </div>
            <div id="madeBy">
              <p>Made By web developer Ilemar Andrade</p>
              <p>Reviewed by SwordVoice</p>
              <a href="https://www.swordvoice.com/" target="_blank">
                <img
                  id="imgSwordVoice"
                  alt="img of SwordVoice"
                  src="https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/68956596_577287219470151_6448666964268154880_n.png?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=SidPKZFz_6AAX_YxNgi&_nc_ht=scontent-mia3-1.xx&oh=3bfb67a74eb4f9530f993e612f127d11&oe=5F3F075F"
                />
              </a>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

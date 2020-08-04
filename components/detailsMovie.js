import React from "react";
import "../src/styles.css";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

function DetailsPelicula(props) {
  const { id } = useParams();
  const [peli, setPeli] = React.useState([]);
  const history = useHistory();
  React.useEffect(() => {
    props.App.loadingGif.style.display = "flex";
    axios
      .get("https://www.omdbapi.com/?i=" + id + "&apikey=be99f5f2")
      .then(res => {
        setPeli(res.data);
        props.App.loadingGif.style.display = "none";
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  window.addEventListener("keydown", e => {
    let press = e.keyCode;
    if (press === 13) {
      history.push("/");
    }
  });
  return (
    <div id="containerDetailsPeli" className="centradoPerfecto">
      <div id="detailsFoto">
        <h2>{peli.Title}</h2>
        <img id="impPreview" alt={peli.Title} src={peli.Poster} />
      </div>
      <div id="detailsInformation">
        <h2>Director</h2>
        <p>{peli.Director}</p>
        <h3>Actors</h3>
        <p>{peli.Actors}</p>
        <h3>Plot</h3>
        <p>{peli.Plot}</p>
        <h4>Released</h4>
        <p>{peli.Released}</p>
      </div>
    </div>
  );
}

export default DetailsPelicula;

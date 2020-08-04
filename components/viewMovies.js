import React from "react";
import "../src/styles.css";
import { Link } from "react-router-dom";
class ViewPeliculas extends React.Component {
  ScrollInitial() {
    window.scroll(0, 0);
  }
  loading() {
    this.loadingGif.style.display = "none";
  }
  render() {
    const pelis = this.props.state.movies.map((ele, i) => {
      return (
        <div
          key={i}
          className="containerPreviewMovie"
          onClick={this.ScrollInitial}
        >
          <Link to={`/movie/${ele.imdbID}`}>
            <h3>{ele.Title}</h3>
            <img alt={ele.Title} src={ele.Poster} />
            <p>({ele.Year})</p>
          </Link>
        </div>
      );
    });
    return (
      <div
        id="containerMovies"
        style={{ visibility: this.props.state.visibility }}
        ref={div => (this.containerMovies = div)}
      >
        {pelis}
      </div>
    );
  }
}
export default ViewPeliculas;

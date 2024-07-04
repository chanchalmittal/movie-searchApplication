import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [text, setText] = useState("");
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false); // To track if a search has been performed

  const changeText = (event) => {
    setText(event.target.value);
  };

  const getMovies = (e) => {
    e.preventDefault();

    const encodedText = encodeURIComponent(text);

    axios.get(`https://www.omdbapi.com/?s=${encodedText}&apikey=727fa647`)
      .then((response) => {
        console.log(response);
        if (response.data.Search) {
          setMovies(response.data.Search);
        } else {
          setMovies([]);
        }
        setSearched(true); // Set to true after search is performed
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setMovies([]);
        setSearched(true); // Set to true after search is performed even if there is an error
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Movie Search App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>
            <form className="d-flex" onSubmit={getMovies}>
              <input className="form-control me-2" type="search" placeholder="Search by movie title" aria-label="Search" value={text} onChange={changeText} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <div className="bg-dark text-white text-center py-5">
        <h1>Welcome to the Movie Search App</h1>
        <p>To search a movie, click on the search bar</p>
      </div>
      <div className="container my-3">
        <div className="row">
          {movies.map((value, index) => (
            <div className="col-md-3 col-sm-6 mb-4" key={index}>
              <div className="card h-100">
                <img src={value.Poster} className="card-img-top" alt={value.Title} />
                <div className="card-body">
                  <h5 className="card-title">{value.Title}</h5>
                  <p className="card-text">Year: {value.Year}</p>
                </div>
              </div>
            </div>
          ))}
          {searched && movies.length === 0 && (
            <div className="col-12">
              <p>No results found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data));
  }, []);

  const handleRegister = async ({ username, password }) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    }
    fetch(`${apiUrl}/user/register`, options)
      .then(response => response.json())
      .then(data => console.log(data))
  };

  const handleLogin = async ({ username, password }) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    }
    fetch(`${apiUrl}/user/login`, options)
      .then(response => response.json())
      .then(data => {
        console.log("login sucsessful", data.data)
        localStorage.setItem("token", data.data)})

  };
  
  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const options = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({title, description, runtimeMins})
    }
    fetch(`${apiUrl}/movie`, options)
      .then(response => response.json())
      .then(data => console.log(data))
  }

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />

      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} />

      <h1>Movie list</h1>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
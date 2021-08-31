import React from 'react';
import axios from 'axios';
import Movies from './Movies';
import "./App.css";
//class 버전
class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    const {data: {data: {movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({movies, isLoading: false});
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading , movies} = this.state;
    return (
    <section className="container">
      {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            { movies.map(movie => (
              <Movies
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
          )}
       </section>
    );
  }
}

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h1>The number is {count}</h1>
//       <button onClick={() => {setCount(count+1); console.log("up");}}>count up</button>
//       <button onClick={() => {setCount(count-1); console.log("down");}}>count down</button>
//     </div>
//   );
// }

export default App;

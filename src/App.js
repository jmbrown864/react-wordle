import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Wordle from './components/Wordle';

function App() {

  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/solutions')
      .then(response => response.json())
      .then(json => {
        // choose a solution (random int b/w 0 & 14)
        const randomSolution = json[Math.floor(Math.random()*json.length)]
        setSolution(randomSolution.word)
      })
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
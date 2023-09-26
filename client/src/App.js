import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((result) => setData(result.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;

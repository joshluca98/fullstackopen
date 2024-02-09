import { useState, useEffect } from 'react'
import axios from 'axios';


function App() {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(null);

  const handleChange = (e) => {
    setQuery(e.target.value)
    console.log(e.target.value)
  }

  async function fetchData(query) {
    try {
      if(query.length > 1){
        const response = await axios.get(`https://restcountries.com/v3.1/name/${query}`);
        const data = response.data;
        if (data.length > 10) {
          setData('Too many results. Try to narrow the search.');
          console.log(data.length);
        }
        else if(data.length == 1){
          setData(data);
        }
        } else {
          setData(data);
        }
      
    } catch (error) {
      setData('No results');
    }
  }

useEffect(() => {
    fetchData(query);
  }, [query]);

  return (
    <>
      <label>Find Countries</label>
      <input onChange={handleChange} />
      <div>
        <ul>
          {typeof data !== "string" && data.length > 1 && data.map((country, index) => (
            <li key={index}>{country.name.common}</li>
          ))}
          {typeof data !== "string" && data.length == 1 && (
            <div>
              <h1>{data[0].name.common}</h1>
              <p>Capital: {data[0].capital}</p>
              <p>Area: {data[0].area}</p>
            </div>
          )}
          

        </ul>
        {typeof data === "string" && <div>{data}</div>}
      </div>
    </>
  )
  
}

export default App

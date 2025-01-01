import { useEffect, useState } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

export const getCountries = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const Country = ({ country }) => {
  return (

    <div>
      {country && (
        <>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>

          <p>languages:</p>
          <div>
            <ul>
              {Object.values(country.languages).map(lang => (<li>{lang}</li>))}
            </ul>
            <img src={country.flags.png} />
          </div>
        </>
      )}
    </div>

  )
}

const App = () => {

  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  const filteredCountries = countries && countries.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))

  useEffect(() => {
    getCountries().then(res =>
      setCountries(res)
    )
  }, [])


  return (
    <>
      <div>find countries <input onChange={e => setCountry(e.target.value)} /></div>
      <br />
      <div>{filteredCountries && filteredCountries.length < 11 && filteredCountries.map(country => {
        return (
          <>
            <div key={country.area}>
              {country.name.common} {filteredCountries.length > 2 && (
                <button type="button" onClick={() => setSelectedCountry(country)}>show</button>
              )}
            </div>
            {filteredCountries.length === 1 && (
              <Country country={country} />
            )}
          </>
        )
      })}</div>

      {selectedCountry && filteredCountries.length > 1 && (
        <Country country={selectedCountry} />
      )}
    </>
  )
}

export default App

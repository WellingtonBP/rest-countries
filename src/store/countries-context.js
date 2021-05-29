import { createContext, useEffect, useState } from 'react'

const countriesContext = createContext({
  countries: [],
  currentCountries: [],
  isLoading: true,
  filterCountries: (regionName, countryName) => {},
})

const CountriesProvider = props => {
  const [countries, setCountries] = useState({
    countries: [],
    currentCountries: [],
  })

  const [isLoading, setLoading] = useState(true)

  const filterCountries = (regionName, countryName) => {
    if (regionName !== '' || countryName !== '') {
      const countryReg = new RegExp(countryName, 'gi')
      setCountries(prev => ({
        ...prev,
        currentCountries: prev.countries.filter(country => {
          return countryName === '' && regionName !== ''
            ? country.region === regionName
            : countryName !== '' && regionName === ''
            ? countryReg.test(country.name) ||
              countryReg.test(country.nativeName)
            : (countryReg.test(country.name) || countryReg.test(country.nativeName)) &&
              regionName === country.region
        }),
      }))
    } else {
      setCountries(prev => ({ ...prev, currentCountries: prev.countries }))
    }
  }

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setCountries({
          countries: data,
          currentCountries: data
        })
      })
  }, [])

  return <countriesContext.Provider value={{countries: countries.countries, currentCountries: countries.currentCountries, isLoading, filterCountries}}>{props.children}</countriesContext.Provider>
}

export {countriesContext};
export default CountriesProvider
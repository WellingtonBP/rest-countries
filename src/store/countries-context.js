import { createContext, useEffect, useState } from 'react'

const countriesContext = createContext({
  countries: [],
  filter: {
    countryName: '',
    regionName: '',
  },
  currentCountries: [],
  isLoading: true,
  filterCountries: (regionName, countryName) => {},
})

const filterCountriesHandler = ({countryName, regionName}, country) => {
  const cNameReg = new RegExp(countryName, 'gi')
  if (countryName !== '' && regionName === '')
    return cNameReg.test(country.name) || cNameReg.test(country.nativeName)
  if (countryName === '' && regionName !== '')
    return country.region === regionName
  return (
    (cNameReg.test(country.name) || cNameReg.test(country.nativeName)) &&
    country.region === regionName
  )
}

const CountriesProvider = props => {
  const [countries, setCountries] = useState({
    countries: [],
    currentCountries: [],
  })
  const [filter, setFilter] = useState({
    countryName: '',
    regionName: '',
  })

  const [isLoading, setLoading] = useState(true)

  const filterCountries = (regionName, countryName) => {
    setFilter({ regionName, countryName })
    if (regionName || countryName) {
      setCountries(prev => ({
        ...prev,
        currentCountries: prev.countries.filter(filterCountriesHandler.bind(null, {countryName, regionName})),
      }))
    } else {
      if (countries.countries.length > countries.currentCountries.length) {
        setCountries(prev => ({ ...prev, currentCountries: prev.countries }))
      }
    }
  }

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        setLoading(false)
        setCountries({
          countries: data,
          currentCountries: data,
        })
      })
  }, [])

  return (
    <countriesContext.Provider
      value={{
        countries: countries.countries,
        currentCountries: countries.currentCountries,
        isLoading,
        filterCountries,
        filter,
      }}
    >
      {props.children}
    </countriesContext.Provider>
  )
}

export { countriesContext }
export default CountriesProvider

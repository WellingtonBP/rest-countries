import { useContext } from 'react'

import { countriesContext } from '../../store/countries-context'
import classes from './CountriesList.module.css'
import Spinner from '../UI/Spinner'
import CountryCard from './CountryCard/CountryCard'

const CountriesList = props => {
  const countriesCtx = useContext(countriesContext)
  const { isLoading, currentCountries } = countriesCtx

  if (isLoading) {
    return <Spinner />
  }
  if (currentCountries.length === 0) {
    return <h1 className="info">No countries found!</h1>
  }
  return (
    <section className={`container ${classes.countries_list}`}>
      {currentCountries.map((country, index) => (
        <CountryCard country={country} key={index}/>
      ))}
    </section>
  )
}

export default CountriesList

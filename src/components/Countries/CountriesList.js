import classes from './CountriesList.module.css'
import CountryCard from './CountryCard/CountryCard'

const CountriesList = props => {
  return (
    <section className={classes.countries_list}>
      <h1 className={classes.info}>No countries found!</h1>
    </section>
  )
}

export default CountriesList

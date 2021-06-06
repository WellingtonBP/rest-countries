import { Link } from 'react-router-dom'

import classes from './CountryCard.module.css'

const CountryCard = props => {
  const {name, flag, population, region, capital, alpha3Code} = props.country;

  return (
    <Link className={classes.country} to={`/${alpha3Code}`}>
      <article>
        <img src={flag} alt={name} />
        <section>
          <h1>{name}</h1>
          <p>
            <span>Population: </span>
            {population}
          </p>
          <p>
            <span>Region: </span>
            {region}
          </p>
          <p>
            <span>Capital: </span>
            {capital}
          </p>
        </section>
      </article>
    </Link>
  )
}

export default CountryCard

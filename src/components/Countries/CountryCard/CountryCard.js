import { Link } from 'react-router-dom'

import classes from './CountryCard.module.css'

const CountryCard = props => {
  return (
    <Link className={classes.link}>
      <article className={classes.country}>
        <img />
        <section>
          <h1>{}</h1>
          <p>
            <span>Population: </span>{}
          </p>
          <p>
            <span>Region: </span>{}
          </p>
          <p>
            <span>Capital: </span>{}
          </p>
        </section>
      </article>
    </Link>
  )
}

export default CountryCard

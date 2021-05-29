import { Link } from 'react-router-dom'

import classes from './CountryDetails.module.css'

const CountryDetails = props => {
  return (
    <article className={classes.country_details}>
      <Link to="/" className={classes.back}>
        <i className="fas fa-long-arrow-alt-left"></i>Back
      </Link>
      <img />
      <section>
        <h1>{}</h1>
        <section className={classes.details}>
          <div>
            <p>
              <span>Native Name: </span>
              {}
            </p>
            <p>
              <span>Population: </span>
              {}
            </p>
            <p>
              <span>Region: </span>
              {}
            </p>
            <p>
              <span>Sub Region: </span>
              {}
            </p>
            <p>
              <span>Capital: </span>
              {}
            </p>
          </div>
          <div>
            <p>
              <span>Top Level Domain: </span>
              {}
            </p>
            <p>
              <span>Currencies: </span>
              {}
            </p>
            <p>
              <span>Languages: </span>
              {}
            </p>
          </div>
        </section>
        <section className={classes.borders_countries}>
          <h1>Border Countries: </h1>
          {}
        </section>
      </section>
    </article>
  )
}

export default CountryDetails

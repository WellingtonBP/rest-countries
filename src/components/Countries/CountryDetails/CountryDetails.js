import { Link, useHistory } from 'react-router-dom'

import classes from './CountryDetails.module.css'

const CountryDetails = props => {
  const history = useHistory()
  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders,
  } = props.country

  return (
    <article className={`${classes.country_details} container`}>
      <button className={classes.back} onClick={() => history.goBack()}>
        <i className="fas fa-long-arrow-alt-left"></i>Back
      </button>
      <img src={flag} alt={name} />
      <section>
        <h1>{name}</h1>
        <section className={classes.details}>
          <div>
            <p>
              <span>Native Name: </span>
              {nativeName}
            </p>
            <p>
              <span>Population: </span>
              {population}
            </p>
            <p>
              <span>Region: </span>
              {region}
            </p>
            <p>
              <span>Sub Region: </span>
              {subregion}
            </p>
            <p>
              <span>Capital: </span>
              {capital}
            </p>
          </div>
          <div>
            <p>
              <span>Top Level Domain: </span>
              {topLevelDomain.join(', ')}
            </p>
            <p>
              <span>Currencies: </span>
              {currencies.map(
                (currency, index) =>
                  `${currency.name}${
                    currencies.length !== index + 1 ? ', ' : ''
                  }`
              )}
            </p>
            <p>
              <span>Languages: </span>
              {languages.map(
                (language, index) =>
                  `${language.name}${
                    languages.length !== index + 1 ? ', ' : ''
                  }`
              )}
            </p>
          </div>
        </section>
        <section className={classes.borders_countries}>
          <h1>Border Countries: </h1>
          {borders.map((border, index) => (
            <Link to={`/rest-countries/${border}`} key={index}>
              {border}
            </Link>
          ))}
        </section>
      </section>
    </article>
  )
}

export default CountryDetails

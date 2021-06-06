import { useState, useEffect, useContext } from 'react'

import { countriesContext } from '../../store/countries-context'
import classes from './Filter.module.css'

const Filter = props => {
  const countriesCtx = useContext(countriesContext)
  const [regionFilter, setRegion] = useState({
    value: countriesCtx.filter.regionName,
    showList: false,
  })
  const [countryName, setCountryName] = useState(
    countriesCtx.filter.countryName
  )
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Asia']

  const changeCountryNameHandler = event => {
    setCountryName(event.target.value)
    countriesCtx.filterCountries(regionFilter.value, event.target.value)
  }

  const toggleRegionList = () =>
    setRegion(prev => ({ ...prev, showList: !prev.showList }))

  const selectRegionHandler = regionName => {
    setRegion({
      value: regionName,
      showList: false,
    })
    countriesCtx.filterCountries(regionName, countryName)
  }

  return (
    <section className={`container ${classes.filter_section}`}>
      <div className={classes.input}>
        <i className="fas fa-search"></i>
        <input
          value={countryName}
          type="text"
          placeholder="Search for a country"
          onChange={changeCountryNameHandler}
        />
      </div>
      <div className={classes.filter}>
        <button id="region-filter" onClick={toggleRegionList}>
          {regionFilter.value ? regionFilter.value : 'Filter by Region'}
          <i
            className={`fas fa-angle-${regionFilter.showList ? 'up' : 'down'}`}
          ></i>
        </button>
        {regionFilter.showList && (
          <ul aria-labelledby="region-filter">
            <li onClick={selectRegionHandler.bind(this, '')}>All</li>
            {regions.map((region, index) => (
              <li onClick={selectRegionHandler.bind(this, region)} key={index}>
                {region}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default Filter

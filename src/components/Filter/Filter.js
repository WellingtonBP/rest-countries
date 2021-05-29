import { useState, useEffect } from 'react'

import classes from './Filter.module.css'

const Filter = props => {
  const [regionFilter, setRegion] = useState({
    text: 'Filter by Region',
    value: null,
    showList: false,
  })
  const [countryName, setCountryName] = useState(null)
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Asia'];

  useEffect(() => {
    if (countryName !== null || regionFilter.value) {
    }
  }, [regionFilter.value, countryName])

  const changeCountryNameHandler = event => setCountryName(event.target.value)

  const toggleRegionList = () => setRegion(prev => ({ ...prev, showList: !prev.showList }))

  const selectRegionHandler = regionName => {
    setRegion({
      text: regionName,
      value: regionName.toLowerCase(),
      showList: true,
    })
  }

  return (
    <section className={classes.filter_section}>
      <div className={classes.input}>
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search for a country"
          onChange={changeCountryNameHandler}
        />
      </div>
      <div className={classes.filter}>
        <button id="region-filter" onClick={toggleRegionList}>
          {regionFilter.text}{' '}
          <i
            className={`fas fa-angle-${regionFilter.showList ? 'up' : 'down'}`}
          ></i>
        </button>
        {regionFilter.showList && (
          <ul aria-labelledby="region-filter">
            <li onClick={selectRegionHandler.bind(this, 'All')}>All</li>
            {regions.map(region => (
              <li onClick={selectRegionHandler.bind(this, region)}>{region}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default Filter

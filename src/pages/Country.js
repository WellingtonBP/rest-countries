import { useParams } from 'react-router-dom'
import { useContext } from 'react'

import { countriesContext } from '../store/countries-context'
import CountryDetails from '../components/Countries/CountryDetails/CountryDetails'
import Spinner from '../components/UI/Spinner'

const Country = () => {
  const countriesCtx = useContext(countriesContext)
  const params = useParams()
  const search = new RegExp(`^${params.country}$`, 'i')
  const country = countriesCtx.countries.find(country => {
    return search.test(country.alpha3Code) || search.test(country.name) || search.test(country.nativeName)
  });
  
  if(countriesCtx.isLoading) return <Spinner/>
  if(!country) return <h1 className="info">Country not found!</h1>
  return <CountryDetails country={country}/>
}

export default Country

import { useParams } from 'react-router-dom'

import CountryDetails from '../components/Countries/CountryDetails/CountryDetails'

const Country = () => {
  const params = useParams()
  
  return <CountryDetails />
}

export default Country

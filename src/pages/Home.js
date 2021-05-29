import Filter from '../components/Filter/Filter'
import CountriesList from '../components/Countries/CountriesList'
import Spinner from '../components/UI/Spinner'

const HomePage = props => {
  return (
    <>
      <Filter />
      <Spinner/>
      <CountriesList />
    </>
  )
}

export default HomePage

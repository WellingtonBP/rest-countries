import { Route, Switch } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './pages/Home'
import Country from './pages/Country'

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/rest-countries" exact component={Home} />
        <Route path="/rest-countries/:country" component={Country}/>
      </Switch>
    </>
  )
}

export default App

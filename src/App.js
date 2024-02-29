import {Route, Switch} from 'react-router-dom'

import CourseItem from './Components/CourseItem'

import CourseItemDetails from './Components/CourseItemDetails'

import NotFound from './Components/NotFound'

import './App.css'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={CourseItem} />
      <Route exact path="/courses/:id" component={CourseItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App

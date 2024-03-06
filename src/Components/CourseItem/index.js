import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {Link} from 'react-router-dom'

import Item from '../Item'

import './index.css'

const apiStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  failure: 'failure',
}

class CourseItem extends Component {
  state = {
    api: apiStatus.initial,
    coursesList: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({api: apiStatus.loading})
    const url = `https://apis.ccbp.in/te/courses`

    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const formatData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({coursesList: formatData, api: apiStatus.success})
    } else {
      this.setState({api: apiStatus.failure})
    }
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {coursesList} = this.state

    return (
      <div className="success-container">
        <h1 className="courses">Courses</h1>
        <ul className="courses-container">
          {coursesList.map(each => (
            <Item key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => (
    <div>
      <Link to="/" className="link-element">
        <nav className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website-logo"
            className="logo"
          />
        </nav>
      </Link>
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="fail-heading">Oops! Something Went Wrong</h1>
        <p className="fail-para">
          We cannot seem to find the page you are looking for
        </p>
        <button type="button" className="fail-button" onClick={this.getData}>
          Retry
        </button>
      </div>
    </div>
  )

  renderFinalView = () => {
    const {api} = this.state

    switch (api) {
      case apiStatus.loading:
        return this.loadingView()
      case apiStatus.success:
        return this.successView()
      case apiStatus.failure:
        return this.failureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Link to="/" className="link-element">
          <nav className="header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="logo"
            />
          </nav>
        </Link>
        {this.renderFinalView()}
      </div>
    )
  }
}

export default CourseItem

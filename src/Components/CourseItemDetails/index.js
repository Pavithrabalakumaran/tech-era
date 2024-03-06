import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {Link} from 'react-router-dom'

import './index.css'

const apiStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  failure: 'failure',
}

class CourseItemDetails extends Component {
  state = {
    api: apiStatus.initial,
    course: [],
  }

  componentDidMount() {
    this.getItem()
  }

  getItem = async () => {
    this.setState({api: apiStatus.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const res = await fetch(url)
    if (res.ok === true) {
      const dat = await res.json()
      const updateCourse = {
        id: dat.course_details.id,
        name: dat.course_details.name,
        imageUrl: dat.course_details.image_url,
        description: dat.course_details.description,
      }
      this.setState({course: updateCourse, api: apiStatus.success})
    } else {
      this.setState({api: apiStatus.failure})
    }
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

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

      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="fail-heading">Oops! Something Went Wrong</h1>
      <p className="fail-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="fail-button" onClick={this.getItem}>
        Retry
      </button>
    </div>
  )

  successView = () => {
    const {course} = this.state
    return (
      <div className="cr">
        <div className="view">
          <img
            src={course.imageUrl}
            alt={course.name}
            className="course-name"
          />
          <div>
            <h1 className="course-heading">{course.name}</h1>
            <p className="course-des">{course.description}</p>
          </div>
        </div>
      </div>
    )
  }

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
          <div className="header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="logo"
            />
          </div>
        </Link>
        <div> {this.renderFinalView()}</div>
      </div>
    )
  }
}

export default CourseItemDetails

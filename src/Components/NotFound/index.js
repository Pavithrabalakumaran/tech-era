import {Link} from 'react-router-dom'

const NotFound = () => (
  <div>
    <Link to="/" className="link-el">
      <div className="nf-container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
        />
      </div>
    </Link>
    <div className="no-container">
      <img
        className="no-image"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h1 className="no-heading">Page Not Found</h1>
      <p className="no-para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound

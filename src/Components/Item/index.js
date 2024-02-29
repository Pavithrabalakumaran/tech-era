import {Link} from 'react-router-dom'

import './index.css'

const Item = props => {
  const {details} = props
  const {id, name, logoUrl} = details

  return (
    <div className="li">
      <Link to={`/courses/${id}`} className="link-element">
        <img src={logoUrl} alt={name} className="image" />
        <p className="name">{name}</p>
      </Link>
    </div>
  )
}

export default Item

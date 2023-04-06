import React from 'react'
import {Link} from 'react-router-dom'
function header() {
  return (
    <div className='Header'>
      <div className="logo">
        <Link className='logocontent' to={'/'}>Hospital CRUD</Link>
      </div>
      <div className="urls">
        <ul>
            <li>
                <Link className='links' to={'/patient'}>Patients</Link>
            </li>
            <li>
                <Link className='links' to={'/doctor'}>Doctors</Link>
            </li>
            <li>
                <Link className='links' to={'/rdv'}>Rendez Vous</Link>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default header

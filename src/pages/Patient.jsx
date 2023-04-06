import React, {  useState } from 'react'
import PatientDataGrid from '../compononents/PatientDataGrid'
import PatientForm from '../compononents/PatientForm'


function Patient() {
  const [closed,setClosed]=useState(false)
  return (
    <div className='Patient'>
        {closed ? <PatientForm setClosed={setClosed}/> : ''}
        <PatientDataGrid setClosed={setClosed} closed={closed}/>
    </div>
  )
}

export default Patient

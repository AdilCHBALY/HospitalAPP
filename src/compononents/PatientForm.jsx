import axios from 'axios'
import React, { useState } from 'react'
import { XLg } from 'react-bootstrap-icons'


function PatientForm({setClosed}) {

  const INITAL_STATE = {
    PatientName : '',
    PatientBirthDay : '',
    PatientIllness : '',
  }
  const URL = "http://127.0.0.1:8000/patient"

  const [data,setData]=useState(INITAL_STATE)
  const handleClose=()=>{
    setClosed(false)
  }

  const handleChange=(evt)=>{
    const value = evt.target.value;
    console.log(evt.target.value)
    setData({
      ...data,
      [evt.target.name]:value
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post(URL,data).then(res=>alert(res.data)).then(err=>alert(err.data))
    setClosed(true)
    setData(INITAL_STATE)
  }

  return (
    <div className="form">
      <div className="form__content">
      <XLg className='closebtn' onClick={handleClose}/>
      <form onSubmit={handleSubmit}>
          <div className="form__groupe">
            <label>Name</label>
            <input type="text" placeholder='Insert a Name' name='PatientName' value={data.PatientName} onChange={handleChange} required/>
          </div>
          <div className="form__groupe">
            <label>BirthDay</label>
            <input type="date" name="PatientBirthDay" id="" onChange={handleChange} value={data.PatientBirthDay} required/>
          </div>
          <div className="form__groupe">
            <label>Illness</label>
            <input type="text" placeholder='Insert the Illness' name='PatientIllness' value={data.PatientIllness} onChange={handleChange} required/>
          </div>
          <div className="form__groupe">
            <input type="submit" value="Add Patient"  className='addbtn'/>
          </div>
      </form>
      </div>
    </div>
  )
}

export default PatientForm

import React, { useState } from 'react'
import PropTypes from 'prop-types'

function UserForm({handleSubmitData,btnText}) {
    const [user,setUsername] = useState({username:'',email:''});
    const {username,email} = user;

    const handleChangeName=(e)=>{
        const selectedField = e.target.name;
        const selectedValue = e.target.value;
        setUsername(prevState=>{
           return {...prevState,[selectedField]:selectedValue}
        })
    }
    const formSubmitHandler=(e)=>{
      e.preventDefault();
      handleSubmitData(user);
      setUsername({username:'',email:''})
    }
  return (
    <form onSubmit={formSubmitHandler}>
        <div className="field-group">
         <label>User Name</label>
        <input type="text"  id='username' name="username" value={username} required onChange={handleChangeName} />
        </div>
        <div className="field-group">
         <label>Email</label>
        <input type="email"  id='email' name="email" value={email} required  onChange={handleChangeName} />
        </div>
        <button type='submit' className='btn'>{btnText}</button>
    </form>

  )
}

UserForm.propTypes = {}

export default UserForm

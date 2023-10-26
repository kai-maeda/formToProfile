import React from "react"
import { useState, useRef } from 'react';
import './App.css';

// import { Route, Switch } from "react-router-dom"
// to create these two pages in a moment

export default function App() {
  const defaultInputs = {
    name: "Your Answer",
    email: "Your Answer",
    picture: null,
    birthday: {Day: "Day",Month: "Month",Year: "Year"},
  };

  const [inputs, setInputs] = useState(defaultInputs)
  const [showInfo, setShowInfo] = useState(false) 

  const handleFormSubmit = (data) => {
    setInputs(data);
    setShowInfo(true);
  }

  return (
    <div>
      {!showInfo && <MyForm 
        defaultInputs = {defaultInputs} 
        onFormSubmit = {handleFormSubmit} 
        setInputs = {setInputs} 
        inputs = {inputs}/>}
      {showInfo && <DisplayInfo inputs = {inputs} />}
      {showInfo && <button onClick = {() => setShowInfo(false)} className = 'button-header'>Edit</button>}
    </div>
  )
}

function DisplayInfo({inputs}) {
  return (
    <div className='display-info'>
      <div className = 'data-header'>
        <h1>Profile</h1>
      </div>
      <div className = 'data-header'>
        <p>Name: {inputs.name}</p>
        <p>Email: {inputs.email}</p>
        <p>Birthday: {inputs.birthday.Month}{"/"}{inputs.birthday.Day}{"/"}{inputs.birthday.Year}</p>
        </div>
        {inputs.picture && (
          <div>
            <div className = 'data-header'>
              <p>Profile Picture:</p>
            </div>
    
            <div className = 'data-header'>
            <img 
              src={URL.createObjectURL(inputs.picture)} 
              alt = "" 
              style={{ width: '200px', height: '200px' }}/>
            </div>
          </div>
        )}
    </div>
  )
}

function MyForm({defaultInputs, onFormSubmit, setInputs, inputs}) {

  const fileInputRef = useRef(null);

  const resetFileInput = () => {
    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generateYearOptions=() => {
    const arr = [];
    const startYear = 1900;
    const endYear = new Date().getFullYear();

    arr.push(
      <option key = '0' value="">Year</option>
    )
    for (let i = endYear; i >= startYear; i--) {
      arr.push(<option key = {i} value = {i}>{i}</option>)
    }
    return arr
  }

  const generateMonthOptions=() => {
    const arr = []
    for(let i = 1; i <= 12; i++) {
      arr.push(<option key = {i} value ={i}>{i}</option>)
    }
    return arr
  }
  const generateDayOptions=() => {
    const arr = []
    for(let i = 1; i <= 31; i++) {
      arr.push(<option key = {i} value ={i}>{i}</option>)
    }
    return arr
  }

  const handleChange = (event) => {
    const name = event.target.name;
    if(name === "picture") {
      const file = event.target.files[0]
      setInputs((values) => ({...values, picture: file}))
    }
    else if (name === "birthdayDay" || name === "birthdayMonth" || name === "birthdayYear") {
      const value = event.target.value;
      const newBirthday = { ...inputs.birthday, [name.slice(8)]: value };
      console.log(newBirthday)
      setInputs((values) => ({ ...values, birthday: newBirthday }));
    } else {
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  }
  const isEmailValid = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };
  const isLeapYear = (year) => {
    // Function to check if a year is a leap year
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const isDateValid = (day, month, year) => {
    // Function to check if the selected date is valid
    const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day > daysInMonth[month]) {
      // Day out of range
      if (month === 2 && day === 29 && isLeapYear(year)) {
        return true; // Leap year, February 29 is valid
      }
      return false;
    }

    return true; // Valid date
  };
  const handleSubmit = (event) => {
    event.preventDefault()

  if (
    inputs.name === defaultInputs.name ||
    !isEmailValid(inputs.email) ||
    !isDateValid(inputs.birthday.day, inputs.birthday.month, inputs.birthday.year) ||
    inputs.email === defaultInputs.email ||
    inputs.picture === defaultInputs.picture ||
    inputs.birthday.Day === defaultInputs.birthday.Day ||
    inputs.birthday.Month === defaultInputs.birthday.Month ||
    inputs.birthday.Year === defaultInputs.birthday.Year
  ) {
    alert(
      "Please fill out all required fields with non-default values and provide a valid email and date."
    );    return;
  }
    onFormSubmit(inputs)
    resetFileInput()
  }


  return (
    <form onSubmit = {handleSubmit} className = 'display-info'>
      <label className = 'input-header'><span>Name: </span>
        <input 
        type= "text" 
        name = "name"
        value = {inputs.name || ""}
        onChange = {handleChange}
        required
        />
      </label>
      <br /><br />
      <label className = 'input-header'><span>Email: </span>
        <input 
        type= "text" 
        name = "email"
        value = {inputs.email || ""}
        onChange = {handleChange}
        required
        />
      </label>
      <br /><br />
      <label className = 'input-header'><span>Profile Picture: </span>
        <input 
        type= "file" 
        name = "picture"
        accept = ".jpg,.jpeg, . png"
        ref = {fileInputRef}
        onChange = {handleChange}
        required
        />
      </label>
      <br /><br />
      <label className = 'input-header'><span>Birthday: </span>
        <select 
        name = "birthdayMonth"
        value = {inputs.birthday.month} 
        onChange={handleChange}>
          <option value='0'>Month</option>
          {generateMonthOptions()}
          required
        </select>
        <select 
        name = "birthdayDay"
        value = {inputs.birthday.day} 
        onChange={handleChange}>
          <option value='0'>Day</option>
          {generateDayOptions()}
          required
        </select>
        <select 
          name = "birthdayYear"
          value = {inputs.birthday.year} 
          onChange={handleChange}
        >
          {generateYearOptions()}
          required
        </select>
      </label>
      <br /><br />
      <button type = "submit" className = "button-header">Submit</button>
      <br /><br />
    </form>
  )

}
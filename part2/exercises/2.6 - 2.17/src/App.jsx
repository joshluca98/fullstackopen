import { useState, useEffect } from 'react'
import axios from 'axios'
import contactService from './services/contacts.js'
import './error.css';

const Notification = ( {message} ) => {
  if (message === null) {
    return null
  }
  console.log('test', message);

  return (
    <div className='error'>
      {message}
    </div>
  )
}
const App = () => {
  
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(() => {
    contactService.getAll()
      .then(data => {
        // console.log(data)
        setPersons(data)
        setFilteredPersons(data)
      })
  }, [])
 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSearch = (e) => {
    const filterString = e.target.value.toLowerCase();
    // console.log(filterString);
    setFilteredPersons(persons.filter((person) => person.name.toLowerCase().includes(filterString)))
  }
  const handleNameChange = (e) => {
    // console.log(e.target.value);
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    // console.log(e.target.value);
    setNewNumber(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      id: String(persons.length+1),
      number: newNumber
    }
    if(!personObject.name){
      return window.alert(`Name cannot be blank`)
    }
    if(persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already in the phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setFilteredPersons([...persons, personObject])
      contactService.create(personObject)
        .then(response => {
        // console.log(response)
        setErrorMessage('Contact stored successfully')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }
    
  }
  const onDelete = (e) => {
    const id = e.target.parentElement.id
    if (window.confirm("Do you really want to delete this contact?")) {
      contactService.itemDelete(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id));
        setFilteredPersons(filteredPersons.filter(person => person.id !== id));
        setErrorMessage('Contact deleted successfully')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
      .catch(error => {
        console.error('Error deleting entry:', error);
      });
    }

    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <label>filter shown with <input onChange={handleSearch}/></label>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <br/>
      <div>persons: {JSON.stringify(persons)}</div>
      <h2>Numbers</h2>
      {filteredPersons.map((person)=>{
        return <div id={person.id} key={person.name}><p>{person.name} {person.number}</p><button onClick={onDelete}>Delete</button></div>
      })}
    </div>
  )
}

export default App
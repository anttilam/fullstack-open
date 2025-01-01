import { useEffect, useState } from 'react'
import apiServices from './services/apiServices'
import './index.css'

const Notification = ({ message, isError }) => {

  if (!message) return null

  return (
    <div className={`notification ${isError ? 'error' : 'success'}`}>
      {message}
    </div>
  )

}

const Phonebook = ({ setSearchFilter }) => {
  return (
    <>
      filter shown with <input onChange={(e => setSearchFilter(e.target.value))} />
    </>
  )
}

const Persons = ({ persons, remove }) => {

  return (
    <>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name} {person.number} <button type="button" onClick={() => remove(person)}>delete</button></div>)}
    </>
  )
}

const PersonsForm = ({ setNewPerson, handleSubmit, newPerson }) => {
  return (
    <>
      <h2>Add a new person</h2>
      <form>
        <div>
          name: <input value={newPerson.name} onChange={(e => setNewPerson({ ...newPerson, name: e.target.value }))} />
        </div>
        <div>
          number: <input value={newPerson.number} onChange={(e => setNewPerson({ ...newPerson, number: e.target.value }))} />
        </div>
        <div>
          <button type="submit" onClick={(e) => handleSubmit(e)}>add</button>
        </div>
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState()
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchFilter, setSearchFilter] = useState('');
  const [noteMsg, setNoteMsg] = useState(null)
  const [error, setError] = useState(false)

  const getPersons = () => {
    apiServices.getAll().then(persons => {
      setPersons(persons)
    })
  }

  useEffect(() => {
    getPersons()
  }, [])

  const handleDelete = async (person) => {

    if (confirm(`Delete ${person.name}?`)) {
      try {
        await apiServices.remove(person.id)
        await getPersons()
      } catch (error) {
        setError(true)
        setNoteMsg(`Information of ${person.name} has already been removed from server`)
        setTimeout(() => {
          setNoteMsg(null)
          setError(false)
        }, 5000)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const names = persons && persons.map(person => person.name)

    //handle update person
    if (names.some((person) => person.toLocaleLowerCase() === newPerson.name.toLocaleLowerCase())) {
      const updatedPersonId = persons.find(person => person.name.toLocaleLowerCase() === newPerson.name.toLocaleLowerCase()).id
      const updatedPerson = { name: newPerson.name, number: newPerson.number }

      if (confirm(`${newPerson.name} is already added to phonebook. Replace old number with a new one?`)) {

        apiServices.update(updatedPersonId, updatedPerson).then(updatedPersonRes => {
          setPersons(persons.map(person => person.id !== updatedPersonRes.id ? person : updatedPersonRes))
        }).catch(error => {
          setError(true)
          setNoteMsg(`Information of ${newPerson.name} has already been removed from server`)
          setTimeout(() => {
            setNoteMsg(null)
            setError(false)
          }, 5000)
        })
      }

    } else {
      setNewPerson({ name: '', number: '' })
      apiServices.create(newPerson).then(newPerson => setPersons([...persons, newPerson]))
      setNoteMsg(`Added ${newPerson.name}`)
      setTimeout(() => {
        setNoteMsg(null)
      }, 5000)
    }
  }

  const filteredPersons = persons && persons.filter(person => person.name.toLowerCase().includes(searchFilter))

  return (
    <div>
      {persons && (
        <>
          <h2>Phonebook</h2>
          <Notification isError={error} message={noteMsg} />
          <Phonebook setSearchFilter={setSearchFilter} />
          <div style={{ marginBottom: '30px' }}></div>
          <PersonsForm setNewPerson={setNewPerson} handleSubmit={handleSubmit} newPerson={newPerson} />
          <Persons persons={filteredPersons} remove={handleDelete} />
        </>
      )}
    </div>
  )

}

export default App
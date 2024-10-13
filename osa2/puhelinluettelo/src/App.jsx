import { useState } from 'react'


const Phonebook = ({ setSearchFilter }) => {
  return (
    <>
      filter shown with <input onChange={(e => setSearchFilter(e.target.value))} />
    </>
  )
}

const Persons = ({ persons }) => {

  return (
    <>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchFilter, setSearchFilter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const names = persons.map(person => person.name)

    if (names.some((person) => person.toLocaleLowerCase() === newPerson.name.toLocaleLowerCase())) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else {
      setNewPerson({ name: '', number: '' })
      setPersons([...persons, newPerson])
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Phonebook setSearchFilter={setSearchFilter} />
      <div style={{ marginBottom: '30px' }}></div>
      <PersonsForm setNewPerson={setNewPerson} handleSubmit={handleSubmit} newPerson={newPerson} />
      <Persons persons={filteredPersons} />
    </div>
  )

}

export default App
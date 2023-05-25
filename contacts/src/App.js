import React, { useState, useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.log('Error fetching contacts:', error);
    }
  };

  const handleDeleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const handleAddContact = () => {
    setShowForm(true);
  };

  const handleSaveContact = () => {
    const newContact = {
      id: contacts.length + 1,
      name: `${firstName} ${lastName}`,
      phone: phone,
    };

    setContacts([...contacts, newContact]);
    setShowForm(false);
    setFirstName('');
    setLastName('');
    setPhone('');
  };

  const handleCancelContact = () => {
    setShowForm(false);
    setFirstName('');
    setLastName('');
    setPhone('');
  };

  return (
    <div>
      <h1>Contacts</h1>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name.split(' ')[0]}</td>
              <td>{contact.name.split(' ')[1]}</td>
              <td>{contact.phone}</td>
              <td>
                <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!showForm && (
        <button onClick={handleAddContact}>Add Contact</button>
      )}

      {showForm && (
        <div>
          <h2>Add Contact</h2>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <br />
          <label>
            Phone:
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <br />
          <button onClick={handleSaveContact}>Save</button>
          <button onClick={handleCancelContact}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default App;

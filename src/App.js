import React, { useState } from 'react';
import { openDB } from 'idb';

function App() {
  const [formData, setFormData] = useState({ name: '', address: '', phone: '' });
  const [message, setMessage] = useState('');

  const DB_NAME = 'ContactFormDB';
  const STORE_NAME = 'contacts';

  const initDB = async () => {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  };

  const saveContact = async (contact) => {
    const db = await initDB();
    await db.add(STORE_NAME, contact);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveContact(formData);
      setMessage(' Contact information saved successfulSly!');
      setFormData({ name: '', address: '', phone: '' });
    } catch (error) {
      console.error(error);
      setMessage(' Failed to save contact.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Contact Info Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10, background: 'Green', color: '#fff', border: 'none' }}>
          Submit
        </button>
      </form>
      {message && <p style={{ marginTop: 15, color: 'green' }}>{message}</p>}
    </div>
  );
}

export default App;

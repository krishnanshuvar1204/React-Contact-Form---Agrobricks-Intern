import { openDB } from 'idb';

const DB_NAME = 'ContactFormDB';
const STORE_NAME = 'contacts';

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

export async function saveContact(contact) {
  const db = await initDB();
  await db.add(STORE_NAME, contact);
}

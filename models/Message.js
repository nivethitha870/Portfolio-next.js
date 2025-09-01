import { collection, getDocs, getDoc, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// Reference to the "messages" collection in Firestore
const messageCollection = collection(db, "messages");

// Fetch all messages
export async function getAllMessages() {
  const snapshot = await getDocs(messageCollection);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
}

// Fetch a single message by Firestore document ID
export async function getMessageById(id) {
  const docRef = doc(db, "messages", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// Add a new message
export async function addMessage(messageData) {
  const docRef = await addDoc(messageCollection, {
    ...messageData,
    createdAt: new Date(), // timestamps since Firestore is schemaless
  });
  return docRef.id;
}

// Delete a message
export async function deleteMessage(id) {
  const docRef = doc(db, "messages", id);
  await deleteDoc(docRef);
}

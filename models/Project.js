// models/Project.js
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// Reference to the "projects" collection
const projectCollection = collection(db, "projects");

// Fetch all projects
export async function getAllProjects() {
  const snapshot = await getDocs(projectCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Fetch single project by ID
export async function getProjectById(id) {
  const docRef = doc(db, "projects", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// Add new project
export async function addProject(projectData) {
  const docRef = await addDoc(projectCollection, projectData);
  return docRef.id;
}

// Update a project
export async function updateProject(id, updatedData) {
  const docRef = doc(db, "projects", id);
  await updateDoc(docRef, updatedData);
}

// Delete a project
export async function deleteProject(id) {
  const docRef = doc(db, "projects", id);
  await deleteDoc(docRef);
}

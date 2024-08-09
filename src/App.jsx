import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { useState, useEffect } from 'react'
import Split from "react-split"
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import { notesCollection, db } from "../firebase"

import './App.css'

function App() {
  // Stateful Variables
  const [notes, setNotes] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState("")
  const [tempNoteText, setTempNoteText] = useState("")

  console.log(tempNoteText)

  // Regular Variables
  const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]
  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)

  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      // Sync up local notes array with the snapshot data
      const notesArr = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))

      setNotes(notesArr)
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    !currentNoteId && setCurrentNoteId(notes[0]?.id)
  }, [notes])

  useEffect(() => {
    currentNote && setTempNoteText(currentNote.body)
  }, [currentNote])

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      tempNoteText !== currentNote.body && updateNote(tempNoteText)
    }, 1000)

    return () => clearTimeout(timeOutId)
  }, [tempNoteText])

  async function createNewNote() {
    // Create a variable to contain the new note's object
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now()
    }

    // Use FB's addDoc fn to add the newNote to the notesCollection on FB
    const newNoteRef = await addDoc(notesCollection, newNote)

    // Collect the id from the doc ref we created
    // and use it to set the newNote as the current note
    setCurrentNoteId(newNoteRef.id)
  }

  async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId)
    console.log('run update fn')
    await setDoc(
      docRef,
      {
        body: text,
        updatedAt: Date.now()
      },
      {
        merge: true
      }
    )
  }

  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId)
    await deleteDoc(docRef)
  }


  return (
    <main>
      {
        notes.length > 0
          ?
          <Split
            sizes={[30, 70]}
            direction="horizontal"
            className="split"
          >
            <Sidebar
              notes={sortedNotes}
              currentNote={currentNote}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            {
              // currentNoteId &&
              // notes.length > 0 &&
              <Editor
                tempNoteText={tempNoteText}
                setTempNoteText={setTempNoteText}
              />
            }
          </Split>
          :
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button
              className="first-note"
              onClick={createNewNote}
            >
              Create one now
            </button>
          </div>

      }
    </main>
  )
}

export default App

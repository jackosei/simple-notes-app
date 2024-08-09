import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { useState, useEffect } from 'react'
import Split from "react-split"
import { nanoid } from "nanoid"
import { onSnapshot } from "firebase/firestore"
import { notesCollection } from "../firebase"

import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0]?.id) || ""
  )

  const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]


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
    console.log("hello")
  }, [notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text) {
    // Sort list by most recently updated
    setNotes(oldNotes => {
      const sortedNotes = []

      oldNotes.map((oldNote) => {
        if (oldNote.id === currentNoteId) {
          return sortedNotes.unshift({ ...oldNote, body: text })
        } else {
          return sortedNotes.push(oldNote)
        }
      })

      return sortedNotes
    })

  }

  function deleteNote(event, noteId) {
    event.stopPropagation()
    setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
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
              notes={notes}
              currentNote={currentNote}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            {
              currentNoteId &&
              notes.length > 0 &&
              <Editor
                currentNote={currentNote}
                updateNote={updateNote}
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

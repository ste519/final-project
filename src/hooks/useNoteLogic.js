import { useState } from 'react';
import uuid from 'react-uuid';

const useNoteLogic = () => {
    const [inputValue, setInputValue] = useState('')
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [tag, setTag] = useState(null)
    const [selectedNote, setSelectedNote] = useState()
    const [editing, setEditing] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [error, setError] = useState(false)
    const [activeTag, setActiveTag] = useState(0)
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('mynotes')) ?? [])
    const tags = ['All', ...new Set(notes.map(item => item.tag).sort((a, b) => {
        const tagA = a.toLowerCase();
        const tagB = b.toLowerCase();
    
        if (tagA < tagB) return -1;
        if (tagA > tagB) return 1;
        return 0;
    }))];

    const cleanNotepad = () => {
        setInputValue('')
        setTag('')
    }

    const addNote = () => {
        if (!tag) { setError(true); }
        else {
            const newNote = {
                tag: tag,
                content: inputValue,
                time: new Date(),
                id: uuid()
            }
            const newNotes = [newNote, ...notes]
            setNotes(newNotes)
            localStorage.setItem('mynotes', JSON.stringify(newNotes))
            cleanNotepad()
        }
    }

    const deleteNote = () => {
        const newNotes = notes.filter((note) => note.id !== selectedNote)
        setNotes(newNotes)
        localStorage.setItem('mynotes', JSON.stringify(newNotes))
    }

    const editNote = () => {
        const newNote = {
            tag: tag,
            content: inputValue,
            time: new Date(),
            id: selectedNote
        }
        const newNotes = [newNote, ...notes.filter((note) => note.id !== selectedNote)]
        setNotes(newNotes)
        setEditing(false)
        cleanNotepad()
        localStorage.setItem('mynotes', JSON.stringify(newNotes))
    }

    const filteredNotes = notes.filter(item => {
        const lowerCaseContent = item.content.toLowerCase();
        const lowerCaseSearchValue = searchValue.toLowerCase();

        if (activeTag === 0) {
            return lowerCaseContent.includes(lowerCaseSearchValue);
        } else if (lowerCaseSearchValue) {
            return item.tag === tags[activeTag] && lowerCaseContent.includes(lowerCaseSearchValue) && !lowerCaseContent.includes('<img');
        } else {
            return item.tag === tags[activeTag];
        }
    });

    return {
        inputValue, setInputValue, showDeleteDialog, setShowDeleteDialog, tag, setTag, selectedNote, setSelectedNote, editing, setEditing, searchValue, setSearchValue, error, setError, activeTag, setActiveTag,
        notes, setNotes, tags, cleanNotepad, addNote, deleteNote, editNote,
        filteredNotes
    };
};

export default useNoteLogic;

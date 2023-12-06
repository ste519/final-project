import { createContext } from 'react';
import useNoteLogic from '../hooks/useNoteLogic';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const noteLogic = useNoteLogic();

    return (
        <NoteContext.Provider value={noteLogic}>
            {children}
        </NoteContext.Provider>
    );
};

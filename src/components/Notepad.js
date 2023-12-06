
import { Autocomplete, TextField, Button } from "@mui/material";
import ReactQuill from "react-quill";
import { useContext } from "react";
import { NoteContext } from "../providers/NoteContext";

const Notepad = () => {
    const { tag, tags, error, setError, setTag, inputValue, setInputValue, editNote, addNote, cleanNotepad, editing, setEditing } = useContext(NoteContext)

    const handleChange = (_, newValue) => {
        setError(false)
        setTag(newValue);
    }

    return (
        <div className="notepad-wrapper">
            <Autocomplete
                id="tag"
                fullWidth
                freeSolo
                options={tags.slice(1,)}
                value={tag}
                onChange={handleChange}
                inputValue={tag || ''}
                onInputChange={handleChange}
                renderInput={(params) => <TextField {...params} label="Tag" error={error} />}
            />

            <ReactQuill theme="snow" value={inputValue} onChange={setInputValue} />

            <div className="btn-group">
                <Button variant="contained"
                    size="large"
                    onClick={editing ? editNote : addNote}>
                    {`${editing ? "Edit" : "Add"} Note`}
                </Button>
                {editing &&
                    <Button sx={{ alignSelf: 'flex-end' }}
                        onClick={() => {
                            cleanNotepad()
                            setError(false);
                            setEditing(false)
                        }}
                    >Cancel</Button>}
            </div>
        </div>
    )
}

export default Notepad
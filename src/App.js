import './App.css';
import { useState } from 'react';
import DeleteDialog from './components/DeleteDialog';
import { Container, TextField, Autocomplete, Button, Tabs, Tab, InputLabel, Input, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css'
import SearchIcon from '@mui/icons-material/Search';
import NoteItem from './components/NoteItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors'

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [tag, setTag] = useState(null)
  const [selectedNote, setSelectedNote] = useState()
  const [editing, setEditing] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [error, setError] = useState(false)

  const theme = createTheme({
    palette: {
      primary: {
        main: grey[900],
      }
    },
  });
  const [activeTag, setActiveTag] = useState(0)
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('mynotes')) ?? [])
  const tags = ['All', ...new Set(notes.map(item => item.tag))];

  const filteredNotes = notes.filter(item => {
    const lowerCaseContent = item.content.toLowerCase();
    const lowerCaseSearchValue = searchValue.toLowerCase();

    return activeTag === 0 ? lowerCaseContent.includes(lowerCaseSearchValue) :
      item.tag === tags[activeTag] && lowerCaseContent.includes(lowerCaseSearchValue);
  });


  const addNote = () => {
    if (!tag) {
      setError(true)
      return
    }
    const newNote = { tag: tag, content: inputValue, time: new Date() }
    const newNotes = [newNote, ...notes]
    setNotes(newNotes)
    setInputValue('')
    setTag('')
    localStorage.setItem('mynotes', JSON.stringify(newNotes))
  }

  const deleteNote = () => {
    const newNotes = notes.filter((_, i) => i !== selectedNote)
    setNotes(newNotes)
    localStorage.setItem('mynotes', JSON.stringify(newNotes))
  }

  const editNote = () => {
    const newNote = { tag: tag, content: inputValue, time: new Date() }
    const newNotes = [newNote, ...notes.filter((_, i) => i !== selectedNote)]
    setNotes(newNotes)
    setTag('')
    setInputValue('')
    setEditing(false)
    localStorage.setItem('mynotes', JSON.stringify(newNotes))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">

        <h1 style={{ textAlign: 'center', margin: "30px 0", fontFamily: 'Jost, sans-serif' }}>
          <img style={{
            display: 'inline-block',
            width: '20px',
            marginRight: '10px'
          }} src="logo.svg" />The Note App</h1>
        <Grid container spacing={10} height="90vh">
          <Grid xs={6} display="flex" flexDirection="column" gap={2} justifyContent="center" alignItems="center" >
            <Autocomplete
              id="tag"
              fullWidth
              freeSolo
              options={tags.slice(1,)}
              value={tag}
              onChange={(event, newValue) => {
                setError(false)
                setTag(newValue);
              }}
              inputValue={tag || ''}
              onInputChange={(event, newValue) => {
                setError(false)
                setTag(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Tag" error={error} />}
            />

            <ReactQuill theme="snow" value={inputValue} onChange={setInputValue} />

            <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Button variant="contained"
                size="large"
                onClick={editing ? editNote : addNote}>
                {`${editing ? "Edit" : "Add"} Note`}
              </Button>
              {editing && <Button sx={{ alignSelf: 'flex-end' }}
                onClick={() => {
                  setTag('');
                  setInputValue('');
                  setSelectedNote(null);
                  setError(false);
                  setEditing(false)
                }}
              >Cancel</Button>}
            </div>
          </Grid>

          <Grid gap={2} xs={6} display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" height="100%">
            <Tabs value={activeTag} onChange={(e, index) => setActiveTag(index)} aria-label="tabs">
              {tags.map((tag, index) =>
                <Tab label={tag} key={index} id={`tag-${index}`} />)}
            </Tabs>

            <TextField
              id="search-input"
              fullWidth
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <div style={{ overflow: 'auto', width: '102%', height: '100%', padding: 5, }}>
              <Grid container spacing={2} xs={12} margin='auto'>
                {filteredNotes.map((note, index) =>
                  <Grid xs={6} key={index}>
                    <NoteItem
                      note={note}
                      handleDelete={() => {
                        setSelectedNote(index);
                        setShowDeleteDialog(true);
                        setEditing(false);
                      }}
                      handleEdit={
                        () => {
                          setTag(notes[index].tag);
                          setInputValue(notes[index].content);
                          setSelectedNote(index);
                          setEditing(true);
                        }}
                    />
                  </Grid>
                )}
              </Grid>
            </div>
          </Grid>
        </Grid>
        <DeleteDialog
          open={showDeleteDialog}
          handleClose={() => setShowDeleteDialog(false)}
          handleConfirm={() => { setShowDeleteDialog(false); deleteNote() }}
        />
      </Container >
    </ThemeProvider>
  );
}

export default App;
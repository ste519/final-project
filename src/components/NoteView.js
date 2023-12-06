import React, { useContext } from 'react'
import { Tabs, Tab, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import NoteItem from './NoteItem';
import Grid from '@mui/material/Unstable_Grid2';
import { NoteContext } from '../providers/NoteContext';

const NoteView = () => {
    const { activeTag, setActiveTag, tags, searchValue, setSearchValue, filteredNotes } = useContext(NoteContext)

    return (
        <>
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

            <div className='note-wrapper'>
                <Grid container spacing={2} xs={12} margin='auto'>
                    {filteredNotes.map((note, index) =>
                        <Grid xs={6} key={index}>
                            <NoteItem note={note} />
                        </Grid>
                    )}
                </Grid>
            </div>
        </>
    )
}

export default NoteView
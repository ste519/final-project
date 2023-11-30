import { useState } from 'react'
import { Card, CardContent, Typography, CardActions, IconButton, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close'

const NoteItem = ({ note, handleDelete, handleEdit }) => {
    const time = new Date(note.time).toLocaleDateString('en-US')
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <DialogContent>
                    <Typography>{note.tag}</Typography>
                    <Typography variant="body2" color="text.secondary" >    {time}</Typography>
                    <div dangerouslySetInnerHTML={{ __html: note.content }} />
                </DialogContent>
                <DialogActions>
                    <IconButton
                        aria-label="delete"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
            </Dialog>
            <Card>
                <CardContent onClick={handleOpen}>
                    <div className="note-content" dangerouslySetInnerHTML={{ __html: note.content }} />
                </CardContent>
                <CardActions>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={handleDelete}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={handleEdit}
                    >
                        <EditIcon />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary" marginLeft="auto" marginRight={1}>
                        {time}
                    </Typography>
                </CardActions>
            </Card>
        </>
    )
}

export default NoteItem
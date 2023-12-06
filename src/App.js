import DeleteDialog from './components/DeleteDialog';
import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import 'react-quill/dist/quill.snow.css';
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors'
import Notepad from './components/Notepad';
import { NoteProvider } from './providers/NoteContext';
import NoteView from './components/NoteView';

const App = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: grey[900],
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <NoteProvider >
        <Container maxWidth="lg">
          <h1 className="header-text">
            <img className='header-img' src="logo.svg" alt="logo" />
            The Note App
          </h1>

          <Grid container spacing={10} height="90vh">
            <Grid xs={6} >
              <Notepad />
            </Grid>
            <Grid gap={2} xs={6} display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" height="100%">
              <NoteView />
            </Grid>
          </Grid>

          <DeleteDialog />
        </Container >
      </NoteProvider>
    </ThemeProvider>
  );
}

export default App;
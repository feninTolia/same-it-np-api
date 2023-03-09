import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './scenes/HomePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

function App() {
  //  const mode = useSelector((state) => state.mode);
  const mode = 'light';
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

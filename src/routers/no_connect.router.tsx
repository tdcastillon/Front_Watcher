import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../assets/styles/theme';

import Default_Home from '../Pages/Home/Default_Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';

function NoConnectRouter() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Default_Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<h1>404: Not Found</h1>} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default NoConnectRouter;
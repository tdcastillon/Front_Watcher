import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../assets/styles/theme';

import Home from '../Pages/Home/Dashboard';
import Search_Movies from '../Pages/Movies/Search_Movies';
import Movie_Page from '../Pages/Movies/Movie_Page';
import AllCastPage from '../Pages/Movies/All_Cast_Page';
import ResponsiveAppBar from '../assets/special_components/AppBar';
import People_Page from '../Pages/People/people_page';
import Search_Series from '../Pages/Series/Search_Series';
import Serie_Page from '../Pages/Series/Serie_Page';
import AllCastPageS from '../Pages/Series/All_Cast_Page';
import All_CrewS_Page from '../Pages/Series/All_Crew_Page';

function ConnectRouter() {
    return (
        <ThemeProvider theme={theme}>
            <ResponsiveAppBar />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search_movies" element={<Search_Movies />} />
                    <Route path="/search_series" element={<Search_Series />} />
                    <Route path="/movie/:movie_id" element={<Movie_Page />} />
                    <Route path="/movie/:movie_id/cast" element={<AllCastPage/>} />
                    <Route path="/serie/:serie_id" element={<Serie_Page />} />
                    <Route path="/serie/:serie_id/cast" element={<AllCastPageS/>} />
                    <Route path="/serie/:serie_id/crew" element={<All_CrewS_Page/>} />
                    <Route path="/people/:people_id" element={<People_Page/>} />
                    <Route path="*" element={<h1>404: Not Found</h1>} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default ConnectRouter;
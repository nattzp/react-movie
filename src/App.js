import React from "react";
import './App.css';
import SideNav from "./components/SideNav";
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Home from './pages/Home'
import Discover from './pages/Discover'
import SearchBar from './components/SearchBar'

function App() {
    return (
        <React.Fragment>
            <Router>
                <SearchBar placeholder={'Search movie titles'} />
                <SideNav />
                <Switch>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/discover' exact element={<Discover />} />
                </Switch>
            </Router>



        </React.Fragment>
    )
}

export default App
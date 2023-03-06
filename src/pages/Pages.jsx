import React from 'react';
import Home from './Home';
import Details from './Details';
import Recipe from './Recipe';
import {Route, Routes} from "react-router-dom";


function Pages() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searched/:search" element={<Details />} />
        <Route path="/recipe/:name" element={<Recipe />}/>
    </Routes>
  );
}

export default Pages
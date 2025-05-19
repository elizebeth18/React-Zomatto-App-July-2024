import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from './main';
import Header from './Header';
import Footer from './Footer';
import Home from './Home/Home';
import Listing from './Listing';
import Details from './Details/Details';
import PlaceOrder from './Orders/PlaceOrder';
import ViewOrder from './Orders/ViewOrder';

const NotFound = () => <h1>Page Not Found</h1>

const Routing = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main/>}>
                    <Route index element={<Home/>} />
                    <Route path="/listing/:mealId" element={<Listing/>} />
                    <Route path="/details" element={<Details/>} />
                    <Route path="/placeOrder/:restName" element={<PlaceOrder/>} />
                    <Route path="/viewOrder" element={<ViewOrder/>}/>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default Routing
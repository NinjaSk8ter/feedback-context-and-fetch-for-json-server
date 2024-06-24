import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
//import FeedbackData from './data/FeedbackData.js'
import FeedbackList from './components/FeedbackList.jsx'
import FeedbackStats from './components/FeedbackStats.jsx'
import FeedbackForm from './components/FeedbackForm.jsx'
import AboutIconLink from './components/AboutIconLink.jsx'
import AboutPage from './pages/AboutPage.jsx'
import Post from './components/Post.jsx'
import './App.css'
import { FeedbackProvider } from './context/FeedbackContext'

function App() {

    return (
        <FeedbackProvider>
            <Router>
                <Header />
                <div className='container'>
                    <Routes>
                        <Route
                            exact
                            path='/'
                            element={
                                <Fragment>
                                    <FeedbackForm />
                                    <FeedbackStats />
                                    <FeedbackList />
                                </Fragment>
                            }
                        ></Route>

                        <Route exact path='/about' element={<AboutPage />} />
                        {/*<Route exact path='/post/:id' element={<Post />} />*/}
                        {/*<Route exact path='/post/:id/:name' element={<Post />} />*/}
                        <Route exact path='/post/*' element={<Post />} />
                    </Routes>

                    <AboutIconLink />
                </div>
            </Router >
        </FeedbackProvider>
    )
}

export default App

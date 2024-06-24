import React from 'react'
import { FaQuestion } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Card from '../components/shared/Card'

const AboutPage = () => {
    return (
        <Card>
            <div className='about'>
                <h1>About This Project</h1>
                <p>This is a React app for feedback</p>
                <p>Version: 1.0.0</p>
                <p>
                    <Link to='/'>Back To Home</Link>
                </p>
            </div>
        </Card>
    )
}

export default AboutPage
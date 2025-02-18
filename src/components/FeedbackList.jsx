import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import FeedbackItem from './FeedbackItem'
import Spinner from './shared/Spinner'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackList = () => {
    const feedbackContext = useContext(FeedbackContext)
    const { feedback, isLoading } = feedbackContext

    console.log(feedback)

    if (!isLoading && (!feedback || feedback.length === 0)) {
        return <p>No Feedback yet</p>
    }

    return (
        isLoading ? (
            <Spinner />
        ) : (
            <div className='feedback-list'>
                <AnimatePresence>
                    {feedback.map(item => (
                        <motion.div
                            key={item.id}
                            intial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <FeedbackItem
                                key={item.id}
                                item={item}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        )
    )
}

export default FeedbackList
import React, { useContext, useState, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackForm = () => {
    const [text, setText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(10)

    const feedbackContext = useContext(FeedbackContext)
    const { addFeedback, feedbackEdit, updateFeedback } = feedbackContext

    useEffect(() => {
        if (feedbackEdit.edit === true) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    const handleTextChange = (e) => {
        //console.log(e.target.value)

        if (text === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (text !== '' && text.trim().length <= 10) {
            setMessage('Text must be at least 10 characters')
            setBtnDisabled(true)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }

        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim().length > 10) {
            const newFeedback = {
                text: text,
                rating: rating,
            }
            console.log('newfeedback here:', newFeedback)

            if (feedbackEdit.edit === true) {
                console.log('into update')
                console.log('newfeedback hereee:', newFeedback)
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedback(newFeedback)
            }
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service?</h2>

                <RatingSelect
                    //selectMe={(rating) => console.log(rating)}
                    selectMe={(rating) => setRating(rating)}
                />

                <div className='input-group'>
                    <input
                        onChange={handleTextChange}
                        type='text'
                        placeholder='Write a review'
                        value={text}
                    />
                    <Button
                        isDisabled={btnDisabled}
                        type='submit'
                    >
                        Send
                    </Button>
                </div>
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm
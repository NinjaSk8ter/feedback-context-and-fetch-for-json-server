//import { v4 as uuidv4 } from 'uuid'
import React, { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    //const [feedback, setFeedback] = useState(
    //     [
    //         {
    //             id: 1,
    //             text: 'item 1',
    //             rating: 1
    //         },
    //         {
    //             id: 2,
    //             text: 'item 2',
    //             rating: 3
    //         },
    //         {
    //             id: 3,
    //             text: 'item 3',
    //             rating: 5
    //         }
    //     ]
    // )

    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    const fetchFeedback = async () => {
        const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
        const data = await response.json()

        //console.log(data)
        setFeedback(data)
        setIsLoading(false)
    }

    const addFeedback = async (newFeedback) => {
        const response = await fetch(`http://localhost:5000/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback),
        });
        const data = await response.json()

        setFeedback([data, ...feedback])
    }

    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure')) {
            await fetch(`http://localhost:5000/feedback/${id}`, {
                method: 'DELETE'
            });

            setFeedback(feedback.filter(
                item => {
                    item.id !== id
                }
            ))
        }
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item: item,
            edit: true,
        })
    }

    const updateFeedback = async (id, updItem) => {
        //console.log('checking', id)

        const response = await fetch(`http://localhost:5000/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem),
        })

        const data = await response.json()

        setFeedback(feedback.map((item) => (
            (item.id === id ? { ...item, ...data } : item)
        )))
    }


    return (
        <FeedbackContext.Provider
            value={{
                feedback: feedback,
                feedbackEdit,
                isLoading,
                deleteFeedback,
                addFeedback,
                editFeedback,
                updateFeedback,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext
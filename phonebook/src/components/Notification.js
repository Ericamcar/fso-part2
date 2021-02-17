import React from 'react'

const Notification = ({message}) => {
    const successStyle = {
        border: '2px solid green',
        borderRadius: '15px',
        color: 'green',
        backgroundColor: 'lightgray',
        padding: '1.5rem'
    }
    const errorStyle = {
        border: '2px solid red',
        borderRadius: '15px',
        color: 'red',
        backgroundColor: 'lightgray',
        padding: '1.5rem'
    }

    if (!message) return null;

    return (
        <div style={message.type === 'success' ? successStyle : errorStyle}>
            {message.msg}
        </div>
    )
}

export default Notification;
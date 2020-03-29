import React from 'react';

const Notification = ({ notification }) => {
    const {message, type} = notification;
return <div className={`Notification ${type}`}>{message}</div>
};

export default Notification;
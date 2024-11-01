import React from 'react';

const PopupMessage = ({ show, message, type }) => {
    if (!show) return null;

    return (
        <div style={{backgroundColor: type === 'success' ? '#10B981' : '#EF4444'}} className="fixed bottom-5 right-5 p-4 rounded-lg text-white">
            {message}
        </div>
    );
};

export default PopupMessage;

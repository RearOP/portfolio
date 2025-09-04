// client/src/components/ContactMessages.jsx
import React from 'react';

const ContactMessages = ({ messages, onDeleteMessage }) => {
  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">{message.name}</h3>
              <p className="text-indigo-600 dark:text-indigo-400">{message.email}</p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(message.date).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{message.message}</p>
          <button
            onClick={() => onDeleteMessage(message._id)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactMessages;
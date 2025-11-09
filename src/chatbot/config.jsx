import React from 'react';

export const config = {
  botName: 'HVAC Assistant',
  initialMessages: [
    {
      message: "Hello! I'm your HVAC assistant. How can I help you today?",
      type: 'text',
      widget: 'options',
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#3b82f6',
    },
    chatButton: {
      backgroundColor: '#3b82f6',
    },
  },
  customComponents: {},
  widgets: [
    {
      widgetName: 'options',
      widgetFunc: (props) => {
        const options = [
          { label: 'Book a service', value: 'book_service' },
          { label: 'Get a quote', value: 'get_quote' },
          { label: 'Ask a question', value: 'ask_question' },
        ];

        return (
          <div className="flex flex-col space-y-2 p-2">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => props.actionProvider.handleOptionClick(option.value)}
                className="px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        );
      },
    },
  ],
};

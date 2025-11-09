export class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet() {
    const message = this.createChatBotMessage("Hello! How can I assist you with your HVAC needs today?");
    this.updateChatbotState(message);
  }

  handleServiceInquiry() {
    const message = this.createChatBotMessage("We offer a range of HVAC services including installation, maintenance, and repair. Would you like to schedule a service call?");
    this.updateChatbotState(message);
  }

  handleQuoteRequest() {
    const message = this.createChatBotMessage({
      message: "To get an accurate quote, please visit our 'Get a Quote' page or provide some details about your project.",
      widget: 'options'
    });
    this.updateChatbotState(message);
  }

  handleContactInfo() {
    const message = this.createChatBotMessage({
      message: "You can reach us at:\n📞 (123) 456-7890\n✉️ info@hvaccompany.com\n\nOur support team is available 24/7 for emergency services.",
      widget: 'options'
    });
    this.updateChatbotState(message);
  }

  handleThanks() {
    const message = this.createChatBotMessage("You're welcome! Is there anything else I can help you with?");
    this.updateChatbotState(message);
  }

  handleDefault() {
    const message = this.createChatBotMessage({
      message: "I'm here to help! Could you please rephrase your question or choose from these options:",
      widget: 'options'
    });
    this.updateChatbotState(message);
  }

  handleOptionClick(option) {
    switch(option) {
      case 'book_service':
        return this.handleServiceInquiry();
      case 'get_quote':
        return this.handleQuoteRequest();
      case 'ask_question':
        return this.handleDefault();
      default:
        return this.handleDefault();
    }
  }

  updateChatbotState(message) {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  }
}

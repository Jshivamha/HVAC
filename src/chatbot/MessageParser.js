export class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      this.actionProvider.greet();
    } else if (lowerCaseMessage.includes('service') || lowerCaseMessage.includes('book')) {
      this.actionProvider.handleServiceInquiry();
    } else if (lowerCaseMessage.includes('quote') || lowerCaseMessage.includes('price')) {
      this.actionProvider.handleQuoteRequest();
    } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('phone') || lowerCaseMessage.includes('email')) {
      this.actionProvider.handleContactInfo();
    } else if (lowerCaseMessage.includes('thank') || lowerCaseMessage.includes('thanks')) {
      this.actionProvider.handleThanks();
    } else {
      this.actionProvider.handleDefault();
    }
  }
}

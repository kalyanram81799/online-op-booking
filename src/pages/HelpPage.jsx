import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, Mail, MessageCircle, Clock } from 'lucide-react';

const HelpPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "To book an appointment, click on 'BOOK APPOINTMENT' on the homepage, select your medical specialty, choose a doctor, and complete the payment process. You'll receive a unique appointment ID for confirmation."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards. The consultation fee is ₹200 for all specialists. Payment is secure and encrypted for your safety."
    },
    {
      question: "How will I receive medicine reminders?",
      answer: "After your consultation, if the doctor prescribes medication, you'll receive SMS reminders at the scheduled times. Make sure to provide your correct phone number during registration."
    },
    {
      question: "Can I reschedule my appointment?",
      answer: "Yes, you can reschedule your appointment by contacting our support team with your appointment ID. Please note that rescheduling should be done at least 24 hours in advance."
    },
    {
      question: "What if I forgot my appointment ID?",
      answer: "Don't worry! You can retrieve your appointment ID by contacting our support team with your registered phone number. We'll help you find your appointment details."
    },
    {
      question: "Are my medical records secure?",
      answer: "Absolutely! We use industry-standard encryption to protect your medical information. Your privacy and data security are our top priorities."
    },
    {
      question: "How do I register as a doctor?",
      answer: "Doctors can register by selecting 'Doctor' during the registration process. You'll need to provide your medical credentials and specialty information for verification."
    },
    {
      question: "What happens after I book an appointment?",
      answer: "After booking, you'll receive a confirmation with your appointment ID. The doctor will review your request and confirm the appointment within 24 hours. You'll be contacted with further instructions."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Help & Support
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Phone Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Speak with our support team
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              +91 12345 67890
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Email Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Send us your questions
            </p>
            <p className="text-green-600 dark:text-green-400 font-medium">
              support@healthcareplus.com
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Live Chat
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Chat with us instantly
            </p>
            <button className="text-purple-600 dark:text-purple-400 font-medium hover:underline">
              Start Chat
            </button>
          </div>
        </div>

        {/* Support Hours */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-12">
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              Support Hours
            </h3>
          </div>
          <div className="text-center text-blue-800 dark:text-blue-200">
            <p className="mb-2">Monday - Friday: 9:00 AM - 8:00 PM</p>
            <p className="mb-2">Saturday: 10:00 AM - 6:00 PM</p>
            <p>Sunday: 11:00 AM - 4:00 PM</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Still need help?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our support team is here to assist you with any questions or concerns.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
import React, { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Import all the data and constants directly here
// Don't import from ../BuyerDashboard as that creates a circular reference

const marketData = [
  { month: 'Jan', value: 540 },
  { month: 'Feb', value: 520 },
  { month: 'Mar', value: 610 },
  { month: 'Apr', value: 600 },
  { month: 'May', value: 720 },
  { month: 'Jun', value: 750 },
];

const properties = [
  { id: 1, image: "/api/placeholder/280/180", title: "Modern Downtown Loft", price: "$785,000", address: "123 Urban St", beds: 2, baths: 2, sqft: 1450 },
  { id: 2, image: "/api/placeholder/280/180", title: "Seaside Villa", price: "$1,250,000", address: "456 Coastal Ave", beds: 4, baths: 3, sqft: 2800 },
  { id: 3, image: "/api/placeholder/280/180", title: "Mountain Retreat", price: "$920,000", address: "789 Alpine Rd", beds: 3, baths: 2.5, sqft: 2100 }
];

// All the other constants and the component implementation remain the same
// (copying the full implementation from your provided BuyerDashboard.jsx)

const offerTemplates = [
  { id: 1, name: "Standard Offer", description: "A balanced offer template for most property types" },
  { id: 2, name: "Competitive Market", description: "Stronger terms for highly competitive markets" },
  { id: 3, name: "Investor Special", description: "Tailored for investment properties with favorable contingencies" },
  { id: 4, name: "First-Time Buyer", description: "Extra protections for first-time homebuyers" }
];

const savedOffers = [
  { id: 1, property: "Modern Downtown Loft", date: "Mar 12, 2025", status: "Draft", amount: "$765,000" },
  { id: 2, property: "Seaside Villa", date: "Mar 10, 2025", status: "Submitted", amount: "$1,225,000" }
];

const initialChatHistory = [
  { sender: 'agent', message: "Hi there! I'm Agent Ally, your AI real estate assistant. How can I help you today?" },
  { sender: 'user', message: "I'm interested in making an offer on the Modern Downtown Loft." },
  { sender: 'agent', message: "That's a great property choice! Based on recent comps in that neighborhood, properties are selling at about 2% below asking. Would you like me to help you prepare a competitive offer?" },
  { sender: 'user', message: "Yes, but I'm concerned about the inspection contingency. Should I waive it to be more competitive?" },
  { sender: 'agent', message: "I understand your desire to make a competitive offer, but I'd advise against waiving the inspection contingency completely. The Modern Downtown Loft was built in 2008 and could have hidden issues. Instead, I recommend a shortened inspection timeline (3 days instead of 7) and specifying you'll only request repairs exceeding $5,000. This gives you protection while still showing sellers you're serious. I've updated your offer template with this approach, which you can review in the Offer Generator section." }
];

const communications = [
  // Your communications data here
  { 
    id: 1, 
    type: 'email', 
    sender: 'Michael Johnson', 
    senderRole: 'Loan Officer', 
    subject: 'Loan Pre-Approval Update', 
    date: 'Today, 10:23 AM', 
    content: 'Good news! Your loan pre-approval has been increased to $850,000 based on the updated documentation you provided. This puts you in a stronger position for the properties you\'ve been looking at in Downtown and Riverfront. Let me know if you have any questions about the updated terms.', 
    unread: true,
    documents: [
      { name: 'Pre-Approval-Letter.pdf', size: '245 KB' }
    ]
  },
  // Rest of communications data
];

const transactionTimeline = [
  // Your transaction timeline data here
  { 
    id: 1, 
    stage: 'Pre-Approval', 
    completed: true, 
    date: 'Feb 28, 2025', 
    description: 'Loan pre-approval obtained',
    tasks: [
      { id: 101, name: 'Submit financial documents', completed: true },
      { id: 102, name: 'Credit check', completed: true },
      { id: 103, name: 'Receive pre-approval letter', completed: true }
    ]
  },
  // Rest of timeline data
];

const BuyerDashboard = () => {
  // Rest of your component code remains the same
  const [activeTab, setActiveTab] = useState('saved');
  const [activeDashboardTab, setActiveDashboardTab] = useState('properties');
  const [chatOpen, setChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(initialChatHistory);
  const [offerStep, setOfferStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(communications[0]);
  const [showEmailCompose, setShowEmailCompose] = useState(false);
  const [emailFilter, setEmailFilter] = useState('all');
  
  const chatEndRef = useRef(null);
  
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);
  
  // All your handler functions
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newChatHistory = [
      ...chatHistory,
      { sender: 'user', message: inputMessage }
    ];
    
    setChatHistory(newChatHistory);
    setInputMessage('');
    
    setTimeout(() => {
      setChatHistory([
        ...newChatHistory,
        { 
          sender: 'agent', 
          message: "I'm analyzing your request. Based on current market conditions in that area, I'd recommend considering a strong offer with fewer contingencies to stand out among other buyers. Would you like me to help draft an offer letter for you?" 
        }
      ]);
    }, 1000);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const nextOfferStep = () => {
    setOfferStep(offerStep + 1);
  };
  
  const prevOfferStep = () => {
    setOfferStep(offerStep - 1);
  };
  
  const renderOfferGenerator = () => {
    // Your offer generator rendering code
    switch(offerStep) {
      case 1:
        return (
          // Case 1 content
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-gray-800">Select a Property</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties.map(property => (
                <div 
                  key={property.id} 
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${selectedProperty === property.id ? 'ring-2 ring-blue-500 shadow-md' : 'hover:shadow-md'}`}
                  onClick={() => setSelectedProperty(property.id)}
                >
                  <img src={property.image} alt={property.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h4 className="font-bold">{property.title}</h4>
                    <p className="text-gray-600">{property.price}</p>
                    <div className="flex text-sm text-gray-500 mt-2">
                      <span className="mr-3">{property.beds} Beds</span>
                      <span className="mr-3">{property.baths} Baths</span>
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!selectedProperty}
                onClick={nextOfferStep}
              >
                Continue
              </button>
            </div>
          </div>
        );
      case 2:
        // Case 2 content
        return (
          <div className="space-y-6">
            {/* Your case 2 JSX */}
            <h3 className="font-bold text-lg text-gray-800">Select an Offer Template</h3>
            <p className="text-gray-600">Choose a template that best fits your offer strategy. Our AI will then customize it based on your specific situation and market conditions.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offerTemplates.map(template => (
                <div 
                  key={template.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <h4 className="font-bold">{template.name}</h4>
                  <p className="text-gray-600 text-sm mt-1">{template.description}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              <button 
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
                onClick={prevOfferStep}
              >
                Back
              </button>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!selectedTemplate}
                onClick={nextOfferStep}
              >
                Continue
              </button>
            </div>
          </div>
        );
      // Other cases...
      default:
        return null;
    }
  };
  
  // Main render function
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* The rest of your component JSX */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 text-white font-bold p-2 rounded">AA</div>
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Agent Ally</span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setChatOpen(true)} 
            className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Ask Agent Ally</span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">JD</div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Dashboard</h1>
          <div className="flex space-x-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              New Search
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium border border-gray-300 transition-colors">
              Filter
            </button>
          </div>
        </div>

        {/* Rest of the dashboard UI... */}
        {/* Continue with your existing UI */}
      </div>
      
      {/* Remaining UI components... */}
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


const marketData = [
  { month: 'Jan', value: 540 },
  { month: 'Feb', value: 520 },
  { month: 'Mar', value: 610 },
  { month: 'Apr', value: 600 },
  { month: 'May', value: 720 },
  { month: 'Jun', value: 750 },
];


const properties = [
  { id: 1, image: "/api/placeholder/280/180", title: "Modern Downtown Loft", price: "$785,000", address: "123 Urban St", beds: 2, baths: 2, sqft: 1450 },
  { id: 2, image: "/api/placeholder/280/180", title: "Seaside Villa", price: "$1,250,000", address: "456 Coastal Ave", beds: 4, baths: 3, sqft: 2800 },
  { id: 3, image: "/api/placeholder/280/180", title: "Mountain Retreat", price: "$920,000", address: "789 Alpine Rd", beds: 3, baths: 2.5, sqft: 2100 }
];


const offerTemplates = [
  { id: 1, name: "Standard Offer", description: "A balanced offer template for most property types" },
  { id: 2, name: "Competitive Market", description: "Stronger terms for highly competitive markets" },
  { id: 3, name: "Investor Special", description: "Tailored for investment properties with favorable contingencies" },
  { id: 4, name: "First-Time Buyer", description: "Extra protections for first-time homebuyers" }
];


const savedOffers = [
  { id: 1, property: "Modern Downtown Loft", date: "Mar 12, 2025", status: "Draft", amount: "$765,000" },
  { id: 2, property: "Seaside Villa", date: "Mar 10, 2025", status: "Submitted", amount: "$1,225,000" }
];


const initialChatHistory = [
  { sender: 'agent', message: "Hi there! I'm Agent Ally, your AI real estate assistant. How can I help you today?" },
  { sender: 'user', message: "I'm interested in making an offer on the Modern Downtown Loft." },
  { sender: 'agent', message: "That's a great property choice! Based on recent comps in that neighborhood, properties are selling at about 2% below asking. Would you like me to help you prepare a competitive offer?" },
  { sender: 'user', message: "Yes, but I'm concerned about the inspection contingency. Should I waive it to be more competitive?" },
  { sender: 'agent', message: "I understand your desire to make a competitive offer, but I'd advise against waiving the inspection contingency completely. The Modern Downtown Loft was built in 2008 and could have hidden issues. Instead, I recommend a shortened inspection timeline (3 days instead of 7) and specifying you'll only request repairs exceeding $5,000. This gives you protection while still showing sellers you're serious. I've updated your offer template with this approach, which you can review in the Offer Generator section." }
];


const communications = [
  { 
    id: 1, 
    type: 'email', 
    sender: 'Michael Johnson', 
    senderRole: 'Loan Officer', 
    subject: 'Loan Pre-Approval Update', 
    date: 'Today, 10:23 AM', 
    content: 'Good news! Your loan pre-approval has been increased to $850,000 based on the updated documentation you provided. This puts you in a stronger position for the properties you\'ve been looking at in Downtown and Riverfront. Let me know if you have any questions about the updated terms.', 
    unread: true,
    documents: [
      { name: 'Pre-Approval-Letter.pdf', size: '245 KB' }
    ]
  },
  { 
    id: 2, 
    type: 'email', 
    sender: 'Sarah Wilson', 
    senderRole: 'Inspector', 
    subject: 'Inspection Report - Modern Downtown Loft', 
    date: 'Yesterday, 4:15 PM', 
    content: 'I\'ve completed the inspection of the property at 123 Urban St. Please find attached the full report. Overall, the property is in good condition, but there are a few items that you should be aware of. The HVAC system is showing signs of age and may need replacement in the next 2-3 years. There are also some minor plumbing issues in the master bathroom that should be addressed. I\'ve detailed all findings in the report. Please let me know if you have any questions.', 
    unread: false,
    documents: [
      { name: 'Downtown-Loft-Inspection.pdf', size: '4.2 MB' },
      { name: 'Inspection-Photos.zip', size: '12.8 MB' }
    ]
  },
  { 
    id: 3, 
    type: 'email', 
    sender: 'Jennifer Blake', 
    senderRole: 'Title Company', 
    subject: 'Title Search Results', 
    date: 'Mar 12, 2025', 
    content: 'We\'ve completed the preliminary title search for the property at 123 Urban St. I\'m pleased to report that there are no major issues with the title. There is a standard utility easement on the north side of the property, which is common. All property taxes are current, and there are no liens or encumbrances that would affect your purchase. We\'re ready to proceed with preparing the closing documents once you\'ve completed the inspection period.', 
    unread: false,
    documents: [
      { name: 'Preliminary-Title-Report.pdf', size: '1.8 MB' }
    ]
  },
  { 
    id: 4, 
    type: 'email', 
    sender: 'Thomas Rodriguez', 
    senderRole: 'Insurance Agent', 
    subject: 'Homeowners Insurance Quote', 
    date: 'Mar 10, 2025', 
    content: 'Based on the information you provided for the Downtown Loft, I\'ve prepared three homeowners insurance quotes for your review. The premium estimates range from $1,200 to $1,850 annually, depending on the coverage levels and deductibles. The middle option provides the best balance of coverage and cost, in my opinion. I\'ve highlighted the key differences between the policies in the attached comparison. Please let me know which option you prefer or if you\'d like to discuss further adjustments to the coverage.', 
    unread: false,
    documents: [
      { name: 'Insurance-Quote-Comparison.pdf', size: '320 KB' }
    ]
  },
  { 
    id: 5, 
    type: 'email', 
    sender: 'David Chen', 
    senderRole: 'Seller\'s Agent', 
    subject: 'Response to Inspection Requests', 
    date: 'Mar 8, 2025', 
    content: 'Thank you for your inspection request list. The sellers have reviewed your requests and are willing to address the plumbing issues in the master bathroom and replace the water heater. However, they feel that the HVAC system is functioning properly for its age and are not willing to provide credit for future replacement. They\'ve also agreed to leave the washer and dryer as requested. Please let me know if these terms are acceptable, and we can prepare the appropriate addendum.', 
    unread: false,
    documents: []
  }
];


const transactionTimeline = [
  { 
    id: 1, 
    stage: 'Pre-Approval', 
    completed: true, 
    date: 'Feb 28, 2025', 
    description: 'Loan pre-approval obtained',
    tasks: [
      { id: 101, name: 'Submit financial documents', completed: true },
      { id: 102, name: 'Credit check', completed: true },
      { id: 103, name: 'Receive pre-approval letter', completed: true }
    ]
  },
  { 
    id: 2, 
    stage: 'Property Search', 
    completed: true, 
    date: 'Mar 5, 2025', 
    description: 'Property selected',
    tasks: [
      { id: 201, name: 'Define search criteria', completed: true },
      { id: 202, name: 'View properties', completed: true },
      { id: 203, name: 'Select target property', completed: true }
    ]
  },
  { 
    id: 3, 
    stage: 'Offer Submission', 
    completed: true, 
    date: 'Mar 7, 2025', 
    description: 'Offer accepted',
    tasks: [
      { id: 301, name: 'Prepare offer', completed: true },
      { id: 302, name: 'Submit offer', completed: true },
      { id: 303, name: 'Offer accepted', completed: true }
    ]
  },
  { 
    id: 4, 
    stage: 'Due Diligence', 
    active: true, 
    date: 'Mar 14, 2025 (Deadline)', 
    description: 'Inspection completed, waiting for resolution',
    tasks: [
      { id: 401, name: 'Property inspection', completed: true },
      { id: 402, name: 'Review inspection report', completed: true },
      { id: 403, name: 'Submit repair requests', completed: true },
      { id: 404, name: 'Negotiate repairs', completed: false, due: 'Mar 14, 2025' },
      { id: 405, name: 'Sign repair addendum', completed: false }
    ]
  },
  { 
    id: 5, 
    stage: 'Financing', 
    upcoming: true, 
    date: 'Mar 21, 2025 (Deadline)', 
    description: 'Waiting for appraisal',
    tasks: [
      { id: 501, name: 'Submit loan application', completed: true },
      { id: 502, name: 'Property appraisal', completed: false, due: 'Mar 18, 2025' },
      { id: 503, name: 'Loan underwriting', completed: false },
      { id: 504, name: 'Receive loan commitment', completed: false, due: 'Mar 21, 2025' }
    ]
  },
  { 
    id: 6, 
    stage: 'Closing Preparation', 
    upcoming: true, 
    date: 'Mar 28, 2025', 
    description: 'Not started',
    tasks: [
      { id: 601, name: 'Homeowner\'s insurance', completed: false },
      { id: 602, name: 'Review closing disclosure', completed: false },
      { id: 603, name: 'Arrange wire transfer', completed: false },
      { id: 604, name: 'Final walkthrough', completed: false }
    ]
  },
  { 
    id: 7, 
    stage: 'Closing', 
    upcoming: true, 
    date: 'Apr 1, 2025', 
    description: 'Not started',
    tasks: [
      { id: 701, name: 'Sign closing documents', completed: false },
      { id: 702, name: 'Fund escrow', completed: false },
      { id: 703, name: 'Receive keys', completed: false }
    ]
  }
];

const AgentAllyBuyersDashboard = () => {

  const [activeTab, setActiveTab] = useState('saved');
  const [activeDashboardTab, setActiveDashboardTab] = useState('properties');
  const [chatOpen, setChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(initialChatHistory);
  const [offerStep, setOfferStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(communications[0]);
  const [showEmailCompose, setShowEmailCompose] = useState(false);
  const [emailFilter, setEmailFilter] = useState('all');
  
  const chatEndRef = useRef(null);

 
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newChatHistory = [
      ...chatHistory,
      { sender: 'user', message: inputMessage }
    ];
    
    setChatHistory(newChatHistory);
    setInputMessage('');
    

    setTimeout(() => {
      setChatHistory([
        ...newChatHistory,
        { 
          sender: 'agent', 
          message: "I'm analyzing your request. Based on current market conditions in that area, I'd recommend considering a strong offer with fewer contingencies to stand out among other buyers. Would you like me to help draft an offer letter for you?" 
        }
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const nextOfferStep = () => {
    setOfferStep(offerStep + 1);
  };

  const prevOfferStep = () => {
    setOfferStep(offerStep - 1);
  };

  const renderOfferGenerator = () => {
    switch(offerStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-gray-800">Select a Property</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties.map(property => (
                <div 
                  key={property.id} 
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${selectedProperty === property.id ? 'ring-2 ring-blue-500 shadow-md' : 'hover:shadow-md'}`}
                  onClick={() => setSelectedProperty(property.id)}
                >
                  <img src={property.image} alt={property.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h4 className="font-bold">{property.title}</h4>
                    <p className="text-gray-600">{property.price}</p>
                    <div className="flex text-sm text-gray-500 mt-2">
                      <span className="mr-3">{property.beds} Beds</span>
                      <span className="mr-3">{property.baths} Baths</span>
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!selectedProperty}
                onClick={nextOfferStep}
              >
                Continue
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-gray-800">Select an Offer Template</h3>
            <p className="text-gray-600">Choose a template that best fits your offer strategy. Our AI will then customize it based on your specific situation and market conditions.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offerTemplates.map(template => (
                <div 
                  key={template.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <h4 className="font-bold">{template.name}</h4>
                  <p className="text-gray-600 text-sm mt-1">{template.description}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              <button 
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
                onClick={prevOfferStep}
              >
                Back
              </button>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!selectedTemplate}
                onClick={nextOfferStep}
              >
                Continue
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-gray-800">Customize Your Offer</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Offer Amount</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border"
                    placeholder="0.00"
                    defaultValue="785,000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Earnest Money Deposit</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border"
                    placeholder="0.00"
                    defaultValue="15,000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Closing Timeline (Days)</label>
                <input
                  type="number"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 border"
                  defaultValue="30"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contingencies</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="inspection"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="inspection" className="ml-2 block text-sm text-gray-700">
                      Inspection Contingency
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="financing"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="financing" className="ml-2 block text-sm text-gray-700">
                      Financing Contingency
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="appraisal"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="appraisal" className="ml-2 block text-sm text-gray-700">
                      Appraisal Contingency
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="homesale"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="homesale" className="ml-2 block text-sm text-gray-700">
                      Home Sale Contingency
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
                onClick={prevOfferStep}
              >
                Back
              </button>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                onClick={nextOfferStep}
              >
                Generate Offer
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
              <div className="mr-3 flex-shrink-0 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-green-800 font-medium">Offer Successfully Generated!</h4>
                <p className="text-green-700 text-sm mt-1">Your offer for Modern Downtown Loft has been created and is ready for review.</p>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-bold">Offer Preview</h3>
              </div>
              <div className="p-4">
                <div className="bg-white border rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold">Purchase Offer</h4>
                    <span className="text-gray-500">March 14, 2025</span>
                  </div>
                  
                  <div>
                    <h5 className="font-medium">Property</h5>
                    <p className="text-gray-700">Modern Downtown Loft, 123 Urban St</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium">Offer Amount</h5>
                      <p className="text-gray-700">$785,000</p>
                    </div>
                    <div>
                      <h5 className="font-medium">Earnest Money</h5>
                      <p className="text-gray-700">$15,000</p>
                    </div>
                    <div>
                      <h5 className="font-medium">Closing Timeline</h5>
                      <p className="text-gray-700">30 days</p>
                    </div>
                    <div>
                      <h5 className="font-medium">Contingencies</h5>
                      <p className="text-gray-700">Inspection, Financing, Appraisal</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium">Additional Terms</h5>
                    <p className="text-gray-700">Seller to provide home warranty. Buyer requests appliances to remain with the property.</p>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h5 className="font-medium">AI Analysis</h5>
                    <p className="text-gray-700 text-sm">This offer is competitive for the current market conditions. Based on recent comparable sales in the area, this offer is approximately 2% below the median sale price for similar properties. The inclusion of standard contingencies balances protection for the buyer while remaining attractive to the seller.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
                onClick={prevOfferStep}
              >
                Edit Offer
              </button>
              <div className="space-x-3">
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors">
                  Save as Draft
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                  Submit Offer
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">

      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 text-white font-bold p-2 rounded">AA</div>
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Agent Ally</span>
        </div>
        <div className="flex items-center space-x-4">

          <button 
            onClick={() => setChatOpen(true)} 
            className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Ask Agent Ally</span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">JD</div>
        </div>
      </nav>


      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Dashboard</h1>
          <div className="flex space-x-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              New Search
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium border border-gray-300 transition-colors">
              Filter
            </button>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Saved Properties</p>
                <p className="text-2xl font-bold mt-1">12</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Recent Views</p>
                <p className="text-2xl font-bold mt-1">36</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Offers</p>
                <p className="text-2xl font-bold mt-1">2</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Days Active</p>
                <p className="text-2xl font-bold mt-1">31</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-yellow-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>


        <div className="flex mb-8 border-b border-gray-200 overflow-x-auto">
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${activeDashboardTab === 'properties' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveDashboardTab('properties')}
          >
            Properties
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${activeDashboardTab === 'offers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveDashboardTab('offers')}
          >
            Offer Generator
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${activeDashboardTab === 'saved-offers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveDashboardTab('saved-offers')}
          >
            Saved Offers
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${activeDashboardTab === 'communications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveDashboardTab('communications')}
          >
            Communications Hub
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${activeDashboardTab === 'market' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveDashboardTab('market')}
          >
            Market Insights
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${activeDashboardTab === 'timeline' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveDashboardTab('timeline')}
          >
            Transaction Timeline
          </button>
        </div>


        {activeDashboardTab === 'properties' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Your Properties</h2>
                    <div className="flex space-x-1 border rounded-lg overflow-hidden">
                      <button 
                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'saved' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                        onClick={() => setActiveTab('saved')}
                      >
                        Saved
                      </button>
                      <button 
                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'recent' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                        onClick={() => setActiveTab('recent')}
                      >
                        Recent
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {properties.map(property => (
                    <div key={property.id} className="flex flex-col sm:flex-row border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="sm:w-1/3">
                        <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="p-4 sm:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{property.title}</h3>
                            <p className="text-gray-500 text-sm">{property.address}</p>
                          </div>
                          <p className="font-bold text-blue-600">{property.price}</p>
                        </div>
                        <div className="flex space-x-4 mt-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {property.beds} Beds
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                            {property.baths} Baths
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            {property.sqft} sqft
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <button 
                            className="text-gray-500 hover:text-gray-700 p-1"
                            onClick={() => {
                              setActiveDashboardTab('offers');
                              setSelectedProperty(property.id);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                          <button className="text-red-500 hover:text-red-700 p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700 p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100 flex justify-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    View all saved properties
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>


            <div className="space-y-6">

              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800">Market Insights</h2>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-700">Price Trends</h3>
                      <span className="text-green-600 text-sm font-medium">+5.2% YTD</span>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={marketData}>
                          <XAxis dataKey="month" axisLine={false} tickLine={false} />
                          <YAxis hide={true} />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#4F46E5" 
                            strokeWidth={2} 
                            dot={{ r: 4 }} 
                            activeDot={{ r: 6 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Price/sqft</span>
                      <span className="font-medium">$412</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Days on Market</span>
                      <span className="font-medium">28</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Listing Inventory</span>
                      <span className="font-medium">-12.8%</span>
                    </div>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800">AI Recommendations</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-purple-600">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Price Drop Alert</h3>
                      <p className="text-sm text-gray-600 mt-1">A property similar to your saved "Modern Downtown Loft" just dropped 7% in price.</p>
                      <button className="mt-2 text-sm text-blue-600 font-medium">View property</button>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Hot Neighborhood Alert</h3>
                      <p className="text-sm text-gray-600 mt-1">Riverfront District is trending with 18% more searches this month.</p>
                      <button className="mt-2 text-sm text-blue-600 font-medium">Explore area</button>
                    </div>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800">Upcoming Viewings</h2>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <span className="text-blue-600 font-bold">14</span>
                        <span className="block text-xs text-gray-500">MAR</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Lakeside Manor</h3>
                        <p className="text-sm text-gray-600">10:30 AM • Virtual Tour</p>
                      </div>
                    </div>
                    <button className="text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {activeDashboardTab === 'offers' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">AI-Powered Offer Generator</h2>
                <div className="flex space-x-2">
                  <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    Step {offerStep} of 4
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              {renderOfferGenerator()}
            </div>
          </div>
        )}


        {activeDashboardTab === 'saved-offers' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Your Offers</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                       onClick={() => {
                         setActiveDashboardTab('offers');
                         setOfferStep(1);
                       }}>
                  Create New Offer
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {savedOffers.map((offer) => (
                      <tr key={offer.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{offer.property}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{offer.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${offer.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 
                              offer.status === 'Submitted' ? 'bg-green-100 text-green-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {offer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {offer.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                          <button className="text-blue-600 hover:text-blue-900">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}


        {activeDashboardTab === 'communications' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Communications</h2>
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                      onClick={() => setShowEmailCompose(true)}
                    >
                      New Message
                    </button>
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search messages..." 
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-100">
                  <div className="flex overflow-x-auto">
                    <button 
                      className={`px-4 py-2 text-sm font-medium flex-shrink-0 ${emailFilter === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setEmailFilter('all')}
                    >
                      All
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium flex-shrink-0 ${emailFilter === 'lender' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setEmailFilter('lender')}
                    >
                      Lender
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium flex-shrink-0 ${emailFilter === 'inspector' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setEmailFilter('inspector')}
                    >
                      Inspector
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium flex-shrink-0 ${emailFilter === 'title' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setEmailFilter('title')}
                    >
                      Title
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium flex-shrink-0 ${emailFilter === 'agent' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setEmailFilter('agent')}
                    >
                      Selling Agent
                    </button>
                  </div>
                </div>
                <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
                  {communications.map((message) => (
                    <div 
                      key={message.id}
                      className={`border-b border-gray-100 cursor-pointer ${selectedEmail.id === message.id ? 'bg-blue-50' : message.unread ? 'bg-gray-50' : ''}`}
                      onClick={() => setSelectedEmail(message)}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2">
                              <span className="text-blue-600 font-bold text-xs">{message.sender.charAt(0)}</span>
                            </div>
                            <div>
                              <h3 className={`font-medium ${message.unread ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}>{message.sender}</h3>
                              <p className="text-xs text-gray-500">{message.senderRole}</p>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">{message.date}</div>
                        </div>
                        <h4 className={`text-sm mb-1 ${message.unread ? 'font-semibold' : ''}`}>{message.subject}</h4>
                        <p className="text-sm text-gray-600 truncate">{message.content.slice(0, 80)}...</p>
                        {message.documents.length > 0 && (
                          <div className="mt-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            <span className="text-xs text-gray-500">{message.documents.length} {message.documents.length === 1 ? 'attachment' : 'attachments'}</span>
                          </div>
                        )}
                        {message.unread && (
                          <div className="mt-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Unread</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            

            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedEmail.subject}</h2>
                    <p className="text-sm text-gray-500">From: {selectedEmail.sender} ({selectedEmail.senderRole}) - {selectedEmail.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-gray-700 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="prose max-w-none mb-6">
                    <p>{selectedEmail.content}</p>
                  </div>
                  
                  {selectedEmail.documents.length > 0 && (
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <h3 className="text-sm font-medium mb-2">Attachments ({selectedEmail.documents.length})</h3>
                      <div className="space-y-2">
                        {selectedEmail.documents.map((doc, index) => (
                          <div key={index} className="flex items-center p-2 border border-gray-200 rounded-lg">
                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.size}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Download</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-100 pt-4 mt-6">
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-3 mt-1">
                          <span className="text-blue-600 font-bold text-xs">AA</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-blue-800">Agent Ally AI Analysis</h3>
                          <div className="text-sm text-blue-700 mt-1">
                            {selectedEmail.id === 1 && (
                              <p>This increased pre-approval amount strengthens your buying position. I recommend we update your offer on the Modern Downtown Loft to reflect this higher amount, potentially increasing your bid by 3-5% to make it more competitive in the current market conditions.</p>
                            )}
                            {selectedEmail.id === 2 && (
                              <p>Based on the inspector's findings, I recommend requesting repairs for the plumbing issues in the master bathroom. Regarding the aging HVAC system, while it's functioning now, you might consider requesting a one-year home warranty to cover potential failures. I can help draft a repair request based on these findings.</p>
                            )}
                            {selectedEmail.id === 3 && (
                              <p>The title search results look clean, which is excellent news. The utility easement is standard and shouldn't affect your use of the property. We can proceed with confidence to the next steps of the transaction. No action is needed from you at this time.</p>
                            )}
                            {selectedEmail.id === 4 && (
                              <p>I agree with the agent's assessment that the middle option provides the best value. With a downtown property, water damage is a key concern, so ensure the policy has good coverage for that. Would you like me to compare these quotes against typical rates for similar properties in this area?</p>
                            )}
                            {selectedEmail.id === 5 && (
                              <p>The seller has agreed to fix the plumbing issues and replace the water heater, which addresses the immediate concerns. While they declined to address the HVAC, it is functioning properly. Given the property's desirability and the current competitive market, this response is reasonable. I recommend accepting these terms.</p>
                            )}
                          </div>
                          <div className="mt-2 flex space-x-2">
                            <button 
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                              onClick={() => setChatOpen(true)}
                            >
                              Discuss with Agent Ally
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                              </svg>
                            </button>
                            {(selectedEmail.id === 2 || selectedEmail.id === 5) && (
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                Draft Response
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium mb-4">Reply</h3>
                    <div className="border rounded-lg p-4">
                      <textarea 
                        className="w-full border-0 focus:ring-0 p-0 text-sm"
                        placeholder="Type your reply here..."
                        rows={6}
                      ></textarea>
                      <div className="border-t pt-3 flex justify-between items-center">
                        <div className="flex space-x-2">
                          <button className="text-gray-500 hover:text-gray-700 p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700 p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
                            onClick={() => setChatOpen(true)}
                          >
                            Ask Agent Ally for help
                          </button>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        

        {activeDashboardTab === 'market' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Detailed Market Analysis</h2>
                <div className="relative w-72">
                  <input 
                    type="text" 
                    placeholder="Search neighborhood (e.g., Downtown)" 
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
    
                  <div className="absolute w-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 z-10 hidden">
                    <ul className="py-1">
                      <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm">Downtown</li>
                      <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm">Riverfront District</li>
                      <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm">Harbor View</li>
                      <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm">Midtown</li>
                      <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm">Westside</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  Downtown
                  <button className="ml-1 text-blue-600 hover:text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  Riverfront
                  <button className="ml-1 text-blue-600 hover:text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-gray-800">Price Trends</h3>
                    <div className="flex items-center space-x-2">
                      <select className="border border-gray-300 rounded text-sm py-1 px-2">
                        <option value="6mo">Last 6 months</option>
                        <option value="1yr">Last year</option>
                        <option value="3yr">Last 3 years</option>
                      </select>
                      <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">+5.2% YTD</div>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={marketData}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p className="flex items-start">
                      <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>AI Analysis: Downtown prices have increased 5.2% year-to-date, outperforming the broader market by 1.8%. Based on historical patterns and current inventory levels, we predict continued appreciation of 3-4% over the next quarter.</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-4">Key Market Indicators</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Days on Market</span>
                        <span className="text-sm font-medium text-green-600">-12% YoY</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>0 days</span>
                        <span>100 days</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Average of 28 days in Downtown (vs. 45 days citywide)</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Sale-to-List Ratio</span>
                        <span className="text-sm font-medium text-green-600">102%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>90%</span>
                        <span>110%</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Downtown properties selling at 102% of list price on average</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Inventory Levels</span>
                        <span className="text-sm font-medium text-red-600">-28% YoY</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Historically low inventory in Downtown and Riverfront</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="font-bold text-lg text-gray-800 mb-4">AI Market Insights for Selected Neighborhoods</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-800">
                    Based on your selected neighborhoods and search history, Agent Ally's AI has identified the following insights:
                  </p>
                  <ul className="mt-3 space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><span className="font-medium">Downtown:</span> Properties are receiving multiple offers within 48 hours of listing, with 68% going under contract within 5 days. Luxury condos are particularly competitive.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><span className="font-medium">Riverfront:</span> Buyers offering 3-5% above asking price with minimal contingencies are winning 85% of competitive situations. New development has boosted interest in this area, with a 43% increase in searches.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><span className="font-medium">Both areas:</span> New inventory is expected to increase by 12% in the next 30 days based on seasonal patterns and pending building completions. This may temporarily ease competition.</span>
                    </li>
                  </ul>
                  <div className="mt-4 flex justify-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center" onClick={() => setChatOpen(true)}>
                      Ask Agent Ally for personalized market analysis
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        

        {activeDashboardTab === 'timeline' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Transaction Timeline</h2>
                <div>
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2">Closing: Apr 1, 2025</span>
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">On Track</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="relative">

                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                

                <div className="space-y-8">
                  {transactionTimeline.map((stage) => (
                    <div key={stage.id} className="relative">
                      <div className="flex items-start">
                        <div className={`z-10 w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-full ${
                          stage.completed ? 'bg-green-100' : stage.active ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          {stage.completed ? (
                            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : stage.active ? (
                            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          )}
                        </div>
                        
                        <div className="ml-6">
                          <div className="flex items-center mb-1">
                            <h3 className={`text-lg font-bold ${
                              stage.completed ? 'text-green-800' : stage.active ? 'text-blue-800' : 'text-gray-600'
                            }`}>{stage.stage}</h3>
                            <span className="ml-3 text-sm text-gray-500">{stage.date}</span>
                          </div>
                          <p className="text-gray-600 mb-4">{stage.description}</p>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="text-sm font-medium mb-3">Tasks</h4>
                            <div className="space-y-2">
                              {stage.tasks.map((task) => (
                                <div key={task.id} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={task.completed}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    readOnly
                                  />
                                  <span className={`ml-2 text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                    {task.name}
                                  </span>
                                  {task.due && !task.completed && (
                                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                                      Due: {task.due}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                            {(stage.active || stage.upcoming) && (
                              <div className="mt-3 flex justify-end">
                                <button 
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                                  onClick={() => setChatOpen(true)}
                                >
                                  Get assistance
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className={`${chatOpen ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all`}
        >
          {chatOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </button>
      </div>


      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 lg:w-1/3 xl:w-1/4 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden flex flex-col" style={{ height: '70vh', maxHeight: '700px' }}>
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white text-blue-600 font-bold p-1.5 rounded mr-2 text-sm">AA</div>
              <div>
                <h3 className="font-bold">Agent Ally</h3>
                <p className="text-xs text-blue-100">Your AI Real Estate Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-white hover:text-blue-100" title="Pin chat to side">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
              <button onClick={() => setChatOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          

          <div className="bg-blue-50 p-3 border-b border-blue-100 flex space-x-2 overflow-x-auto">
            <button className="whitespace-nowrap bg-white text-blue-600 text-sm px-3 py-1 rounded-full shadow-sm border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors">
              Help with offer
            </button>
            <button className="whitespace-nowrap bg-white text-blue-600 text-sm px-3 py-1 rounded-full shadow-sm border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors">
              Explain closing costs
            </button>
            <button className="whitespace-nowrap bg-white text-blue-600 text-sm px-3 py-1 rounded-full shadow-sm border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors">
              Market analysis
            </button>
            <button className="whitespace-nowrap bg-white text-blue-600 text-sm px-3 py-1 rounded-full shadow-sm border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors">
              Next steps
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender !== 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 mt-1">
                    <span className="text-blue-600 font-bold text-xs">AA</span>
                  </div>
                )}
                <div 
                  className={`max-w-xs sm:max-w-sm rounded-lg p-3 ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="mb-2 text-xs text-gray-500">
              <span>Agent Ally can help with: contract advice, market data, scheduling viewings, offer strategies</span>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Ask Agent Ally anything about your home buying journey..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="bg-blue-600 text-white rounded-r-lg px-4 py-2 hover:bg-blue-700"
                onClick={handleSendMessage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentAllyBuyersDashboard;

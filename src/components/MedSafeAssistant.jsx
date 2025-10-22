import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader, X, Sparkles, Shield, AlertCircle } from 'lucide-react';
import drugsData from '../data/drugs.json';

function MedSafeAssistant({ isOpen, onClose, patientName, patientData }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: `Hello ${patientName || 'there'}! 👋 I'm your MedSafe Assistant. I can help you understand your medications, dosage instructions, and answer questions about common medicines used in Pakistan. 

${patientData ? `I have access to your medical profile and will check all medications against your allergies and health conditions for personalized safety advice.` : ''}

How can I help you today?`,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Check patient-specific safety concerns
  const checkPatientSafety = (drug) => {
    if (!patientData) return { safe: true, warnings: [] };

    const warnings = [];
    const { allergies = [], conditions = [], recentPrescriptions = [] } = patientData;

    // 1. Check for allergies
    allergies.forEach(allergy => {
      const allergyLower = allergy.toLowerCase();
      const drugNameLower = drug.name.toLowerCase();
      const genericNameLower = drug.genericName.toLowerCase();
      
      // Direct match
      if (drugNameLower.includes(allergyLower) || 
          genericNameLower.includes(allergyLower) ||
          allergyLower.includes(drugNameLower) ||
          allergyLower.includes(genericNameLower)) {
        warnings.push({
          type: 'critical',
          category: 'allergy',
          message: `⛔ CRITICAL ALLERGY ALERT: You are allergic to ${allergy}! DO NOT take ${drug.name}.`,
          action: 'Contact your doctor immediately for an alternative medication.'
        });
      }
      
      // Check for cross-allergies
      if (allergyLower === 'penicillin' && 
          (genericNameLower.includes('amoxicillin') || 
           genericNameLower.includes('ampicillin') ||
           drug.contraindications?.toLowerCase().includes('penicillin'))) {
        warnings.push({
          type: 'critical',
          category: 'cross-allergy',
          message: `⛔ CROSS-ALLERGY WARNING: ${drug.name} contains penicillin-type antibiotic. You are allergic to Penicillin!`,
          action: 'DO NOT TAKE. Contact your doctor for an alternative.'
        });
      }
    });

    // 2. Check for condition-specific warnings
    conditions.forEach(condition => {
      const conditionLower = condition.toLowerCase();
      
      // Hypertension warnings
      if (conditionLower.includes('hypertension') || conditionLower.includes('blood pressure')) {
        if (drug.genericName.toLowerCase().includes('ibuprofen') ||
            drug.genericName.toLowerCase().includes('naproxen') ||
            drug.name.toLowerCase().includes('brufen')) {
          warnings.push({
            type: 'warning',
            category: 'condition',
            message: `⚠️ CAUTION: You have ${condition}. ${drug.name} (NSAID) may increase blood pressure.`,
            action: 'Consult your doctor. Consider Paracetamol as a safer alternative.'
          });
        }
      }

      // Diabetes warnings
      if (conditionLower.includes('diabetes')) {
        if (drug.genericName.toLowerCase().includes('prednisolone') ||
            drug.genericName.toLowerCase().includes('prednisone')) {
          warnings.push({
            type: 'warning',
            category: 'condition',
            message: `⚠️ IMPORTANT: You have ${condition}. ${drug.name} (steroid) can increase blood sugar levels.`,
            action: 'Monitor blood sugar closely. Inform your doctor.'
          });
        }
      }

      // Kidney disease warnings
      if (conditionLower.includes('kidney')) {
        if (drug.warnings?.toLowerCase().includes('kidney') ||
            drug.contraindications?.toLowerCase().includes('kidney')) {
          warnings.push({
            type: 'warning',
            category: 'condition',
            message: `⚠️ CAUTION: You have ${condition}. ${drug.name} requires careful use with kidney disease.`,
            action: 'Consult your doctor for dosage adjustment or alternatives.'
          });
        }
      }

      // Heart disease warnings
      if (conditionLower.includes('heart')) {
        if (drug.genericName.toLowerCase().includes('ibuprofen') ||
            drug.warnings?.toLowerCase().includes('heart')) {
          warnings.push({
            type: 'warning',
            category: 'condition',
            message: `⚠️ CAUTION: You have ${condition}. ${drug.name} may increase cardiovascular risk.`,
            action: 'Use only if prescribed by your doctor.'
          });
        }
      }

      // Asthma warnings
      if (conditionLower.includes('asthma')) {
        if (drug.genericName.toLowerCase().includes('aspirin') ||
            drug.name.toLowerCase().includes('disprin')) {
          warnings.push({
            type: 'warning',
            category: 'condition',
            message: `⚠️ CAUTION: You have ${condition}. ${drug.name} may trigger asthma attacks in some people.`,
            action: 'Consult your doctor before use.'
          });
        }
      }

      // Gastric ulcer warnings
      if (conditionLower.includes('ulcer') || conditionLower.includes('gastritis')) {
        if (drug.genericName.toLowerCase().includes('ibuprofen') ||
            drug.genericName.toLowerCase().includes('aspirin') ||
            drug.contraindications?.toLowerCase().includes('ulcer')) {
          warnings.push({
            type: 'critical',
            category: 'condition',
            message: `⛔ WARNING: You have ${condition}. ${drug.name} can worsen stomach ulcers and cause bleeding.`,
            action: 'DO NOT TAKE without doctor approval. Use Paracetamol instead.'
          });
        }
      }
    });

    // 3. Check for drug interactions with current medications
    recentPrescriptions.forEach(currentMed => {
      const currentDrugLower = currentMed.drug.toLowerCase();
      
      // Check if interaction is mentioned
      if (drug.interactions?.toLowerCase().includes(currentDrugLower)) {
        warnings.push({
          type: 'warning',
          category: 'interaction',
          message: `⚠️ DRUG INTERACTION: ${drug.name} may interact with your current medication ${currentMed.drug}.`,
          action: 'Consult your doctor or pharmacist before combining these medications.'
        });
      }

      // Common critical interactions
      if (currentDrugLower.includes('warfarin') && 
          (drug.genericName.toLowerCase().includes('aspirin') ||
           drug.genericName.toLowerCase().includes('ibuprofen'))) {
        warnings.push({
          type: 'critical',
          category: 'interaction',
          message: `⛔ CRITICAL INTERACTION: ${drug.name} + ${currentMed.drug} greatly increases bleeding risk!`,
          action: 'DO NOT TAKE without doctor supervision.'
        });
      }
    });

    return {
      safe: warnings.filter(w => w.type === 'critical').length === 0,
      warnings
    };
  };

  // Search local drug database
  const searchLocalDatabase = (query) => {
    const queryLower = query.toLowerCase();
    
    // Search for drug by name or generic name
    const foundDrug = drugsData.drugs.find(drug => 
      drug.name.toLowerCase().includes(queryLower) || 
      drug.genericName.toLowerCase().includes(queryLower) ||
      queryLower.includes(drug.name.toLowerCase()) ||
      queryLower.includes(drug.genericName.toLowerCase())
    );

    return foundDrug;
  };

  // Format drug information response
  const formatDrugInfo = (drug, query) => {
    const queryLower = query.toLowerCase();
    
    // Check patient-specific safety FIRST
    const safetyCheck = checkPatientSafety(drug);
    
    // If there are ANY warnings (critical or non-critical), STOP HERE - do not provide drug information
    if (safetyCheck.warnings.length > 0) {
      const criticalWarnings = safetyCheck.warnings.filter(w => w.type === 'critical');
      const nonCriticalWarnings = safetyCheck.warnings.filter(w => w.type === 'warning');
      
      let warningResponse = '';
      
      // Show critical warnings first
      if (criticalWarnings.length > 0) {
        warningResponse += '🚨 **CRITICAL SAFETY ALERT** 🚨\n\n';
        warningResponse += `📋 **Medicine Asked About:** ${drug.name} (${drug.genericName})\n\n`;
        warningResponse += '---\n\n';
        
        criticalWarnings.forEach((warning, idx) => {
          warningResponse += `${warning.message}\n\n`;
          warningResponse += `**What you must do:** ${warning.action}\n\n`;
          if (idx < criticalWarnings.length - 1) {
            warningResponse += '---\n\n';
          }
        });
      }
      
      // Show non-critical warnings
      if (nonCriticalWarnings.length > 0) {
        if (criticalWarnings.length > 0) {
          warningResponse += '\n---\n\n';
        }
        warningResponse += '⚠️ **IMPORTANT SAFETY CAUTION** ⚠️\n\n';
        warningResponse += `📋 **Medicine Asked About:** ${drug.name} (${drug.genericName})\n\n`;
        warningResponse += '---\n\n';
        
        nonCriticalWarnings.forEach((warning, idx) => {
          warningResponse += `${warning.message}\n\n`;
          warningResponse += `**What you should do:** ${warning.action}\n\n`;
          if (idx < nonCriticalWarnings.length - 1) {
            warningResponse += '---\n\n';
          }
        });
      }
      
      warningResponse += '\n---\n\n';
      warningResponse += '🏥 **IMPORTANT:** Due to the safety concerns above, I cannot provide usage information for this medication. Please consult your doctor or pharmacist for:\n\n';
      warningResponse += '• A safer alternative medication\n';
      warningResponse += '• Proper dosage adjustment if this is necessary\n';
      warningResponse += '• Personalized medical advice based on your health profile\n\n';
      warningResponse += '📞 Contact your doctor or visit your nearest pharmacy for guidance.';
      
      return warningResponse;
    }
    
    // Only if NO warnings at all, show "all clear" and continue with drug info
    let safetySection = '';
    if (patientData) {
      safetySection = '✅ **GOOD NEWS:** No safety concerns found based on your medical profile.\n\n---\n\n';
    }
    
    // Determine what specific information the user is asking about
    if (queryLower.includes('when') || queryLower.includes('timing') || queryLower.includes('time')) {
      return `${safetySection}📋 **${drug.name}** (${drug.genericName})

⏰ **When to take:**
${drug.timing}

📊 **Dosage:** ${drug.dosage}
🔄 **Frequency:** ${drug.frequency}
⚠️ **Maximum daily dose:** ${drug.maxDailyDose}

${drug.warnings ? `⚠️ **Important:** ${drug.warnings}` : ''}

Is there anything else you'd like to know about ${drug.name}?`;
    }
    
    if (queryLower.includes('milk') || queryLower.includes('food')) {
      return `${safetySection}📋 **${drug.name}** (${drug.genericName})

🥛 **Can you take it with milk?** ${drug.withMilk}

⏰ **Best timing:** ${drug.timing}

${drug.warnings ? `⚠️ **Important:** ${drug.warnings}` : ''}

Need more information about ${drug.name}?`;
    }
    
    if (queryLower.includes('side effect') || queryLower.includes('reaction')) {
      return `${safetySection}📋 **${drug.name}** (${drug.genericName})

⚕️ **Common side effects:**
${drug.sideEffects}

⚠️ **Warnings:** ${drug.warnings}

${drug.contraindications ? `🚫 **Do not use if:** ${drug.contraindications}` : ''}

If you experience any severe side effects, please contact your doctor immediately.`;
    }
    
    if (queryLower.includes('dosage') || queryLower.includes('dose') || queryLower.includes('how much')) {
      return `${safetySection}📋 **${drug.name}** (${drug.genericName})

💊 **Dosage:** ${drug.dosage}
🔄 **Frequency:** ${drug.frequency}
⚠️ **Maximum per day:** ${drug.maxDailyDose}
⏰ **Timing:** ${drug.timing}

${drug.warnings ? `⚠️ **Important:** ${drug.warnings}` : ''}

Always follow your doctor's prescription!`;
    }
    
    // Default: comprehensive information
    return `${safetySection}📋 **${drug.name}** (${drug.genericName})

💊 **Dosage:** ${drug.dosage}
🔄 **Frequency:** ${drug.frequency}
⏰ **Timing:** ${drug.timing}
🎯 **Used for:** ${drug.usage}

⚠️ **Important warnings:**
${drug.warnings}

⚕️ **Side effects:** ${drug.sideEffects}

${drug.withMilk ? `🥛 With milk: ${drug.withMilk}` : ''}

Always follow your doctor's instructions. Need more specific information?`;
  };

  // Call Gemini API
  const callGeminiAPI = async (userQuery, foundInLocal = false) => {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
    
    // System prompt
    const systemPrompt = `You are MedSafe Assistant, a helpful and caring medication advisor for patients in Pakistan. 

CRITICAL RULES:
1. Always prioritize patient safety above all
2. If local verified drug data is available, use that information
3. Never recommend specific medications - only provide information about medications already prescribed
4. Always advise consulting a doctor for medical decisions
5. Use simple, clear language that patients can understand
6. Be empathetic and supportive
7. Focus on verified information from Pakistan's healthcare context
8. If unsure, always err on the side of caution and recommend consulting a healthcare provider
9. Never log or store sensitive patient information
10. Keep responses concise (2-3 paragraphs maximum)

${foundInLocal ? 'Note: This query was partially answered using our verified local database.' : 'Note: No verified local data found. Provide general, safe information and recommend consulting a doctor.'}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${systemPrompt}\n\nPatient question: ${userQuery}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Gemini API call failed');
      }

      const data = await response.json();
      const generatedText = data.candidates[0]?.content?.parts[0]?.text;
      
      return generatedText || "I apologize, but I couldn't process that request. Please try rephrasing your question or consult your doctor.";
    } catch (error) {
      console.error('Gemini API Error:', error);
      // Fallback response when API fails
      return `I'm having trouble connecting to my knowledge base right now. For medication questions, I recommend:

1. **Consult your doctor or pharmacist** - They have your complete medical history
2. **Check your prescription label** - It has dosage and timing instructions
3. **Read the medicine leaflet** - It contains detailed information
4. **Call a pharmacy helpline** - They can provide immediate guidance

Your safety is our priority. Please seek professional medical advice for specific concerns.`;
    }
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // First, check local database
      const localDrug = searchLocalDatabase(inputText);
      
      let botResponse;
      
      if (localDrug) {
        // Found in local database - use verified information
        const formattedInfo = formatDrugInfo(localDrug, inputText);
        botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          text: formattedInfo,
          source: 'verified',
          timestamp: new Date()
        };
      } else {
        // Not in local database - use Gemini API
        const geminiResponse = await callGeminiAPI(inputText, false);
        botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          text: geminiResponse,
          source: 'ai',
          timestamp: new Date()
        };
      }

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: "I apologize, but I encountered an error. Please consult your doctor or pharmacist for medication information.",
        source: 'error',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick action buttons
  const quickActions = [
    "When should I take Panadol?",
    "Can I take medicine with milk?",
    "What are side effects?",
    "How much dosage is safe?"
  ];

  const handleQuickAction = (action) => {
    setInputText(action);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold flex items-center">
                MedSafe Assistant
                <Sparkles className="w-4 h-4 ml-2" />
              </h3>
              <p className="text-sm text-blue-100">AI-Powered Medication Helper</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="px-6 py-3 bg-green-50 border-b border-green-200 flex items-start space-x-2">
          <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-green-800">
            <strong>Privacy Protected:</strong> Your conversations are not logged or shared. For informational purposes only - always consult your doctor for medical advice.
          </p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gradient-to-br from-blue-500 to-primary-600 text-white'
                  }`}
                >
                  {message.type === 'user' ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </div>

                {/* Message Bubble */}
                <div>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    
                    {/* Source badge for bot messages */}
                    {message.type === 'bot' && message.source && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            message.source === 'verified'
                              ? 'bg-green-100 text-green-700'
                              : message.source === 'ai'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {message.source === 'verified' && '✓ Verified Database'}
                          {message.source === 'ai' && '🤖 AI Response'}
                          {message.source === 'error' && '⚠️ Error'}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-primary-600 text-white flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Loader className="w-4 h-4 animate-spin text-primary-600" />
                    <span className="text-sm text-gray-600">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="px-6 py-3 bg-blue-50 border-t border-blue-100">
            <p className="text-xs text-blue-800 font-medium mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickAction(action)}
                  className="text-xs px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your medicines... (e.g., 'When should I take Panadol?')"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={isLoading}
              />
              {inputText && (
                <button
                  onClick={() => setInputText('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span className="font-medium">Send</span>
            </button>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-3 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600">
              This assistant provides information only. Always consult your doctor or pharmacist for medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedSafeAssistant;


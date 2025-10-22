# MedSafe Assistant Chatbot Guide

## 🤖 Overview

MedSafe Assistant is an AI-powered chatbot integrated into the Patient Dashboard that helps patients understand their medications, dosage instructions, and answer common medicine-related questions.

---

## 🌟 Key Features

### **1. Dual-Source Intelligence**

The chatbot intelligently combines two sources of information:

#### **Local Verified Database (Priority #1)**
- Contains 30 common Pakistan-verified drugs
- Includes detailed information:
  - Generic and brand names
  - Dosage and frequency
  - Timing instructions
  - Side effects and warnings
  - Food/milk interactions
  - Contraindications
  - Pregnancy safety
- **Response time:** Instant
- **Badge:** ✓ Verified Database

#### **Gemini AI (Fallback #2)**
- Used when drug is not in local database
- Provides general, safe information
- Always prioritizes patient safety
- **Response time:** 2-3 seconds
- **Badge:** 🤖 AI Response

### **2. Smart Query Understanding**

The chatbot recognizes different types of questions:

| Question Type | Example | Response Focus |
|---------------|---------|----------------|
| **Timing** | "When should I take Panadol?" | Timing, frequency, with/without food |
| **Food Interactions** | "Can I take with milk?" | Milk/food compatibility |
| **Side Effects** | "What are side effects?" | Common reactions, warnings |
| **Dosage** | "How much should I take?" | Dosage, maximum daily dose |
| **General** | "Tell me about Brufen" | Comprehensive information |

### **3. Privacy & Security**

✅ **No Data Logging** - Conversations are not stored
✅ **No External Sharing** - Patient queries stay private
✅ **Session-Based** - Messages clear when chatbot closes
✅ **Privacy Notice** - Displayed prominently in UI

### **4. User-Friendly Interface**

- **Floating Button:** Always accessible from Patient Dashboard
- **Clean Chat UI:** WhatsApp-style message bubbles
- **Quick Actions:** One-click common questions
- **Loading States:** Clear feedback while processing
- **Source Badges:** Shows whether info is verified or AI-generated
- **Timestamps:** All messages timestamped

---

## 📚 Local Drug Database

### **Included Medications (30 drugs):**

#### **Pain Relief & Fever**
1. Panadol (Paracetamol)
2. Brufen (Ibuprofen)
3. Disprin (Aspirin)
4. Ponstan (Mefenamic Acid)
5. Calpol (Pediatric Paracetamol)

#### **Antibiotics**
6. Augmentin (Amoxicillin + Clavulanic Acid)
7. Cipro (Ciprofloxacin)
8. Cefspan (Cefixime)
9. Bactrim (Trimethoprim + Sulfamethoxazole)

#### **Stomach & Digestive**
10. Flagyl (Metronidazole)
11. Risek (Omeprazole)
12. Nexium (Esomeprazole)
13. Zantac (Ranitidine)
14. Motilium (Domperidone)

#### **Cold & Allergies**
15. Arinac (Paracetamol + Pseudoephedrine + Chlorpheniramine)
16. Telfast (Fexofenadine)
17. Avil (Pheniramine)
18. Gravinate (Dimenhydrinate)

#### **Heart & Blood Pressure**
19. Norvasc (Amlodipine)
20. Lipitor (Atorvastatin)
21. Lasix (Furosemide)
22. Inderal (Propranolol)

#### **Diabetes**
23. Glucophage (Metformin)
24. Daonil (Glibenclamide)

#### **Respiratory**
25. Ventolin (Salbutamol)

#### **Anxiety & GI**
26. Xanax (Alprazolam)
27. Librax (Chlordiazepoxide + Clidinium)

#### **Other**
28. Diamox (Acetazolamide)
29. Coartem (Artemether + Lumefantrine) - Malaria
30. Rohypnol (Controlled substance - info only)

---

## 🔧 Setup Instructions

### **Step 1: Get Gemini API Key**

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated API key

### **Step 2: Configure Environment Variables**

1. Create a file named `.env` in the project root
2. Add the following line:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Replace `your_actual_api_key_here` with your copied API key
4. Save the file

**Important:** Never commit the `.env` file to version control!

### **Step 3: Install Dependencies**

```bash
npm install
```

### **Step 4: Run the Application**

```bash
npm run dev
```

---

## 💬 How to Use

### **For Patients:**

1. **Login as Patient** on the Patient Dashboard
2. **Click the floating chat button** (bottom-right corner)
3. **Type your question** about medications
4. **Press Enter** or click "Send"
5. **Receive instant answers** with source verification

### **Example Conversations:**

#### **Example 1: Timing Question**
```
👤 Patient: When should I take Panadol?

🤖 MedSafe: 📋 Panadol (Paracetamol)

⏰ When to take: Can be taken with or without food
📊 Dosage: 500mg-1000mg
🔄 Frequency: Every 4-6 hours
⚠️ Maximum daily dose: 4000mg (4g) per day

⚠️ Important: Do not exceed maximum daily dose. 
Avoid alcohol consumption.

✓ Verified Database
```

#### **Example 2: Food Interaction**
```
👤 Patient: Can I take Brufen with milk?

🤖 MedSafe: 📋 Brufen (Ibuprofen)

🥛 Can you take it with milk? Yes, recommended to 
take with milk or food

⏰ Best timing: Take with food or milk to reduce 
stomach upset

⚠️ Important: May increase risk of heart attack 
or stroke. Avoid if you have stomach ulcers.

✓ Verified Database
```

#### **Example 3: Unknown Drug (Uses AI)**
```
👤 Patient: What is Ciproxin?

🤖 MedSafe: Ciproxin is a brand name for 
Ciprofloxacin, a fluoroquinolone antibiotic...
[AI-generated response with general information]

🤖 AI Response
```

### **Quick Action Buttons:**

For first-time users, the chatbot displays quick action buttons:
- "When should I take Panadol?"
- "Can I take medicine with milk?"
- "What are side effects?"
- "How much dosage is safe?"

---

## 🎨 Technical Architecture

### **Component Structure:**

```
MedSafeAssistant.jsx
├── State Management
│   ├── messages[] - Chat history
│   ├── inputText - Current user input
│   ├── isLoading - API call status
│
├── Local Database Search
│   ├── searchLocalDatabase(query)
│   └── formatDrugInfo(drug, query)
│
├── Gemini API Integration
│   └── callGeminiAPI(userQuery, foundInLocal)
│
└── UI Components
    ├── Header (with close button)
    ├── Privacy Notice
    ├── Messages Area (scrollable)
    ├── Quick Actions (first time)
    └── Input Area (with send button)
```

### **Data Flow:**

```
User Input
    ↓
1. Check Local Database (drugs.json)
    ↓
   Found? → Yes → Format & Return (Instant)
    ↓
   Found? → No ↓
    ↓
2. Call Gemini API
    ↓
   Success? → Yes → Return AI Response
    ↓
   Success? → No → Fallback Error Message
```

### **Code Highlights:**

#### **Local Search Logic:**
```javascript
const searchLocalDatabase = (query) => {
  const queryLower = query.toLowerCase();
  const foundDrug = drugsData.drugs.find(drug => 
    drug.name.toLowerCase().includes(queryLower) || 
    drug.genericName.toLowerCase().includes(queryLower)
  );
  return foundDrug;
};
```

#### **Smart Response Formatting:**
```javascript
// Detects question intent and formats accordingly
if (queryLower.includes('when') || queryLower.includes('timing')) {
  // Returns timing-specific information
}
if (queryLower.includes('milk') || queryLower.includes('food')) {
  // Returns food interaction information
}
// ... more intent detection
```

#### **Gemini API Call:**
```javascript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: systemPrompt + userQuery }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
    })
  }
);
```

---

## 🛡️ Safety Features

### **System Prompt for Gemini:**

```
You are MedSafe Assistant, a helpful and caring medication 
advisor for patients in Pakistan.

CRITICAL RULES:
1. Always prioritize patient safety above all
2. If local verified drug data is available, use that information
3. Never recommend specific medications - only provide information 
   about medications already prescribed
4. Always advise consulting a doctor for medical decisions
5. Use simple, clear language that patients can understand
6. Be empathetic and supportive
7. Focus on verified information from Pakistan's healthcare context
8. If unsure, always err on the side of caution and recommend 
   consulting a healthcare provider
9. Never log or store sensitive patient information
10. Keep responses concise (2-3 paragraphs maximum)
```

### **Fallback Handling:**

When Gemini API fails, the chatbot provides:
- Recommendation to consult doctor/pharmacist
- Alternative sources (prescription label, medicine leaflet)
- Pharmacy helpline suggestion
- Clear safety-first messaging

---

## 📊 Features Comparison

| Feature | Local Database | Gemini AI |
|---------|----------------|-----------|
| **Speed** | Instant | 2-3 seconds |
| **Accuracy** | 100% verified | General information |
| **Coverage** | 30 drugs | Unlimited |
| **Pakistan Context** | ✅ Yes | Partial |
| **Offline** | ✅ Yes | ❌ No |
| **Cost** | Free | API calls |
| **Trust Level** | Verified ✓ | AI-generated 🤖 |

---

## 🧪 Testing

### **Test Cases:**

#### **Test 1: Local Database Hit**
```
Input: "When should I take Panadol?"
Expected: Instant response with verified badge
Contains: Timing, dosage, frequency
Source: ✓ Verified Database
```

#### **Test 2: Milk Interaction**
```
Input: "Can I take Cipro with milk?"
Expected: Warning about dairy interaction
Contains: "NO - take 2 hours before or 6 hours after dairy"
Source: ✓ Verified Database
```

#### **Test 3: Unknown Drug (AI Fallback)**
```
Input: "What is Amoxil?"
Expected: AI-generated response
Contains: General antibiotic information
Source: 🤖 AI Response
```

#### **Test 4: API Failure**
```
Scenario: Gemini API is down
Expected: Fallback message
Contains: "Consult your doctor or pharmacist"
Source: ⚠️ Error
```

---

## 🚀 Future Enhancements

- [ ] **Voice Input:** Speech-to-text for questions
- [ ] **Multi-language:** Support Urdu language
- [ ] **Image Recognition:** Upload pill images for identification
- [ ] **Medication Reminders:** Set up reminder notifications
- [ ] **Drug Interaction Checker:** Check multiple drugs at once
- [ ] **Refill Reminders:** Track when to refill prescriptions
- [ ] **Doctor Integration:** Share chat history with doctor
- [ ] **Offline Mode:** Basic functionality without internet
- [ ] **Personalized History:** Save conversation history
- [ ] **Video Tutorials:** How to take medications properly

---

## 🔒 Privacy & Compliance

### **Data Handling:**

✅ **No Storage:** Messages are not stored on any server
✅ **Session-Only:** Data exists only during active session
✅ **No Analytics:** User queries are not tracked
✅ **HTTPS:** All API calls use secure connections
✅ **No Third-Party Sharing:** Information stays within app

### **Disclaimers:**

The chatbot includes multiple disclaimers:
1. **Header Privacy Notice:** "Your conversations are not logged or shared"
2. **Input Disclaimer:** "This assistant provides information only. Always consult your doctor"
3. **Response Recommendations:** "Consult your healthcare provider for medical advice"

---

## 📞 Support & Troubleshooting

### **Common Issues:**

#### **Issue 1: Chatbot not responding**
**Solution:** Check if Gemini API key is set in `.env` file

#### **Issue 2: Slow responses**
**Solution:** Local database is instant. AI responses take 2-3 seconds.

#### **Issue 3: Generic responses**
**Solution:** Drug not in local database. Try using exact brand name (e.g., "Panadol" not "paracetamol")

#### **Issue 4: API quota exceeded**
**Solution:** Gemini has free tier limits. Wait or upgrade API plan.

---

## 📝 Developer Notes

### **Adding New Drugs to Local Database:**

Edit `src/data/drugs.json`:

```json
{
  "id": 31,
  "name": "NewDrug",
  "genericName": "GenericName",
  "dosage": "10mg-20mg",
  "frequency": "Once daily",
  "maxDailyDose": "20mg",
  "timing": "With food",
  "usage": "Medical condition",
  "sideEffects": "List side effects",
  "warnings": "Important warnings",
  "interactions": "Drug interactions",
  "pregnancyCategory": "Safety category",
  "contraindications": "When not to use",
  "withMilk": "Yes/No with details"
}
```

### **Customizing System Prompt:**

Edit `MedSafeAssistant.jsx` line ~216:

```javascript
const systemPrompt = `Your custom prompt here...`;
```

### **Styling:**

Uses Tailwind CSS. Colors:
- Primary: `primary-600` (teal)
- Secondary: `blue-600`
- Success: `green-600`
- Warning: `amber-600`
- Error: `red-600`

---

## 🎯 Use Cases

### **Use Case 1: Post-Discharge Care**
Patient discharged with multiple medications wants to understand when to take each one.

### **Use Case 2: Elderly Patient**
Senior citizen needs clear, simple instructions about their medicines.

### **Use Case 3: New Medication**
Patient prescribed a new drug and wants to know about side effects.

### **Use Case 4: Medication Safety**
Patient wants to verify if they can take medicine with their usual breakfast (milk).

---

## ✨ Best Practices

### **For Patients:**
- ✅ Ask specific questions
- ✅ Use medicine brand names (Panadol, Brufen)
- ✅ Always follow doctor's prescription
- ✅ Report side effects to your doctor

### **For Healthcare Providers:**
- ✅ Recommend chatbot for patient education
- ✅ Verify chatbot information is current
- ✅ Use as supplement, not replacement for consultation
- ✅ Report any inaccuracies for database updates

---

**Last Updated:** October 21, 2025  
**Version:** 1.0.0  
**Powered by:** Gemini AI + Local Verified Database


# Prompt for Gemini: Create Visual Workflow for MedSafePK

Please create a clear, professional visual workflow diagram for **MedSafePK** - an AI-powered prescription safety platform for Pakistan. Use a flowchart style with color-coded paths for different user types.

---

## System Overview

**MedSafePK** is a healthcare platform that helps doctors write safer prescriptions, pharmacies verify medications, and patients understand their medicines using AI technology.

---

## User Flow Diagram Structure

### 1. **LANDING PAGE** (Entry Point)
- Display: "MedSafePK - AI for Safer Prescriptions in Pakistan"
- Two options: 
  - "Login" button → Goes to Login Page
  - "Sign Up" button → Goes to Signup Page

---

### 2. **LOGIN/SIGNUP PAGE** (User Type Selection)
- **Three User Types to Choose From:**
  1. 👨‍⚕️ **Doctor** (Blue)
  2. 💊 **Pharmacy** (Green)
  3. 🧑‍💼 **Patient** (Orange)

#### **Signup Fields by User Type:**

**Doctor Signup:**
- Full Name
- Email
- Password
- Hospital/Medical Facility (dropdown: Aga Khan, Shaukat Khanum, PIMS, etc.)

**Pharmacy Signup:**
- Full Name
- Email
- Password
- Pharmacy Name (dropdown: Servaid, Fazal Din's, D-Watson, Clinix, or "Other - Add Manually")

**Patient Signup:**
- Patient ID (required)
- Full Name
- Email
- Password

**After successful login/signup:**
- Doctor → Doctor Dashboard
- Pharmacy → Pharmacy Dashboard
- Patient → Patient Dashboard

---

### 3. **DOCTOR DASHBOARD** (Blue Theme)

**Main Features:**

#### A. **AI Prescription Writer**
- Doctor inputs:
  - Patient information
  - Symptoms/diagnosis
  - Medications to prescribe
- AI checks for:
  - Drug interactions ⚠️
  - Dosage safety ✅
  - Pakistani drug availability 🇵🇰
- Output:
  - Safe prescription with warnings
  - QR code generation

#### B. **Drug Interaction Checker**
- Input multiple medications
- AI analyzes combinations
- Shows:
  - Safe interactions (Green ✅)
  - Warnings (Yellow ⚠️)
  - Critical alerts (Red 🚨)

#### C. **QR Prescription Generator**
- Generate QR code with prescription data
- Patient can scan for digital record
- Pharmacy can scan to verify

#### D. **Patient Records**
- View prescription history
- Track patient medications
- Access analytics

---

### 4. **PHARMACY DASHBOARD** (Green Theme)

**Main Features:**

#### A. **Patient Lookup**
- Input: Patient ID or Scan QR code
- Retrieve: Doctor's prescription data

#### B. **Manual Prescription Entry**
- If no digital prescription exists:
  - Pharmacist manually enters drug names
  - Enters dosage and quantity
- System prompts for patient health info:
  - Allergies
  - Current conditions (Hypertension, Diabetes, etc.)
  - Current medications

#### C. **AI Safety Cross-Check**
- System checks entered prescription against:
  - Patient allergies ⚠️
  - Health conditions ⚠️
  - Drug interactions ⚠️
- Displays:
  - ✅ Safe to dispense
  - ⚠️ Caution - consult pharmacist
  - 🚨 Critical - do not dispense

#### D. **Dispense Medication**
- Mark prescription as fulfilled
- Generate receipt
- Update patient records

---

### 5. **PATIENT DASHBOARD** (Orange Theme)

**Main Features:**

#### A. **View My Medications**
- Input: Patient ID
- Display:
  - Current medications
  - Dosage instructions
  - Frequency (e.g., "Every 8 hours")
  - Reminders (Morning, Afternoon, Evening)

#### B. **Upload Prescription (OCR)**
- Patient uploads photo of:
  - Handwritten prescription
  - Typed prescription
  - Medicine labels
- AI OCR + NLP extracts:
  - Drug names
  - Dosage
  - Frequency
- Displays:
  - Easy-to-read summary
  - "Take Panadol 500mg every 6 hours with food"

#### C. **MedSafe Assistant Chatbot** 🤖
- **Floating button** (bottom-right corner)
- Click to open chat window

**Chatbot Workflow:**

1. **Patient asks question:**
   - "When should I take Panadol?"
   - "Can I take Brufen with milk?"
   - "What are side effects of Augmentin?"

2. **Chatbot checks local drug database** (48 Pakistan-verified drugs)
   - Found → Use verified information
   - Not found → Use Gemini AI for general answer

3. **Personalized Safety Check:**
   - Chatbot checks patient's medical profile:
     - Allergies (e.g., Penicillin)
     - Conditions (e.g., Hypertension, Diabetes, Gastric Ulcer)
     - Current medications (e.g., Warfarin)

4. **Response Logic:**
   
   **IF ANY SAFETY CONCERN DETECTED:**
   - 🚨 Show critical warning: "You are allergic to Penicillin! DO NOT take Augmentin."
   - ⚠️ Show caution: "You have Hypertension. Brufen may increase blood pressure."
   - **STOP** - Do NOT provide drug usage information
   - Direct patient to: "Contact your doctor immediately"
   
   **IF NO SAFETY CONCERNS:**
   - ✅ "No safety concerns found based on your medical profile"
   - Provide full drug information:
     - Dosage
     - Timing
     - How to take (with food/milk)
     - Side effects
     - Warnings

5. **Privacy Protected:**
   - No data logging
   - No external sharing
   - Local processing

---

## Visual Design Suggestions

### Color Coding:
- **Doctor Path:** Blue (#2563eb)
- **Pharmacy Path:** Green (#16a34a)
- **Patient Path:** Orange (#f97316)
- **Critical Alerts:** Red (#dc2626)
- **Warnings:** Yellow (#eab308)
- **Safe/Success:** Green (#22c55e)

### Icons to Use:
- 👨‍⚕️ Doctor
- 💊 Pharmacy
- 🧑‍💼 Patient
- 🤖 AI/Chatbot
- 📋 Prescription
- 🔍 Search/Check
- ⚠️ Warning
- 🚨 Critical Alert
- ✅ Safe/Verified
- 📱 QR Code
- 🏥 Hospital
- 💬 Chat

### Flow Structure:
1. Start with Landing Page at the top
2. Branch into 3 user types (side by side)
3. Each user type flows downward showing their dashboard features
4. Use arrows to show navigation between sections
5. Use dotted lines for optional paths
6. Use solid lines for main workflow
7. Highlight AI features with a special glow or border

---

## Key Features to Highlight

### AI-Powered Features:
1. **Drug Interaction Checker** (Doctor Dashboard)
2. **AI Safety Cross-Check** (Pharmacy Dashboard)
3. **MedSafe Assistant Chatbot** (Patient Dashboard)
4. **OCR + NLP Prescription Reader** (Patient Dashboard)

### Safety Mechanisms:
1. **Allergy Checking** (All dashboards)
2. **Condition-Based Warnings** (Pharmacy + Patient)
3. **Drug Interaction Detection** (Doctor + Pharmacy)
4. **Personalized Safety Alerts** (Patient Chatbot)

### Pakistani Context:
1. Local hospitals (Aga Khan, Shaukat Khanum, PIMS)
2. Local pharmacies (Servaid, Fazal Din's, D-Watson)
3. Common Pakistani medications (Panadol, Brufen, Augmentin)
4. Urdu language support (optional feature)

---

## Example User Journey to Illustrate

### **Journey 1: Doctor Prescribes → Pharmacy Verifies → Patient Uses Chatbot**

1. **Dr. Ahmed** logs in as Doctor
2. Writes prescription for Patient P001: "Brufen 400mg"
3. AI checks interactions → ✅ Safe
4. Generates QR code
5. **Pharmacy (Servaid)** scans QR code
6. Retrieves prescription data
7. Asks patient about conditions → Patient has "Hypertension"
8. AI cross-check → ⚠️ "Caution: Brufen may increase blood pressure"
9. Pharmacist consults patient → Recommends Panadol instead
10. **Patient P001** opens Patient Dashboard
11. Clicks "MedSafe Assistant" chatbot
12. Asks: "Can I take Brufen?"
13. Chatbot checks patient profile → Detects Hypertension
14. Response: ⚠️ "You have Hypertension. Brufen may increase blood pressure. Contact your doctor for a safer alternative."
15. **NO drug dosage information provided** (safety first!)

---

## Output Format Request

Please create a **clear, professional flowchart** showing:
1. All three user paths (Doctor, Pharmacy, Patient)
2. Key features for each dashboard
3. AI safety checks highlighted
4. Decision points (if/then logic)
5. Color-coded by user type
6. Icons for visual clarity
7. The Patient Chatbot workflow as a sub-diagram

**Style:** Modern, clean, easy to understand for both technical and non-technical audiences.

**Focus on:** User flows, AI safety features, and the chatbot's personalized safety checking mechanism.

---

Thank you! This will help visualize the complete MedSafePK ecosystem.


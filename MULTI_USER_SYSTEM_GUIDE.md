# MedSafePK Multi-User System Guide

## Overview

MedSafePK now supports **three distinct user types**, each with their own specialized dashboard and features:

1. **Doctor** - Write prescriptions, check drug interactions, manage patient records
2. **Pharmacy** - Verify prescriptions, check patient safety, dispense medications
3. **Patient** - View medications, upload prescriptions, get reminders

---

## 🔐 Authentication System

### Sign Up / Login Flow

The login page (`/login`) now features:

- **User Type Selection**: Choose between Doctor, Pharmacy, or Patient
- **Signup Mode**: Create new accounts with full name and role-specific fields
- **Login Mode**: Access existing accounts with email/password

#### Demo Credentials

For **testing purposes**, you can use any email/password combination. The system will automatically route you to the appropriate dashboard based on your selected user type.

**Demo Patient IDs** for testing: `P001`, `P002`, `P003`, `P004`, `P005`, `P006`, `P007`, `P008`

---

## 👨‍⚕️ Doctor Dashboard

**Route**: `/doctor-dashboard`

### Features

1. **Write Prescription** (`/prescription-checker`)
   - AI-powered prescription writer
   - Real-time drug interaction checking
   - Allergy warnings based on patient history
   - DRAP (Drug Regulatory Authority of Pakistan) compliance checking
   - Generate QR code prescriptions

2. **Patient Records** (`/patient-records`)
   - View complete patient histories
   - Access medical conditions and allergies
   - Track prescription history

3. **Analytics Dashboard** (`/analytics`)
   - View prescription safety statistics
   - Track unsafe prescriptions prevented
   - City-wise safety data
   - Drug interaction trends

4. **System Architecture** (`/architecture`)
   - Technical overview of the AI system
   - Data flow diagrams
   - Security and privacy information

### Quick Actions

- **New Prescription**: Quickly start writing a prescription
- **View Patients**: Access patient records
- **View Analytics**: Check safety statistics

---

## 💊 Pharmacy Dashboard

**Route**: `/pharmacy-dashboard`

### Features

1. **Patient Prescription Lookup**
   - Enter Patient ID to retrieve prescription information
   - View patient medical history, allergies, and conditions
   - Access recent prescriptions from doctors

2. **Manual Prescription Entry**
   - Manually input prescription details if no electronic record exists
   - Enter drug name, dosage, frequency, and duration
   - System validates against patient health data

3. **AI Safety Verification**
   - **Critical Alerts**: Banned drugs, allergy conflicts
   - **Warnings**: Drug-condition interactions, high-risk medications
   - **Recommendations**: Dosage guidelines, monitoring requirements
   - **Alternative Suggestions**: Safer medication alternatives

4. **Dispense Medication**
   - Final safety check before dispensing
   - Blocked if critical safety warnings exist
   - Patient notification upon successful dispensing

### Safety Check Features

The Pharmacy Dashboard uses the same AI safety logic as the Doctor Dashboard:

- ✅ **Allergy Detection**: Cross-references drugs with patient allergies
- ✅ **Banned Drug Alerts**: Identifies DRAP-banned medications
- ✅ **High-Risk Drug Warnings**: Flags medications requiring special monitoring
- ✅ **Condition-Drug Interactions**: Checks against patient medical conditions
- ✅ **Dosage Recommendations**: Provides safe dosage guidelines

### Example Use Case

1. Patient presents prescription at pharmacy
2. Pharmacist enters Patient ID (`P001`)
3. System retrieves patient info including allergies (Penicillin, Sulfa drugs) and conditions (Hypertension, Type 2 Diabetes)
4. If prescription is electronic, it's displayed automatically
5. If handwritten, pharmacist manually enters details
6. System runs AI safety check
7. If safe, pharmacist can dispense; if unsafe, alternative is suggested

---

## ❤️ Patient Dashboard

**Route**: `/patient-dashboard`

### Features

#### 1. **View My Medications**

- **Patient ID Lookup**: Enter your Patient ID to access your medication schedule
- **Medicine Reminders**: View exact times to take each medication
- **Dosage Information**: Clear display of dosage and frequency
- **Duration Tracking**: Know how long to continue each medication

**Medicine Schedule Display**:
- 🔔 Automatic reminder times based on frequency
  - Once daily → 9:00 AM
  - Twice daily → 9:00 AM, 9:00 PM
  - Three times daily → 8:00 AM, 2:00 PM, 8:00 PM
  - As needed → On-demand

#### 2. **Upload Prescription (OCR + NLP)**

**AI-Powered Prescription Reading**:

Upload a photo of your prescription (handwritten or typed), and the system will:

1. **Extract Drug Names**: Uses OCR (Optical Character Recognition) to read text
2. **Identify Dosages**: Recognizes dosage amounts (e.g., "500mg", "20mg")
3. **Parse Frequency**: Understands timing (e.g., "twice daily", "before meals")
4. **Detect Duration**: Identifies treatment length (e.g., "5 days", "2 weeks")
5. **Extract Instructions**: Captures special instructions (e.g., "with food", "complete full course")

**Display Format**:
- Easy-to-read medication cards
- Color-coded timing information
- Clear dosage and frequency
- Important instructions highlighted
- Confidence score for accuracy

**Example Output**:

```
📋 AI-Extracted Prescription (95% Confidence)

💊 Paracetamol - 500mg
   🕐 Every 6 hours • 5 days
   📌 After meals • Take with plenty of water

💊 Amoxicillin - 250mg
   🕐 Three times daily • 7 days
   📌 Before meals • Complete the full course
```

#### 3. **Patient Profile**

View your health information:
- Patient ID
- Age and basic info
- Known allergies (⚠️ highlighted in red)
- Medical conditions
- Last visit date

---

## 🎨 UI/UX Features

### Clean, Minimal Design

- **Role-Based Color Coding**:
  - 🩺 Doctor: Primary blue
  - 💊 Pharmacy: Blue
  - ❤️ Patient: Green

- **User Type Badges**: Header displays user role with icon
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Intuitive Navigation**: Clear tabs and routes for each role

### Accessibility

- Clear typography and spacing
- Color-coded alerts (red = critical, amber = warning, green = safe)
- Icon-based visual cues
- Multi-language support (English/Urdu toggle)

---

## 🔄 System Flow

### Doctor → Pharmacy → Patient

1. **Doctor** writes prescription in system
   - Checks for interactions and allergies
   - Generates QR code or electronic prescription
   - Patient data stored in system

2. **Pharmacy** verifies prescription
   - Scans Patient ID
   - Reviews doctor's prescription
   - Runs additional safety checks
   - Dispenses medication if safe

3. **Patient** manages health
   - Views medication schedule
   - Sets up reminders
   - Uploads new prescriptions via photo
   - Tracks medication adherence

---

## 🛠️ Technical Implementation

### Authentication State Management

```javascript
// App.jsx manages global auth state
const [userName, setUserName] = useState('');
const [userType, setUserType] = useState(''); // doctor, pharmacy, patient
const [hospitalName, setHospitalName] = useState('');
const [patientId, setPatientId] = useState('');
```

### Role-Based Routing

- Protected routes based on `userType`
- Automatic redirection to appropriate dashboard
- Shared routes (e.g., `/architecture`) accessible to all authenticated users

### Data Sharing

- `sampleData.js` contains shared patient data
- Prescription records accessible across roles
- Consistent AI safety logic used by both Doctor and Pharmacy dashboards

---

## 📊 Demo Scenarios

### Scenario 1: Doctor Prescribes Medication

1. Login as **Doctor** (`doctor@medsafepk.com`)
2. Navigate to **Write Prescription**
3. Select patient **P001 - Ahmed Khan**
4. System shows allergies: Penicillin, Sulfa drugs
5. System shows conditions: Hypertension, Type 2 Diabetes
6. Attempt to prescribe Ibuprofen
7. AI warns: "NSAIDs may increase blood pressure in hypertensive patients"
8. Doctor selects Paracetamol instead
9. Generate QR prescription

### Scenario 2: Pharmacy Verifies Prescription

1. Login as **Pharmacy** (`pharmacy@medsafepk.com`)
2. Patient presents with ID **P003**
3. Enter Patient ID in search
4. View patient info: Hassan Mahmood, allergic to Aspirin
5. View recent prescription: Atorvastatin, Clopidogrel
6. Patient has new handwritten prescription
7. Click **Add New Prescription**
8. Manually enter drug details
9. Click **Check Safety with AI**
10. System verifies against allergies and conditions
11. Dispense if safe

### Scenario 3: Patient Uploads Prescription

1. Login as **Patient** (`patient@medsafepk.com`)
2. Use Patient ID **P005**
3. View current medications and reminder schedule
4. Upload photo of new prescription
5. AI processes image (OCR + NLP)
6. View extracted medication details
7. Set up medication reminders

---

## 🔒 Security & Privacy

- User sessions managed separately for each role
- Patient data accessible only to authenticated healthcare providers
- Prescription data encrypted
- HIPAA-inspired privacy practices
- DRAP compliance for Pakistan

---

## 🚀 Getting Started

### For Developers

1. **Clone the repository**
   ```bash
   git clone https://github.com/zainab318/medSafePK.git
   cd MedSafePK
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open browser to `http://localhost:5173`
   - Click "Get Started" or "Login"
   - Select user type (Doctor/Pharmacy/Patient)
   - Use any email/password to login

### For End Users

1. **Visit** the MedSafePK website
2. **Click** "Get Started" or "Sign Up"
3. **Select** your role (Doctor, Pharmacy, or Patient)
4. **Fill in** your information
5. **Access** your role-specific dashboard

---

## 📝 Future Enhancements

- [ ] Real backend integration with database
- [ ] SMS/Email medication reminders for patients
- [ ] Barcode scanning for medications
- [ ] Multi-language prescription support
- [ ] Telemedicine integration
- [ ] Pharmacy inventory management
- [ ] Patient medication adherence tracking
- [ ] Drug interaction visualization
- [ ] Export prescription reports (PDF)
- [ ] Integration with Pakistan's national health database

---

## 🤝 Support

For questions or issues:
- Review the main `README.md`
- Check `SETUP.md` for installation help
- Refer to `TESTING_CHECKLIST.md` for testing guidelines

---

## 📄 License

MedSafePK © 2025 - AI for Safer Prescriptions in Pakistan


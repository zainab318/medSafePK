# MedSafePK - AI for Safer Prescriptions

![MedSafePK Logo](https://img.shields.io/badge/MedSafePK-Healthcare%20AI-14b8a6)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## 🏥 Overview

**MedSafePK** is an AI-assisted prescription safety and drug interaction checker designed for healthcare professionals in Pakistan. The platform helps doctors, pharmacists, and patients ensure safe and authenticated prescriptions through intelligent drug interaction detection, digital verification, and comprehensive health record management.

### 🇵🇰 Pakistani Healthcare Context
- **DRAP Certified:** Integrated with Drug Regulatory Authority of Pakistan standards
- **Local Hospitals:** Features major Pakistani hospitals (Jinnah Hospital, Aga Khan, Shaukat Khanum, etc.)
- **Bilingual Support:** Urdu/English language toggle
- **Cultural Adaptation:** Pakistani patient names and local healthcare context

## ✨ Features

### 🏠 **Landing Page**
- Modern, professional landing page with hero section
- Three feature cards highlighting core capabilities
- Statistics showcase (10K+ prescriptions checked, 673 interactions prevented)
- About section explaining MedSafePK's mission
- "Try Demo" and "Learn More" call-to-action buttons
- Smooth scrolling navigation

### 🔐 **Secure Authentication**
- Professional login system for healthcare providers
- Role-based access control
- Session management

### 📊 **Doctor Dashboard**
- Real-time statistics and metrics
- Quick access to all features
- Recent activity tracking
- Safety score monitoring

### 💊 **Prescription Safety Checker**
- AI-powered drug interaction detection
- **AI Suggestion Box** with intelligent recommendations:
  - Banned drug alerts (DRAP regulations)
  - High-risk medication warnings
  - Dosage corrections (too high/too low)
  - Safer alternative suggestions
  - AI reasoning for every suggestion
- **Dataset Source info box** showing:
  - DRAP Drug Registry (simulated)
  - Pakistan Health Data Exchange (mock)
- Manual drug entry with auto-suggestions
- OCR support for handwritten prescriptions
- Real-time safety alerts
- Alternative drug recommendations
- Digital signature generation

### 👥 **Patient Records Management**
- Comprehensive patient database
- Medical history tracking
- Allergy information
- Previous prescription records
- Search and filter capabilities
- Detailed patient profiles

### 📈 **Analytics Dashboard**
- Prescription trends visualization
- Drug interaction statistics
- Safety score metrics
- Monthly performance reports
- Risk assessment charts
- **City-wise analytics** showing:
  - Unsafe prescriptions prevented by city (Karachi, Lahore, Islamabad, Peshawar, etc.)
  - Population and hospital coverage
  - Safety scores per city
  - Aggregate nationwide statistics

### 🏗️ **System Architecture Overview**
- Visual diagram showing complete system flow
- Components: Doctor App → AI Engine → Database → Pharmacy/Patient/Analytics
- AI modules: OCR, NLP, Drug Interaction detection
- Data flow explanation with numbered steps
- Technology stack display
- Key features and security highlights

### 📱 **Digital QR Prescriptions**
- Secure QR code generation
- **DRAP verification badge** with certificate numbers
- Blockchain-backed verification
- Print and download options
- Pharmacist verification system
- Tamper-proof records

### 🌐 **Language & Localization**
- **Urdu/English toggle** in navigation bar
- Pakistani hospital selection on login
- Hospital affiliation displayed for doctors
- Culturally appropriate patient names
- Support for major Pakistani cities (Lahore, Karachi, Islamabad, Rawalpindi)

### 🔒 **Privacy & Ethics**
- **Privacy Modal** accessible from footer on all pages
- Comprehensive privacy policy covering:
  - Patient consent management
  - Anonymized data storage
  - Bias-free AI recommendations
  - End-to-end encryption standards
- Legal compliance with DRAP, PMC, and international standards
- Patient rights and data protection information
- Easy access to privacy information via footer button

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medsafepk.git
   cd medsafepk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)
   - You'll see the **Landing Page** first
   - Click "Try Demo" or "Sign In" to access the application

### Building for Production

```bash
npm run build
npm run preview
```

## 🎨 Technology Stack

- **Frontend Framework:** React 18.2
- **Styling:** TailwindCSS 3.3
- **Routing:** React Router DOM 6
- **Charts:** Recharts 2.10
- **QR Codes:** qrcode.react 3.1
- **Icons:** Lucide React
- **Build Tool:** Vite 5

## 📁 Project Structure

```
MedSafePK/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx          # Landing page (entry point)
│   │   ├── LoginPage.jsx            # Authentication page
│   │   ├── Header.jsx                # Main navigation header
│   │   ├── Footer.jsx                # Footer with privacy access
│   │   ├── PrivacyModal.jsx          # Privacy & Ethics modal
│   │   ├── DoctorDashboard.jsx      # Main dashboard
│   │   ├── PrescriptionChecker.jsx   # Drug interaction checker
│   │   ├── PatientRecords.jsx       # Patient management
│   │   ├── AnalyticsDashboard.jsx   # Analytics & reports
│   │   ├── QRPrescription.jsx       # Digital prescription
│   │   └── ArchitectureOverview.jsx # System architecture
│   ├── data/
│   │   └── sampleData.js            # Mock data for demo
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
├── public/                          # Static assets
├── docs/
│   ├── AI_SUGGESTION_BOX_GUIDE.md   # AI testing guide
│   ├── NAVIGATION_GUIDE.md          # Navigation documentation
│   ├── PRIVACY_ETHICS_GUIDE.md      # Privacy policy details
│   └── SETUP.md                     # Setup instructions
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
└── README.md                        # This file
```

## 🎯 Key Components

### LandingPage
Beautiful entry point featuring:
- Hero section with MedSafePK branding
- Three feature cards (AI Alerts, Digital Prescriptions, Pharmacy Verification)
- Live statistics display
- About section explaining the mission
- Call-to-action buttons for demo access
- Professional footer with compliance badges

### LoginPage
Simple authentication interface with demo credentials support. Any email/password combination works for demonstration purposes.

### DoctorDashboard
Central hub featuring:
- Stats cards (Prescriptions, Interactions, Patients, Safety Score)
- Recent activity feed
- Quick action buttons
- Sidebar navigation

### PrescriptionChecker
Advanced prescription analysis featuring:
- Multi-drug entry system
- Drug name auto-suggestions
- Image upload with simulated OCR
- Real-time interaction detection
- Safety recommendations
- Prescription generation

### PatientRecords
Patient management system with:
- Searchable patient database
- Detailed health records
- Modal-based patient details
- Allergy tracking
- Prescription history

### AnalyticsDashboard
Comprehensive analytics featuring:
- Line charts for trends
- Bar charts for comparisons
- Pie charts for distributions
- Key performance indicators
- Monthly reports

### QRPrescription
Digital prescription with:
- QR code generation
- Digital signatures
- Print/download functionality
- Pharmacist verification
- Security features display

## 🎨 Design Features

### Color Scheme
- **Primary:** Teal/Turquoise (#14b8a6) - Trust and healthcare
- **Navy:** Deep blues (#1e3a8a) - Professionalism
- **White:** Clean backgrounds
- **Soft Gray:** Subtle accents

### UI/UX
- Smooth transitions and animations
- Responsive design for all screen sizes
- Card-based layouts
- Professional medical aesthetic
- Intuitive navigation
- Clear visual hierarchy

## 📊 Demo Data

The application includes comprehensive sample data:
- **8 patient records** with Pakistani names
- **10 major Pakistani hospitals** (Jinnah Hospital, Aga Khan, Shaukat Khanum, etc.)
- Common drug database
- Drug interaction rules
- 6 months of analytics data
- Simulated prescription history
- DRAP certificate numbers

## 🔒 Security Features (Simulated)

- Digital signatures
- QR code verification
- Blockchain-backed records (UI only)
- Tamper-proof prescriptions
- Secure authentication

## 🎓 Use Case: IgniteCode AI Wrapper Competition

This prototype demonstrates:
- **AI Integration:** Drug interaction detection and safety recommendations
- **Healthcare Innovation:** Digital prescription system for Pakistan
- **User Experience:** Intuitive interface for medical professionals
- **Real-world Application:** Addresses prescription safety issues
- **Scalability:** Architecture ready for backend integration

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real AI/ML model for drug interactions
- [ ] Actual OCR implementation
- [ ] Multi-language support (Urdu)
- [ ] Mobile app version
- [ ] Real blockchain integration
- [ ] Integration with pharmacy systems
- [ ] SMS/Email notifications
- [ ] Telemedicine features
- [ ] Insurance claim integration

## 🤝 Contributing

This is a prototype project. Contributions, issues, and feature requests are welcome!

## 📝 License

This project is licensed under the MIT License.

## 👥 Author

Created for the IgniteCode AI Wrapper Competition

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Inspired by the need for safer prescription practices in Pakistan
- Icons by Lucide React
- Charts by Recharts

## 📞 Support

For questions or support, please contact:
- Email: support@medsafepk.com (demo)
- Website: https://medsafepk.com (demo)

---

**Note:** This is a frontend prototype with simulated AI responses. No actual medical advice is provided. Always consult qualified healthcare professionals for medical decisions.

## 🎉 Quick Start Guide

### Navigation Flow: Landing Page → Login → Dashboard → All Features

1. **Landing Page:**
   - Open `http://localhost:5173`
   - View the hero section and feature cards
   - Click "Try Demo" to go to login
   - Or click "Learn More" to scroll to About section

2. **Login:** 
   - Use any email/password (e.g., `doctor@test.com` / `password`)
   - **Select a hospital** from the dropdown (e.g., "Jinnah Hospital Lahore")
   - Automatically navigates to Dashboard

3. **Explore Dashboard:** 
   - View statistics and recent activity
   - Use sidebar to navigate to different features
   - Click any stat card for quick actions

4. **Try Language Toggle:** 
   - Click the language button in the header to switch to Urdu (اردو)
   - See bilingual support in action

5. **Check Prescription:** 
   - Navigate to "Write Prescription" from sidebar or dashboard
   - Add drugs to see AI suggestions:
     - Try `Nimesulide` to see banned drug alert
     - Try `Paracetamol 1500mg` to see dosage warning
     - Try `Warfarin` to see high-risk monitoring requirements
     - Try `Ibuprofen + Lisinopril` to see interaction + alternatives
   - View the intelligent **AI Suggestion Box** with reasoning
   - Note the **Dataset Source** info box

6. **Generate Digital Prescription:**
   - Complete a prescription check
   - Click "Generate Digital Prescription"
   - See the **DRAP Certified badge** with certificate number
   - Download or print the prescription

7. **View Patients:** 
   - Click "Patient Records" in sidebar
   - Browse patient records with hospital affiliations
   - Click any patient to see detailed profile modal

8. **Check Analytics:** 
   - Click "Analytics" in sidebar
   - View charts and statistics
   - Scroll down to see **city-wise data** (Karachi, Lahore, Islamabad, etc.)

9. **System Architecture:** 
   - Click "System Architecture" in sidebar
   - See the complete system flow diagram
   - Learn about technology stack and data flow

10. **Privacy & Ethics:**
   - Scroll to the **footer** on any page (when logged in)
   - Click **"Privacy & Ethics"** button
   - Review comprehensive privacy policy
   - See patient rights, data protection, and AI ethics
   - Close with "I Understand" button

11. **Logout:**
    - Click "Logout" in top-right header
    - Returns to login page

### Complete Navigation Test:
```
Landing Page → Login → Dashboard → Prescription Checker → Generate QR → 
Back to Dashboard → Patient Records → Analytics → 
Architecture → Footer Privacy Modal → Logout
```

Enjoy exploring MedSafePK! 🇵🇰🏥✨

**Pro Tips:** 
- Check out `AI_SUGGESTION_BOX_GUIDE.md` for detailed AI testing scenarios!
- See `NAVIGATION_GUIDE.md` for complete navigation documentation!
- Read `PRIVACY_ETHICS_GUIDE.md` for full privacy policy details!


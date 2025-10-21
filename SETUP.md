# MedSafePK - Quick Setup Guide

## 🚀 Getting Your Project Running

Follow these simple steps to get MedSafePK up and running on your local machine.

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- React & React DOM
- React Router
- TailwindCSS
- Recharts (for analytics)
- QRCode.react (for QR generation)
- Lucide React (for icons)
- Vite (build tool)

### Step 2: Start Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 3: Open in Browser

Open your browser and go to: **http://localhost:5173**

### Step 4: Login

On the login page, use ANY email and password (this is a demo):
- Email: `doctor@medsafepk.com` or any email
- Password: `password` or anything
- **Hospital:** Select any Pakistani hospital (e.g., "Jinnah Hospital Lahore")

### 🎯 Demo Walkthrough

#### 1. Dashboard
After login, you'll see:
- 4 statistics cards
- Recent activity feed with Pakistani patient names
- Quick action buttons
- Sidebar navigation
- **Hospital name displayed** under your name in the header
- **Language toggle button** to switch between English and Urdu (اردو)

#### 2. Try the Prescription Checker with AI Suggestions
1. Click "Write Prescription" or "New Prescription"
2. Enter patient details (optional)
3. **Test AI Suggestions - Try these drugs:**
   - **For banned drug alert:** `Nimesulide`, `100mg`, `Twice daily`
   - **For dosage warning:** `Paracetamol`, `1500mg`, `Three times daily`
   - **For high-risk warning:** `Warfarin`, `5mg`, `Once daily`
   - **For interaction + alternatives:** `Ibuprofen` + `Lisinopril`
4. Click "Check Interactions"
5. See the **AI Suggestion Box** with:
   - Brain icon and "AI Prescription Intelligence" header
   - Color-coded suggestions (red=critical, orange=high, blue=info)
   - AI reasoning for each suggestion
   - Confidence score at bottom (96.8%)
6. Notice the **Dataset Source** box in the right sidebar:
   - Shows "DRAP Drug Registry (simulated)"
   - Shows "Pakistan Health Data Exchange (mock)"
   - Demonstrates local data alignment
7. Click "Generate Safe Prescription"

#### 3. View the QR Prescription
- See the digital prescription with all details
- Notice the QR code
- **See the DRAP Certified badge** with certificate number
- Click "Verify Prescription" to simulate pharmacist verification (shows "DRAP compliant")
- Try the Print, Download, or Share buttons

#### 4. Patient Records
- Click "Patient Records" in the sidebar
- Browse the **8 sample patients** with Pakistani names
- Notice the **Hospital column** showing where each patient is registered
- Click "View" on any patient to see their full details
- See hospital name in the patient modal header
- Notice allergies, conditions, and prescription history

#### 5. Analytics
- Click "Analytics" in the sidebar
- Explore various charts:
  - Line chart: Unsafe prescriptions prevented over time
  - Pie chart: Current month's safety distribution
  - Bar chart: Monthly prescription trends
  - Horizontal bar: Most common risky drug pairs
  - **NEW:** City-wise chart showing prescriptions prevented across Pakistan
    - See data for Karachi, Lahore, Islamabad, Peshawar, Rawalpindi, Faisalabad
    - View city cards with population, hospitals, and safety scores
    - Check aggregate statistics at the bottom

### 🎨 Features to Showcase

1. **Drug Interaction Detection**
   - Try these combinations to see alerts:
     - Ibuprofen + Lisinopril (high severity)
     - Aspirin + Warfarin (high severity)
     - Metformin + Alcohol (medium severity)

2. **Image Upload** (Simulated)
   - In Prescription Checker, click the upload area
   - Upload any image
   - Watch simulated OCR extraction

3. **Patient Modal**
   - In Patient Records, click "View" on any patient
   - See the beautiful modal with full details

4. **Responsive Design**
   - Resize your browser window
   - Notice how the layout adapts

### 🛠️ Build Commands

```bash
# Development
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview
```

### 📦 Project Structure

```
src/
├── components/          # All React components
│   ├── LoginPage.jsx
│   ├── Header.jsx
│   ├── DoctorDashboard.jsx
│   ├── PrescriptionChecker.jsx
│   ├── PatientRecords.jsx
│   ├── AnalyticsDashboard.jsx
│   └── QRPrescription.jsx
├── data/
│   └── sampleData.js   # Demo data
├── App.jsx             # Main routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

### 🎨 Color Palette

The app uses these primary colors:
- **Teal/Primary:** `#14b8a6` - Main accent
- **Navy:** `#1e3a8a` - Headers and emphasis
- **Blue:** `#3b82f6` - Secondary actions
- **Green:** `#10b981` - Success states
- **Amber:** `#f59e0b` - Warnings
- **Red:** `#ef4444` - Errors/Alerts

### 🐛 Troubleshooting

**Port already in use?**
```bash
# Kill the process using port 5173 (Windows PowerShell)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- --port 3000
```

**Dependencies not installing?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Page not loading?**
- Check console for errors
- Ensure all files are saved
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### 🎯 Demo Script for Presentation

1. **Introduction (30s)**
   - Show login page
   - Explain MedSafePK's purpose for Pakistan
   - **Select "Jinnah Hospital Lahore"** from dropdown
   - Quick login

2. **Dashboard Tour (45s)**
   - **Toggle language** to Urdu and back
   - **Point out hospital name** in header
   - Highlight statistics
   - Show recent activity with Pakistani patient names

3. **Core Feature: Prescription Checker (2 min)**
   - Add patient info
   - Enter two drugs (include interaction pair)
   - Show interaction detection
   - Generate prescription

4. **QR Prescription (1.5 min)**
   - Show digital prescription
   - **Highlight DRAP Certified badge** with certificate number
   - Demonstrate QR code
   - Click verify button (shows "DRAP compliant")
   - Mention security features including DRAP verification

5. **Patient Records (45s)**
   - Browse table with **Hospital column**
   - Show various **Pakistani hospitals** (Aga Khan, Shaukat Khanum, etc.)
   - Open patient detail modal
   - Point out hospital name in modal
   - Highlight comprehensive data

6. **Analytics (30s)**
   - Show charts
   - Explain safety metrics
   - Point out trends

7. **Conclusion (30s)**
   - Summarize AI features
   - Mention scalability
   - Future enhancements

### 💡 Tips for Best Presentation

- Use fullscreen mode (F11)
- Zoom to 100% or 110% for better visibility
- Have the demo flow rehearsed
- Keep browser tabs minimal
- Close unnecessary applications
- Test everything before presenting

### 🌟 Key Selling Points

1. **AI-Powered Safety:** Real-time drug interaction detection
2. **DRAP Compliant:** Integrated with Drug Regulatory Authority of Pakistan
3. **Bilingual Support:** Urdu/English language toggle for accessibility
4. **Local Context:** Pakistani hospitals, names, and healthcare infrastructure
5. **User-Friendly:** Intuitive design for busy healthcare professionals
6. **Digital Transformation:** QR codes, digital signatures, blockchain-ready
7. **Comprehensive:** Covers entire prescription workflow
8. **Pakistan-Focused:** Addresses local healthcare challenges
9. **Scalable:** Ready for real AI/ML integration

### 📞 Need Help?

If you encounter any issues:
1. Check the README.md file
2. Verify all dependencies are installed
3. Ensure Node.js version is 16+
4. Check browser console for errors

### 🎉 You're All Set!

Your MedSafePK prototype is ready to impress! Good luck with your presentation! 🚀

---

**Remember:** This is a prototype with simulated AI. The actual AI integration would come in the next phase with a proper backend, machine learning models, and real OCR capabilities.


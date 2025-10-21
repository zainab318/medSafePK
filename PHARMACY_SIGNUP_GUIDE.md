# Pharmacy Signup Feature Guide

## Overview

Pharmacy users now have a dedicated signup flow with a dropdown of popular pharmacies in Pakistan, plus the ability to add custom pharmacy names.

---

## 🏥 Popular Pharmacies List

The following pharmacies are included in the dropdown:

1. **Servaid Pharmacy**
2. **Fazal Din's Pharma Plus**
3. **Clinix Pharmacy**
4. **D-Watson**
5. **Shaheen Chemists**
6. **Shifaa Pharmacy**
7. **Medix Pharmacy**
8. **Multan Medicos**
9. **Agha's Super Mart Pharmacy**
10. **Other - Add Manually** (for custom pharmacies)

---

## 📝 Pharmacy Signup Process

### Step 1: Select User Type
- Click on **"Pharmacy"** button on the login page

### Step 2: Fill Required Fields

**For Pharmacy Signup**, the following fields are required:

1. **Full Name** * - Pharmacist's name
2. **Email Address** * - Professional email
3. **Password** * - Secure password
4. **Pharmacy Name** * - Select from dropdown
5. **Enter Pharmacy Name** * - Only shown if "Other - Add Manually" is selected

### Step 3: Pharmacy Name Selection

#### Option A: Select from Popular Pharmacies
- Choose one of the pre-populated pharmacy chains from the dropdown
- The selected pharmacy name will be stored in the profile

#### Option B: Add Custom Pharmacy
- Select **"Other - Add Manually"** from the dropdown
- A new text field appears: **"Enter Pharmacy Name"**
- Type the full name of your pharmacy
- The custom name will be stored in the profile

---

## 🔧 Technical Implementation

### Data Structure

**File**: `src/data/sampleData.js`

```javascript
export const popularPharmacies = [
  "Servaid Pharmacy",
  "Fazal Din's Pharma Plus",
  "Clinix Pharmacy",
  "D-Watson",
  "Shaheen Chemists",
  "Shifaa Pharmacy",
  "Medix Pharmacy",
  "Multan Medicos",
  "Agha's Super Mart Pharmacy",
  "Other - Add Manually"
];
```

### State Management

**File**: `src/components/LoginPage.jsx`

```javascript
const [pharmacy, setPharmacy] = useState('');
const [customPharmacyName, setCustomPharmacyName] = useState('');
```

### Validation Logic

The system validates:
1. Pharmacy dropdown selection is required
2. If "Other - Add Manually" is selected, custom pharmacy name is required
3. Custom pharmacy name must not be empty

### Storage

The pharmacy name is stored in:
- **State**: `facilityName` in `App.jsx`
- **Passed to**: `PharmacyDashboard` component as `pharmacyName` prop
- **Displayed in**: Header component as facility name

---

## 🎨 User Interface

### Pharmacy Dropdown (Normal Selection)

```
┌───────────────────────────────────┐
│ Pharmacy Name *                   │
│ ┌───────────────────────────────┐ │
│ │ 💊 Select your pharmacy ▼     │ │
│ └───────────────────────────────┘ │
│   • Servaid Pharmacy              │
│   • Fazal Din's Pharma Plus       │
│   • Clinix Pharmacy               │
│   • D-Watson                      │
│   • Shaheen Chemists              │
│   • Shifaa Pharmacy               │
│   • Medix Pharmacy                │
│   • Multan Medicos                │
│   • Agha's Super Mart Pharmacy    │
│   • Other - Add Manually          │
└───────────────────────────────────┘
```

### Custom Pharmacy Entry (When "Other" Selected)

```
┌───────────────────────────────────┐
│ Pharmacy Name *                   │
│ ┌───────────────────────────────┐ │
│ │ 💊 Other - Add Manually ✓     │ │
│ └───────────────────────────────┘ │
├───────────────────────────────────┤
│ Enter Pharmacy Name *             │
│ ┌───────────────────────────────┐ │
│ │ 🏥 Enter your pharmacy name   │ │
│ └───────────────────────────────┘ │
│ ℹ️ Please enter the full name     │
│   of your pharmacy                │
└───────────────────────────────────┘
```

---

## 🔄 Complete Pharmacy Signup Flow

### Example: Servaid Pharmacy

1. Select **"Pharmacy"** user type
2. Enter **Full Name**: "Ahmed Khan"
3. Enter **Email**: "ahmed@servaid.com"
4. Enter **Password**: "********"
5. Select **Pharmacy Name**: "Servaid Pharmacy"
6. Click **"Create Account"**
7. ✅ Redirected to Pharmacy Dashboard
8. Header shows: "Servaid Pharmacy"

### Example: Custom Pharmacy

1. Select **"Pharmacy"** user type
2. Enter **Full Name**: "Fatima Ali"
3. Enter **Email**: "fatima@alampharmacy.com"
4. Enter **Password**: "********"
5. Select **Pharmacy Name**: "Other - Add Manually"
6. **New field appears** ↓
7. Enter **Custom Pharmacy Name**: "Al-Alam Pharmacy Lahore"
8. Click **"Create Account"**
9. ✅ Redirected to Pharmacy Dashboard
10. Header shows: "Al-Alam Pharmacy Lahore"

---

## 🧪 Testing Instructions

### Test Case 1: Popular Pharmacy Selection

```bash
1. Navigate to http://localhost:5175/login
2. Click "Sign Up"
3. Select "Pharmacy" user type
4. Fill in:
   - Name: Test Pharmacist
   - Email: test@pharmacy.com
   - Password: test123
   - Pharmacy: Servaid Pharmacy
5. Click "Create Account"
6. ✅ Verify: Redirected to /pharmacy-dashboard
7. ✅ Verify: Header shows "Servaid Pharmacy"
```

### Test Case 2: Custom Pharmacy Entry

```bash
1. Navigate to http://localhost:5175/login
2. Click "Sign Up"
3. Select "Pharmacy" user type
4. Fill in:
   - Name: Custom Pharmacist
   - Email: custom@test.com
   - Password: test123
   - Pharmacy: Other - Add Manually
5. ✅ Verify: Custom name field appears
6. Enter: "My Local Pharmacy Karachi"
7. Click "Create Account"
8. ✅ Verify: Redirected to /pharmacy-dashboard
9. ✅ Verify: Header shows "My Local Pharmacy Karachi"
```

### Test Case 3: Validation

```bash
1. Select "Pharmacy" and click "Sign Up"
2. Select "Other - Add Manually"
3. Leave custom name field empty
4. Click "Create Account"
5. ✅ Verify: Alert shows "Please enter your pharmacy name."
6. ✅ Verify: Form not submitted
```

---

## 🔍 Differences from Doctor Signup

| Feature | Doctor Signup | Pharmacy Signup |
|---------|---------------|-----------------|
| **Facility Field Label** | Hospital / Medical Facility | Pharmacy Name |
| **Icon** | 🏥 Building2 | 💊 Pill |
| **Options** | 10 Pakistani Hospitals | 10 Pharmacies + Custom |
| **Custom Entry** | No | Yes (via "Other - Add Manually") |
| **Validation** | Hospital required | Pharmacy + Custom name (if applicable) |

---

## 📊 Pharmacy Profile Data

When a pharmacy user signs up, the following data is stored:

```javascript
{
  userName: "Ahmed Khan",              // Full name
  userType: "pharmacy",                // User role
  hospitalName: "Servaid Pharmacy",    // Pharmacy name (or custom)
  email: "ahmed@servaid.com",          // Email
  password: "******",                  // Encrypted
  // patientId is null for pharmacy users
}
```

---

## 🎯 Use Cases

### Use Case 1: Chain Pharmacy Registration
**Scenario**: A pharmacist working at a well-known chain pharmacy
- **Solution**: Select from dropdown (e.g., "D-Watson")
- **Benefit**: Quick registration, standardized naming

### Use Case 2: Independent Pharmacy Registration
**Scenario**: A small independent pharmacy not in the list
- **Solution**: Select "Other - Add Manually" and enter custom name
- **Benefit**: Flexibility for all pharmacy types

### Use Case 3: Multiple Branches
**Scenario**: Pharmacist wants to specify branch location
- **Solution**: Use custom entry: "Servaid Pharmacy - DHA Lahore"
- **Benefit**: Precise location identification

---

## 🚀 Future Enhancements

Potential improvements for the pharmacy feature:

- [ ] **Pharmacy verification**: Verify pharmacy license numbers
- [ ] **Branch management**: Allow chain pharmacies to manage multiple branches
- [ ] **Pharmacy search**: Auto-complete for pharmacy names
- [ ] **Location services**: Auto-detect pharmacy based on GPS
- [ ] **Pharmacy ratings**: Display pharmacy ratings and reviews
- [ ] **Inventory integration**: Link pharmacy inventory management
- [ ] **Multi-pharmacist support**: Allow multiple pharmacists per pharmacy
- [ ] **Pharmacy analytics**: Track dispensing patterns per pharmacy

---

## 📞 Support

For pharmacy signup issues:
- Check that all required fields are filled
- Ensure custom pharmacy name is entered if "Other" is selected
- Verify email format is valid
- Contact support if issues persist

---

**Last Updated**: October 21, 2025
**Version**: 1.0.0


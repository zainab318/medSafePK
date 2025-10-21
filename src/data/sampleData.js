// Sample data for MedSafePK prototype

export const pakistaniHospitals = [
  "Jinnah Hospital Lahore",
  "Shaukat Khanum Memorial Cancer Hospital, Lahore",
  "Aga Khan University Hospital, Karachi",
  "Pakistan Institute of Medical Sciences (PIMS), Islamabad",
  "Services Hospital, Lahore",
  "Combined Military Hospital (CMH), Rawalpindi",
  "Liaquat National Hospital, Karachi",
  "Shifa International Hospital, Islamabad",
  "Mayo Hospital, Lahore",
  "Holy Family Hospital, Rawalpindi"
];

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

export const patients = [
  {
    id: "P001",
    name: "Ahmed Khan",
    age: 45,
    lastVisit: "2025-10-15",
    prescriptions: 12,
    allergies: ["Penicillin", "Sulfa drugs"],
    conditions: ["Hypertension", "Type 2 Diabetes"],
    hospital: "Jinnah Hospital Lahore",
    recentPrescriptions: [
      { drug: "Metformin", dosage: "500mg", frequency: "Twice daily" },
      { drug: "Lisinopril", dosage: "10mg", frequency: "Once daily" }
    ]
  },
  {
    id: "P002",
    name: "Fatima Ali",
    age: 32,
    lastVisit: "2025-10-18",
    prescriptions: 8,
    allergies: ["None"],
    conditions: ["Migraine"],
    hospital: "Shifa International Hospital, Islamabad",
    recentPrescriptions: [
      { drug: "Sumatriptan", dosage: "50mg", frequency: "As needed" }
    ]
  },
  {
    id: "P003",
    name: "Hassan Mahmood",
    age: 58,
    lastVisit: "2025-10-19",
    prescriptions: 15,
    allergies: ["Aspirin"],
    conditions: ["Heart Disease", "High Cholesterol"],
    hospital: "Aga Khan University Hospital, Karachi",
    recentPrescriptions: [
      { drug: "Atorvastatin", dosage: "20mg", frequency: "Once daily" },
      { drug: "Clopidogrel", dosage: "75mg", frequency: "Once daily" }
    ]
  },
  {
    id: "P004",
    name: "Ayesha Siddiqui",
    age: 28,
    lastVisit: "2025-10-17",
    prescriptions: 5,
    allergies: ["None"],
    conditions: ["Anxiety"],
    hospital: "Services Hospital, Lahore",
    recentPrescriptions: [
      { drug: "Sertraline", dosage: "50mg", frequency: "Once daily" }
    ]
  },
  {
    id: "P005",
    name: "Bilal Hussain",
    age: 52,
    lastVisit: "2025-10-16",
    prescriptions: 10,
    allergies: ["Latex"],
    conditions: ["Arthritis", "Gastritis"],
    hospital: "Mayo Hospital, Lahore",
    recentPrescriptions: [
      { drug: "Naproxen", dosage: "250mg", frequency: "Twice daily" },
      { drug: "Omeprazole", dosage: "20mg", frequency: "Once daily" }
    ]
  },
  {
    id: "P006",
    name: "Zainab Malik",
    age: 36,
    lastVisit: "2025-10-20",
    prescriptions: 7,
    allergies: ["Codeine"],
    conditions: ["Asthma"],
    hospital: "Shaukat Khanum Memorial Cancer Hospital, Lahore",
    recentPrescriptions: [
      { drug: "Salbutamol", dosage: "2 puffs", frequency: "As needed" }
    ]
  },
  {
    id: "P007",
    name: "Muhammad Rizwan",
    age: 41,
    lastVisit: "2025-10-19",
    prescriptions: 9,
    allergies: ["None"],
    conditions: ["Type 2 Diabetes"],
    hospital: "Liaquat National Hospital, Karachi",
    recentPrescriptions: [
      { drug: "Metformin", dosage: "850mg", frequency: "Twice daily" }
    ]
  },
  {
    id: "P008",
    name: "Saima Akhtar",
    age: 55,
    lastVisit: "2025-10-18",
    prescriptions: 14,
    allergies: ["Sulfa drugs"],
    conditions: ["Osteoporosis", "Hypertension"],
    hospital: "Pakistan Institute of Medical Sciences, Islamabad",
    recentPrescriptions: [
      { drug: "Alendronate", dosage: "70mg", frequency: "Once weekly" },
      { drug: "Amlodipine", dosage: "5mg", frequency: "Once daily" }
    ]
  }
];

export const drugInteractions = {
  "Ibuprofen+Lisinopril": {
    severity: "high",
    message: "Ibuprofen may increase blood pressure when taken with Lisinopril.",
    alternative: "Consider Paracetamol instead."
  },
  "Aspirin+Warfarin": {
    severity: "high",
    message: "Combined use increases risk of bleeding.",
    alternative: "Monitor closely or consider alternative antiplatelet."
  },
  "Metformin+Alcohol": {
    severity: "medium",
    message: "Alcohol can increase risk of lactic acidosis with Metformin.",
    alternative: "Avoid alcohol consumption."
  },
  "Ciprofloxacin+Calcium": {
    severity: "medium",
    message: "Calcium supplements reduce absorption of Ciprofloxacin.",
    alternative: "Take medications at least 2 hours apart."
  }
};

export const analyticsData = {
  unsafePrescriptionsPrevented: [
    { month: "May", count: 45 },
    { month: "Jun", count: 52 },
    { month: "Jul", count: 48 },
    { month: "Aug", count: 61 },
    { month: "Sep", count: 58 },
    { month: "Oct", count: 67 }
  ],
  riskyDrugPairs: [
    { pair: "Ibuprofen + Lisinopril", count: 23 },
    { pair: "Aspirin + Warfarin", count: 18 },
    { pair: "Metformin + Alcohol", count: 15 },
    { pair: "Ciprofloxacin + Calcium", count: 12 },
    { pair: "Amoxicillin + Methotrexate", count: 9 }
  ],
  monthlyPrescriptions: [
    { month: "May", total: 342, safe: 297, unsafe: 45 },
    { month: "Jun", total: 389, safe: 337, unsafe: 52 },
    { month: "Jul", total: 365, safe: 317, unsafe: 48 },
    { month: "Aug", total: 421, safe: 360, unsafe: 61 },
    { month: "Sep", total: 398, safe: 340, unsafe: 58 },
    { month: "Oct", total: 445, safe: 378, unsafe: 67 }
  ],
  cityWiseData: [
    { 
      city: "Karachi", 
      prevented: 187, 
      total: 1245,
      population: "16.0M",
      hospitals: 45,
      safetyScore: 85
    },
    { 
      city: "Lahore", 
      prevented: 156, 
      total: 1089,
      population: "11.1M",
      hospitals: 38,
      safetyScore: 86
    },
    { 
      city: "Islamabad", 
      prevented: 98, 
      total: 678,
      population: "1.1M",
      hospitals: 22,
      safetyScore: 89
    },
    { 
      city: "Peshawar", 
      prevented: 76, 
      total: 542,
      population: "2.0M",
      hospitals: 18,
      safetyScore: 84
    },
    { 
      city: "Rawalpindi", 
      prevented: 89, 
      total: 623,
      population: "2.1M",
      hospitals: 20,
      safetyScore: 86
    },
    { 
      city: "Faisalabad", 
      prevented: 67, 
      total: 489,
      population: "3.2M",
      hospitals: 15,
      safetyScore: 83
    }
  ]
};

export const commonDrugs = [
  "Paracetamol",
  "Ibuprofen",
  "Aspirin",
  "Amoxicillin",
  "Metformin",
  "Lisinopril",
  "Atorvastatin",
  "Omeprazole",
  "Losartan",
  "Amlodipine",
  "Metoprolol",
  "Sertraline",
  "Ciprofloxacin",
  "Azithromycin",
  "Prednisone"
];

// AI-powered drug intelligence database for Pakistan
export const drugIntelligence = {
  // Banned drugs in Pakistan (DRAP regulations)
  bannedDrugs: {
    "Phenylpropanolamine": {
      reason: "Banned by DRAP due to increased risk of hemorrhagic stroke",
      alternative: "Pseudoephedrine or Cetirizine for cold symptoms",
      severity: "critical"
    },
    "Sibutramine": {
      reason: "Banned due to cardiovascular risks",
      alternative: "Lifestyle modifications and Orlistat under supervision",
      severity: "critical"
    },
    "Nimesulide": {
      reason: "Restricted use due to liver toxicity concerns",
      alternative: "Paracetamol or Ibuprofen",
      severity: "high"
    }
  },

  // High-risk drugs requiring special monitoring
  highRiskDrugs: {
    "Warfarin": {
      warning: "Requires regular INR monitoring. High bleeding risk.",
      monitoring: "Monthly blood tests recommended",
      severity: "high"
    },
    "Methotrexate": {
      warning: "Hepatotoxic. Requires liver function monitoring.",
      monitoring: "Baseline and periodic liver function tests",
      severity: "high"
    },
    "Digoxin": {
      warning: "Narrow therapeutic index. Monitor for toxicity.",
      monitoring: "Serum digoxin levels and renal function",
      severity: "medium"
    }
  },

  // Dosage recommendations based on common prescribing patterns
  dosageRecommendations: {
    "Paracetamol": {
      adult: { min: "500mg", max: "1000mg", frequency: "Every 4-6 hours", maxDaily: "4000mg" },
      child: { calculation: "10-15mg/kg per dose" },
      warning: "Do not exceed 4g/day to prevent hepatotoxicity"
    },
    "Ibuprofen": {
      adult: { min: "200mg", max: "800mg", frequency: "Every 6-8 hours", maxDaily: "2400mg" },
      warning: "Take with food. Avoid in patients with gastric ulcers or kidney disease"
    },
    "Metformin": {
      adult: { starting: "500mg", max: "2550mg", frequency: "1-3 times daily" },
      warning: "Start low, titrate slowly. Contraindicated in renal impairment (eGFR <30)"
    },
    "Amoxicillin": {
      adult: { standard: "500mg", frequency: "Every 8 hours", duration: "5-7 days" },
      warning: "Complete full course even if symptoms improve"
    },
    "Lisinopril": {
      adult: { starting: "5-10mg", max: "40mg", frequency: "Once daily" },
      warning: "Monitor blood pressure and renal function. Risk of hyperkalemia"
    }
  },

  // Safer alternatives database
  saferAlternatives: {
    "Ibuprofen": {
      alternatives: [
        {
          drug: "Paracetamol",
          reason: "Lower GI and cardiovascular risk",
          suitableFor: "Patients with hypertension, heart disease, or gastric issues"
        },
        {
          drug: "Celecoxib",
          reason: "COX-2 selective, lower GI bleeding risk",
          suitableFor: "Patients requiring NSAID but with GI risk factors"
        }
      ]
    },
    "Aspirin": {
      alternatives: [
        {
          drug: "Clopidogrel",
          reason: "Lower bleeding risk in some patients",
          suitableFor: "Aspirin-intolerant patients requiring antiplatelet therapy"
        }
      ]
    },
    "Diclofenac": {
      alternatives: [
        {
          drug: "Naproxen",
          reason: "Lower cardiovascular risk profile",
          suitableFor: "Patients with cardiovascular risk factors"
        },
        {
          drug: "Paracetamol",
          reason: "Safest option for mild-moderate pain",
          suitableFor: "Elderly patients or those with multiple comorbidities"
        }
      ]
    }
  },

  // AI reasoning patterns for suggestions
  aiReasoningTemplates: {
    dosageTooHigh: "AI Analysis: The prescribed dosage exceeds the recommended maximum. This may increase risk of adverse effects.",
    dosageTooLow: "AI Analysis: The prescribed dosage is below the therapeutic range. Consider increasing for optimal efficacy.",
    betterAlternative: "AI Analysis: Based on current evidence and patient safety data, an alternative medication may be more appropriate.",
    requiresMonitoring: "AI Analysis: This medication requires periodic monitoring to ensure safety and efficacy.",
    bannedDrug: "DRAP Alert: This medication is banned or restricted in Pakistan. Please select an alternative.",
    ageConsideration: "AI Analysis: Special dosage consideration needed based on patient age group."
  }
};


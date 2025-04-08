export const swaggerExamples = {
  "planRecommendationRequest": {
    "location": "urban",
    "familySize": 4,
    "specificNeeds": "elderly care, pet care",
    "livingSituation": "apartment",
    "storageSpace": "limited",
    "incomeStability": "stable",
    "savingsLevel": "low",
    "primaryConcern": "natural-disasters"
  },
  "emergencyBagpackRequest": {
    "peopleCount": 4,
    "mobilityNeeds": "medium",
    "duration": "72h",
    "documentStorage": "both",
    "identityDocs": "extended",
    "financialDocs": "essential",
    "medicalConditions": "chronic",
    "firstAidLevel": "intermediate",
    "medications": "multiple",
    "waterStorage": "both",
    "foodType": "mixed",
    "tools": "intermediate",
    "climate": "variable",
    "communication": "intermediate",
    "specialItems": "both"
  },
  "emergencyFundRequest": {
    "employmentStatus": "full-time",
    "incomeStability": "stable",
    "dependentsCount": 2,
    "housingExpense": 1500,
    "utilitiesExpense": 200,
    "foodExpense": 800,
    "transportationExpense": 300,
    "targetFundSize": "6-months",
    "savingTimeline": "1-year",
    "monthlySaving": 500,
    "storageMethod": "high-yield",
    "accessRequirements": "1-3-days",
    "riskTolerance": "low",
    "insuranceCoverage": "comprehensive",
    "debtObligations": "low",
    "additionalIncome": "none"
  },
  "storageRequest": {
    "location": "urban",
    "size": "4",
    "type": "storage",
    "specificNeeds": "duration: 6months, spaceType: apartment, dietaryRestrictions: none, storageMethod: mixed, temperatureControl: mixed, waterContainerType: mixed, waterTreatment: mixed, medicalSupplies: intermediate, powerBackup: batteries, hygieneSupplies: intermediate, organizationSystem: shelves, inventoryManagement: spreadsheet, rotationSchedule: quarterly"
  },
  "planRecommendationResponse": {
    "primaryRecommendation": "emergency-bagpack",
    "secondaryRecommendation": "storage",
    "reasoning": "Based on your urban location, apartment living situation, and concern for natural disasters, an emergency bagpack should be your primary focus, followed by storage planning."
  },
  "emergencyBagpackResponse": {
    "steps": [
      {
        "id": 1,
        "title": "Basic Bagpack Information",
        "description": "Prepare a 72-hour emergency bagpack for 4 people with medium mobility needs"
      },
      {
        "id": 2,
        "title": "Essential Documents",
        "description": "Store both physical and digital copies of extended identity documents and essential financial information"
      },
      {
        "id": 3,
        "title": "Medical and First Aid",
        "description": "Include an intermediate first aid kit and prepare for chronic medical conditions with multiple medications"
      }
    ],
    "estimatedTime": "2 weeks",
    "priority": "high"
  },
  "emergencyFundResponse": {
    "steps": [
      {
        "id": 1,
        "title": "Basic Financial Information",
        "description": "Plan for a stable income with 2 dependents"
      },
      {
        "id": 2,
        "title": "Monthly Expenses",
        "description": "Total monthly expenses: $2,800"
      },
      {
        "id": 3,
        "title": "Fund Goals",
        "description": "Target: 6 months of expenses ($16,800) within 1 year"
      }
    ],
    "estimatedTime": "12 months",
    "priority": "medium"
  },
  "storageResponse": {
    "steps": [
      {
        "id": 1,
        "title": "Basic Storage Information",
        "description": "Prepare 6 months of supplies for 4 people in an apartment setting"
      },
      {
        "id": 2,
        "title": "Food Storage Requirements",
        "description": "Mixed storage methods with no dietary restrictions"
      },
      {
        "id": 3,
        "title": "Water Storage",
        "description": "Mixed container types with multiple treatment methods"
      }
    ],
    "estimatedTime": "3 months",
    "priority": "medium"
  }
}
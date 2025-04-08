import { PlanStep } from "../interface/Plans";

export const emergencyBagpackSteps: PlanStep[] = [
  {
    id: 1,
    title: 'Basic Bagpack Information',
    fields: [
      {
        type: 'input',
        label: 'Number of People',
        key: 'peopleCount',
        required: true,
        inputType: 'number',
        min: 1,
        max: 10,
        placeholder: 'e.g., 2'
      },
      {
        type: 'select',
        label: 'Mobility Requirements',
        key: 'mobilityNeeds',
        required: true,
        options: [
          { value: 'high', label: 'High mobility (Need to move quickly)' },
          { value: 'medium', label: 'Medium mobility (Can carry moderate weight)' },
          { value: 'low', label: 'Low mobility (Limited carrying capacity)' }
        ]
      },
      {
        type: 'select',
        label: 'Duration Plan',
        key: 'duration',
        required: true,
        options: [
          { value: '24h', label: '24 hours' },
          { value: '48h', label: '48 hours' },
          { value: '72h', label: '72 hours (Recommended)' },
          { value: '96h', label: '96 hours' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Essential Documents',
    fields: [
      {
        type: 'select',
        label: 'Document Storage Method',
        key: 'documentStorage',
        required: true,
        options: [
          { value: 'physical', label: 'Physical copies only' },
          { value: 'digital', label: 'Digital copies only' },
          { value: 'both', label: 'Both physical and digital' }
        ]
      },
      {
        type: 'select',
        label: 'Identity Documents',
        key: 'identityDocs',
        required: true,
        options: [
          { value: 'basic', label: 'Basic (ID, passport)' },
          { value: 'extended', label: 'Extended (+ birth certificates, SSN)' },
          { value: 'comprehensive', label: 'Comprehensive (+ property documents)' }
        ]
      },
      {
        type: 'select',
        label: 'Financial Documents',
        key: 'financialDocs',
        required: true,
        options: [
          { value: 'minimal', label: 'Minimal (Cash, main credit card)' },
          { value: 'essential', label: 'Essential (+ insurance info)' },
          { value: 'complete', label: 'Complete (+ account details, contracts)' }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Medical and First Aid',
    fields: [
      {
        type: 'select',
        label: 'Medical Conditions',
        key: 'medicalConditions',
        required: true,
        options: [
          { value: 'none', label: 'No specific conditions' },
          { value: 'basic', label: 'Basic medical needs' },
          { value: 'chronic', label: 'Chronic conditions' },
          { value: 'multiple', label: 'Multiple conditions' }
        ]
      },
      {
        type: 'select',
        label: 'First Aid Kit Level',
        key: 'firstAidLevel',
        required: true,
        options: [
          { value: 'basic', label: 'Basic kit' },
          { value: 'intermediate', label: 'Intermediate kit' },
          { value: 'advanced', label: 'Advanced kit' }
        ]
      },
      {
        type: 'select',
        label: 'Prescription Medications',
        key: 'medications',
        required: true,
        options: [
          { value: 'none', label: 'No medications needed' },
          { value: 'basic', label: '1-2 medications' },
          { value: 'multiple', label: 'Multiple medications' }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Survival Essentials',
    fields: [
      {
        type: 'select',
        label: 'Water Storage',
        key: 'waterStorage',
        required: true,
        options: [
          { value: 'bottles', label: 'Water bottles' },
          { value: 'containers', label: 'Water containers' },
          { value: 'both', label: 'Both + filtration system' }
        ]
      },
      {
        type: 'select',
        label: 'Food Type',
        key: 'foodType',
        required: true,
        options: [
          { value: 'ready-to-eat', label: 'Ready-to-eat meals' },
          { value: 'dehydrated', label: 'Dehydrated food' },
          { value: 'mixed', label: 'Mixed types' }
        ]
      },
      {
        type: 'select',
        label: 'Emergency Tools',
        key: 'tools',
        required: true,
        options: [
          { value: 'basic', label: 'Basic (flashlight, multi-tool)' },
          { value: 'intermediate', label: '+ Radio, batteries' },
          { value: 'advanced', label: '+ Navigation, advanced tools' }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Additional Considerations',
    fields: [
      {
        type: 'select',
        label: 'Climate Preparation',
        key: 'climate',
        required: true,
        options: [
          { value: 'warm', label: 'Warm climate gear' },
          { value: 'cold', label: 'Cold climate gear' },
          { value: 'variable', label: 'Variable weather gear' }
        ]
      },
      {
        type: 'select',
        label: 'Communication Devices',
        key: 'communication',
        required: true,
        options: [
          { value: 'basic', label: 'Basic (Phone + charger)' },
          { value: 'intermediate', label: '+ Backup battery' },
          { value: 'advanced', label: '+ Emergency radio, satellite device' }
        ]
      },
      {
        type: 'select',
        label: 'Special Items',
        key: 'specialItems',
        required: true,
        options: [
          { value: 'none', label: 'No special items' },
          { value: 'children', label: 'Children supplies' },
          { value: 'pets', label: 'Pet supplies' },
          { value: 'both', label: 'Both children and pet supplies' }
        ]
      }
    ]
  }
]; 
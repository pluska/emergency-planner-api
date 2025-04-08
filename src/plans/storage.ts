import { PlanStep } from "../interface/Plans";

export const storageSteps: PlanStep[] = [
  {
    id: 1,
    title: 'Basic Storage Information',
    fields: [
      { 
        type: 'input', 
        label: 'Number of people to prepare for', 
        key: 'peopleCount',
        required: true,
        placeholder: 'e.g., 4'
      },
      { 
        type: 'select', 
        label: 'Storage Duration', 
        key: 'duration',
        required: true,
        options: [
          { value: '3months', label: '3 months' },
          { value: '6months', label: '6 months' },
          { value: '1year', label: '1 year' }
        ]
      },
      {
        type: 'select',
        label: 'Storage Space Type',
        key: 'spaceType',
        required: true,
        options: [
          { value: 'apartment', label: 'Apartment' },
          { value: 'house', label: 'House' },
          { value: 'basement', label: 'Basement' },
          { value: 'garage', label: 'Garage' },
          { value: 'external', label: 'External Storage Unit' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Food Storage Requirements',
    fields: [
      {
        type: 'select',
        label: 'Dietary Restrictions',
        key: 'dietaryRestrictions',
        required: true,
        options: [
          { value: 'none', label: 'No restrictions' },
          { value: 'vegetarian', label: 'Vegetarian' },
          { value: 'vegan', label: 'Vegan' },
          { value: 'gluten-free', label: 'Gluten-free' },
          { value: 'dairy-free', label: 'Dairy-free' }
        ]
      },
      {
        type: 'select',
        label: 'Food Storage Method',
        key: 'storageMethod',
        required: true,
        options: [
          { value: 'canned', label: 'Canned Foods' },
          { value: 'dried', label: 'Dried Foods' },
          { value: 'frozen', label: 'Frozen Foods' },
          { value: 'mixed', label: 'Mixed Methods' }
        ]
      },
      {
        type: 'select',
        label: 'Storage Temperature Control',
        key: 'temperatureControl',
        required: true,
        options: [
          { value: 'room-temp', label: 'Room Temperature' },
          { value: 'cool', label: 'Cool Storage' },
          { value: 'refrigerated', label: 'Refrigerated' },
          { value: 'mixed', label: 'Mixed Storage Conditions' }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Water Storage',
    fields: [
      {
        type: 'select',
        label: 'Water Storage Container Type',
        key: 'waterContainerType',
        required: true,
        options: [
          { value: 'plastic-containers', label: 'Plastic Containers' },
          { value: 'water-barrels', label: 'Water Barrels' },
          { value: 'water-bottles', label: 'Water Bottles' },
          { value: 'mixed', label: 'Mixed Containers' }
        ]
      },
      {
        type: 'select',
        label: 'Water Treatment Method',
        key: 'waterTreatment',
        required: true,
        options: [
          { value: 'none', label: 'No Treatment (Sealed Containers)' },
          { value: 'filters', label: 'Water Filters' },
          { value: 'chemical', label: 'Chemical Treatment' },
          { value: 'mixed', label: 'Mixed Methods' }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Additional Supplies',
    fields: [
      {
        type: 'select',
        label: 'Medical Supplies Level',
        key: 'medicalSupplies',
        required: true,
        options: [
          { value: 'basic', label: 'Basic First Aid' },
          { value: 'intermediate', label: 'Intermediate Medical Supplies' },
          { value: 'advanced', label: 'Advanced Medical Kit' }
        ]
      },
      {
        type: 'select',
        label: 'Power Backup',
        key: 'powerBackup',
        required: true,
        options: [
          { value: 'none', label: 'No Power Backup' },
          { value: 'batteries', label: 'Batteries Only' },
          { value: 'generator', label: 'Generator' },
          { value: 'solar', label: 'Solar Power' }
        ]
      },
      {
        type: 'select',
        label: 'Hygiene Supplies',
        key: 'hygieneSupplies',
        required: true,
        options: [
          { value: 'basic', label: 'Basic Supplies' },
          { value: 'intermediate', label: 'Intermediate Supplies' },
          { value: 'advanced', label: 'Advanced Supplies' }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Storage Organization',
    fields: [
      {
        type: 'select',
        label: 'Storage Organization System',
        key: 'organizationSystem',
        required: true,
        options: [
          { value: 'shelves', label: 'Shelving Units' },
          { value: 'containers', label: 'Storage Containers' },
          { value: 'cabinets', label: 'Storage Cabinets' },
          { value: 'mixed', label: 'Mixed Storage Solutions' }
        ]
      },
      {
        type: 'select',
        label: 'Inventory Management',
        key: 'inventoryManagement',
        required: true,
        options: [
          { value: 'simple-list', label: 'Simple List' },
          { value: 'spreadsheet', label: 'Spreadsheet' },
          { value: 'app', label: 'Mobile App' },
          { value: 'none', label: 'No System' }
        ]
      },
      {
        type: 'select',
        label: 'Rotation Schedule',
        key: 'rotationSchedule',
        required: true,
        options: [
          { value: 'monthly', label: 'Monthly' },
          { value: 'quarterly', label: 'Quarterly' },
          { value: 'biannual', label: 'Bi-annual' },
          { value: 'annual', label: 'Annual' }
        ]
      }
    ]
  }
];


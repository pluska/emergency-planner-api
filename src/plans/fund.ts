import { PlanStep } from "../interface/Plans";

export const emergencyFundSteps: PlanStep[] = [
  {
    id: 1,
    title: 'Basic Financial Information',
    fields: [
      {
        type: 'select',
        label: 'Employment Status',
        key: 'employmentStatus',
        required: true,
        options: [
          { value: 'full-time', label: 'Full-time employed' },
          { value: 'part-time', label: 'Part-time employed' },
          { value: 'self-employed', label: 'Self-employed' },
          { value: 'unemployed', label: 'Currently unemployed' },
          { value: 'retired', label: 'Retired' }
        ]
      },
      {
        type: 'select',
        label: 'Income Stability',
        key: 'incomeStability',
        required: true,
        options: [
          { value: 'very-stable', label: 'Very stable' },
          { value: 'stable', label: 'Stable' },
          { value: 'variable', label: 'Variable' },
          { value: 'unstable', label: 'Unstable' }
        ]
      },
      {
        type: 'input',
        label: 'Number of Dependents',
        key: 'dependentsCount',
        required: true,
        placeholder: 'e.g., 2'
      }
    ]
  },
  {
    id: 2,
    title: 'Monthly Expenses (in $)',
    fields: [
      {
        type: 'input',
        label: 'Housing (Rent/Mortgage)',
        key: 'housingExpense',
        required: true,
        placeholder: 'Monthly amount in $'
      },
      {
        type: 'input',
        label: 'Utilities (Electric, Water, Gas)',
        key: 'utilitiesExpense',
        required: true,
        placeholder: 'Monthly amount in $'
      },
      {
        type: 'input',
        label: 'Food and Groceries',
        key: 'foodExpense',
        required: true,
        placeholder: 'Monthly amount in $'
      },
      {
        type: 'input',
        label: 'Transportation',
        key: 'transportationExpense',
        required: true,
        placeholder: 'Monthly amount in $'
      }
    ]
  },
  {
    id: 3,
    title: 'Fund Goals and Timeline',
    fields: [
      {
        type: 'select',
        label: 'Target Fund Size',
        key: 'targetFundSize',
        required: true,
        options: [
          { value: '3-months', label: '3 months of expenses' },
          { value: '6-months', label: '6 months of expenses' },
          { value: '9-months', label: '9 months of expenses' },
          { value: '12-months', label: '12 months of expenses' }
        ]
      },
      {
        type: 'select',
        label: 'Saving Timeline',
        key: 'savingTimeline',
        required: true,
        options: [
          { value: '6-months', label: '6 months' },
          { value: '1-year', label: '1 year' },
          { value: '2-years', label: '2 years' },
          { value: 'flexible', label: 'Flexible timeline' }
        ]
      },
      {
        type: 'input',
        label: 'Monthly Saving Capacity',
        key: 'monthlySaving',
        required: true,
        placeholder: 'Amount you can save monthly in $'
      }
    ]
  },
  {
    id: 4,
    title: 'Fund Storage and Access',
    fields: [
      {
        type: 'select',
        label: 'Primary Storage Method',
        key: 'storageMethod',
        required: true,
        options: [
          { value: 'savings', label: 'Savings Account' },
          { value: 'money-market', label: 'Money Market Account' },
          { value: 'high-yield', label: 'High-yield Savings Account' },
          { value: 'mixed', label: 'Mixed Accounts' }
        ]
      },
      {
        type: 'select',
        label: 'Access Requirements',
        key: 'accessRequirements',
        required: true,
        options: [
          { value: 'immediate', label: 'Immediate access needed' },
          { value: '1-3-days', label: '1-3 days acceptable' },
          { value: 'mixed', label: 'Mixed access times' }
        ]
      },
      {
        type: 'select',
        label: 'Risk Tolerance',
        key: 'riskTolerance',
        required: true,
        options: [
          { value: 'very-low', label: 'Very low (Savings only)' },
          { value: 'low', label: 'Low (Mostly savings)' },
          { value: 'moderate', label: 'Moderate (Some investments)' }
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
        label: 'Insurance Coverage',
        key: 'insuranceCoverage',
        required: true,
        options: [
          { value: 'comprehensive', label: 'Comprehensive coverage' },
          { value: 'basic', label: 'Basic coverage' },
          { value: 'minimal', label: 'Minimal coverage' },
          { value: 'none', label: 'No insurance' }
        ]
      },
      {
        type: 'select',
        label: 'Debt Obligations',
        key: 'debtObligations',
        required: true,
        options: [
          { value: 'none', label: 'No debt' },
          { value: 'low', label: 'Low debt' },
          { value: 'moderate', label: 'Moderate debt' },
          { value: 'high', label: 'High debt' }
        ]
      },
      {
        type: 'select',
        label: 'Additional Income Sources',
        key: 'additionalIncome',
        required: true,
        options: [
          { value: 'none', label: 'No additional income' },
          { value: 'part-time', label: 'Part-time work available' },
          { value: 'investments', label: 'Investment income' },
          { value: 'multiple', label: 'Multiple sources' }
        ]
      }
    ]
  }
];

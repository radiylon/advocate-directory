export const DEGREES = ["MD", "PhD", "MSW", "LCSW", "PsyD"];

export const EXPERIENCE_RANGES = [
  { value: "1-5", label: "1-5 years" },
  { value: "6-10", label: "6-10 years" },
  { value: "11-15", label: "11-15 years" },
  { value: "16+", label: "16+ years" },
];

export const SPECIALTIES = [
  // Navigation & Care Coordination
  { value: "Patient Navigation", label: "Patient Navigation" },
  { value: "Care Coordination", label: "Care Coordination" },
  { value: "Hospital Discharge Planning", label: "Hospital Discharge Planning" },
  { value: "Treatment Decision Support", label: "Treatment Decision Support" },
  { value: "Second Opinion Assistance", label: "Second Opinion Assistance" },
  { value: "Crisis Intervention", label: "Crisis Intervention" },

  // Insurance & Financial
  { value: "Insurance Navigation", label: "Insurance Navigation" },
  { value: "Medical Billing & Claims", label: "Medical Billing & Claims" },
  { value: "Insurance Appeals & Denials", label: "Insurance Appeals & Denials" },
  { value: "Disability Benefits", label: "Disability Benefits" },
  { value: "Financial Assistance Programs", label: "Financial Assistance Programs" },

  // Major Medical Conditions
  { value: "Cancer", label: "Cancer" },
  { value: "Heart Disease & Cardiovascular", label: "Heart Disease & Cardiovascular" },
  { value: "Diabetes", label: "Diabetes" },
  { value: "Kidney Disease", label: "Kidney Disease" },
  { value: "Respiratory & COPD", label: "Respiratory & COPD" },
  { value: "Neurological Conditions", label: "Neurological Conditions" },
  { value: "Autoimmune Disorders", label: "Autoimmune Disorders" },
  { value: "Chronic Pain Management", label: "Chronic Pain Management" },
  { value: "HIV/AIDS", label: "HIV/AIDS" },
  { value: "Rare & Orphan Diseases", label: "Rare & Orphan Diseases" },
  { value: "Chronic Illness", label: "Chronic Illness" },

  // Mental & Behavioral Health
  { value: "Mental Health", label: "Mental Health" },
  { value: "Trauma & PTSD", label: "Trauma & PTSD" },
  { value: "Bipolar Disorder", label: "Bipolar Disorder" },
  { value: "ADHD", label: "ADHD" },
  { value: "Substance Use & Addiction", label: "Substance Use & Addiction" },
  { value: "Eating Disorders", label: "Eating Disorders" },
  { value: "OCD", label: "OCD" },
  { value: "Serious Mental Illness", label: "Serious Mental Illness" },

  // Populations & Demographics
  { value: "Elder Care & Aging", label: "Elder Care & Aging" },
  { value: "Alzheimer's & Dementia", label: "Alzheimer's & Dementia" },
  { value: "Pediatric Care", label: "Pediatric Care" },
  { value: "Autism & Developmental Disabilities", label: "Autism & Developmental Disabilities" },
  { value: "LGBTQ+ Healthcare", label: "LGBTQ+ Healthcare" },
  { value: "Women's Health", label: "Women's Health" },
  { value: "Men's Health", label: "Men's Health" },
  { value: "Veterans Healthcare", label: "Veterans Healthcare" },
  { value: "Caregiver Support", label: "Caregiver Support" },

  // Reproductive & Maternal
  { value: "Fertility & Reproductive Health", label: "Fertility & Reproductive Health" },
  { value: "Pregnancy & Maternal Care", label: "Pregnancy & Maternal Care" },
  { value: "Postpartum Support", label: "Postpartum Support" },

  // End-of-Life Care
  { value: "Palliative Care", label: "Palliative Care" },
  { value: "Hospice Navigation", label: "Hospice Navigation" },
  { value: "Advance Care Planning", label: "Advance Care Planning" },

  // Wellness & Lifestyle
  { value: "Wellness Coaching", label: "Wellness Coaching" },
  { value: "Nutrition & Diet", label: "Nutrition & Diet" },
  { value: "Weight Management", label: "Weight Management" },
  { value: "Sleep Health", label: "Sleep Health" },
];

const STATE_CODES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
] as const;

export const US_STATES = STATE_CODES.map((s) => ({ value: s, label: s }));

export const DEGREES = ["MD", "PhD", "MSW", "LCSW", "PsyD"];

export const SPECIALTIES = [
  { value: "Bipolar", label: "Bipolar" },
  { value: "LGBTQ", label: "LGBTQ" },
  { value: "Medication/Prescribing", label: "Medication/Prescribing" },
  { value: "Suicide History/Attempts", label: "Suicide History/Attempts" },
  { value: "General Mental Health (anxiety, depression, stress, grief, life transitions)", label: "General Mental Health" },
  { value: "Men's issues", label: "Men's issues" },
  { value: "Relationship Issues (family, friends, couple, etc)", label: "Relationship Issues" },
  { value: "Trauma & PTSD", label: "Trauma & PTSD" },
  { value: "Personality disorders", label: "Personality disorders" },
  { value: "Personal growth", label: "Personal growth" },
  { value: "Substance use/abuse", label: "Substance use/abuse" },
  { value: "Pediatrics", label: "Pediatrics" },
  { value: "Women's issues (post-partum, infertility, family planning)", label: "Women's issues" },
  { value: "Chronic pain", label: "Chronic pain" },
  { value: "Weight loss & nutrition", label: "Weight loss & nutrition" },
  { value: "Eating disorders", label: "Eating disorders" },
  { value: "Diabetic Diet and nutrition", label: "Diabetic Diet and nutrition" },
  { value: "Coaching (leadership, career, academic and wellness)", label: "Coaching" },
  { value: "Life coaching", label: "Life coaching" },
  { value: "Obsessive-compulsive disorders", label: "OCD" },
  { value: "Neuropsychological evaluations & testing (ADHD testing)", label: "Neuropsych Testing" },
  { value: "Attention and Hyperactivity (ADHD)", label: "ADHD" },
  { value: "Sleep issues", label: "Sleep issues" },
  { value: "Schizophrenia and psychotic disorders", label: "Schizophrenia" },
  { value: "Learning disorders", label: "Learning disorders" },
  { value: "Domestic abuse", label: "Domestic abuse" },
];

const STATE_CODES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
] as const;

export const US_STATES = STATE_CODES.map((s) => ({ value: s, label: s }));

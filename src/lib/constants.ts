export const DEGREES = [
  "MD", "DO", "PhD", "PsyD", "PharmD", "DNP", "NP", "RN", "PA",
  "MSW", "LCSW", "LMFT", "LPC", "LMHC", "MPH", "MHA", "JD", "BCPA",
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

export const US_CITIES_WITH_STATES: { city: string; state: string }[] = [
  // Alabama
  { city: "Birmingham", state: "AL" }, { city: "Montgomery", state: "AL" }, { city: "Huntsville", state: "AL" }, { city: "Mobile", state: "AL" },
  // Alaska
  { city: "Anchorage", state: "AK" }, { city: "Fairbanks", state: "AK" }, { city: "Juneau", state: "AK" },
  // Arizona
  { city: "Phoenix", state: "AZ" }, { city: "Tucson", state: "AZ" }, { city: "Mesa", state: "AZ" }, { city: "Scottsdale", state: "AZ" }, { city: "Tempe", state: "AZ" },
  // Arkansas
  { city: "Little Rock", state: "AR" }, { city: "Fort Smith", state: "AR" }, { city: "Fayetteville", state: "AR" },
  // California
  { city: "Los Angeles", state: "CA" }, { city: "San Francisco", state: "CA" }, { city: "San Diego", state: "CA" }, { city: "San Jose", state: "CA" },
  { city: "Sacramento", state: "CA" }, { city: "Oakland", state: "CA" }, { city: "Fresno", state: "CA" }, { city: "Long Beach", state: "CA" },
  { city: "Bakersfield", state: "CA" }, { city: "Anaheim", state: "CA" }, { city: "Santa Ana", state: "CA" }, { city: "Riverside", state: "CA" },
  // Colorado
  { city: "Denver", state: "CO" }, { city: "Colorado Springs", state: "CO" }, { city: "Aurora", state: "CO" }, { city: "Boulder", state: "CO" },
  // Connecticut
  { city: "Hartford", state: "CT" }, { city: "New Haven", state: "CT" }, { city: "Stamford", state: "CT" }, { city: "Bridgeport", state: "CT" },
  // Delaware
  { city: "Wilmington", state: "DE" }, { city: "Dover", state: "DE" }, { city: "Newark", state: "DE" },
  // Florida
  { city: "Miami", state: "FL" }, { city: "Orlando", state: "FL" }, { city: "Tampa", state: "FL" }, { city: "Jacksonville", state: "FL" },
  { city: "Fort Lauderdale", state: "FL" }, { city: "St. Petersburg", state: "FL" }, { city: "Tallahassee", state: "FL" }, { city: "Gainesville", state: "FL" },
  // Georgia
  { city: "Atlanta", state: "GA" }, { city: "Savannah", state: "GA" }, { city: "Augusta", state: "GA" }, { city: "Athens", state: "GA" },
  // Hawaii
  { city: "Honolulu", state: "HI" }, { city: "Hilo", state: "HI" }, { city: "Kailua", state: "HI" },
  // Idaho
  { city: "Boise", state: "ID" }, { city: "Meridian", state: "ID" }, { city: "Idaho Falls", state: "ID" },
  // Illinois
  { city: "Chicago", state: "IL" }, { city: "Aurora", state: "IL" }, { city: "Naperville", state: "IL" }, { city: "Springfield", state: "IL" }, { city: "Peoria", state: "IL" },
  // Indiana
  { city: "Indianapolis", state: "IN" }, { city: "Fort Wayne", state: "IN" }, { city: "Evansville", state: "IN" }, { city: "South Bend", state: "IN" },
  // Iowa
  { city: "Des Moines", state: "IA" }, { city: "Cedar Rapids", state: "IA" }, { city: "Davenport", state: "IA" }, { city: "Iowa City", state: "IA" },
  // Kansas
  { city: "Wichita", state: "KS" }, { city: "Overland Park", state: "KS" }, { city: "Kansas City", state: "KS" }, { city: "Topeka", state: "KS" },
  // Kentucky
  { city: "Louisville", state: "KY" }, { city: "Lexington", state: "KY" }, { city: "Bowling Green", state: "KY" },
  // Louisiana
  { city: "New Orleans", state: "LA" }, { city: "Baton Rouge", state: "LA" }, { city: "Shreveport", state: "LA" }, { city: "Lafayette", state: "LA" },
  // Maine
  { city: "Portland", state: "ME" }, { city: "Bangor", state: "ME" }, { city: "Augusta", state: "ME" },
  // Maryland
  { city: "Baltimore", state: "MD" }, { city: "Annapolis", state: "MD" }, { city: "Rockville", state: "MD" }, { city: "Frederick", state: "MD" },
  // Massachusetts
  { city: "Boston", state: "MA" }, { city: "Cambridge", state: "MA" }, { city: "Worcester", state: "MA" }, { city: "Springfield", state: "MA" },
  // Michigan
  { city: "Detroit", state: "MI" }, { city: "Grand Rapids", state: "MI" }, { city: "Ann Arbor", state: "MI" }, { city: "Lansing", state: "MI" },
  // Minnesota
  { city: "Minneapolis", state: "MN" }, { city: "St. Paul", state: "MN" }, { city: "Rochester", state: "MN" }, { city: "Duluth", state: "MN" },
  // Mississippi
  { city: "Jackson", state: "MS" }, { city: "Gulfport", state: "MS" }, { city: "Biloxi", state: "MS" },
  // Missouri
  { city: "Kansas City", state: "MO" }, { city: "St. Louis", state: "MO" }, { city: "Springfield", state: "MO" }, { city: "Columbia", state: "MO" },
  // Montana
  { city: "Billings", state: "MT" }, { city: "Missoula", state: "MT" }, { city: "Great Falls", state: "MT" }, { city: "Helena", state: "MT" },
  // Nebraska
  { city: "Omaha", state: "NE" }, { city: "Lincoln", state: "NE" }, { city: "Bellevue", state: "NE" },
  // Nevada
  { city: "Las Vegas", state: "NV" }, { city: "Reno", state: "NV" }, { city: "Henderson", state: "NV" }, { city: "Carson City", state: "NV" },
  // New Hampshire
  { city: "Manchester", state: "NH" }, { city: "Nashua", state: "NH" }, { city: "Concord", state: "NH" },
  // New Jersey
  { city: "Newark", state: "NJ" }, { city: "Jersey City", state: "NJ" }, { city: "Trenton", state: "NJ" }, { city: "Princeton", state: "NJ" },
  // New Mexico
  { city: "Albuquerque", state: "NM" }, { city: "Santa Fe", state: "NM" }, { city: "Las Cruces", state: "NM" },
  // New York
  { city: "New York", state: "NY" }, { city: "Buffalo", state: "NY" }, { city: "Rochester", state: "NY" }, { city: "Albany", state: "NY" }, { city: "Syracuse", state: "NY" },
  // North Carolina
  { city: "Charlotte", state: "NC" }, { city: "Raleigh", state: "NC" }, { city: "Durham", state: "NC" }, { city: "Greensboro", state: "NC" }, { city: "Asheville", state: "NC" },
  // North Dakota
  { city: "Fargo", state: "ND" }, { city: "Bismarck", state: "ND" }, { city: "Grand Forks", state: "ND" },
  // Ohio
  { city: "Columbus", state: "OH" }, { city: "Cleveland", state: "OH" }, { city: "Cincinnati", state: "OH" }, { city: "Toledo", state: "OH" }, { city: "Akron", state: "OH" },
  // Oklahoma
  { city: "Oklahoma City", state: "OK" }, { city: "Tulsa", state: "OK" }, { city: "Norman", state: "OK" },
  // Oregon
  { city: "Portland", state: "OR" }, { city: "Salem", state: "OR" }, { city: "Eugene", state: "OR" }, { city: "Bend", state: "OR" },
  // Pennsylvania
  { city: "Philadelphia", state: "PA" }, { city: "Pittsburgh", state: "PA" }, { city: "Harrisburg", state: "PA" }, { city: "Allentown", state: "PA" },
  // Rhode Island
  { city: "Providence", state: "RI" }, { city: "Warwick", state: "RI" }, { city: "Newport", state: "RI" },
  // South Carolina
  { city: "Charleston", state: "SC" }, { city: "Columbia", state: "SC" }, { city: "Greenville", state: "SC" }, { city: "Myrtle Beach", state: "SC" },
  // South Dakota
  { city: "Sioux Falls", state: "SD" }, { city: "Rapid City", state: "SD" }, { city: "Pierre", state: "SD" },
  // Tennessee
  { city: "Nashville", state: "TN" }, { city: "Memphis", state: "TN" }, { city: "Knoxville", state: "TN" }, { city: "Chattanooga", state: "TN" },
  // Texas
  { city: "Houston", state: "TX" }, { city: "Dallas", state: "TX" }, { city: "Austin", state: "TX" }, { city: "San Antonio", state: "TX" },
  { city: "Fort Worth", state: "TX" }, { city: "El Paso", state: "TX" }, { city: "Arlington", state: "TX" }, { city: "Plano", state: "TX" },
  // Utah
  { city: "Salt Lake City", state: "UT" }, { city: "Provo", state: "UT" }, { city: "Ogden", state: "UT" }, { city: "Park City", state: "UT" },
  // Vermont
  { city: "Burlington", state: "VT" }, { city: "Montpelier", state: "VT" }, { city: "Rutland", state: "VT" },
  // Virginia
  { city: "Virginia Beach", state: "VA" }, { city: "Richmond", state: "VA" }, { city: "Norfolk", state: "VA" }, { city: "Arlington", state: "VA" }, { city: "Alexandria", state: "VA" },
  // Washington
  { city: "Seattle", state: "WA" }, { city: "Spokane", state: "WA" }, { city: "Tacoma", state: "WA" }, { city: "Bellevue", state: "WA" }, { city: "Olympia", state: "WA" },
  // West Virginia
  { city: "Charleston", state: "WV" }, { city: "Huntington", state: "WV" }, { city: "Morgantown", state: "WV" },
  // Wisconsin
  { city: "Milwaukee", state: "WI" }, { city: "Madison", state: "WI" }, { city: "Green Bay", state: "WI" },
  // Wyoming
  { city: "Cheyenne", state: "WY" }, { city: "Casper", state: "WY" }, { city: "Jackson", state: "WY" },
];

import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { fakerEN_US as faker } from "@faker-js/faker";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Schema definition (inline to avoid path resolution issues)
const advocatesSchema = pgTable(
  "advocates",
  {
    id: serial("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    degree: text("degree").notNull(),
    specialties: jsonb("specialties").$type<string[]>().default([]).notNull(),
    yearsOfExperience: integer("years_of_experience").notNull(),
    phoneNumber: text("phone_number").notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    stateIdx: index("advocates_state_idx").on(table.state),
    lastNameIdx: index("advocates_last_name_idx").on(table.lastName),
  })
);

// Constants
const DEGREES = [
  "MD", "DO", "PhD", "PsyD", "PharmD", "DNP", "NP", "RN", "PA",
  "MSW", "LCSW", "LMFT", "LPC", "LMHC", "MPH", "MHA", "JD", "BCPA",
];

const SPECIALTIES = [
  "Patient Navigation", "Care Coordination", "Hospital Discharge Planning",
  "Treatment Decision Support", "Second Opinion Assistance", "Crisis Intervention",
  "Insurance Navigation", "Medical Billing & Claims", "Insurance Appeals & Denials",
  "Disability Benefits", "Financial Assistance Programs", "Cancer",
  "Heart Disease & Cardiovascular", "Diabetes", "Kidney Disease",
  "Respiratory & COPD", "Neurological Conditions", "Autoimmune Disorders",
  "Chronic Pain Management", "HIV/AIDS", "Rare & Orphan Diseases",
  "Chronic Illness", "Mental Health", "Trauma & PTSD", "Bipolar Disorder",
  "ADHD", "Substance Use & Addiction", "Eating Disorders", "OCD",
  "Serious Mental Illness", "Elder Care & Aging", "Alzheimer's & Dementia",
  "Pediatric Care", "Autism & Developmental Disabilities", "LGBTQ+ Healthcare",
  "Women's Health", "Men's Health", "Veterans Healthcare", "Caregiver Support",
  "Fertility & Reproductive Health", "Pregnancy & Maternal Care",
  "Postpartum Support", "Palliative Care", "Hospice Navigation",
  "Advance Care Planning", "Wellness Coaching", "Nutrition & Diet",
  "Weight Management", "Sleep Health",
];

const US_CITIES_WITH_STATES = [
  { city: "Birmingham", state: "AL" }, { city: "Montgomery", state: "AL" },
  { city: "Phoenix", state: "AZ" }, { city: "Tucson", state: "AZ" },
  { city: "Los Angeles", state: "CA" }, { city: "San Francisco", state: "CA" },
  { city: "San Diego", state: "CA" }, { city: "Denver", state: "CO" },
  { city: "Miami", state: "FL" }, { city: "Orlando", state: "FL" },
  { city: "Tampa", state: "FL" }, { city: "Atlanta", state: "GA" },
  { city: "Chicago", state: "IL" }, { city: "Indianapolis", state: "IN" },
  { city: "Boston", state: "MA" }, { city: "Detroit", state: "MI" },
  { city: "Minneapolis", state: "MN" }, { city: "Kansas City", state: "MO" },
  { city: "St. Louis", state: "MO" }, { city: "Las Vegas", state: "NV" },
  { city: "New York", state: "NY" }, { city: "Charlotte", state: "NC" },
  { city: "Columbus", state: "OH" }, { city: "Cleveland", state: "OH" },
  { city: "Portland", state: "OR" }, { city: "Philadelphia", state: "PA" },
  { city: "Pittsburgh", state: "PA" }, { city: "Nashville", state: "TN" },
  { city: "Houston", state: "TX" }, { city: "Dallas", state: "TX" },
  { city: "Austin", state: "TX" }, { city: "San Antonio", state: "TX" },
  { city: "Seattle", state: "WA" }, { city: "Milwaukee", state: "WI" },
];

function createRandomAdvocate() {
  const location = faker.helpers.arrayElement(US_CITIES_WITH_STATES);
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    city: location.city,
    state: location.state,
    degree: faker.helpers.arrayElement(DEGREES),
    specialties: faker.helpers.arrayElements(SPECIALTIES, { min: 1, max: 15 }),
    yearsOfExperience: faker.number.int({ min: 1, max: 30 }),
    phoneNumber: faker.phone.number({ style: "national" }),
  };
}

function createAdvocatesData(count: number) {
  return Array.from({ length: count }, createRandomAdvocate);
}

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  const count = parseInt(process.argv[2] || "51782");
  console.log(`Database URL: ${databaseUrl.substring(0, 30)}...`);
  console.log(`Target count: ${count}`);

  const client = postgres(databaseUrl);
  const db = drizzle(client);

  try {
    // Truncate existing data
    console.log("Truncating existing advocates...");
    await db.delete(advocatesSchema);
    console.log("Truncation complete.");

    // Batch inserts
    const batchSize = 1000;
    let totalInserted = 0;

    console.log(`Seeding ${count} advocates in batches of ${batchSize}...`);

    for (let i = 0; i < count; i += batchSize) {
      const currentBatchSize = Math.min(batchSize, count - i);
      const batch = createAdvocatesData(currentBatchSize);
      await db.insert(advocatesSchema).values(batch);
      totalInserted += batch.length;
      
      // Progress update every 10 batches
      if ((i / batchSize) % 10 === 0) {
        console.log(`Progress: ${totalInserted}/${count} (${Math.round(totalInserted / count * 100)}%)`);
      }
    }

    console.log(`\nSeeding complete! Inserted ${totalInserted} advocates.`);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();

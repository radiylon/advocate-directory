import { fakerEN_US as faker } from '@faker-js/faker';
import { Advocate } from '../schema';

const specialties = [
  "Bipolar",
  "LGBTQ",
  "Medication/Prescribing",
  "Suicide History/Attempts",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "Men's issues",
  "Relationship Issues (family, friends, couple, etc)",
  "Trauma & PTSD",
  "Personality disorders",
  "Personal growth",
  "Substance use/abuse",
  "Pediatrics",
  "Women's issues (post-partum, infertility, family planning)",
  "Chronic pain",
  "Weight loss & nutrition",
  "Eating disorders",
  "Diabetic Diet and nutrition",
  "Coaching (leadership, career, academic and wellness)",
  "Life coaching",
  "Obsessive-compulsive disorders",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Attention and Hyperactivity (ADHD)",
  "Sleep issues",
  "Schizophrenia and psychotic disorders",
  "Learning disorders",
  "Domestic abuse",
];

const degrees = ["MD", "PhD", "MSW", "LCSW", "PsyD"];

type RandomAdvocate = Omit<Advocate, 'id' | 'createdAt'>;

function createRandomAdvocate(): RandomAdvocate {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    degree: faker.helpers.arrayElement(degrees),
    specialties: faker.helpers.arrayElements(specialties, { min: 1, max: 15 }),
    yearsOfExperience: faker.number.int({ min: 1, max: 30 }),
    phoneNumber: faker.phone.number({ style: 'national' }),
  };
}

function createAdvocatesData(count: number = 100_000): RandomAdvocate[] {
  return Array.from({ length: count }, createRandomAdvocate);
}

export { createAdvocatesData };

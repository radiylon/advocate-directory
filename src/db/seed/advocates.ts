import { fakerEN_US as faker } from '@faker-js/faker';
import { Advocate } from '../schema';
import { SPECIALTIES, DEGREES, US_CITIES_WITH_STATES } from '@/lib/constants';

type RandomAdvocate = Omit<Advocate, 'id' | 'createdAt'>;

const specialties = SPECIALTIES.map((s) => s.value);

function createRandomAdvocate(): RandomAdvocate {
  const location = faker.helpers.arrayElement(US_CITIES_WITH_STATES);
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    city: location.city,
    state: location.state,
    degree: faker.helpers.arrayElement(DEGREES),
    specialties: faker.helpers.arrayElements(specialties, { min: 1, max: 15 }),
    yearsOfExperience: faker.number.int({ min: 1, max: 30 }),
    phoneNumber: faker.phone.number({ style: 'national' }),
  };
}

function createAdvocatesData(count: number = 1000): RandomAdvocate[] {
  return Array.from({ length: count }, createRandomAdvocate);
}

export { createAdvocatesData };

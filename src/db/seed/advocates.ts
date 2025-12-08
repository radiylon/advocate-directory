import { fakerEN_US as faker } from '@faker-js/faker';
import { Advocate } from '../schema';
import { SPECIALTIES, DEGREES } from '@/lib/constants';


type RandomAdvocate = Omit<Advocate, 'id' | 'createdAt'>;

const specialties = SPECIALTIES.map((s) => s.value);

function createRandomAdvocate(): RandomAdvocate {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    degree: faker.helpers.arrayElement(DEGREES),
    specialties: faker.helpers.arrayElements(specialties, { min: 1, max: 15 }),
    yearsOfExperience: faker.number.int({ min: 1, max: 30 }),
    phoneNumber: faker.phone.number({ style: 'national' }),
  };
}

function createAdvocatesData(count: number = 100_000): RandomAdvocate[] {
  return Array.from({ length: count }, createRandomAdvocate);
}

export { createAdvocatesData };

# TODO

## UI
- [ ] Add missing error UI
- [ ] Add an Advocate profile photo
- [ ] Add tooltip/modal to view all specialties ("+X more")
- [ ] Add improved filtering UX for specialty instead of text search
- [x] Pre-fetch queries on-hover for speed
- [ ] Consider if SSR is appropriate
- [x] More accent colors aka less green
- [ ] UX that allows users to click on advocate, leads to detail/booking page
- [ ] Add keyboard navigation to custom Select (arrow keys, Enter, Escape)
- [ ] Add keyboard navigation to AdvocateList
- [x] Add basic loading UI
- [x] Hide pagination during loading

## API
- [ ] Input validation on search/state params (max length, sanitization)
- [ ] API rate limiting
- [ ] Consider cursor-based pagination
- [ ] Improve error handling, validation, types

## DB
- [x] Missing indexes in schema (stateIdx, nameIdx added)
- [x] Swap `payload` field to `specialties` field
- [x] Need more advocate data to display on the screen (limit increased to 100)
- [x] Improve seed script to include more data so we can test production loads (ex. 100k+ records)
- [ ] Update schema to support more types of mock data (bio, education, accepting new clients (filter checkbox), photoUrl, availability, languages, reviews collection, specialties collection)

## General
- [ ] Tests

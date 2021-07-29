import { isDurationAllowed, isInBetweenTimeFrame } from './timeHelper';

test('isInBetweenTimeFrame() Test', async () => {
  //@ts-ignore
  expect(isInBetweenTimeFrame(1627394576000, 1627395056000, [7, 22])).toBe(
    false
  );
  //@ts-ignore
  expect(isInBetweenTimeFrame(1627344887000, 1627348487002, [7, 22])).toBe(
    true
  );
});

test('isDurationAllowed() Test', async () => {
  //@ts-ignore
  expect(isDurationAllowed(1483225320000, 1483236120000, 2)).toBe(false);
  //@ts-ignore
  expect(isDurationAllowed(1483225320000, 1483232520000, 2)).toBe(true);
});

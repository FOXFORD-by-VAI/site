
export function ageSpell(input: string | number): string {
  const age = typeof input === "number" ? input : parseInt(input);
  if (isNaN(age)) {
    return "Некорректный возраст";
  }
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;
  let suffix = "лет";
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    suffix = "год";
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    suffix = "года";
  }
  return `${age} ${suffix}`;
}
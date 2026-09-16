// "8 months" / "1 year" / "2+ years", counted from the earliest role's start date
export function experienceLabel(startDates: string[], now = new Date()) {
  const earliest = startDates
    .map((date) => new Date(date))
    .reduce((a, b) => (a < b ? a : b));
  const months = Math.max(
    1,
    (now.getFullYear() - earliest.getFullYear()) * 12 +
      now.getMonth() -
      earliest.getMonth(),
  );
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  const plus = months % 12 === 0 ? "" : "+";
  return `${years}${plus} year${years === 1 ? "" : "s"}`;
}

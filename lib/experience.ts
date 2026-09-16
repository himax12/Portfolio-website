type Role = { startDate: string; endDate?: string };

// Whole calendar months a role covers; finished roles count their final month
// (Jan–Apr = 4), ongoing roles count up to the current month
function roleMonths({ startDate, endDate }: Role, now: Date) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : now;
  const span =
    (end.getFullYear() - start.getFullYear()) * 12 +
    end.getMonth() -
    start.getMonth();
  return Math.max(1, endDate ? span + 1 : span);
}

// "4 months" / "1 year" / "2+ years", summed across all roles
export function experienceLabel(roles: Role[], now = new Date()) {
  const months = roles.reduce((total, role) => total + roleMonths(role, now), 0);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  const plus = months % 12 === 0 ? "" : "+";
  return `${years}${plus} year${years === 1 ? "" : "s"}`;
}

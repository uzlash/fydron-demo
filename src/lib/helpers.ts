function meetsPasswordRequirements(p: string) {
  if (p.length < 12) return false;
  if (!/[a-z]/.test(p) || !/[A-Z]/.test(p)) return false;
  if (!/\d/.test(p)) return false;
  if (!/[!@#$%^&*]/.test(p)) return false;
  return true;
}

export { meetsPasswordRequirements };
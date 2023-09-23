export const createQuery = function (...strings) {
  return strings.map((s) => s.trim().replaceAll(" ", "+")).join("+");
};

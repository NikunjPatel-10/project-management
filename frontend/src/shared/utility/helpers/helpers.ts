export const getColorByStatus = (status: string) => {
  switch (status) {
    case "active":
      return "blue";
    case "new":
      return "violet";
    case "completed":
      return "green";
    default:
      return "blue";
  }
};

export const getFilteredList = <T, K extends keyof T>(
  list: T[],
  key: K,
  value: T[K]
): T[] => {
  return list?.filter((item) => item[key] === value);
};

export const getStatesDetails = <T extends { status: string }>(list: T[]) => {
  const total = list?.length;
  const completedStatus = getFilteredList(list, "status", "completed")?.length;
  const activeStatus = getFilteredList(list, "status", "active")?.length;
  const newStatus = getFilteredList(list, "status", "new")?.length;

  return { total, completedStatus, activeStatus, newStatus };
};

export const getPercentage = (totalValue: number, value: number) => {
  return Math.round((value / totalValue) * 100);
};

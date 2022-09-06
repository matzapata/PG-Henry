const formatDate = (date: string | null): string => {
  return date === null ? "-" : new Date(date).toLocaleDateString();
};

export default formatDate;

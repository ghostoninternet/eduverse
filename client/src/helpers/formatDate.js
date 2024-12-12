const formatDate = (date) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
  return formattedDate;
};

export default formatDate
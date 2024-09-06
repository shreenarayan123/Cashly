export const formateDate = (timestamp) => {
  const date = new Date(timestamp);

  //Formate Time
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? " PM" : " AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const timeString = `${formattedHours}:${formattedMinutes}${ampm}`;

  //Format Date
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  //add ordinal suffixś
  const ordinalsuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const formattedDate = ` ${day}${ordinalsuffix(
    day
  )}, ${month} ${year} ${timeString}`;
  return formattedDate;
};

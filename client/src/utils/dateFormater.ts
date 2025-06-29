export function getFormattedDateString(): string {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formatted = date.toLocaleString("en-GB", options);
  return formatted.replace(",", " at").replace(":", ".").replace(" am", " AM").replace(" pm", " PM");
}

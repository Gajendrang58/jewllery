export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  
  // Get day, month, year
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  // Get hours, minutes, and am/pm
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours || 12; // Convert 0 to 12
  
  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
};

// Optional: Add timezone handling if needed
export const formatTimestampWithTimezone = (timestamp: string, timeZone?: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: timeZone || 'UTC'
  };
  
  return new Date(timestamp).toLocaleString('en-GB', options);
};
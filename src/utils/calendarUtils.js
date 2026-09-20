// Utilities for generating Google Calendar URLs and downloadable .ics files

/**
 * Creates a Google Calendar URL that opens in a new tab pre-filled with meeting details
 */
export function createGoogleCalendarUrl({
  title,
  description = "",
  location = "",
  date, // "YYYY-MM-DD"
  timeRange, // e.g. "02:00 PM - 02:40 PM" or "10:00 AM - 10:20 AM"
}) {
  if (!date || !timeRange) return "#";

  try {
    // Parse time range e.g. "02:00 PM - 02:40 PM"
    const [startStr, endStr] = timeRange.split("-").map(s => s.trim());

    const parseToIsoTime = (dateStr, timeStr) => {
      const [rawTime, modifier] = timeStr.split(" ");
      let [hours, minutes] = rawTime.split(":").map(Number);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const pad = (n) => String(n).padStart(2, "0");
      const cleanDate = dateStr.replace(/-/g, "");
      return `${cleanDate}T${pad(hours)}${pad(minutes)}00`;
    };

    const startIso = parseToIsoTime(date, startStr);
    const endIso = parseToIsoTime(date, endStr);

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      details: description,
      location: location,
      dates: `${startIso}/${endIso}`
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  } catch (err) {
    console.error("Error creating Google Calendar link:", err);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
  }
}

/**
 * Downloads a standard .ics calendar file for Outlook, Apple Calendar, or Google Calendar
 */
export function downloadIcsFile({
  title,
  description = "",
  location = "",
  date,
  timeRange,
  filename = "meeting.ics"
}) {
  try {
    const [startStr, endStr] = timeRange.split("-").map(s => s.trim());

    const parseToIso = (dateStr, timeStr) => {
      const [rawTime, modifier] = timeStr.split(" ");
      let [hours, minutes] = rawTime.split(":").map(Number);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const pad = (n) => String(n).padStart(2, "0");
      const cleanDate = dateStr.replace(/-/g, "");
      return `${cleanDate}T${pad(hours)}${pad(minutes)}00Z`;
    };

    const startIso = parseToIso(date, startStr);
    const endIso = parseToIso(date, endStr);

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//SST English Hub//Meeting Scheduler//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
      `LOCATION:${location}`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      `STATUS:CONFIRMED`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Failed to generate .ics file:", err);
  }
}

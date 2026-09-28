import confetti from 'canvas-confetti';

export function fireWeddingCelebration() {
  // Burst 1: Golden shimmer
  confetti({
    particleCount: 50,
    spread: 70,
    origin: { y: 0.65 },
    colors: ['#D4AF37', '#F5D77F', '#E6C687', '#FFFFFF', '#E8A598'],
    scalar: 1.1,
  });

  // Burst 2: Elegant soft petals
  setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 60,
      spread: 55,
      origin: { x: 0.2, y: 0.7 },
      colors: ['#F3E5DC', '#D4AF37', '#E5A495'],
      shapes: ['circle'],
      scalar: 1.3,
    });
    confetti({
      particleCount: 35,
      angle: 120,
      spread: 55,
      origin: { x: 0.8, y: 0.7 },
      colors: ['#F3E5DC', '#D4AF37', '#E5A495'],
      shapes: ['circle'],
      scalar: 1.3,
    });
  }, 250);
}

export function generateGoogleCalendarUrl(
  title: string,
  details: string,
  location: string,
  startDateStr: string,
  startTimeStr: string
): string {
  // Parse date and time
  const [year, month, day] = startDateStr.split('-').map(Number);
  const [hour, minute] = startTimeStr.split(':').map(Number);
  const start = new Date(year, month - 1, day, hour || 10, minute || 0);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000); // 4 hour duration

  const formatTime = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const startIso = formatTime(start);
  const endIso = formatTime(end);

  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', title);
  url.searchParams.set('dates', `${startIso}/${endIso}`);
  url.searchParams.set('details', details);
  url.searchParams.set('location', location);

  return url.toString();
}

export function downloadIcsFile(
  title: string,
  details: string,
  location: string,
  startDateStr: string,
  startTimeStr: string
) {
  const [year, month, day] = startDateStr.split('-').map(Number);
  const [hour, minute] = startTimeStr.split(':').map(Number);
  const start = new Date(year, month - 1, day, hour || 10, minute || 0);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);

  const formatIcsTime = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Azman Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${details.replace(/\n/g, '\\n')}`,
    `LOCATION:${location.replace(/\n/g, ', ')}`,
    `DTSTART:${formatIcsTime(start)}`,
    `DTEND:${formatIcsTime(end)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function calculateCountdown(targetDate: string, targetTime: string): CountdownTime {
  const [year, month, day] = targetDate.split('-').map(Number);
  const [hour, minute] = targetTime.split(':').map(Number);
  const target = new Date(year, month - 1, day, hour || 10, minute || 0).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
}

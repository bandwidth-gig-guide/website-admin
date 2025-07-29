export function formatOpeningHours(opening: string, closing: string): string {

    const timeRegex = /^\d{2}:\d{2}:\d{2}$/;

    if (!timeRegex.test(opening) || !timeRegex.test(closing)) {
        return 'unknown';
    }

    if (opening == closing) return 'closed'

    const formatTime = (time: string) => {
        const [hourStr, minuteStr] = time.split(':');
        let hour = parseInt(hourStr, 10);
        const minute = minuteStr;
        const ampm = hour >= 12 ? 'pm' : 'am';
        hour = hour % 12 === 0 ? 12 : hour % 12;
        return `${hour}:${minute}${ampm}`;
    };

    const openingFormatted = formatTime(opening);
    let closingFormatted = closing === '23:59:59' ? 'late' : formatTime(closing);

    return `${openingFormatted} - ${closingFormatted}`;
}
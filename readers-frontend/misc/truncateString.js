export function truncateString(string, maxLength) {
	if (maxLength >= string.length) return string;
	return string.slice(0, maxLength) + '...';
}

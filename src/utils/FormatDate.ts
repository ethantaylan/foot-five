export function formatDate(dateString: string) {
  const options: Record<string, string> = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleString("fr-FR", options);
}

export function generateSlug(text: string): string {
  return text
    .normalize('NFD') // split an accented letter in the base letter and the accent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove all chars not letters, numbers, underscores, spaces or hyphens
    .replace(/\s+/g, '-') // replace spaces with hyphens
}

export function getPLDDate(date: Date = new Date()): string {
    const months = ['Janvier', 'Févirer', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

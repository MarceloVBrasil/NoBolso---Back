export function validateName(name: string) {
    const characters = name.split('').filter(ch => ch != ' ')
    return characters.every(ch => isLetter(ch))
}

function isLetter(ch: string) {
    return ch.toLowerCase() != ch.toUpperCase()
}
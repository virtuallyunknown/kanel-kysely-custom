export function convertESMPathsHook(path, lines, instantiatedConfig) {
    return lines.map(line => line.replace(/^import\stype\s.*'(.*)';$/, (match, p1) => {
        return /\sfrom\s'kysely';$/.test(match)
            ? match
            : match.replace(p1, `${p1}.js`)
    }))
}
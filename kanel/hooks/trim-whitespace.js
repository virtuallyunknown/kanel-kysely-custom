export function trimWhitespaceHook(path, lines, instantiatedConfig) {
    return lines.filter((line, index, array) => {
        if (line === '' && array[index - 1].startsWith(' ')) {
            return;
        }

        return line === '' ? '\n' : line;
    });
}
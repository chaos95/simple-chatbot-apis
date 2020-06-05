
export function cleanupUrbanDictionaryDefinition (definition: string): string {
    definition = definition.split(/\r\n|\r|\n/).join(' ');
    definition = definition.replace(/\s+/g, ' ');
    return definition.replace(/\[|\]/g, '');
}

export function ellipsify (inputText: string, truncateLength: number): string {
    if (inputText.length > truncateLength) {
        inputText = `${inputText.substring(0, truncateLength)}…`;
    }
    return inputText;
}

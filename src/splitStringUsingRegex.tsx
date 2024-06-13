function splitStringUsingRegex(inputString: string): string[] {
    const characters: string[] = [];
    const regex = /[\s\S]/gu; // Regular expression to match any character
    let match;


    while ((match = regex.exec(inputString)) !==null)
    {
        characters.push(match[0])
    }
    return characters
}
export default splitStringUsingRegex;
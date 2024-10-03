export function generateRandomNumbers(length: number, max: number, exclude: Array<number>): Array<number> {
    const randomNumbers = new Set<number>();
    while (randomNumbers.size < length) {
        const randomNum = Math.floor(Math.random() * max);
        if (!exclude.includes(randomNum)) {
            //TODO: make this good and not brute force
            randomNumbers.add(randomNum);
        } else {
        }
    }
    return Array.from(randomNumbers);
}

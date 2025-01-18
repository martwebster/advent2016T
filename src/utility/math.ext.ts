export namespace MathExt{
    export const median = (numbers: number[]): number => {
        const sorted = [...numbers].sortAscending();
        if (sorted.length %2 ==0){
            const middle = sorted.length /2
            const first = sorted[middle-1]
            const last = sorted[middle]
            return Math.round(first + ((last - first)/2))
        }
        return sorted[Math.floor(sorted.length / 2)]
    }
}
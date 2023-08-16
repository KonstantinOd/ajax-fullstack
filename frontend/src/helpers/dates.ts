export const getDifferenceInDays = (startDate: Date, endDate: Date): number => {
    return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
}
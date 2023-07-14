
export const calculateMed = (notes: Array<number>) => {
    let tmp = 0.0;
    notes.forEach((note) => {
        tmp += note;
    })
    tmp = tmp / notes.length;
    // precision 2 chiffres apres la virgule
    return Math.round(tmp * 100) / 100;
}

export function gradeStatus(grade) {

    if (grade <= 2.5) {
        return 'Ruim'
    } else if (grade > 2.5 && grade <= 5) {
        return 'Regular'
    } if (grade > 5 && grade <= 7.5) {
        return 'Bom'
    } if (grade > 7.5) {
        return 'Muito bom'
    } if (grade === undefined) {
        return 'Não avaliado'
    }
}
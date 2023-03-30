export function convertNumber(value) {

    const valueConverted = new Intl.NumberFormat().format(value)

    return valueConverted

}

//exemplo de uso
//<h2>Saldo atual: {convertNumber(data.saldo)}</h2>

import { distCalc } from "../utils/distCalc";


export function ProductRegister() {
    let lat1 = -23.570533
    let lon1 = -46.663713
    let lat2 = -23.595913
    let lon2 = -46.741706


    return (
        <p>{distCalc(lat1, lon1, lat2, lon2)}</p>
    )
}
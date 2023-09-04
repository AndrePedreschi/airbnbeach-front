

export function distCalc(lat1, lon1, lat2, lon2) {

    //let lat1 = -23.570533
    //let lon1 = -46.663713
    //let lat2 = -23.595913
    //let lon2 = -46.741706

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    let R = 6371 * 1000; // Raio da Terra em m
    let dLat = deg2rad(lat2 - lat1);
    let dLon = deg2rad(lon2 - lon1);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d.toFixed(0);
}
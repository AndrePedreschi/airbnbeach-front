export function breakLines(data){
    return data.replaceAll('. ', '. \n').split('\n')
}
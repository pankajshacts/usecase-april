export default function isValidDate(dateString){
    const date = new Date(dateString);

    if(isNaN(date)){
        return false;
    }

    return true;
}
import moment from "moment";

const format = [
    "DD-MM-YYYY",
    "DD/MM/YYYY",
    "YYYY-MM-DD",
    "YYYY/MM/DD",
]

export function stringToDate(dateString){
   return new Date(moment(dateString, format));
}

export function isValidDate(dateString){

    const date = moment(dateString, format);

    if(!moment(date).isValid()){
        return false;
    }

    return true;
}
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'formatdate' })
export class FormatDate implements PipeTransform {
    transform(dateObj) {
        let inputDate = new Date(dateObj);
        // let formattedDate = (inputDate.getDate() < 10 ? ('0' + inputDate.getDate()) : inputDate.getDate());
        // formattedDate += '-' + (inputDate.getMonth() < 10 ? ('0' + (inputDate.getMonth() + 1)) : inputDate.getMonth() + 1);
        // formattedDate += `-${inputDate.getFullYear()}`

        // var hours = inputDate.getHours();
        // var minutes = `${inputDate.getMinutes()}`;
        // var ampm = hours >= 12 ? 'PM' : 'AM';
        // hours = hours % 12;
        // hours = hours ? hours : 12; // the hour '0' should be '12'
        // minutes = Number(minutes) < 10 ? '0' + minutes : minutes;
        // var strTime = hours + ':' + minutes + ' ' + ampm;
        
        // return `${formattedDate}, ${strTime}`
        return moment(inputDate).format("DD/MM/YYYY HH:mm:ss");
    }
}
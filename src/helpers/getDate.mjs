import moment from "moment/moment.js";

export function date_time() {
    const myTime = new Date();

    const year = myTime.getFullYear();
    const month = myTime.getMonth() + 1;       //january starts from 0
    const date = myTime.getDate()
    const hour = myTime.getHours()
    const minute = myTime.getMinutes()
    const second = myTime.getSeconds()

    let today = moment(`${year}-${month}-${date} ${hour}:${minute}:${second}`, 'YYYY-MM-DD HH:mm:ss')
    today = today.format('YYYY-MM-DD HH:mm:ss')
    console.log('TIMESTAMP: ' + today );
    return (today);
};

date_time();
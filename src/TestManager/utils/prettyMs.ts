/**
 * 
 * @param time - время в мс
 * @returns время в формате 00h 00m 00s 00ms
 */
export function prettyMs(time: number): string {
    if(!time) return '0ms'

    let ms = time % 1000;
    time = (time - ms) / 1000;
    let secs = time % 60;
    time = (time - secs) / 60;
    let mins = time % 60;
    let hrs = (time - mins) / 60;
    
    let result = '';
    if(hrs) result += hrs + 'h ';
    if(mins) result += mins + 'm ';
    if(secs) result += secs + 's ';
    if(ms) result += ms + 'ms'
    
    return result;
  }
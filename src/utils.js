function toMinLength (num) {
    const str = num.toString()
    return str.length === 1?'0' + str:str
}

export const formatTime = (dateObj, dontIncludeMins) => {
    let hours = dateObj.getHours()
    let suffix = 'AM'
    if(hours >= 12) {
        hours -=12
        suffix = 'PM'
    }
    return `${toMinLength(hours)}${dontIncludeMins?'':':' + toMinLength(dateObj.getMinutes())} ${suffix}`
}

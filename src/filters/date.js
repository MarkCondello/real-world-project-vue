export default value => {
    const date = new Date(value);
    //https://www.w3schools.com/jsref/jsref_tolocalestring.asp for options
    return date.toLocaleString(['en-AU'], {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
    })
}
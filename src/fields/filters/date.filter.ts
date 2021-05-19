const dateFilter = (date: string) => {
    const regexDate = /^(1|2)(0|9)[0-9]{2}-[0-1][0-9]-[0-3][0-9]$/;
    return regexDate.test(String(date));
}


export default dateFilter;
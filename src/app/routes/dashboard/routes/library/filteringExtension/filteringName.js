const filteringName = (name, count) => {
    let result = "";
    name.length >= count ?
        result = `${name.substring(0, count)},...`
        : result = name; 
        return result;   
}
export default filteringName;
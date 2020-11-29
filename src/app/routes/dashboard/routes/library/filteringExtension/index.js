const filteringExtension = (type) => {
    let obj = {
        type: type,
        img: null
    }
    switch(type){
        case 'xlxs': 
        obj.img = "assets/images/excel.png";
        break;
        case 'csv': 
        obj.img = "assets/images/csv.png";
        break;
        case 'image/jpeg': 
        obj.img = "assets/images/file-type/jpg.png";
        break;
        case 'image/png': 
        obj.img = "assets/images/file-type/png.png";
        break;
        case 'mp3': 
        obj.img = "assets/images/file-type/mp3.png";
        break;
        case 'application/pdf': 
        obj.img = "assets/images/file-type/pdf.png";
        break;
        case 'ppt': 
        obj.img = "assets/images/file-type/powerpoint.png";
        break;
        case 'txt': 
        obj.img = "assets/images/file-type/txt.png";
        break;
        default:
            obj.img = "assets/images/file.png";
            break;
    }
    return obj.img;

}
export default filteringExtension;
let data = {

}
const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+horsens&key=AIzaSyDqguWie1TYNcPuCZh4de168PbvHdl0vZM";

fetch(url)
.then((response) => response.json()) //transform data into json 
.then((object) => data = object) // save object to variable

console.log(data);
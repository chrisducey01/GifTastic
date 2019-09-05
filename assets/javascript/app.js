let apiKey = "DHFPFZvIU7Bue4giRFcQrRYyH0kMKDEU";
let queryUrl = "https://api.giphy.com/v1/gifs/search?";


function buildQueryUrl(baseUrl){
    let tempUrl = baseUrl;
    
    //always include api key first
    tempUrl += "api_key=" + apiKey;

    //after that each key/value pair will be prepended with &
    tempUrl += "&q=pandas";
    tempUrl += "&limit=10";
    tempUrl += "&offset=0";
    tempUrl += "&rating=g";
    tempUrl += "&lang=en";

    return tempUrl;
}

$(document).ready(function(){
    $("#main-button").click(function(){
        $.ajax(
            {
                url: buildQueryUrl(queryUrl),
                method: "GET"
            }
        ).then(function(response){
            console.log(response);
            $(".card-img-top").attr("src",response.data[0].images.original.url);
            $(".card-title").text(response.data[0].rating);
        });
    });
});
let apiKey = "DHFPFZvIU7Bue4giRFcQrRYyH0kMKDEU";
let queryUrl = "https://api.giphy.com/v1/gifs/search?";

var topics = ["Burger King","Taco Bell","Wendy's","Chick-Fil-A","El Pollo Loco","McDonald's"];


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
    buildButtons($("#btn-div"));
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


function buildButtons(theDiv){
    theDiv.empty();
    for(let i=0; i < topics.length; i++){
        let newButton = $("<button>");
        newButton.attr("type","button");
        newButton.addClass("btn btn-primary m-2");
        newButton.text(topics[i]);
        theDiv.append(newButton);
    }
}
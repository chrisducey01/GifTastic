let apiKey = "DHFPFZvIU7Bue4giRFcQrRYyH0kMKDEU";
let queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + 
  "&limit=10&offset=0&rating=g&lang=en";

var topics = ["Burger King","Taco Bell","Wendy's","Chick-Fil-A","El Pollo Loco","McDonald's"];

$(document).ready(function(){
    buildButtons($("#btn-div"));
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

function grabGifs(){
    let btnText = $(this).text().trim();
    console.log("You clicked: " + btnText);
    let ajaxUrl = queryUrl + "&q=" + btnText;
    console.log("Query URL: " + ajaxUrl);

    $.ajax(
        {
            url: ajaxUrl,
            method: "GET"
        }
    ).then(function(response){
        console.log(response);
        /*
        $(".card-img-top").attr("src",response.data[0].images.original.url);
        $(".card-title").text(response.data[0].rating);
        */
       renderGifs(response,$("#gif-div"));
    });

}

function renderGifs(gifObj, theDiv){
    theDiv.empty();
    for(let i=0; i < gifObj.data.length; i++){
        let newImg = $("<img>");
        newImg.attr("src",gifObj.data[i].images.fixed_height_still.url);
        newImg.attr("alt",gifObj.data[i].title);
        newImg.attr("data-still",gifObj.data[i].images.fixed_height_still.url);
        newImg.attr("data-animate",gifObj.data[i].images.fixed_height.url);
        newImg.attr("data-state","still");
        newImg.addClass("gif");
        theDiv.append(newImg);
    }
}

function toggleGif(){
    let currentState = $(this).attr("data-state");

    if(currentState == "still"){
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state","animate");
    }
    else if(currentState == "animate"){
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state","still");
    }
    else{
        console.log("Unknown state: " + currentState);
    }
}

$(document).on("click",".btn",grabGifs);
$(document).on("click",".gif",toggleGif);
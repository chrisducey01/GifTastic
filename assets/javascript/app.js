const apiKey = "DHFPFZvIU7Bue4giRFcQrRYyH0kMKDEU";
const queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + 
  "&limit=10&offset=0&rating=pg-13&lang=en";

const topics = ["Burger King","Taco Bell","Wendy's","Chick-Fil-A","El Pollo Loco","McDonald's"];

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
        let newDiv = $("<div>");
        let newImg = $("<img>");
        let subDiv = $("<div>");
        let p = $("<p>");

        newDiv.addClass("card p-0 m-2 col-lg-3");


        newImg.attr("src",gifObj.data[i].images.fixed_width_still.url);
        newImg.attr("alt",gifObj.data[i].title);
        newImg.attr("data-still",gifObj.data[i].images.fixed_width_still.url);
        newImg.attr("data-animate",gifObj.data[i].images.fixed_width.url);
        newImg.attr("data-state","still");
        newImg.addClass("card-img-top gif");

        subDiv.addClass("card-body");

        p.addClass("card-text");
        p.text(`Rating: ${gifObj.data[i].rating.toUpperCase()}`);

        subDiv.append(p);
        newDiv.append(newImg);
        newDiv.append(subDiv);
        theDiv.append(newDiv);
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
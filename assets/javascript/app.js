const apiKey = "DHFPFZvIU7Bue4giRFcQrRYyH0kMKDEU";
const queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + 
  "&limit=10&offset=0&rating=pg-13&lang=en";

const topics = ["Pancakes","Nachos","Chicken Fingers","Pizza","Pasta","Lobster","Brownies"];

$(document).ready(function(){
    buildButtons($("#btn-div"));
    $("#add-btn").click(function(){addCategory();});
    $("#add-text").keypress(function(e){
        if(e.which == 13){
            console.log("You pressed enter!");
            addCategory();
        }
        else{

        }
    });
});

function addCategory(){
    let  newCategory = $("#add-text").val();
    console.log(newCategory);
    //only push the new category in if it isn't already there and it isn't blank
    if(topics.includes(newCategory)){
        $("#add-text").addClass("is-invalid");
        $("#add-text").attr("data-original-title",`${newCategory} already exists.  Try something else.`).tooltip('show');
    }
    else if(newCategory.length === 0){
        $("#add-text").addClass("is-invalid");
        $("#add-text").attr("data-original-title",`Please enter a non-blank value.`).tooltip('show');
    }
    else{
        $("#add-text").tooltip('hide');
        $("#add-text").removeClass("is-invalid");
        topics.push(newCategory);
        buildButtons($("#btn-div"));
        console.log(`New category to add is: ${newCategory}`);
        $("#add-text").val("");
    }
}

function buildButtons(theDiv){
    theDiv.empty();
    for(let i=0; i < topics.length; i++){
        let newButton = $("<button>");
        newButton.attr("type","button");
        newButton.addClass("btn btn-dark m-2 gif-btn");
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

        newDiv.addClass("card p-0 m-2 col-lg-3 border-0");


        newImg.attr("src",gifObj.data[i].images.fixed_width_still.url);
        newImg.attr("alt",gifObj.data[i].title);
        newImg.attr("data-still",gifObj.data[i].images.fixed_width_still.url);
        newImg.attr("data-animate",gifObj.data[i].images.fixed_width.url);
        newImg.attr("data-state","still");
        newImg.addClass("card-img-top gif");

        subDiv.addClass("card-body border border-dark bg-dark");

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

$(document).on("click",".gif-btn",grabGifs);
$(document).on("click",".gif",toggleGif);
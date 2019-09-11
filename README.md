# GifTastic
Website that uses the Giphy API to display gifs based on categories a user chooses by clicking on buttons

# Purpose
This site was built as a demo to show how to use AJAX calls and then dynamically present content in the HTML based on the response object.  

__Note:__ The API key used for Giphy is a development key.  The deployed version of this site is for demonstration purposes only.  Using the API key with a high volume of calls will result in the key being blocked.

# See it in Action
I have posted a working version of the game to [Github Pages](https://chrisducey01.github.io/GifTastic)

# Functionality
* The site is setup to retrieve gifs from the Giphy API based on whatever button a user clicks on the webpage.  The text of the button is used to search Giphy and returned associated gifs.  
* The pre-populated buttons are all food related
* Each time the user clicks a button, any gifs that were on the page are removed and replaced with gifs that match the category of the text on the button clicked
* Gifs are initially loaded with a static image.  Any time a user clicks on an image, it will animate.  The user can then click again to turn off the animation.
* Users can add new buttons by typing in text in the input box at the top right of the page and then clicking the "Add" button.  New buttons are added to the button group.
* Refreshing the page resets the buttons to the original set of pre-populated values
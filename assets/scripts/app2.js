
      // Initial array of movies
      var giphs = ["dog", "cat", "Rabbitt", "Hamster", "skunk", "Golffish", "bird", "bird", "ferret", "turtle", "sugar glider", "cinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara","teacup pig", "serval", "salamander", "frog"];
      // displayGiphs function re-renders the HTML to display the appropriate content
      function displayGiphs() {
        
        var giph = $(this).attr("data-name");
        var queryURL =  "http://api.giphy.com/v1/gifs/search?q=" + giphs + "&api_key=5fc9c9ddb6c540cc97ffa3b0723cb84c";
        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(this.url);
          console.log(response);

          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var animalImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              animalImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(animalImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
        });
      }
      // Function for displaying buttons
      function renderButtons() {
        // Deletes the giphs prior to adding new giphs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of giphs
        for (var i = 0; i < giphs.length; i++) {
          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("giphy");
          // Added a data-attribute
          a.attr("data-name", giphs[i]);
          // Provided the initial button text
          a.text(giphs[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }
      // This function handles events where the add giph button is clicked
      $("#add-giphy").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var image = $("#giphy-input").val().trim();
        // The movie from the textbox is then added to our array
        giphs.push(image);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".image", displayGiphs);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();
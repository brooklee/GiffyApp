    $(document).ready(function() {
      
      // Initial array of movies
      var giphs = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara","teacup pig", "serval", "salamander", "frog"];
      
      // displayGiphs function re-renders the HTML to display the appropriate content
      function displayGiphs() {

        var giph = $(this).attr("data-name");
        console.log(giph)

        var queryURL =  "http://api.giphy.com/v1/gifs/search?q=" + giph + "&api_key=5fc9c9ddb6c540cc97ffa3b0723cb84c";
        console.log(queryURL);

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(this.url);
          var results = response.data;
          console.log(response);

          $("button").on("click", function() {
          for (var i = 0; i < results.length; i++) {
            results[i]

            var giphDiv = $("<div>")

          var rating = results[i].rating;
          var defaultAnimatedSrc = results[i].images.fixed_height.url;
          var staticSrc = results[i].images.fixed_height_still.url;
          var giphImage = $("<img>");
          var p = $("<p>").text("Rating: " + rating);

          giphImage.attr("src", staticSrc);
          giphImage.addClass("animalGiphy");
          giphImage.attr("data-state", "still");
          giphImage.attr("data-still", staticSrc);
          giphImage.attr("data-animate", defaultAnimatedSrc);
          giphDiv.append(p);
          giphDiv.append(giphImage);
          $("#giphy-view").prepend(giphDiv);
          }
        });
// ----------------------------------------------------------------------------

        //   $("button").on("click", function() {
          

        //   // Looping over every result item
        //   for (var i = 0; i < results.length; i++) {

        //     // Only taking action if the photo has an appropriate rating
        //     if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        //       // Creating a div with the class "item"
        //       var gifDiv = $("<div class='item'>");

        //       // Storing the result item's rating
        //       var rating = results[i].rating;

        //       // Creating a paragraph tag with the result item's rating
        //       var p = $("<p>").text("Rating: " + rating);

        //       // Creating an image tag
        //       var animalImage = $("<img>");

        //       // Giving the image tag an src attribute of a proprty pulled off the
        //       // result item
        //       animalImage.attr("src", results[i].images.fixed_height.url);

        //       // Appending the paragraph and personImage we created to the "gifDiv" div we created
        //       gifDiv.append(p);
        //       gifDiv.append(animalImage);

        //       // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        //       $("#giphy-view").prepend(gifDiv);
        //     }
        //   }
        // });
// ----------------------------------------------------------------------------

        });
      }
      
      // Submit Button Click event pushes new button to giphs array
      $("#add-giphy").on("click", function(event) {
        event.preventDefault();
        var image = $("#giphy-input").val().trim();
        giphs.push(image);
        console.log(giphs);
        $("giphy-input").val('');
        renderButtons();
      });

      //Function iterates through topics array to display button
      function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < giphs.length; i++) {
          var a = $("<button>");
          a.addClass("giphy");
          a.attr("data-name", giphs[i]);
          a.text(giphs[i]);
          $("#buttons-view").append(a);
        }
      }

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", "#image", displayGiphs);
      // Calling the renderButtons function to display the intial buttons
      $(document).on("click", ".animalGiphy", pausePlayGifs);
      // Pause and play Gifs
      function pausePlayGifs() {
     var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

      displayGiphs();
      renderButtons();



      });

      
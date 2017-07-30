
// Initial array of animals
  var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara","teacup pig", "serval", "salamander", "frog"];


  // displayanimalInfo function displays animal content. 
  function displayanimalInfo(){

    //clear container     
    $('#animalsView').empty();     

    var animal = $(this).attr('data-name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
    .done(function(response) {
       var results = response.data;

           for(var i=0; i < results.length; i++){
              if (results[i].rating == "r" || results[i].rating == "pg-13")
              {
              }
              else {
               console.log(response)
              
               var rating = results[i].rating;

               var p = $('<p>').text( "Rating: " + rating);

               var animalImage = $('<img>');
               animalImage.attr('src', results[i].images.fixed_height_still.url);
               animalImage.attr('data-still', results[i].images.fixed_height_still.url);
               animalImage.attr('data-animate', results[i].images.fixed_height.url);
               animalImage.attr('data-state', 'still');
               animalImage.addClass('animalImage');
             
               $('#animalsView').append(p);
               $('#animalsView').append(animalImage);

              }

           }


//---------------PausePlay giphs Function----------------------------
      $('.animalImage').on('click', function(){
        //State of giph
          var state = $(this).attr('data-state'); 
            console.log(state);
          //PausePlay giphs
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }

      });

        
      });   

  }

  //function for displaying animal buttons 
  function renderButtons(){ 

    // Deletes the animals prior to adding new animals
    $('#buttonsView').empty();

    for (var i = 0; i < animals.length; i++){
 
        var a = $('<button>') 
        a.addClass('animal'); 
        a.attr('data-name', animals[i]); 
        a.text(animals[i]); 
        $('#buttonsView').append(a);
    }
  }

  //function to handle on click buttons
  $('#addanimal').on('click', function(){
    var animal = $('#animal-input').val().trim();
    animals.push(animal);

    renderButtons();
    
  })

  // Generic function for displaying the animalInfo
  $(document).on('click', '.animal', displayanimalInfo);

  renderButtons();
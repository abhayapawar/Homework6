var topics = ["101-dalmatians", "minions", "mickey mouse", "south park","the lion king","peanuts"];

     
      function displayMovieInfo()
    {
        console.log(this);
        var name = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +name+"&api_key=dc6zaTOxFJmzC&limit=12";

          $.ajax({
          url: queryURL
          ,method: 'GET'
          }).done(function(response){
            $(".movie-gif").empty();
           for (var i=0;i<12;i++){
            var singlegifdiv=$("<div class='single-gif'>");
            console.log("i: "+i);
            
          
            //$(singlegifdiv).append(gifRating);
        // $(".movie-gif").append(singlegifdiv);
         $(singlegifdiv).append("<img src='" + response.data[i].images.fixed_height_still.url + "'" +
                                "data-animated='"+ response.data[i].images.fixed_height.url + "'" +
                                "data-still='" + response.data[i].images.fixed_height_still.url + "'" +
                                "data='still' class='image'>");
        // $(".movie-gif").append(singlegifdiv);
         var ratings=response.data[i].rating;

            var gifRating=$("<span>").html("Rating:"+ratings);
            gifRating.addClass('gifrating');
           $(singlegifdiv).append(gifRating);
         $(".movie-gif").append(singlegifdiv);
        }      
      });
    }
    function switchImage ()  
    {
        
        if ($(this).attr("data") === "still")
         {
            // switch from still to moving image
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data", "animated");
         }

        else {
            // switch back from moving to still
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data", "still");
        }
    }
      function renderButtons()
      {

        $("#movie-name").empty();
          for (var i = 0; i < topics.length; i++) 
        {
          var a = $("<button>");
          a.addClass("movie");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#movie-name").append(a);
        }
     }

     $("#addMovie").on("click", function(event) 
     {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();
        topics.push(movie);

       renderButtons();
     });


      $(document).on("click", ".movie",  displayMovieInfo);
      $(document).on("click", ".image", switchImage);
      renderButtons();


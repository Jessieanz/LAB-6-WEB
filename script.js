$(document).ready(function() {

    // Start your code from here
    
    let animals = [
        "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
        "bird", "ferret", "turtle", "sugar glider", "chinchilla",
        "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
        "capybara", "teacup pig", "serval", "salamander", "frog"
      ];
    
    
      function populateButtons(array){
        $("#animal-buttons").empty();
    
        for (let i = 0; i <animals.length;i++) {
    
            let a = $("<button>")
            a.text(animals[i])
            a.addClass("animal")
            a.attr("data-type", animals[i]),
            $("#animal-buttons").append(a)
          }
        
    }
    
    // La logica del click de cada boton para hacer la llamda al API
    $("#animal-buttons").on("click", ".animal", function() {
        
        let animalName = $(this).attr("data-type")
        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=81nR4UTAbEUOMDiG3T90vaRvjJbxNdCp&q=${animalName}&limit=10&offset=0&rating=g&lang=en`;
        
        $.ajax({
            url:queryURL, 
            method: "GET"
        }).then(function(response){

            for (const element of response.data){
                let rating = element.rating
                let imstill = element.images.fixed_height_still.url
                let animated = element.images.fixed_height.url
    
                $("#animals").append(`<div class="ranimal"> <p> ${rating} </p> <img class=imagen src=${imstill} imgstill=${imstill} imganimate=${animated} imgstate="still"> </div>`)
            }

          })
        
    })
    
    
    // La lógica del click de cada imagen para "intercambiar las urls"
    $("#animals").on("click", ".imagen", function(){

        let state = $(this).attr('imgstate');
    
        if(state == "still"){
            $(this).attr("src",$(this).attr("imganimate"))
            $(this).attr("imgstate","animate");
        }
        else{
            $(this).attr("src",$(this).attr("imgstill"))
            $(this).attr("imgstate","still");
        }
    
    })
    
    
    // La lógica del formulario para agregar mas botones a la lista
    $("#add-animal").on("click", function(e) {
        e.preventDefault();
         let animal = $("#animal-input").val().trim()
         animals.push(animal)
         populateButtons()
    
    })
    
    
    populateButtons(animals);
    });

    //

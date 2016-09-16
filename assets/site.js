var gifPage = {
	listOfAnimals: ["dog", "cat", "rooster", "chicken", "anaconda"],
	createButton: function(){
		for(var i=0; i < this.listOfAnimals.length; i++){
			// var animalDiv = $("<div>");
			var animalButton = $("<button>");
			animalButton.attr("data-name", this.listOfAnimals[i]);
			animalButton.addClass("buttons");
			animalButton.text(this.listOfAnimals[i]);
			// animalDiv.append(animalButton);
			$(".buttonArea").append(animalButton);
		}
		
	},
	buttonClicked: function(){
		$(document).on("click", ".buttons", function(){
			var animal = $(this).data("name");
			var queryURL = "https://crossorigin.me/http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

			$.ajax({
				url: queryURL,
				method: 'GET'
			}).done(function(response){
				console.log(queryURL);
				var results = response.data;
				for (var i = 0; i < results.length; i++) {
					var animalImage = $("<img>");
	                
	                animalImage.attr("src", results[i].images.fixed_height_still.url);
	                animalImage.addClass("gif");
	                animalImage.attr("data-state", "still");
	                animalImage.attr("data-still", results[i].images.fixed_height_still.url)
	                animalImage.attr("data-animate", results[i].images.fixed_height.url);
	                $(".gifArea").prepend(animalImage);
	            }
			})
		});
	},
	addButtonToPage: function(){
		$('#addAnimal').on('click', function(){

		// This line of code will grab the input from the textbox
		var newAnimal = $('#animal-input').val().trim();
		
		console.log(newAnimal);
		// The movie from the textbox is then added to our array
		gifPage.listOfAnimals.push(newAnimal);
		console.log(gifPage.listOfAnimals);

		// Our array then runs which handles the processing of our movie array
		// this.createButton();
		$(".buttonArea").empty();
		gifPage.createButton();
		
		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	});
	},

	stillVsAnimate: function(){
		$(document).on('click', '.gif', function(){
			var state = $(this).attr('data-state');
			console.log(state);
			if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                console.log($(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
	});
	}


}

gifPage.stillVsAnimate();
gifPage.addButtonToPage();
gifPage.createButton();
gifPage.buttonClicked();

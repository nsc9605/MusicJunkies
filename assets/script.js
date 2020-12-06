
var userSongName = '';
var userArtistName = '';

// function to save user input to local storage for persistent data
function saveToStorage (newDate) {
	var currentData = JSON.parse(localStorage.getItem("saved-dates")) || [];
	currentData.push(newDate);
	localStorage.setItem("saved-dates", JSON.stringify(currentData));
  }

  // function to make a button for the search history dates using saved info from local storage
  function renderSaveSearchBtns () {
	var currentData = JSON.parse(localStorage.getItem("saved-dates")) || [];
	currentData.forEach(function (searchData){
	 var btnDate =  $("<button>"); 
	 console.log(btnDate);
	 btnDate.addClass("waves-effect waves-light btn-large search-history-btn");
	 btnDate.text(searchData);
	 $(".searchHistory").prepend(btnDate);
  
	})
  }

  // function call to append search history buttons to page
  renderSaveSearchBtns();

// allows search history buttons to rerun through the APIs to pull info back up to page
  $(".search-history-btn").on("click", function(){
	var searchHistoryDate = $(this).text();
	inputDate(searchHistoryDate);
  })

// this is where the first and second API calls are made, once a user has input a date to search for
$(".submit").on("click", function () {
    let inputUserDate = $(".inputValue").val();
	inputDate(inputUserDate);
	saveToStorage(inputUserDate);
	$(".inputValue").val('');
});

// function to search for user's chosen date and run it through the Billboard API to find #1 song that day
function inputDate (userDate) {
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://billboard-api2.p.rapidapi.com/hot-100?date=" + userDate + "&range=1-5",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "a7a119ea37msh093d314a936d441p161292jsn2b645c9b5683", 
		"x-rapidapi-host": "billboard-api2.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
	let imageEl = $("<img src = " + response.content[1].image + ">");
	userSongName = response.content[1].title;
    userArtistName = response.content[1].artist;
	dateToStandard = moment(response.info.date).format("ddd MMM Do, YYYY");
	artistDate = $("<h2>").text("This Day in History: " + dateToStandard);
	$(".card-content").empty();
	$(".card-image").empty();
    $(".card-content").append(artistDate, userArtistName, userSongName);
	$(".card-image").append(imageEl);

	renderVideoLink(userSongName, userArtistName);
});
}
// Once targeted song is chosen, this function will run through the second API, AudioDB to get a link to the music video       
  function renderVideoLink () {
	const settingsTwo = {
		"async": true,
		"crossDomain": true,
		"url": "https://theaudiodb.p.rapidapi.com/searchtrack.php?t=" + userSongName + "&s=" + userArtistName,
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "07be92493emshea6401a64571b97p134b1ejsn07c4838e18d4",
			"x-rapidapi-host": "theaudiodb.p.rapidapi.com"
		}
	};
	
	$.ajax(settingsTwo).done(function (responseTwo) {
		console.log(responseTwo);

		
		videoEl = $("<a>", { href: responseTwo.track[0].strMusicVid, text: "Link to Music Video"} );
		$(".vidlink").empty();
		$(".vidlink").append(videoEl);

	});
}

// Datepicker
$( function() {
    $( ".datepicker" ).datepicker({

		dateFormat: "yy-mm-dd"
	  });
  } );


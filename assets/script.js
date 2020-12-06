var userSongName = '';
var userArtistName = '';


// billboard API call to get the targeted song
$(".submit").on("click", function () {
    let inputUserDate = $(".inputValue").val();
    inputDate(inputUserDate);
});
// first api
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
    artistDate = response.info.date;
    $(".card-content").append(userArtistName, userSongName, artistDate);
	 $(".card-image").append(imageEl);

	renderVideoLink(userSongName, userArtistName);
});
}
// second api         
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
		var videoEl = $("<a>", { text: "link to video", href: responseTwo.track[0].strMusicVid });
		$(".vidlink").append(videoEl);
	});
}


// Datepicker
$( function() {
    $( "#datepicker" ).datepicker({
        changeMonth: true,
        changeYear: true,
		dateFormat: "yy-mm-dd"
	  });
  } );
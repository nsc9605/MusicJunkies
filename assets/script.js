var userSongName = '';
var userArtistName = '';


// billboard API call to get the targeted song
$(".submit").on("click", function () {
    let inputUserDate = $(".inputValue").val();
    inputDate(inputUserDate);
});

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
	userSongName = response.content[1].title;
    userArtistName = response.content[1].artist;
    artistDate = response.info.date;

    let billBoardDiv = $("<div>");
    billBoardDiv.append(userArtistName, artistDate, userSongName);
    $(".billBoardEl").append(billBoardDiv);

	console.log(response);
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
                                            
  

 
  $.ajax({
    type: "GET",
    data: {
        apikey:"7df083a8630c2141e251e825c85539f1",
        q_artist: artistSearch,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "https://api.musixmatch.com/ws/1.1/track.search",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {
        console.log(data); 
  


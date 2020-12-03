//  YouTube API call 
// let APIkey = "AIzaSyDkkhXaUKsrxmAvX4mbnc_jmfsX59lJm10";
// let queryURL = "https://youtube.googleapis.com/youtube/v3/search?key=" + APIkey;

// $.ajax({
// url: queryURL,
// method: "GET"
// })
// .then(function(responce){
// console.log(queryURL);
// console.log(responce);
// })

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
		"x-rapidapi-key": "3bc1742c89mshde29adf21290e72p18f578jsn5c3d1319dc37",  //07be92493emshea6401a64571b97p134b1ejsn07c4838e18d4
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
                                            


 

  


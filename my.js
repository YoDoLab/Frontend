var AccessToken = "";
var UserID = "";
window.fbAsyncInit = function() {
	FB.init({
		appId : '1398459810400805',
		xfbml : true,
		version : 'v2.2',
		oauth : true
	});
	FB.getLoginStatus (function (response){
			if(response.status == "connected"){
				AccessToken = response.authResponse.accessToken;
				UserID = response.authResponse.userID;
			}
	});
	FB.login(function(response){
		if(response.authResponse){
		}else{
			alert("canceled");
		}
	},{
		scope: 'publish_actions,publish_stream,email,public_profile,read_stream,user_photos',
		return_scopes:true
	});
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


var friend_list;
function getFriendList() {
	$.ajax({
		type : "GET",
		url : "https://graph.facebook.com/me?fields=id,photos&access_token="+AccessToken,
		async : true,
		cache : false,
		success : function(data){
			friend_list = data;
			$('#loginBtn').hide();
			$('#gData').hide();
			$.post("analyze_people.php",{data:friend_list},
			function(data){
				getProfilePhoto(data);
			});
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log("error: " + textStatus + "(" + errorThrown + ")");
		}
	});
}

function getProfilePhoto(data){
	var jdata = JSON.parse(data);
	for(var key in jdata){
		$.ajax({
			type : "GET",
			url : "https://graph.facebook.com/"+jdata[key].id+"?fields=id,name,picture&access_token="+AccessToken,
			async : true,
			cache : false,
			success : function(data){
				$.post("get_profile_pics.php",{data:data},
				getPeople(data));
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log("error: " + textStatus + "(" + errorThrown + ")");
			}
		});
	}
}

function getPeople(data) {
console.log(data.id + " " + data.name + " " + data.picture.data.url);
// Visualize here !!
}

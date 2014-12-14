AccessToken = "";
var UserID = "";
var i=0;
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
		url : "https://graph.facebook.com/me?fields=id,photos&limit=1000&access_token="+AccessToken,
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

var people_list;
var jdata;
function getProfilePhoto(data){
	jdata = JSON.parse(data);
	for(var key in jdata){
		$.ajax({
			type : "GET",
			url : "https://graph.facebook.com/"+jdata[key].id+"?fields=id,name,picture.type(large)&access_token="+AccessToken,
			async : true,
			cache : false,
			success : function(photos){
				$.post("get_profile_pics.php",{data:photos},
				getPeople);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log("error: " + textStatus + "(" + errorThrown + ")");
			}
		});
	}
}

function getPeople(data) {
	data = JSON.parse(data);
// Visualize here !!
	var friendList = document.getElementById('black-list');
	console.log(data.name);
		
	friendList.innerHTML += '<button class="fr_btn" id="'+data.id+'" onclick="addToWhite('+data.id+')" type="button" name="'+data.name+'">'+data.name;
//	for(var i in jdata)
//		console.log(jdata);
	document.getElementById(data.id).style.fontSize=jdata[data.name].count*1.5+10+"px";
}

function addToWhite(id){
	console.log(id);
	var node = document.getElementById(id);
	document.getElementById('black-list').removeChild(node);
	node.setAttribute("onclick", "addToBlack("+id+")");
	document.getElementById('white-list').appendChild(node);
}

function addToBlack(id){
	console.log(id);
	var node = document.getElementById(id);
	document.getElementById('white-list').removeChild(node);
	node.setAttribute("onclick", "addToWhite("+id+")");
	document.getElementById('black-list').appendChild(node);
}

function generatePhotos() {
	var white_list = document.getElementById("white-list");
	var name_list = new Array();
	$("#white-list>button").each(function(index) {
		name_list[name_list.length] = $(this).attr("name");
	});

	$.post("generate_photos.php",{data:friend_list, name:name_list},
	function(data){
		console.log(data);
	});
}

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
		
	friendList.innerHTML += '<button class="fr_btn" id="'+data.id+'" onclick="addToWhite('+data.id+')" type="button" name="'+data.name+'">'+data.name;
	document.getElementById(data.id).style.fontSize=jdata[data.name].count*1.5+10+"px";
}

function addToWhite(id){
	var node = document.getElementById(id);
	document.getElementById('black-list').removeChild(node);
	node.setAttribute("onclick", "addToBlack("+id+")");
	document.getElementById('white-list').appendChild(node);
}

function addToBlack(id){
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
		var jdata = JSON.parse(data);
		$.post("generate_update.php", {data:jdata},
		function(data){
			console.log(data);
		});
		var root = document.getElementById("container1234");
		root.innerHTML = "";
		var row = document.createElement("DIV");
		row.setAttribute("class", "row");
		root.appendChild(row);
		var col3 = document.createElement("DIV");
		col3.setAttribute("class", "col-md-3");
		col3.innerHTML=",";
		var col6 = document.createElement("DIV");
		col6.setAttribute("class", "col-md-6");
		var caro_ex = document.createElement("DIV");
		caro_ex.setAttribute("id", "carousel-example-generic");
		caro_ex.setAttribute("class", "carousel slide");
		caro_ex.setAttribute("data-ride", "carousel");
		var caro_indicator = document.createElement("OL");
		caro_indicator.setAttribute("class", "carousel-indicators");
		caro_ex.appendChild(caro_indicator);
		var count=0;
		for(var url in jdata){
			var li = document.createElement("LI");
			li.setAttribute("data-target", "#carousel-example-generic");
			li.setAttribute("data-slide-to", count);
			count++;
			if(count == 0)
				li.setAttribute("class", "active");
			caro_indicator.appendChild(li);
		}
		var caro_inner = document.createElement("DIV");
		caro_inner.setAttribute("class", "carousel-inner");
		caro_inner.setAttribute("role", "listbox");
		caro_ex.appendChild(caro_inner);
		count = 0;
		for(var url in jdata) {
			var div_item = document.createElement("DIV");
			if(count == 0){
				div_item.setAttribute("class", "item active");
			}
			else{
				div_item.setAttribute("class", "item");
			}
			var photo=document.createElement("IMG");
			photo.setAttribute("src", jdata[url]);
			photo.setAttribute("css", "float: left");
			div_item.appendChild(photo);
			count++;
			caro_inner.appendChild(div_item);
		}
		var left = document.createElement('A');
		var right = document.createElement('A');
		left.setAttribute("class", "left carousel-control");
		left.setAttribute("href", "#carousel-example-generic");
		left.setAttribute("role", "button");
		left.setAttribute("data-slide", "prev");
		right.setAttribute("class", "right carousel-control");
		right.setAttribute("href", "#carousel-example-generic");
		right.setAttribute("role", "button");
		right.setAttribute("data-slide", "next");
		var left_span1 = document.createElement("SPAN");
		var left_span2 = document.createElement("SPAN");
		left_span1.setAttribute("class", "glyphicon glyphicon-chevron-left");
		left_span1.setAttribute("aria-hidden", "true");
		left_span2.setAttribute("class", "sr-only");
		left_span2.innerHTML="Previous";
		left.appendChild(left_span1);
		left.appendChild(left_span2);
		var right_span1 = document.createElement("SPAN");
		var right_span2 = document.createElement("SPAN");
		right_span1.setAttribute("class", "glyphicon glyphicon-chevron-right");
		right_span1.setAttribute("aria-hidden", "true");
		right_span2.setAttribute("class", "sr-only");
		right_span2.innerHTML="Next";
		right.appendChild(right_span1);
		right.appendChild(right_span2);

		caro_ex.appendChild(left);
		caro_ex.appendChild(right);
		col6.appendChild(caro_ex);
		row.appendChild(col3);
		row.appendChild(col6);
	});
}

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

var people_list;
function getProfilePhoto(data){
	var jdata = JSON.parse(data);
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
	visualize();
}

function getPeople(data) {
	people_list = data;
}

function visualize() {
	var width = 960,
		height = 700;

	var nodes = d3.range(50).map(function() { return {radius: Math.random() * 30 + 25}; }),
		root = nodes[0],
		color = d3.scale.category10();

	root.radius = 0;
	root.fixed = true;

	var force = d3.layout.force()
		.gravity(0.1)
		.charge(function(d, i) { return i ? 0 : -2000; })
		.nodes(nodes)
		.size([width, height]);

	force.start();

  nodes.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return "test"; });

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);

	svg.selectAll("circle")
		.data(nodes.slice(1))
	  .enter().append("circle")
		.attr("r", function(d) { return d.radius; })

	force.on("tick", function(e) {
	  var q = d3.geom.quadtree(nodes),
		  i = 0,
		  n = nodes.length;

	  while (++i < n) q.visit(collide(nodes[i]));

	  svg.selectAll("circle")
		  .attr("cx", function(d) { return d.x; })
		  .attr("cy", function(d) { return d.y; });
	});

	function collide(node) {
	  var r = node.radius + 16,
		  nx1 = node.x - r,
		  nx2 = node.x + r,
		  ny1 = node.y - r,
		  ny2 = node.y + r;
	  return function(quad, x1, y1, x2, y2) {
		if (quad.point && (quad.point !== node)) {
		  var x = node.x - quad.point.x,
			  y = node.y - quad.point.y,
			  l = Math.sqrt(x * x + y * y),
			  r = node.radius + quad.point.radius;
		  if (l < r) {
			l = (l - r) / l * .5;
			node.x -= x *= l;
			node.y -= y *= l;
			quad.point.x += x;
			quad.point.y += y;
		  }
		}
		return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
	  };
	}
}


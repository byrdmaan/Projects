function getCity() {
	$.ajax({
	url:"/SlimTest/php/getCity.php",
	type: "POST",
	data: {
		"cityName":$("#cityName").val(),
		"drinkName":$("#drinkName").val(),
		"drinkPrice":$("#drinkPrice").val(),
	},
	dataType: "json",
	success: function(data) {
		if(!data.bad) {
			alert($("#drinkName").val());
			alert("hell ya" + data.errormsg);
		}
		else
			alert("error: " + data.errormsg);
	}
});
}

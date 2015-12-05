$(function(){

	var TEST_SSID = ['Wifi 1', 'Wifi 2', 'Wifi 3'];

	// TEST_SSID.forEach(function(ssid){
	// 	$("#ssid-select").append("<option value='" + ssid + "'>" + ssid + "</option>");
	// });

	window.noNetworks = function(){
		$('.before-submit').hide();
		$('#no-networks-message').removeClass('hidden');
	}

	window.submitMessage = function(){
		$('.before-submit').hide();
		$('#submit-message').removeClass('hidden');
	}

	$.get("/ssids", function(data){
		if(data.length == 0){
			$('.before-submit').hide();
			$('#no-networks-message').removeClass('hidden');
		} else {
			$.each(data, function(i, val){
				$("#ssid-select").append("<option value='" + val.ssid + "'>" + val.ssid + "</option>");
			});
		}
	})

	$('#connect-form').submit(function(ev){
		$.post('/connect', $('#connect-form').serialize(), function(data){
			$('.before-submit').hide();
			$('#submit-message').removeClass('hidden');
		});
		ev.preventDefault();
	});
});

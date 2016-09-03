$(document).ready(function() {
	var startP = 300;
	var startA = 1000;

	if($(window).width() <= 590){
		startP = 0;
		startA = 0;
	}

	setTimeout(function() {
		$('#patrick_bg').addClass('active');

		setTimeout(function() {
			$('.anim_box').each(function(index, el) {
				var d = parseInt($(this).data('delay'));
				var that = $(this);

				setTimeout(function() {
					that.addClass('animate');
				}, d);
			});
		}, 1000);
	}, 300);


	setTimeout(function() {
		$('.btn').addClass('active');
	}, 3000);


	$(document).on('click', 'h1,.open_about', function(event) {
		event.preventDefault();
		$('.big_overlay').addClass('active');
		$('body').addClass('hidden');
	});

	$(document).on('click', '.close_', function(event) {
		event.preventDefault();
		$('.big_overlay').removeClass('active');
		$('body').removeClass('hidden');
	});

	function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    $('.age_insert').text(getAge("1990/11/22"));

});
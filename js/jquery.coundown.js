// Date Counter Plugin
// Shows only total days between today and target date
// Past date = counted days passed
// Future date = remaining days

(function ($) {

	$.fn.datecounter = function (options, callback) {

		var settings = $.extend({
			date: null,
			offset: 0,
			day: 'day',
			days: 'days'
		}, options);

		// Check date
		if (!settings.date) {
			$.error('Date is not defined.');
		}

		if (!Date.parse(settings.date)) {
			$.error('Incorrect date format. Example: 12/24/2012');
		}

		var container = this;

		// Current date with timezone
		var currentDate = function () {
			var date = new Date();
			var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
			return new Date(utc + (3600000 * settings.offset));
		};

		// Main function
		function updateCounter() {

			var target_date = new Date(settings.date),
				current_date = currentDate();

			// Difference
			var difference = target_date - current_date;

			var one_day = 1000 * 60 * 60 * 24;

			// Total days only
			var days = Math.abs(Math.floor(difference / one_day));

			// Text
			var text_days = (days === 1) ? settings.day : settings.days;

			// Update HTML
			container.find('.days').text(days);
			container.find('.days_text').text(text_days);

			if (callback && typeof callback === 'function') {
				callback(days);
			}
		}

		updateCounter();
		setInterval(updateCounter, 1000);
	};

})(jQuery);

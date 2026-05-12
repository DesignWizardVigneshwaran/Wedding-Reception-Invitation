// Date Counter Clock
// Modified from Countdown Plugin
// Counts total days from 21 Feb 2026 to today

(function ($) {
	$.fn.countdown = function (options, callback) {

		var settings = $.extend({
			date: "02/21/2026 05:00:00",
			offset: 0,
			day: 'day',
			days: 'days'
		}, options);

		// Save container
		var container = this;

		/**
		 * Change client's local date to match offset timezone
		 */
		var currentDate = function () {

			var date = new Date();

			var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

			var new_date = new Date(utc + (3600000 * settings.offset));

			return new_date;
		};

		/**
		 * Main counter function
		 */
		function countdown() {

			var target_date = new Date(settings.date),
				current_date = currentDate();

			// Difference in milliseconds
			var difference = current_date - target_date;

			// If before target date
			if (difference < 0) {
				difference = 0;
			}

			var _day = 1000 * 60 * 60 * 24;

			// Total days only
			var days = Math.floor(difference / _day);

			// Text
			var text_days = (days === 1) ? settings.day : settings.days;

			// Add leading zero
			days = (String(days).length >= 2) ? days : '0' + days;

			// Set to DOM
			container.find('.days').text(days);
			container.find('.days_text').text(text_days);

			// Clear unused fields
			container.find('.hours').text('');
			container.find('.minutes').text('');
			container.find('.seconds').text('');

			container.find('.hours_text').text('');
			container.find('.minutes_text').text('');
			container.find('.seconds_text').text('');

			if (callback && typeof callback === 'function') {
				callback(days);
			}
		}

		// Start
		countdown();
		var interval = setInterval(countdown, 1000);
	};

})(jQuery);

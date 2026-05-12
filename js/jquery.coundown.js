// CountUp Clock
// Modified from Countdown Plugin
// Counts upward from a given start date

(function ($) {
	$.fn.countup = function (options, callback) {

		var settings = $.extend({
			date: null,
			offset: null,
			day: 'day',
			days: 'days',
			hour: 'hour',
			hours: 'hours',
			minute: 'minute',
			minutes: 'minutes',
			second: 'second',
			seconds: 'seconds'
		}, options);

		// Throw error if date is not set
		if (!settings.date) {
			$.error('Date is not defined.');
		}

		// Throw error if date format is incorrect
		if (!Date.parse(settings.date)) {
			$.error('Incorrect date format. Example: 12/24/2012 12:00:00');
		}

		// Save container
		var container = this;

		/**
		 * Get current date with timezone offset
		 */
		var currentDate = function () {
			var date = new Date();

			var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

			var new_date = new Date(utc + (3600000 * settings.offset));

			return new_date;
		};

		/**
		 * Main countup function
		 */
		function countup() {

			var start_date = new Date(settings.date),
				current_date = currentDate();

			// Difference from start date to now
			var difference = current_date - start_date;

			// If start date is in future
			if (difference < 0) {
				difference = 0;
			}

			// Time values
			var _second = 1000,
				_minute = _second * 60,
				_hour = _minute * 60,
				_day = _hour * 24;

			// Calculate elapsed time
			var days = Math.floor(difference / _day),
				hours = Math.floor((difference % _day) / _hour),
				minutes = Math.floor((difference % _hour) / _minute),
				seconds = Math.floor((difference % _minute) / _second);

			// Singular / plural text
			var text_days = (days === 1) ? settings.day : settings.days,
				text_hours = (hours === 1) ? settings.hour : settings.hours,
				text_minutes = (minutes === 1) ? settings.minute : settings.minutes,
				text_seconds = (seconds === 1) ? settings.second : settings.seconds;

			// Add leading zero
			days = (String(days).length >= 2) ? days : '0' + days;
			hours = (String(hours).length >= 2) ? hours : '0' + hours;
			minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
			seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

			// Update DOM
			container.find('.days').text(days);
			container.find('.hours').text(hours);
			container.find('.minutes').text(minutes);
			container.find('.seconds').text(seconds);

			container.find('.days_text').text(text_days);
			container.find('.hours_text').text(text_hours);
			container.find('.minutes_text').text(text_minutes);
			container.find('.seconds_text').text(text_seconds);

			// Optional callback
			if (callback && typeof callback === 'function') callback();
		}

		// Start counting up
		countup();
		var interval = setInterval(countup, 1000);
	};

})(jQuery);

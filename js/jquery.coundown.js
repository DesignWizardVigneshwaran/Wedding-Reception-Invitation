// CountUp Clock
// Counts from 21 Feb 2026 to today
// Shows Years, Days, Hours, Minutes, Seconds

(function ($) {
	$.fn.countdown = function (options, callback) {

		var settings = $.extend({
			date: "02/22/2026 05:00:00",
			offset: 0,
			year: 'year',
			years: 'years',
			day: 'day',
			days: 'days',
			hour: 'hour',
			hours: 'hours',
			minute: 'minute',
			minutes: 'minutes',
			second: 'second',
			seconds: 'seconds'
		}, options);

		var container = this;

		// Current date with timezone offset
		var currentDate = function () {
			var date = new Date();
			var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
			return new Date(utc + (3600000 * settings.offset));
		};

		// Main function
		function countdown() {

			var start_date = new Date(settings.date),
				current_date = currentDate();

			var difference = current_date - start_date;

			// If before start date
			if (difference < 0) {
				difference = 0;
			}

			// Time values
			var _second = 1000,
				_minute = _second * 60,
				_hour = _minute * 60,
				_day = _hour * 24,
				_year = _day * 365;

			// Calculate
			var years = Math.floor(difference / _year);
			var days = Math.floor((difference % _year) / _day);
			var hours = Math.floor((difference % _day) / _hour);
			var minutes = Math.floor((difference % _hour) / _minute);
			var seconds = Math.floor((difference % _minute) / _second);

			// Labels
			var text_years = (years === 1) ? settings.year : settings.years;
			var text_days = (days === 1) ? settings.day : settings.days;
			var text_hours = (hours === 1) ? settings.hour : settings.hours;
			var text_minutes = (minutes === 1) ? settings.minute : settings.minutes;
			var text_seconds = (seconds === 1) ? settings.second : settings.seconds;

			// Leading zero
			years = (String(years).length >= 2) ? years : '0' + years;
			days = (String(days).length >= 2) ? days : '0' + days;
			hours = (String(hours).length >= 2) ? hours : '0' + hours;
			minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
			seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

			// Update HTML
			container.find('.years').text(years);
			container.find('.days').text(days);
			container.find('.hours').text(hours);
			container.find('.minutes').text(minutes);
			container.find('.seconds').text(seconds);

			container.find('.years_text').text(text_years);
			container.find('.days_text').text(text_days);
			container.find('.hours_text').text(text_hours);
			container.find('.minutes_text').text(text_minutes);
			container.find('.seconds_text').text(text_seconds);

			if (callback && typeof callback === 'function') {
				callback();
			}
		}

		countdown();
		var interval = setInterval(countdown, 1000);
	};

})(jQuery);

(function (app) {
	app.DataModel = function () {
		var self = this;

		self.isArrival = ko.observable(true);
		self.isDeparture = ko.observable(true);
		
		self.FLIGHT_TYPES_TITLES = ["Прилет", "Вылет"];
		self.FLIGHT_TYPES_CODES = ["arrival", "departure"];
		self.AIRLINE_TITLES = ["EasyJet", "KoreanAir", "Турецкие авиалинии", "Swiss", "S7", "Аэрофлот", "AirAstana"];
		self.AIRLINE_LOGOS = ["./images/logos/easyjet.png", "./images/logos/korean.png", "./images/logos/turkish.png",
			"./images/logos/swiss.png", "./images/logos/s7.png", "./images/logos/aeroflot.png", "./images/logos/astana.png"];
		self.AIRCRAFT_TYPES = ["Boing 735", "Boing 733", "Boing 737", "Boing 747", "Airbus 320", "Airbus 321"];
		self.AIRCRAFT_TYPES_SHORT = ["B735", "B733", "B737", "B747", "A320", "A321"];
		self.AIRPORT_TITLES = ["Москва", "Москва", "Москва", "Астана", "Анталия", "Париж", "Лондон"];
		self.AIRPORT_CODES = ["VKO", "DME", "SVO", "TSE", "AYT", "CDG", "LHR"];
		self.FLIGHT_DEPARTURE_STATUSES = ["Регистрация", "Ожидание посадки", "Посадка закончена", "Вылетел", "Отменен", "Задерживается до 21:20"];
		self.FLIGHT_DEPARTURE_STATUSES_CODES = ["normal", "normal", "normal", "good", "bad", "bad"];
		self.FLIGHT_ARRIVAL_STATUSES = ["По расписанию", "Летит", "Приземлился", "Отменен", "Задерживается до 21:10", "Задерживается до 22:50"];
		self.FLIGHT_ARRIVAL_STATUSES_CODES = ["normal", "normal", "good", "bad", "bad", "bad"];
		self.FLIGHT_TIMES = ["10:30", "12:00", "15:10", "16:25", "20:50"];
		self.COMMENTS = ["Совмещен с рейсом S7 519", "Совмещен с рейсом SU 6135", "Совмещен с рейсом GH 122", "-"];

		self.getRandomFlight = function () {
			var flightType = self.getRandomNumber(self.FLIGHT_TYPES_CODES.length);
			var airline = self.getRandomNumber(self.AIRLINE_TITLES.length);
			var aircraft = self.getRandomNumber(self.AIRCRAFT_TYPES.length);
			var airport = self.getRandomNumber(self.AIRPORT_TITLES.length);
			var status = self.getRandomNumber(flightType === 0 ? self.FLIGHT_ARRIVAL_STATUSES.length : self.FLIGHT_DEPARTURE_STATUSES.length)
			var flightStatus = flightType === 0
				? self.FLIGHT_ARRIVAL_STATUSES[status]
				: self.FLIGHT_DEPARTURE_STATUSES[status];
			var flightStatusCode = flightType === 0
				? self.FLIGHT_ARRIVAL_STATUSES_CODES[status]
				: self.FLIGHT_DEPARTURE_STATUSES_CODES[status];

			return {
				"flightTypeTitle": self.FLIGHT_TYPES_TITLES[flightType],
				"flightTypeCode": self.FLIGHT_TYPES_CODES[flightType],
				"flightNumber": self.getRandomSymbols(2) + self.getRandomNumber(9999),
				"airlineLogo": self.AIRLINE_LOGOS[airline],
				"airlineTitle": self.AIRLINE_TITLES[airline],
				"aircraftType": self.AIRCRAFT_TYPES[aircraft],
				"aircraftTypeShort": self.AIRCRAFT_TYPES_SHORT[aircraft],
				"airportTitle": self.AIRPORT_TITLES[airport],
				"airportCode": self.AIRPORT_CODES[airport],
				"departureTime": self.FLIGHT_TIMES[self.getRandomNumber(self.FLIGHT_TIMES.length)],
				"departureDate": "27.07.2015",
				"arrivalTime": self.FLIGHT_TIMES[self.getRandomNumber(self.FLIGHT_TIMES.length)],
				"arrivalDate": "28.07.2015",
				"flightStatus": flightStatus,
				"flightStatusCode": flightStatusCode,
				"comment": self.COMMENTS[self.getRandomNumber(self.COMMENTS.length)]
			};
		};

		self.flights = [];

		for (var i = 0; i < 32; i++) {
			self.flights.push(self.getRandomFlight());
		}
	};

	app.DataModel.prototype.getRandomNumber = function (to) {
		var from = 0;
		return Math.floor(from + Math.random() * (to - from));
	};

	app.DataModel.prototype.getRandomSymbols = function (count) {
		return Math.random().toString(36).substr(2, count).toUpperCase();
	};
	
	var dataModel = new app.DataModel();

    ko.applyBindings(dataModel, document.getElementById("flights-timetable-block"));

    $(window).bind("scroll", function () {
        var offset = $(this).scrollTop();
        var tableOffset = $(".timetable_original").offset().top;
        var fixedTableHeader = $(".timetable_fixed > .timetable__header_fixed");

        if (offset >= tableOffset) {
            fixedTableHeader.show();
        }
        else if (offset < tableOffset) {
            fixedTableHeader.hide();
        }
    });

} (window.app = window.app || {}));
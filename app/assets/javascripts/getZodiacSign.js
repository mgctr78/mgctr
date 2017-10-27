/**
 * Return zodiac sugn by month and day
 *
 * @param day
 * @param month
 * @return {string} name of zodiac sign
 */
function getZodiacSign(day, month) {
  var zodiacSigns = {
    capricorn: "Козерог | capricorn",
    aquarius: "Водолей | aquarius",
    pisces: "Рыбы | pisces",
    aries: "Овен | aries",
    taurus: "Телец | taurus",
    gemini: "Близнецы | gemini",
    cancer: "Рак | cancer",
    leo: "Лев | leo",
    virgo: "Девы | virgo",
    libra: "Весы | libra",
    scorpio: "Скорпион | scorpio",
    sagittarius: "Стрелец | sagittarius"
  };

  if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
    return zodiacSigns.capricorn;
  } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
    return zodiacSigns.aquarius;
  } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    return zodiacSigns.pisces;
  } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
    return zodiacSigns.aries;
  } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
    return zodiacSigns.taurus;
  } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
    return zodiacSigns.gemini;
  } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
    return zodiacSigns.cancer;
  } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
    return zodiacSigns.leo;
  } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
    return zodiacSigns.virgo;
  } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
    return zodiacSigns.libra;
  } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
    return zodiacSigns.scorpio;
  } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
    return zodiacSigns.sagittarius;
  }
}

function Ascendant(zodiname, birthtimes) {
  var zodiacSigns = {
    capricorn: "Capricorn",
    aquarius: "Aquarius",
    pisces: "Pisces",
    aries: "Aries",
    taurus: "Taurus",
    gemini: "Gemini",
    cancer: "Cancer",
    leo: "Leo",
    virgo: "Virgo",
    libra: "Libra",
    scorpio: "Scorpio",
    sagittarius: "Sagittarius"
  };

  if (zodiname == "Козерог | capricorn") {
    zodiac = 1;
  } else if (zodiname == "Водолей | aquarius") {
    zodiac = 2;
  } else if (zodiname == "Рыбы | pisces") {
    zodiac = 3;
  } else if (zodiname == "Овен | aries") {
    zodiac = 4;
  } else if (zodiname == "Телец | taurus") {
    zodiac = 5;
  } else if (zodiname == "Близнецы | gemini") {
    zodiac = 6;
  } else if (zodiname == "Рак | cancer") {
    zodiac = 7;
  } else if (zodiname == "Лев | leo") {
    zodiac = 8;
  } else if (zodiname == "Девы | virgo") {
    zodiac = 9;
  } else if (zodiname == "Весы | libra") {
    zodiac = 10;
  } else if (zodiname == "Скорпион | scorpio") {
    zodiac = 11;
  } else if (zodiname == "Стрелец | sagittarius") {
    zodiac = 12;
  }

  var pluscal = zodiac + parseInt(birthtimes);
  if (pluscal >= 12) {
    calcu = (pluscal-1) % 12;
  } else {
    calcu = pluscal - 1;
  }

  if (calcu == 1) {
    return zodiacSigns.capricorn;
  } else if (calcu == 2) {
    return zodiacSigns.aquarius;
  } else if (calcu == 3) {
    return zodiacSigns.pisces;
  } else if (calcu == 4) {
    return zodiacSigns.aries;
  } else if (calcu == 5) {
    return zodiacSigns.taurus;
  } else if (calcu == 6) {
    return zodiacSigns.gemini;
  } else if (calcu == 7) {
    return zodiacSigns.cancer;
  } else if (calcu == 8) {
    return zodiacSigns.leo;
  } else if (calcu == 9) {
    return zodiacSigns.virgo;
  } else if (calcu == 10) {
    return zodiacSigns.libra;
  } else if (calcu == 11) {
    return zodiacSigns.scorpio;
  } else if (calcu == 12) {
    return zodiacSigns.sagittarius;
  }
}


function getAge(dateString) {
  var now = new Date();
  var today = new Date(now.getYear(), now.getMonth(), now.getDate());

  var yearNow = now.getYear();
  var monthNow = now.getMonth();
  var dateNow = now.getDate();

  var dob = new Date(
    dateString.substring(6, 10),
    dateString.substring(0, 2) - 1,
    dateString.substring(3, 5)
  );

  var yearDob = dob.getYear();
  var monthDob = dob.getMonth();
  var dateDob = dob.getDate();
  var age = {};
  var ageString = "";
  var yearString = "";
  var monthString = "";
  var dayString = "";

  yearAge = yearNow - yearDob;

  if (monthNow >= monthDob) var monthAge = monthNow - monthDob;
  else {
    yearAge--;
    var monthAge = 12 + monthNow - monthDob;
  }

  if (dateNow >= dateDob) var dateAge = dateNow - dateDob;
  else {
    monthAge--;
    var dateAge = 31 + dateNow - dateDob;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }

  age = {
    years: yearAge,
    months: monthAge,
    days: dateAge
  };

  if (age.years > 1) yearString = " years";
  else yearString = " year";
  if (age.months > 1) monthString = " months";
  else monthString = " month";
  if (age.days > 1) dayString = " days";
  else dayString = " day";

  if (age.years > 0 && age.months > 0 && age.days > 0)
    ageString =
      age.years +
      yearString +
      ", " +
      age.months +
      monthString +
      ", and " +
      age.days +
      dayString +
      " old.";
  else if (age.years == 0 && age.months == 0 && age.days > 0)
    ageString = "Only " + age.days + dayString + " old!";
  else if (age.years > 0 && age.months == 0 && age.days == 0)
    ageString = age.years + yearString + " old. Happy Birthday!!";
  else if (age.years > 0 && age.months > 0 && age.days == 0)
    ageString =
      age.years + yearString + " and " + age.months + monthString + " old.";
  else if (age.years == 0 && age.months > 0 && age.days > 0)
    ageString =
      age.months + monthString + " and " + age.days + dayString + " old.";
  else if (age.years > 0 && age.months == 0 && age.days > 0)
    ageString =
      age.years + yearString + " and " + age.days + dayString + " old.";
  else if (age.years == 0 && age.months > 0 && age.days == 0)
    ageString = age.months + monthString + " old.";
  else ageString = "Oops! Could not calculate age!";

  return ageString;
}


function chinese_zodiac(year) {
  switch ((year - 4) % 12) {
    case 0:
      return "Rat";

    case 1:
      return "Ox";

    case 2:
      return "Tiger";

    case 3:
      return "Rabbit";

    case 4:
      return "Dragon";

    case 5:
      return "Snake";

    case 6:
      return "Horse";

    case 7:
      return "Goat";

    case 8:
      return "Monkey";

    case 9:
      return "Rooster";

    case 10:
      return "Dog";

    case 11:
      return "Pig";
  }
}

/*$("input")
  .keyup(function() {
    var year = $(this).val(),
      zodiac = chinese_zodiac(year);
    $("#zodiac").text(year + " is the year of the " + zodiac);
  })
  .keyup();*/




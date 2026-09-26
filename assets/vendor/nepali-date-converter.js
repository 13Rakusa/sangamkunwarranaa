/*!
 * Nepali (Bikram Sambat) date converter — self-contained vendored build.
 * Calendar data for BS 2000–2090 derived from nepali-date-converter v2.0.0
 * https://github.com/bugbaba/nepali-date-converter — MIT License (c) 2018 Subesh.
 *
 * Exposes a small global API: window.NepaliDateConverter
 *   .ad2bs(dateOrString) -> { year, month, day, monthNameNe, monthNameEn,
 *                            weekdayNe, str, en }
 *   .bs2ad(bsYear, bsMonth, bsDay) -> Date (local midnight)
 *   .toNeDigits(number) -> Devanagari digit string
 */
(function (global) {
  'use strict';

  /* Days in each month (Baishakh..Chaitra) for every BS year from 2000 to 2090. */
  var CALENDAR = [[30,32,31,32,31,30,30,30,29,30,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],[31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[30,32,31,32,31,30,30,30,29,30,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],[31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],[31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[31,31,31,32,31,31,29,30,30,29,30,30],[31,31,32,31,31,31,30,29,30,29,30,30],[31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[31,31,31,32,31,31,29,30,30,29,30,30],[31,31,32,31,31,31,30,29,30,29,30,30],[31,32,31,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],[31,31,31,32,31,31,30,29,30,29,30,30],[31,31,32,31,31,31,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],[31,31,31,32,31,31,30,29,30,29,30,30],[31,31,32,31,31,31,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[30,32,31,32,31,30,30,30,29,30,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],[31,31,32,31,32,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[30,32,31,32,31,30,30,30,29,30,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],[31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[30,32,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],[31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[31,31,31,32,31,31,29,30,30,29,30,30],[31,31,32,31,31,31,30,29,30,29,30,30],[31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[31,31,31,32,31,31,29,30,30,29,30,30],[31,31,32,31,31,31,30,29,30,29,30,30],[31,32,31,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[31,31,31,32,31,31,30,29,30,29,30,30],[31,31,32,31,31,31,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],[31,31,31,32,31,31,30,29,30,29,30,30],[31,31,32,31,31,31,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],[31,31,32,31,32,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[30,32,31,32,31,30,30,30,29,30,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],[31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[30,32,31,32,31,31,29,30,29,30,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],[31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[31,31,31,32,31,31,29,30,30,29,29,31],[31,31,32,31,31,31,30,29,30,29,30,30],[31,31,32,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[31,31,31,32,31,31,29,30,30,29,30,30],[31,31,32,31,31,31,30,29,30,29,30,30],[31,32,31,32,31,30,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,31],[31,31,31,32,31,31,30,29,30,29,30,30],[31,31,32,31,31,31,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,30],[31,32,31,32,31,30,30,30,29,30,29,31],[31,31,31,32,31,31,30,29,30,29,30,30],[31,31,32,31,31,31,30,29,30,29,30,30],[31,32,31,32,31,30,30,30,29,29,30,30],[31,31,32,32,31,30,30,30,29,30,30,30],[30,32,31,32,31,30,30,30,29,30,30,30],[31,31,32,31,31,30,30,30,29,30,30,30],[31,31,32,31,31,30,30,30,29,30,30,30],[31,32,31,32,30,31,30,30,29,30,30,30],[30,32,31,32,31,30,30,30,29,30,30,30],[31,31,32,31,31,31,30,30,29,30,30,30],[30,31,32,32,30,31,30,30,29,30,30,30],[30,32,31,32,31,30,30,30,29,30,30,30],[30,32,31,32,31,30,30,30,29,30,30,30]];
  var FIRST_BS_YEAR = 2000;
  var LAST_BS_YEAR = FIRST_BS_YEAR + CALENDAR.length - 1;
  /* 1 Baishakh 2000 BS = 14 April 1943 AD. */
  var EPOCH = Date.UTC(1943, 3, 14);
  var MS_PER_DAY = 86400000;

  var MONTHS_NE = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कात्तिक', 'मंसिर', 'पुस', 'माघ', 'फागुन', 'चैत'];
  var MONTHS_EN = ['Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mansir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
  var WEEKDAYS_NE = ['आइतबार', 'सोमबार', 'मङ्गलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'];
  var DIGITS_NE = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

  function toNeDigits(value) {
    return String(value).split('').map(function (ch) {
      return ch >= '0' && ch <= '9' ? DIGITS_NE[Number(ch)] : ch;
    }).join('');
  }

  function yearLength(bsYear) {
    var months = CALENDAR[bsYear - FIRST_BS_YEAR];
    var total = 0;
    for (var i = 0; i < 12; i++) total += months[i];
    return total;
  }

  /* Days elapsed since 1 Baishakh 2000 BS for a given BS date (month 1-12, day 1-31). */
  function bsDateToDays(bsYear, bsMonth, bsDay) {
    var days = 0;
    for (var y = FIRST_BS_YEAR; y < bsYear; y++) days += yearLength(y);
    var months = CALENDAR[bsYear - FIRST_BS_YEAR];
    for (var m = 0; m < bsMonth - 1; m++) days += months[m];
    return days + (bsDay - 1);
  }

  /* Convert days since epoch into a BS date. */
  function daysToBsDate(diff) {
    var year = FIRST_BS_YEAR;
    while (diff >= yearLength(year)) { diff -= yearLength(year); year++; }
    var months = CALENDAR[year - FIRST_BS_YEAR];
    var month = 0;
    while (diff >= months[month]) { diff -= months[month]; month++; }
    return { year: year, month: month + 1, day: diff + 1 };
  }

  function ad2bs(date) {
    var d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return null;
    /* Treat the calendar date in local terms; both sides use the same convention. */
    var diff = Math.round((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - EPOCH) / MS_PER_DAY);
    var bs = daysToBsDate(diff);
    bs.monthNameNe = MONTHS_NE[bs.month - 1];
    bs.monthNameEn = MONTHS_EN[bs.month - 1];
    bs.weekdayNe = WEEKDAYS_NE[d.getDay()];
    bs.str = toNeDigits(bs.year) + ' साल ' + bs.monthNameNe + ' ' + toNeDigits(bs.day) + ' गते';
    bs.en = bs.day + ' ' + bs.monthNameEn + ' ' + bs.year;
    return bs;
  }

  function bs2ad(bsYear, bsMonth, bsDay) {
    if (bsYear < FIRST_BS_YEAR || bsYear > LAST_BS_YEAR) return null;
    var months = CALENDAR[bsYear - FIRST_BS_YEAR];
    if (bsMonth < 1 || bsMonth > 12 || bsDay < 1 || bsDay > months[bsMonth - 1]) return null;
    var utc = new Date(EPOCH + bsDateToDays(bsYear, bsMonth, bsDay) * MS_PER_DAY);
    return new Date(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate());
  }

  global.NepaliDateConverter = {
    ad2bs: ad2bs,
    bs2ad: bs2ad,
    toNeDigits: toNeDigits,
    monthsNe: MONTHS_NE,
    monthsEn: MONTHS_EN,
    weekdaysNe: WEEKDAYS_NE,
    minBsYear: FIRST_BS_YEAR,
    maxBsYear: LAST_BS_YEAR
  };
})(typeof window !== 'undefined' ? window : this);

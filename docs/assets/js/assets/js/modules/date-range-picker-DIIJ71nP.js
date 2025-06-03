/*! name: vanilla-calendar-pro v3.0.4 | url: https://github.com/uvarov-frontend/vanilla-calendar-pro */
var __defProp = Object.defineProperty, __defProps = Object.defineProperties, __getOwnPropDescs = Object.getOwnPropertyDescriptors, __getOwnPropSymbols = Object.getOwnPropertySymbols, __hasOwnProp = Object.prototype.hasOwnProperty, __propIsEnum = Object.prototype.propertyIsEnumerable, __defNormalProp = (e2, t, n) => t in e2 ? __defProp(e2, t, { enumerable: true, configurable: true, writable: true, value: n }) : e2[t] = n, __spreadValues = (e2, t) => {
  for (var n in t || (t = {})) __hasOwnProp.call(t, n) && __defNormalProp(e2, n, t[n]);
  if (__getOwnPropSymbols) for (var n of __getOwnPropSymbols(t)) __propIsEnum.call(t, n) && __defNormalProp(e2, n, t[n]);
  return e2;
}, __spreadProps = (e2, t) => __defProps(e2, __getOwnPropDescs(t)), __publicField = (e2, t, n) => (__defNormalProp(e2, "symbol" != typeof t ? t + "" : t, n), n);
const errorMessages = { notFoundSelector: (e2) => `${e2} is not found, check the first argument passed to new Calendar.`, notInit: 'The calendar has not been initialized, please initialize it using the "init()" method first.', notLocale: "You specified an incorrect language label or did not specify the required number of values ​​for «locale.weekdays» or «locale.months».", incorrectTime: "The value of the time property can be: false, 12 or 24.", incorrectMonthsCount: "For the «multiple» calendar type, the «displayMonthsCount» parameter can have a value from 2 to 12, and for all others it cannot be greater than 1." }, setContext = (e2, t, n) => {
  e2.context[t] = n;
}, destroy = (e2) => {
  var t, n, a, l, o;
  if (!e2.context.isInit) throw new Error(errorMessages.notInit);
  e2.inputMode ? (null == (t = e2.context.mainElement.parentElement) || t.removeChild(e2.context.mainElement), null == (a = null == (n = e2.context.inputElement) ? void 0 : n.replaceWith) || a.call(n, e2.context.originalElement), setContext(e2, "inputElement", void 0)) : null == (o = (l = e2.context.mainElement).replaceWith) || o.call(l, e2.context.originalElement), setContext(e2, "mainElement", e2.context.originalElement), e2.onDestroy && e2.onDestroy(e2);
}, hide = (e2) => {
  e2.context.isShowInInputMode && e2.context.currentType && (e2.context.mainElement.dataset.vcCalendarHidden = "", setContext(e2, "isShowInInputMode", false), e2.context.cleanupHandlers[0] && (e2.context.cleanupHandlers.forEach((e3) => e3()), setContext(e2, "cleanupHandlers", [])), e2.onHide && e2.onHide(e2));
};
function getOffset(e2) {
  if (!e2 || !e2.getBoundingClientRect) return { top: 0, bottom: 0, left: 0, right: 0 };
  const t = e2.getBoundingClientRect(), n = document.documentElement;
  return { bottom: t.bottom, right: t.right, top: t.top + window.scrollY - n.clientTop, left: t.left + window.scrollX - n.clientLeft };
}
function getViewportDimensions() {
  return { vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) };
}
function getWindowScrollPosition() {
  return { left: window.scrollX || document.documentElement.scrollLeft || 0, top: window.scrollY || document.documentElement.scrollTop || 0 };
}
function calculateAvailableSpace(e2) {
  const { top: t, left: n } = getWindowScrollPosition(), { top: a, left: l } = getOffset(e2), { vh: o, vw: s } = getViewportDimensions(), i = a - t, r = l - n;
  return { top: i, bottom: o - (i + e2.clientHeight), left: r, right: s - (r + e2.clientWidth) };
}
function getAvailablePosition(e2, t, n = 5) {
  const a = { top: true, bottom: true, left: true, right: true }, l = [];
  if (!t || !e2) return { canShow: a, parentPositions: l };
  const { bottom: o, top: s } = calculateAvailableSpace(e2), { top: i, left: r } = getOffset(e2), { height: c, width: d } = t.getBoundingClientRect(), { vh: u, vw: m } = getViewportDimensions(), h = m / 2, p = u / 2;
  return [{ condition: i < p, position: "top" }, { condition: i > p, position: "bottom" }, { condition: r < h, position: "left" }, { condition: r > h, position: "right" }].forEach(({ condition: e3, position: t2 }) => {
    e3 && l.push(t2);
  }), Object.assign(a, { top: c <= s - n, bottom: c <= o - n, left: d <= r, right: d <= m - r }), { canShow: a, parentPositions: l };
}
const handleDay = (e2, t, n, a) => {
  var l;
  const o = a.querySelector(`[data-vc-date="${t}"]`), s = null == o ? void 0 : o.querySelector("[data-vc-date-btn]");
  if (!o || !s) return;
  if ((null == n ? void 0 : n.modifier) && s.classList.add(...n.modifier.trim().split(" ")), !(null == n ? void 0 : n.html)) return;
  const i = document.createElement("div");
  i.className = e2.styles.datePopup, i.dataset.vcDatePopup = "", i.innerHTML = e2.sanitizerHTML(n.html), s.ariaExpanded = "true", s.ariaLabel = `${s.ariaLabel}, ${null == (l = null == i ? void 0 : i.textContent) ? void 0 : l.replace(/^\s+|\s+(?=\s)|\s+$/g, "").replace(/&nbsp;/g, " ")}`, o.appendChild(i), requestAnimationFrame(() => {
    if (!i) return;
    const { canShow: e3 } = getAvailablePosition(o, i), t2 = e3.bottom ? o.offsetHeight : -i.offsetHeight, n2 = e3.left && !e3.right ? o.offsetWidth - i.offsetWidth / 2 : !e3.left && e3.right ? i.offsetWidth / 2 : 0;
    Object.assign(i.style, { left: `${n2}px`, top: `${t2}px` });
  });
}, createDatePopup = (e2, t) => {
  var n;
  e2.popups && (null == (n = Object.entries(e2.popups)) || n.forEach(([n2, a]) => handleDay(e2, n2, a, t)));
}, getDate = (e2) => /* @__PURE__ */ new Date(`${e2}T00:00:00`), getDateString = (e2) => `${e2.getFullYear()}-${String(e2.getMonth() + 1).padStart(2, "0")}-${String(e2.getDate()).padStart(2, "0")}`, parseDates = (e2) => e2.reduce((e3, t) => {
  if (t instanceof Date || "number" == typeof t) {
    const n = t instanceof Date ? t : new Date(t);
    e3.push(n.toISOString().substring(0, 10));
  } else t.match(/^(\d{4}-\d{2}-\d{2})$/g) ? e3.push(t) : t.replace(/(\d{4}-\d{2}-\d{2}).*?(\d{4}-\d{2}-\d{2})/g, (t2, n, a) => {
    const l = getDate(n), o = getDate(a), s = new Date(l.getTime());
    for (; s <= o; s.setDate(s.getDate() + 1)) e3.push(getDateString(s));
    return t2;
  });
  return e3;
}, []), updateAttribute = (e2, t, n, a = "") => {
  t ? e2.setAttribute(n, a) : e2.getAttribute(n) === a && e2.removeAttribute(n);
}, setDateModifier = (e2, t, n, a, l, o, s) => {
  var i, r, c, d;
  const u = getDate(e2.context.displayDateMin) > getDate(o) || getDate(e2.context.displayDateMax) < getDate(o) || (null == (i = e2.context.disableDates) ? void 0 : i.includes(o)) || !e2.selectionMonthsMode && "current" !== s || !e2.selectionYearsMode && getDate(o).getFullYear() !== t;
  updateAttribute(n, u, "data-vc-date-disabled"), a && updateAttribute(a, u, "aria-disabled", "true"), a && updateAttribute(a, u, "tabindex", "-1"), updateAttribute(n, !e2.disableToday && e2.context.dateToday === o, "data-vc-date-today"), updateAttribute(n, !e2.disableToday && e2.context.dateToday === o, "aria-current", "date"), updateAttribute(n, null == (r = e2.selectedWeekends) ? void 0 : r.includes(l), "data-vc-date-weekend");
  const m = (null == (c = e2.selectedHolidays) ? void 0 : c[0]) ? parseDates(e2.selectedHolidays) : [];
  if (updateAttribute(n, m.includes(o), "data-vc-date-holiday"), (null == (d = e2.context.selectedDates) ? void 0 : d.includes(o)) ? (n.setAttribute("data-vc-date-selected", ""), a && a.setAttribute("aria-selected", "true"), e2.context.selectedDates.length > 1 && "multiple-ranged" === e2.selectionDatesMode && (e2.context.selectedDates[0] === o && e2.context.selectedDates[e2.context.selectedDates.length - 1] === o ? n.setAttribute("data-vc-date-selected", "first-and-last") : e2.context.selectedDates[0] === o ? n.setAttribute("data-vc-date-selected", "first") : e2.context.selectedDates[e2.context.selectedDates.length - 1] === o && n.setAttribute("data-vc-date-selected", "last"), e2.context.selectedDates[0] !== o && e2.context.selectedDates[e2.context.selectedDates.length - 1] !== o && n.setAttribute("data-vc-date-selected", "middle"))) : n.hasAttribute("data-vc-date-selected") && (n.removeAttribute("data-vc-date-selected"), a && a.removeAttribute("aria-selected")), !e2.context.disableDates.includes(o) && e2.enableEdgeDatesOnly && e2.context.selectedDates.length > 1 && "multiple-ranged" === e2.selectionDatesMode) {
    const t2 = getDate(e2.context.selectedDates[0]), a2 = getDate(e2.context.selectedDates[e2.context.selectedDates.length - 1]), l2 = getDate(o);
    updateAttribute(n, l2 > t2 && l2 < a2, "data-vc-date-selected", "middle");
  }
}, getLocaleString = (e2, t, n) => (/* @__PURE__ */ new Date(`${e2}T00:00:00.000Z`)).toLocaleString(t, n), getWeekNumber = (e2, t) => {
  const n = getDate(e2), a = (n.getDay() - t + 7) % 7;
  n.setDate(n.getDate() + 4 - a);
  const l = new Date(n.getFullYear(), 0, 1), o = Math.ceil(((+n - +l) / 864e5 + 1) / 7);
  return { year: n.getFullYear(), week: o };
}, addWeekNumberForDate = (e2, t, n) => {
  const a = getWeekNumber(n, e2.firstWeekday);
  a && (t.dataset.vcDateWeekNumber = String(a.week));
}, setDaysAsDisabled = (e2, t, n) => {
  var a, l, o, s, i;
  const r = null == (a = e2.disableWeekdays) ? void 0 : a.includes(n), c = e2.disableAllDates && !!(null == (l = e2.context.enableDates) ? void 0 : l[0]);
  !r && !c || (null == (o = e2.context.enableDates) ? void 0 : o.includes(t)) || (null == (s = e2.context.disableDates) ? void 0 : s.includes(t)) || (e2.context.disableDates.push(t), null == (i = e2.context.disableDates) || i.sort((e3, t2) => +new Date(e3) - +new Date(t2)));
}, createDate = (e2, t, n, a, l, o) => {
  const s = getDate(l).getDay(), i = "string" == typeof e2.locale && e2.locale.length ? e2.locale : "en", r = document.createElement("div");
  let c;
  r.className = e2.styles.date, r.dataset.vcDate = l, r.dataset.vcDateMonth = o, r.dataset.vcDateWeekDay = String(s), ("current" === o || e2.displayDatesOutside) && (c = document.createElement("button"), c.className = e2.styles.dateBtn, c.type = "button", c.role = "gridcell", c.ariaLabel = getLocaleString(l, i, { dateStyle: "long", timeZone: "UTC" }), c.dataset.vcDateBtn = "", c.innerText = String(a), r.appendChild(c)), e2.enableWeekNumbers && addWeekNumberForDate(e2, r, l), setDaysAsDisabled(e2, l, s), setDateModifier(e2, t, r, c, s, l, o), n.appendChild(r), e2.onCreateDateEls && e2.onCreateDateEls(e2, r);
}, createDatesFromCurrentMonth = (e2, t, n, a, l) => {
  for (let o = 1; o <= n; o++) {
    const n2 = new Date(a, l, o);
    createDate(e2, a, t, o, getDateString(n2), "current");
  }
}, createDatesFromNextMonth = (e2, t, n, a, l, o) => {
  const s = o + n, i = 7 * Math.ceil(s / 7) - s, r = l + 1 === 12 ? a + 1 : a, c = l + 1 === 12 ? "01" : l + 2 < 10 ? `0${l + 2}` : l + 2;
  for (let n2 = 1; n2 <= i; n2++) {
    const l2 = n2 < 10 ? `0${n2}` : String(n2);
    createDate(e2, a, t, n2, `${r}-${c}-${l2}`, "next");
  }
}, createDatesFromPrevMonth = (e2, t, n, a, l) => {
  let o = new Date(n, a, 0).getDate() - (l - 1);
  const s = 0 === a ? n - 1 : n, i = 0 === a ? 12 : a < 10 ? `0${a}` : a;
  for (let a2 = l; a2 > 0; a2--, o++) {
    createDate(e2, n, t, o, `${s}-${i}-${o}`, "prev");
  }
}, createWeekNumbers = (e2, t, n, a, l) => {
  if (!e2.enableWeekNumbers) return;
  a.textContent = "";
  const o = document.createElement("b");
  o.className = e2.styles.weekNumbersTitle, o.innerText = "#", o.dataset.vcWeekNumbers = "title", a.appendChild(o);
  const s = document.createElement("div");
  s.className = e2.styles.weekNumbersContent, s.dataset.vcWeekNumbers = "content", a.appendChild(s);
  const i = document.createElement("button");
  i.type = "button", i.className = e2.styles.weekNumber;
  const r = l.querySelectorAll("[data-vc-date]"), c = Math.ceil((t + n) / 7);
  for (let t2 = 0; t2 < c; t2++) {
    const n2 = r[0 === t2 ? 6 : 7 * t2].dataset.vcDate, a2 = getWeekNumber(n2, e2.firstWeekday);
    if (!a2) return;
    const l2 = i.cloneNode(true);
    l2.innerText = String(a2.week), l2.dataset.vcWeekNumber = String(a2.week), l2.dataset.vcWeekYear = String(a2.year), l2.role = "rowheader", l2.ariaLabel = `${a2.week}`, s.appendChild(l2);
  }
}, createDates = (e2) => {
  const t = new Date(e2.context.selectedYear, e2.context.selectedMonth, 1), n = e2.context.mainElement.querySelectorAll('[data-vc="dates"]'), a = e2.context.mainElement.querySelectorAll('[data-vc-week="numbers"]');
  n.forEach((n2, l) => {
    e2.selectionDatesMode || (n2.dataset.vcDatesDisabled = ""), n2.textContent = "";
    const o = new Date(t);
    o.setMonth(o.getMonth() + l);
    const s = o.getMonth(), i = o.getFullYear(), r = (new Date(i, s, 1).getDay() - e2.firstWeekday + 7) % 7, c = new Date(i, s + 1, 0).getDate();
    createDatesFromPrevMonth(e2, n2, i, s, r), createDatesFromCurrentMonth(e2, n2, c, i, s), createDatesFromNextMonth(e2, n2, c, i, s, r), createDatePopup(e2, n2), createWeekNumbers(e2, r, c, a[l], n2);
  });
}, layoutDefault = (e2) => `
  <div class="${e2.styles.header}" data-vc="header" role="toolbar" aria-label="${e2.labels.navigation}">
    <#ArrowPrev [month] />
    <div class="${e2.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [month] />
  </div>
  <div class="${e2.styles.wrapper}" data-vc="wrapper">
    <#WeekNumbers />
    <div class="${e2.styles.content}" data-vc="content">
      <#Week />
      <#Dates />
      <#DateRangeTooltip />
    </div>
  </div>
  <#ControlTime />
`, layoutMonths = (e2) => `
  <div class="${e2.styles.header}" data-vc="header" role="toolbar" aria-label="${e2.labels.navigation}">
    <div class="${e2.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
  </div>
  <div class="${e2.styles.wrapper}" data-vc="wrapper">
    <div class="${e2.styles.content}" data-vc="content">
      <#Months />
    </div>
  </div>
`, layoutMultiple = (e2) => `
  <div class="${e2.styles.controls}" data-vc="controls" role="toolbar" aria-label="${e2.labels.navigation}">
    <#ArrowPrev [month] />
    <#ArrowNext [month] />
  </div>
  <div class="${e2.styles.grid}" data-vc="grid">
    <#Multiple>
      <div class="${e2.styles.column}" data-vc="column" role="region">
        <div class="${e2.styles.header}" data-vc="header">
          <div class="${e2.styles.headerContent}" data-vc-header="content">
            <#Month />
            <#Year />
          </div>
        </div>
        <div class="${e2.styles.wrapper}" data-vc="wrapper">
          <#WeekNumbers />
          <div class="${e2.styles.content}" data-vc="content">
            <#Week />
            <#Dates />
          </div>
        </div>
      </div>
    <#/Multiple>
    <#DateRangeTooltip />
  </div>
  <#ControlTime />
`, layoutYears = (e2) => `
  <div class="${e2.styles.header}" data-vc="header" role="toolbar" aria-label="${e2.labels.navigation}">
    <#ArrowPrev [year] />
    <div class="${e2.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [year] />
  </div>
  <div class="${e2.styles.wrapper}" data-vc="wrapper">
    <div class="${e2.styles.content}" data-vc="content">
      <#Years />
    </div>
  </div>
`, ArrowNext = (e2, t) => `<button type="button" class="${e2.styles.arrowNext}" data-vc-arrow="next" aria-label="${e2.labels.arrowNext[t]}"></button>`, ArrowPrev = (e2, t) => `<button type="button" class="${e2.styles.arrowPrev}" data-vc-arrow="prev" aria-label="${e2.labels.arrowPrev[t]}"></button>`, ControlTime = (e2) => e2.selectionTimeMode ? `<div class="${e2.styles.time}" data-vc="time" role="group" aria-label="${e2.labels.selectingTime}"></div>` : "", DateRangeTooltip = (e2) => e2.onCreateDateRangeTooltip ? `<div class="${e2.styles.dateRangeTooltip}" data-vc-date-range-tooltip="hidden"></div>` : "", Dates = (e2) => `<div class="${e2.styles.dates}" data-vc="dates" role="grid" aria-live="assertive" aria-label="${e2.labels.dates}" ${"multiple" === e2.type ? "aria-multiselectable" : ""}></div>`, Month = (e2) => `<button type="button" class="${e2.styles.month}" data-vc="month"></button>`, Months = (e2) => `<div class="${e2.styles.months}" data-vc="months" role="grid" aria-live="assertive" aria-label="${e2.labels.months}"></div>`, Week = (e2) => `<div class="${e2.styles.week}" data-vc="week" role="row" aria-label="${e2.labels.week}"></div>`, WeekNumbers = (e2) => e2.enableWeekNumbers ? `<div class="${e2.styles.weekNumbers}" data-vc-week="numbers" role="row" aria-label="${e2.labels.weekNumber}"></div>` : "", Year = (e2) => `<button type="button" class="${e2.styles.year}" data-vc="year"></button>`, Years = (e2) => `<div class="${e2.styles.years}" data-vc="years" role="grid" aria-live="assertive" aria-label="${e2.labels.years}"></div>`, components = { ArrowNext, ArrowPrev, ControlTime, Dates, DateRangeTooltip, Month, Months, Week, WeekNumbers, Year, Years }, getComponent = (e2) => components[e2], parseLayout = (e2, t) => t.replace(/[\n\t]/g, "").replace(/<#(?!\/?Multiple)(.*?)>/g, (t2, n) => {
  const a = (n.match(/\[(.*?)\]/) || [])[1], l = n.replace(/[/\s\n\t]|\[(.*?)\]/g, ""), o = getComponent(l), s = o ? o(e2, null != a ? a : null) : "";
  return e2.sanitizerHTML(s);
}).replace(/[\n\t]/g, ""), parseMultipleLayout = (e2, t) => t.replace(new RegExp("<#Multiple>(.*?)<#\\/Multiple>", "gs"), (t2, n) => {
  const a = Array(e2.context.displayMonthsCount).fill(n).join("");
  return e2.sanitizerHTML(a);
}).replace(/[\n\t]/g, ""), createLayouts = (e2, t) => {
  const n = { default: layoutDefault, month: layoutMonths, year: layoutYears, multiple: layoutMultiple };
  if (Object.keys(n).forEach((t2) => {
    const a = t2;
    e2.layouts[a].length || (e2.layouts[a] = n[a](e2));
  }), e2.context.mainElement.className = e2.styles.calendar, e2.context.mainElement.dataset.vc = "calendar", e2.context.mainElement.dataset.vcType = e2.context.currentType, e2.context.mainElement.role = "application", e2.context.mainElement.tabIndex = 0, e2.context.mainElement.ariaLabel = e2.labels.application, "multiple" !== e2.context.currentType) {
    if ("multiple" === e2.type && t) {
      const n2 = e2.context.mainElement.querySelector('[data-vc="controls"]'), a = e2.context.mainElement.querySelector('[data-vc="grid"]'), l = t.closest('[data-vc="column"]');
      return n2 && e2.context.mainElement.removeChild(n2), a && (a.dataset.vcGrid = "hidden"), l && (l.dataset.vcColumn = e2.context.currentType), void (l && (l.innerHTML = e2.sanitizerHTML(parseLayout(e2, e2.layouts[e2.context.currentType]))));
    }
    e2.context.mainElement.innerHTML = e2.sanitizerHTML(parseLayout(e2, e2.layouts[e2.context.currentType]));
  } else e2.context.mainElement.innerHTML = e2.sanitizerHTML(parseMultipleLayout(e2, parseLayout(e2, e2.layouts[e2.context.currentType])));
}, setVisibilityArrows = (e2, t, n, a) => {
  e2.style.visibility = n ? "hidden" : "", t.style.visibility = a ? "hidden" : "";
}, handleDefaultType = (e2, t, n) => {
  const a = getDate(getDateString(new Date(e2.context.selectedYear, e2.context.selectedMonth, 1))), l = new Date(a.getTime()), o = new Date(a.getTime());
  l.setMonth(l.getMonth() - e2.monthsToSwitch), o.setMonth(o.getMonth() + e2.monthsToSwitch);
  const s = getDate(e2.context.dateMin), i = getDate(e2.context.dateMax);
  e2.selectionYearsMode || (s.setFullYear(a.getFullYear()), i.setFullYear(a.getFullYear()));
  const r = !e2.selectionMonthsMode || l.getFullYear() < s.getFullYear() || l.getFullYear() === s.getFullYear() && l.getMonth() < s.getMonth(), c = !e2.selectionMonthsMode || o.getFullYear() > i.getFullYear() || o.getFullYear() === i.getFullYear() && o.getMonth() > i.getMonth() - (e2.context.displayMonthsCount - 1);
  setVisibilityArrows(t, n, r, c);
}, handleYearType = (e2, t, n) => {
  const a = getDate(e2.context.dateMin), l = getDate(e2.context.dateMax), o = !!(a.getFullYear() && e2.context.displayYear - 7 <= a.getFullYear()), s = !!(l.getFullYear() && e2.context.displayYear + 7 >= l.getFullYear());
  setVisibilityArrows(t, n, o, s);
}, visibilityArrows = (e2) => {
  if ("month" === e2.context.currentType) return;
  const t = e2.context.mainElement.querySelector('[data-vc-arrow="prev"]'), n = e2.context.mainElement.querySelector('[data-vc-arrow="next"]');
  if (!t || !n) return;
  ({ default: () => handleDefaultType(e2, t, n), year: () => handleYearType(e2, t, n) })["multiple" === e2.context.currentType ? "default" : e2.context.currentType]();
}, visibilityHandler = (e2, t, n, a, l) => {
  const o = new Date(a.setFullYear(e2.context.selectedYear, e2.context.selectedMonth + n)).getFullYear(), s = new Date(a.setMonth(e2.context.selectedMonth + n)).getMonth(), i = e2.context.locale.months.long[s], r = t.closest('[data-vc="column"]');
  r && (r.ariaLabel = `${i} ${o}`);
  const c = { month: { id: s, label: i }, year: { id: o, label: o } };
  t.innerText = String(c[l].label), t.dataset[`vc${l.charAt(0).toUpperCase() + l.slice(1)}`] = String(c[l].id), t.ariaLabel = `${e2.labels[l]} ${c[l].label}`;
  const d = { month: e2.selectionMonthsMode, year: e2.selectionYearsMode }, u = false === d[l] || "only-arrows" === d[l];
  u && (t.tabIndex = -1), t.disabled = u;
}, visibilityTitle = (e2) => {
  const t = e2.context.mainElement.querySelectorAll('[data-vc="month"]'), n = e2.context.mainElement.querySelectorAll('[data-vc="year"]'), a = new Date(e2.context.selectedYear, e2.context.selectedMonth, 1);
  [t, n].forEach((t2) => null == t2 ? void 0 : t2.forEach((t3, n2) => visibilityHandler(e2, t3, n2, a, t3.dataset.vc)));
}, setYearModifier = (e2, t, n, a, l) => {
  var o;
  const s = { month: "[data-vc-months-month]", year: "[data-vc-years-year]" }, i = { month: { selected: "data-vc-months-month-selected", aria: "aria-selected", value: "vcMonthsMonth", selectedProperty: "selectedMonth" }, year: { selected: "data-vc-years-year-selected", aria: "aria-selected", value: "vcYearsYear", selectedProperty: "selectedYear" } };
  l && (null == (o = e2.context.mainElement.querySelectorAll(s[n])) || o.forEach((e3) => {
    e3.removeAttribute(i[n].selected), e3.removeAttribute(i[n].aria);
  }), setContext(e2, i[n].selectedProperty, Number(t.dataset[i[n].value])), visibilityTitle(e2), "year" === n && visibilityArrows(e2)), a && (t.setAttribute(i[n].selected, ""), t.setAttribute(i[n].aria, "true"));
}, getColumnID = (e2, t) => {
  var n;
  if ("multiple" !== e2.type) return { currentValue: null, columnID: 0 };
  const a = e2.context.mainElement.querySelectorAll('[data-vc="column"]'), l = Array.from(a).findIndex((e3) => e3.closest(`[data-vc-column="${t}"]`));
  return { currentValue: l >= 0 ? Number(null == (n = a[l].querySelector(`[data-vc="${t}"]`)) ? void 0 : n.getAttribute(`data-vc-${t}`)) : null, columnID: Math.max(l, 0) };
}, createMonthEl = (e2, t, n, a, l, o, s) => {
  const i = t.cloneNode(false);
  return i.className = e2.styles.monthsMonth, i.innerText = a, i.ariaLabel = l, i.role = "gridcell", i.dataset.vcMonthsMonth = `${s}`, o && (i.ariaDisabled = "true"), o && (i.tabIndex = -1), i.disabled = o, setYearModifier(e2, i, "month", n === s, false), i;
}, createMonths = (e2, t) => {
  var n, a;
  const l = null == (n = null == t ? void 0 : t.closest('[data-vc="header"]')) ? void 0 : n.querySelector('[data-vc="year"]'), o = l ? Number(l.dataset.vcYear) : e2.context.selectedYear, s = (null == t ? void 0 : t.dataset.vcMonth) ? Number(t.dataset.vcMonth) : e2.context.selectedMonth;
  setContext(e2, "currentType", "month"), createLayouts(e2, t), visibilityTitle(e2);
  const i = e2.context.mainElement.querySelector('[data-vc="months"]');
  if (!e2.selectionMonthsMode || !i) return;
  const r = e2.monthsToSwitch > 1 ? e2.context.locale.months.long.map((t2, n2) => s - e2.monthsToSwitch * n2).concat(e2.context.locale.months.long.map((t2, n2) => s + e2.monthsToSwitch * n2)).filter((e3) => e3 >= 0 && e3 <= 12) : Array.from(Array(12).keys()), c = document.createElement("button");
  c.type = "button";
  for (let t2 = 0; t2 < 12; t2++) {
    const n2 = getDate(e2.context.dateMin), a2 = getDate(e2.context.dateMax), l2 = e2.context.displayMonthsCount - 1, { columnID: d } = getColumnID(e2, "month"), u = o <= n2.getFullYear() && t2 < n2.getMonth() + d || o >= a2.getFullYear() && t2 > a2.getMonth() - l2 + d || o > a2.getFullYear() || t2 !== s && !r.includes(t2), m = createMonthEl(e2, c, s, e2.context.locale.months.short[t2], e2.context.locale.months.long[t2], u, t2);
    i.appendChild(m), e2.onCreateMonthEls && e2.onCreateMonthEls(e2, m);
  }
  null == (a = e2.context.mainElement.querySelector("[data-vc-months-month]:not([disabled])")) || a.focus();
}, TimeInput = (e2, t, n, a, l) => `
  <label class="${t}" data-vc-time-input="${e2}">
    <input type="text" name="${e2}" maxlength="2" aria-label="${n[`input${e2.charAt(0).toUpperCase() + e2.slice(1)}`]}" value="${a}" ${l ? "disabled" : ""}>
  </label>
`, TimeRange = (e2, t, n, a, l, o, s) => `
  <label class="${t}" data-vc-time-range="${e2}">
    <input type="range" name="${e2}" min="${a}" max="${l}" step="${o}" aria-label="${n[`range${e2.charAt(0).toUpperCase() + e2.slice(1)}`]}" value="${s}">
  </label>
`, handleActions = (e2, t, n, a) => {
  ({ hour: () => setContext(e2, "selectedHours", n), minute: () => setContext(e2, "selectedMinutes", n) })[a](), setContext(e2, "selectedTime", `${e2.context.selectedHours}:${e2.context.selectedMinutes}${e2.context.selectedKeeping ? ` ${e2.context.selectedKeeping}` : ""}`), e2.onChangeTime && e2.onChangeTime(e2, t, false), e2.inputMode && e2.context.inputElement && e2.context.mainElement && e2.onChangeToInput && e2.onChangeToInput(e2, t);
}, transformTime24 = (e2, t) => {
  var n;
  return (null == (n = { 0: { AM: "00", PM: "12" }, 1: { AM: "01", PM: "13" }, 2: { AM: "02", PM: "14" }, 3: { AM: "03", PM: "15" }, 4: { AM: "04", PM: "16" }, 5: { AM: "05", PM: "17" }, 6: { AM: "06", PM: "18" }, 7: { AM: "07", PM: "19" }, 8: { AM: "08", PM: "20" }, 9: { AM: "09", PM: "21" }, 10: { AM: "10", PM: "22" }, 11: { AM: "11", PM: "23" }, 12: { AM: "00", PM: "12" } }[Number(e2)]) ? void 0 : n[t]) || String(e2);
}, handleClickKeepingTime = (e2, t, n, a, l) => {
  const o = (o2) => {
    const s = "AM" === e2.context.selectedKeeping ? "PM" : "AM", i = transformTime24(e2.context.selectedHours, s);
    Number(i) <= a && Number(i) >= l ? (setContext(e2, "selectedKeeping", s), n.value = i, handleActions(e2, o2, e2.context.selectedHours, "hour"), t.ariaLabel = `${e2.labels.btnKeeping} ${e2.context.selectedKeeping}`, t.innerText = e2.context.selectedKeeping) : e2.onChangeTime && e2.onChangeTime(e2, o2, true);
  };
  return t.addEventListener("click", o), () => {
    t.removeEventListener("click", o);
  };
}, transformTime12 = (e2) => ({ 0: "12", 13: "01", 14: "02", 15: "03", 16: "04", 17: "05", 18: "06", 19: "07", 20: "08", 21: "09", 22: "10", 23: "11" })[Number(e2)] || String(e2), updateInputAndRange = (e2, t, n, a) => {
  e2.value = n, t.value = a;
}, updateKeepingTime$1 = (e2, t, n) => {
  t && n && (setContext(e2, "selectedKeeping", n), t.innerText = n);
}, handleInput$1 = (e2, t, n, a, l, o, s) => {
  const i = { hour: (i2, r2, c) => {
    if (!e2.selectionTimeMode) return;
    ({ 12: () => {
      if (!e2.context.selectedKeeping) return;
      const d = Number(transformTime24(r2, e2.context.selectedKeeping));
      if (!(d <= o && d >= s)) return updateInputAndRange(n, t, e2.context.selectedHours, e2.context.selectedHours), void (e2.onChangeTime && e2.onChangeTime(e2, c, true));
      updateInputAndRange(n, t, transformTime12(r2), transformTime24(r2, e2.context.selectedKeeping)), i2 > 12 && updateKeepingTime$1(e2, a, "PM"), handleActions(e2, c, transformTime12(r2), l);
    }, 24: () => {
      if (!(i2 <= o && i2 >= s)) return updateInputAndRange(n, t, e2.context.selectedHours, e2.context.selectedHours), void (e2.onChangeTime && e2.onChangeTime(e2, c, true));
      updateInputAndRange(n, t, r2, r2), handleActions(e2, c, r2, l);
    } })[e2.selectionTimeMode]();
  }, minute: (a2, i2, r2) => {
    if (!(a2 <= o && a2 >= s)) return n.value = e2.context.selectedMinutes, void (e2.onChangeTime && e2.onChangeTime(e2, r2, true));
    n.value = i2, t.value = i2, handleActions(e2, r2, i2, l);
  } }, r = (e3) => {
    const t2 = Number(n.value), a2 = n.value.padStart(2, "0");
    i[l] && i[l](t2, a2, e3);
  };
  return n.addEventListener("change", r), () => {
    n.removeEventListener("change", r);
  };
}, updateInputAndTime = (e2, t, n, a, l) => {
  t.value = l, handleActions(e2, n, l, a);
}, updateKeepingTime = (e2, t, n) => {
  t && (setContext(e2, "selectedKeeping", n), t.innerText = n);
}, handleRange = (e2, t, n, a, l) => {
  const o = (o2) => {
    const s = Number(t.value), i = t.value.padStart(2, "0"), r = "hour" === l, c = 24 === e2.selectionTimeMode, d = s > 0 && s < 12;
    r && !c && updateKeepingTime(e2, a, 0 === s || d ? "AM" : "PM"), updateInputAndTime(e2, n, o2, l, !r || c || d ? i : transformTime12(t.value));
  };
  return t.addEventListener("input", o), () => {
    t.removeEventListener("input", o);
  };
}, handleMouseOver = (e2) => e2.setAttribute("data-vc-input-focus", ""), handleMouseOut = (e2) => e2.removeAttribute("data-vc-input-focus"), handleTime = (e2, t) => {
  const n = t.querySelector('[data-vc-time-range="hour"] input[name="hour"]'), a = t.querySelector('[data-vc-time-range="minute"] input[name="minute"]'), l = t.querySelector('[data-vc-time-input="hour"] input[name="hour"]'), o = t.querySelector('[data-vc-time-input="minute"] input[name="minute"]'), s = t.querySelector('[data-vc-time="keeping"]');
  if (!(n && a && l && o)) return;
  const i = (e3) => {
    e3.target === n && handleMouseOver(l), e3.target === a && handleMouseOver(o);
  }, r = (e3) => {
    e3.target === n && handleMouseOut(l), e3.target === a && handleMouseOut(o);
  };
  return t.addEventListener("mouseover", i), t.addEventListener("mouseout", r), handleInput$1(e2, n, l, s, "hour", e2.timeMaxHour, e2.timeMinHour), handleInput$1(e2, a, o, s, "minute", e2.timeMaxMinute, e2.timeMinMinute), handleRange(e2, n, l, s, "hour"), handleRange(e2, a, o, s, "minute"), s && handleClickKeepingTime(e2, s, n, e2.timeMaxHour, e2.timeMinHour), () => {
    t.removeEventListener("mouseover", i), t.removeEventListener("mouseout", r);
  };
}, createTime = (e2) => {
  const t = e2.context.mainElement.querySelector('[data-vc="time"]');
  if (!e2.selectionTimeMode || !t) return;
  const [n, a] = [e2.timeMinHour, e2.timeMaxHour], [l, o] = [e2.timeMinMinute, e2.timeMaxMinute], s = e2.context.selectedKeeping ? transformTime24(e2.context.selectedHours, e2.context.selectedKeeping) : e2.context.selectedHours, i = "range" === e2.timeControls;
  var r;
  t.innerHTML = e2.sanitizerHTML(`
    <div class="${e2.styles.timeContent}" data-vc-time="content">
      ${TimeInput("hour", e2.styles.timeHour, e2.labels, e2.context.selectedHours, i)}
      ${TimeInput("minute", e2.styles.timeMinute, e2.labels, e2.context.selectedMinutes, i)}
      ${12 === e2.selectionTimeMode ? (r = e2.context.selectedKeeping, `<button type="button" class="${e2.styles.timeKeeping}" aria-label="${e2.labels.btnKeeping} ${r}" data-vc-time="keeping" ${i ? "disabled" : ""}>${r}</button>`) : ""}
    </div>
    <div class="${e2.styles.timeRanges}" data-vc-time="ranges">
      ${TimeRange("hour", e2.styles.timeRange, e2.labels, n, a, e2.timeStepHour, s)}
      ${TimeRange("minute", e2.styles.timeRange, e2.labels, l, o, e2.timeStepMinute, e2.context.selectedMinutes)}
    </div>
  `), handleTime(e2, t);
}, createWeek = (e2) => {
  const t = e2.selectedWeekends ? [...e2.selectedWeekends] : [], n = [...e2.context.locale.weekdays.long].reduce((n2, a2, l) => [...n2, { id: l, titleShort: e2.context.locale.weekdays.short[l], titleLong: a2, isWeekend: t.includes(l) }], []), a = [...n.slice(e2.firstWeekday), ...n.slice(0, e2.firstWeekday)];
  e2.context.mainElement.querySelectorAll('[data-vc="week"]').forEach((t2) => {
    const n2 = e2.onClickWeekDay ? document.createElement("button") : document.createElement("b");
    e2.onClickWeekDay && (n2.type = "button"), a.forEach((a2) => {
      const l = n2.cloneNode(true);
      l.innerText = a2.titleShort, l.className = e2.styles.weekDay, l.role = "columnheader", l.ariaLabel = a2.titleLong, l.dataset.vcWeekDay = String(a2.id), a2.isWeekend && (l.dataset.vcWeekDayOff = ""), t2.appendChild(l);
    });
  });
}, createYearEl = (e2, t, n, a, l) => {
  const o = t.cloneNode(false);
  return o.className = e2.styles.yearsYear, o.innerText = String(l), o.ariaLabel = String(l), o.role = "gridcell", o.dataset.vcYearsYear = `${l}`, a && (o.ariaDisabled = "true"), a && (o.tabIndex = -1), o.disabled = a, setYearModifier(e2, o, "year", n === l, false), o;
}, createYears = (e2, t) => {
  var n;
  const a = (null == t ? void 0 : t.dataset.vcYear) ? Number(t.dataset.vcYear) : e2.context.selectedYear;
  setContext(e2, "currentType", "year"), createLayouts(e2, t), visibilityTitle(e2), visibilityArrows(e2);
  const l = e2.context.mainElement.querySelector('[data-vc="years"]');
  if (!e2.selectionYearsMode || !l) return;
  const o = "multiple" !== e2.type || e2.context.selectedYear === a ? 0 : 1, s = document.createElement("button");
  s.type = "button";
  for (let t2 = e2.context.displayYear - 7; t2 < e2.context.displayYear + 8; t2++) {
    const n2 = t2 < getDate(e2.context.dateMin).getFullYear() + o || t2 > getDate(e2.context.dateMax).getFullYear(), i = createYearEl(e2, s, a, n2, t2);
    l.appendChild(i), e2.onCreateYearEls && e2.onCreateYearEls(e2, i);
  }
  null == (n = e2.context.mainElement.querySelector("[data-vc-years-year]:not([disabled])")) || n.focus();
}, trackChangesHTMLElement = (e2, t, n) => {
  new MutationObserver((e3) => {
    for (let a = 0; a < e3.length; a++) {
      if (e3[a].attributeName === t) {
        n();
        break;
      }
    }
  }).observe(e2, { attributes: true });
}, haveListener = { value: false, set: () => haveListener.value = true, check: () => haveListener.value }, setTheme = (e2, t) => e2.dataset.vcTheme = t, trackChangesThemeInSystemSettings = (e2, t) => {
  if (setTheme(e2.context.mainElement, t.matches ? "dark" : "light"), "system" !== e2.selectedTheme || haveListener.check()) return;
  const n = (e3) => {
    const t2 = document.querySelectorAll('[data-vc="calendar"]');
    null == t2 || t2.forEach((t3) => setTheme(t3, e3.matches ? "dark" : "light"));
  };
  t.addEventListener ? t.addEventListener("change", n) : t.addListener(n), haveListener.set();
}, detectTheme = (e2, t) => {
  const n = e2.themeAttrDetect.length ? document.querySelector(e2.themeAttrDetect) : null, a = e2.themeAttrDetect.replace(/^.*\[(.+)\]/g, (e3, t2) => t2);
  if (!n || "system" === n.getAttribute(a)) return void trackChangesThemeInSystemSettings(e2, t);
  const l = n.getAttribute(a);
  l ? (setTheme(e2.context.mainElement, l), trackChangesHTMLElement(n, a, () => {
    const t2 = n.getAttribute(a);
    t2 && setTheme(e2.context.mainElement, t2);
  })) : trackChangesThemeInSystemSettings(e2, t);
}, handleTheme = (e2) => {
  "not all" !== window.matchMedia("(prefers-color-scheme)").media ? "system" === e2.selectedTheme ? detectTheme(e2, window.matchMedia("(prefers-color-scheme: dark)")) : setTheme(e2.context.mainElement, e2.selectedTheme) : setTheme(e2.context.mainElement, "light");
}, capitalizeFirstLetter = (e2) => e2.charAt(0).toUpperCase() + e2.slice(1).replace(/\./, ""), getLocaleWeekday = (e2, t, n) => {
  const a = /* @__PURE__ */ new Date(`1978-01-0${t + 1}T00:00:00.000Z`), l = a.toLocaleString(n, { weekday: "short", timeZone: "UTC" }), o = a.toLocaleString(n, { weekday: "long", timeZone: "UTC" });
  e2.context.locale.weekdays.short.push(capitalizeFirstLetter(l)), e2.context.locale.weekdays.long.push(capitalizeFirstLetter(o));
}, getLocaleMonth = (e2, t, n) => {
  const a = /* @__PURE__ */ new Date(`1978-${String(t + 1).padStart(2, "0")}-01T00:00:00.000Z`), l = a.toLocaleString(n, { month: "short", timeZone: "UTC" }), o = a.toLocaleString(n, { month: "long", timeZone: "UTC" });
  e2.context.locale.months.short.push(capitalizeFirstLetter(l)), e2.context.locale.months.long.push(capitalizeFirstLetter(o));
}, getLocale = (e2) => {
  var t, n, a, l, o, s, i, r;
  if (!(e2.context.locale.weekdays.short[6] && e2.context.locale.weekdays.long[6] && e2.context.locale.months.short[11] && e2.context.locale.months.long[11])) if ("string" == typeof e2.locale) {
    if ("string" == typeof e2.locale && !e2.locale.length) throw new Error(errorMessages.notLocale);
    Array.from({ length: 7 }, (t2, n2) => getLocaleWeekday(e2, n2, e2.locale)), Array.from({ length: 12 }, (t2, n2) => getLocaleMonth(e2, n2, e2.locale));
  } else {
    if (!((null == (n = null == (t = e2.locale) ? void 0 : t.weekdays) ? void 0 : n.short[6]) && (null == (l = null == (a = e2.locale) ? void 0 : a.weekdays) ? void 0 : l.long[6]) && (null == (s = null == (o = e2.locale) ? void 0 : o.months) ? void 0 : s.short[11]) && (null == (r = null == (i = e2.locale) ? void 0 : i.months) ? void 0 : r.long[11]))) throw new Error(errorMessages.notLocale);
    setContext(e2, "locale", __spreadValues({}, e2.locale));
  }
}, create = (e2) => {
  const t = { default: () => {
    createWeek(e2), createDates(e2);
  }, multiple: () => {
    createWeek(e2), createDates(e2);
  }, month: () => createMonths(e2), year: () => createYears(e2) };
  handleTheme(e2), getLocale(e2), createLayouts(e2), visibilityTitle(e2), visibilityArrows(e2), createTime(e2), t[e2.context.currentType]();
}, handleArrowKeys = (e2) => {
  const t = (t2) => {
    var n;
    const a = t2.target;
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(t2.key) || "button" !== a.localName) return;
    const l = Array.from(e2.context.mainElement.querySelectorAll('[data-vc="calendar"] button')), o = l.indexOf(a);
    if (-1 === o) return;
    const s = (i = l[o]).hasAttribute("data-vc-date-btn") ? 7 : i.hasAttribute("data-vc-months-month") ? 4 : i.hasAttribute("data-vc-years-year") ? 5 : 1;
    var i;
    const r = (0, { ArrowUp: () => Math.max(0, o - s), ArrowDown: () => Math.min(l.length - 1, o + s), ArrowLeft: () => Math.max(0, o - 1), ArrowRight: () => Math.min(l.length - 1, o + 1) }[t2.key])();
    null == (n = l[r]) || n.focus();
  };
  return e2.context.mainElement.addEventListener("keydown", t), () => e2.context.mainElement.removeEventListener("keydown", t);
}, handleMonth = (e2, t) => {
  const n = getDate(getDateString(new Date(e2.context.selectedYear, e2.context.selectedMonth, 1)));
  ({ prev: () => n.setMonth(n.getMonth() - e2.monthsToSwitch), next: () => n.setMonth(n.getMonth() + e2.monthsToSwitch) })[t](), setContext(e2, "selectedMonth", n.getMonth()), setContext(e2, "selectedYear", n.getFullYear()), visibilityTitle(e2), visibilityArrows(e2), createDates(e2);
}, handleClickArrow = (e2, t) => {
  const n = t.target.closest("[data-vc-arrow]");
  if (n) {
    if (["default", "multiple"].includes(e2.context.currentType)) handleMonth(e2, n.dataset.vcArrow);
    else if ("year" === e2.context.currentType && void 0 !== e2.context.displayYear) {
      const a = { prev: -15, next: 15 }[n.dataset.vcArrow];
      setContext(e2, "displayYear", e2.context.displayYear + a), createYears(e2, t.target);
    }
    e2.onClickArrow && e2.onClickArrow(e2, t);
  }
}, canToggleSelection = (e2) => void 0 === e2.enableDateToggle || ("function" == typeof e2.enableDateToggle ? e2.enableDateToggle(e2) : e2.enableDateToggle), handleSelectDate = (e2, t, n) => {
  const a = t.dataset.vcDate, l = t.closest("[data-vc-date][data-vc-date-selected]"), o = canToggleSelection(e2);
  if (l && !o) return;
  const s = l ? e2.context.selectedDates.filter((e3) => e3 !== a) : n ? [...e2.context.selectedDates, a] : [a];
  setContext(e2, "selectedDates", s);
}, createDateRangeTooltip = (e2, t, n) => {
  if (!t) return;
  if (!n) return t.dataset.vcDateRangeTooltip = "hidden", void (t.textContent = "");
  const a = e2.context.mainElement.getBoundingClientRect(), l = n.getBoundingClientRect();
  t.style.left = l.left - a.left + l.width / 2 + "px", t.style.top = l.bottom - a.top - l.height + "px", t.dataset.vcDateRangeTooltip = "visible", t.innerHTML = e2.sanitizerHTML(e2.onCreateDateRangeTooltip(e2, n, t, l, a));
}, state = { self: null, lastDateEl: null, isHovering: false, rangeMin: void 0, rangeMax: void 0, tooltipEl: null, timeoutId: null }, addHoverEffect = (e2, t, n) => {
  var a, l, o;
  if (!(null == (l = null == (a = state.self) ? void 0 : a.context) ? void 0 : l.selectedDates[0])) return;
  const s = getDateString(e2);
  (null == (o = state.self.context.disableDates) ? void 0 : o.includes(s)) || (state.self.context.mainElement.querySelectorAll(`[data-vc-date="${s}"]`).forEach((e3) => e3.dataset.vcDateHover = ""), t.forEach((e3) => e3.dataset.vcDateHover = "first"), n.forEach((e3) => {
    "first" === e3.dataset.vcDateHover ? e3.dataset.vcDateHover = "first-and-last" : e3.dataset.vcDateHover = "last";
  }));
}, removeHoverEffect = () => {
  var e2, t;
  if (!(null == (t = null == (e2 = state.self) ? void 0 : e2.context) ? void 0 : t.mainElement)) return;
  state.self.context.mainElement.querySelectorAll("[data-vc-date-hover]").forEach((e3) => e3.removeAttribute("data-vc-date-hover"));
}, handleHoverDatesEvent = (e2) => {
  var t, n;
  if (!e2.target || !(null == (n = null == (t = state.self) ? void 0 : t.context) ? void 0 : n.selectedDates[0])) return;
  if (!e2.target.closest('[data-vc="dates"]')) return state.lastDateEl = null, createDateRangeTooltip(state.self, state.tooltipEl, null), void removeHoverEffect();
  const a = e2.target.closest("[data-vc-date]");
  if (!a || state.lastDateEl === a) return;
  state.lastDateEl = a, createDateRangeTooltip(state.self, state.tooltipEl, a), removeHoverEffect();
  const l = a.dataset.vcDate, o = getDate(state.self.context.selectedDates[0]), s = getDate(l), i = state.self.context.mainElement.querySelectorAll(`[data-vc-date="${state.self.context.selectedDates[0]}"]`), r = state.self.context.mainElement.querySelectorAll(`[data-vc-date="${l}"]`), [c, d] = o < s ? [i, r] : [r, i], [u, m] = o < s ? [o, s] : [s, o];
  for (let e3 = new Date(u); e3 <= m; e3.setDate(e3.getDate() + 1)) addHoverEffect(e3, c, d);
}, handleHoverSelectedDatesRangeEvent = (e2) => {
  const t = e2.target.closest("[data-vc-date-selected]");
  if (!t && state.lastDateEl) return state.lastDateEl = null, void createDateRangeTooltip(state.self, state.tooltipEl, null);
  t && state.lastDateEl !== t && (state.lastDateEl = t, createDateRangeTooltip(state.self, state.tooltipEl, t));
}, optimizedHoverHandler = (e2) => (t) => {
  state.isHovering || (state.isHovering = true, requestAnimationFrame(() => {
    e2(t), state.isHovering = false;
  }));
}, optimizedHandleHoverDatesEvent = optimizedHoverHandler(handleHoverDatesEvent), optimizedHandleHoverSelectedDatesRangeEvent = optimizedHoverHandler(handleHoverSelectedDatesRangeEvent), handleCancelSelectionDates = (e2) => {
  state.self && "Escape" === e2.key && (state.lastDateEl = null, setContext(state.self, "selectedDates", []), state.self.context.mainElement.removeEventListener("mousemove", optimizedHandleHoverDatesEvent), state.self.context.mainElement.removeEventListener("keydown", handleCancelSelectionDates), createDateRangeTooltip(state.self, state.tooltipEl, null), removeHoverEffect());
}, handleMouseLeave = () => {
  null !== state.timeoutId && clearTimeout(state.timeoutId), state.timeoutId = setTimeout(() => {
    state.lastDateEl = null, createDateRangeTooltip(state.self, state.tooltipEl, null), removeHoverEffect();
  }, 50);
}, updateDisabledDates = () => {
  var e2, t, n, a;
  if (!(null == (n = null == (t = null == (e2 = state.self) ? void 0 : e2.context) ? void 0 : t.selectedDates) ? void 0 : n[0]) || !(null == (a = state.self.context.disableDates) ? void 0 : a[0])) return;
  const l = getDate(state.self.context.selectedDates[0]), [o, s] = state.self.context.disableDates.map((e3) => getDate(e3)).reduce(([e3, t2], n2) => [l >= n2 ? n2 : e3, l < n2 && null === t2 ? n2 : t2], [null, null]);
  o && setContext(state.self, "displayDateMin", getDateString(new Date(o.setDate(o.getDate() + 1)))), s && setContext(state.self, "displayDateMax", getDateString(new Date(s.setDate(s.getDate() - 1))));
  state.self.disableDatesPast && !state.self.disableAllDates && getDate(state.self.context.displayDateMin) < getDate(state.self.context.dateToday) && setContext(state.self, "displayDateMin", state.self.context.dateToday);
}, handleSelectDateRange = (e2, t) => {
  state.self = e2, state.lastDateEl = t, removeHoverEffect(), e2.disableDatesGaps && (state.rangeMin = state.rangeMin ? state.rangeMin : e2.context.displayDateMin, state.rangeMax = state.rangeMax ? state.rangeMax : e2.context.displayDateMax), e2.onCreateDateRangeTooltip && (state.tooltipEl = e2.context.mainElement.querySelector("[data-vc-date-range-tooltip]"));
  const n = null == t ? void 0 : t.dataset.vcDate;
  if (n) {
    const t2 = 1 === e2.context.selectedDates.length && e2.context.selectedDates[0].includes(n), a = t2 && !canToggleSelection(e2) ? [n, n] : t2 && canToggleSelection(e2) ? [] : e2.context.selectedDates.length > 1 ? [n] : [...e2.context.selectedDates, n];
    setContext(e2, "selectedDates", a), e2.context.selectedDates.length > 1 && e2.context.selectedDates.sort((e3, t3) => +new Date(e3) - +new Date(t3));
  }
  ({ set: () => (e2.disableDatesGaps && updateDisabledDates(), createDateRangeTooltip(state.self, state.tooltipEl, t), state.self.context.mainElement.removeEventListener("mousemove", optimizedHandleHoverSelectedDatesRangeEvent), state.self.context.mainElement.removeEventListener("mouseleave", handleMouseLeave), state.self.context.mainElement.removeEventListener("keydown", handleCancelSelectionDates), state.self.context.mainElement.addEventListener("mousemove", optimizedHandleHoverDatesEvent), state.self.context.mainElement.addEventListener("mouseleave", handleMouseLeave), state.self.context.mainElement.addEventListener("keydown", handleCancelSelectionDates), () => {
    state.self.context.mainElement.removeEventListener("mousemove", optimizedHandleHoverDatesEvent), state.self.context.mainElement.removeEventListener("mouseleave", handleMouseLeave), state.self.context.mainElement.removeEventListener("keydown", handleCancelSelectionDates);
  }), reset: () => {
    const [n2, a] = [e2.context.selectedDates[0], e2.context.selectedDates[e2.context.selectedDates.length - 1]], l = e2.context.selectedDates[0] !== e2.context.selectedDates[e2.context.selectedDates.length - 1], o = parseDates([`${n2}:${a}`]).filter((t2) => !e2.context.disableDates.includes(t2)), s = l ? e2.enableEdgeDatesOnly ? [n2, a] : o : [e2.context.selectedDates[0], e2.context.selectedDates[0]];
    if (setContext(e2, "selectedDates", s), e2.disableDatesGaps && (setContext(e2, "displayDateMin", state.rangeMin), setContext(e2, "displayDateMax", state.rangeMax)), state.self.context.mainElement.removeEventListener("mousemove", optimizedHandleHoverDatesEvent), state.self.context.mainElement.removeEventListener("mouseleave", handleMouseLeave), state.self.context.mainElement.removeEventListener("keydown", handleCancelSelectionDates), e2.onCreateDateRangeTooltip) return e2.context.selectedDates[0] || (state.self.context.mainElement.removeEventListener("mousemove", optimizedHandleHoverSelectedDatesRangeEvent), state.self.context.mainElement.removeEventListener("mouseleave", handleMouseLeave), createDateRangeTooltip(state.self, state.tooltipEl, null)), e2.context.selectedDates[0] && (state.self.context.mainElement.addEventListener("mousemove", optimizedHandleHoverSelectedDatesRangeEvent), state.self.context.mainElement.addEventListener("mouseleave", handleMouseLeave), createDateRangeTooltip(state.self, state.tooltipEl, t)), () => {
      state.self.context.mainElement.removeEventListener("mousemove", optimizedHandleHoverSelectedDatesRangeEvent), state.self.context.mainElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  } })[1 === e2.context.selectedDates.length ? "set" : "reset"]();
}, updateDateModifier = (e2) => {
  e2.context.mainElement.querySelectorAll("[data-vc-date]").forEach((t) => {
    const n = t.querySelector("[data-vc-date-btn]"), a = t.dataset.vcDate, l = getDate(a).getDay();
    setDateModifier(e2, e2.context.selectedYear, t, n, l, a, "current");
  });
}, handleClickDate = (e2, t) => {
  var n;
  const a = t.target, l = a.closest("[data-vc-date-btn]");
  if (!e2.selectionDatesMode || !["single", "multiple", "multiple-ranged"].includes(e2.selectionDatesMode) || !l) return;
  const o = l.closest("[data-vc-date]");
  ({ single: () => handleSelectDate(e2, o, false), multiple: () => handleSelectDate(e2, o, true), "multiple-ranged": () => handleSelectDateRange(e2, o) })[e2.selectionDatesMode](), null == (n = e2.context.selectedDates) || n.sort((e3, t2) => +new Date(e3) - +new Date(t2)), e2.onClickDate && e2.onClickDate(e2, t), e2.inputMode && e2.context.inputElement && e2.context.mainElement && e2.onChangeToInput && e2.onChangeToInput(e2, t);
  const s = a.closest('[data-vc-date-month="prev"]'), i = a.closest('[data-vc-date-month="next"]');
  ({ prev: () => e2.enableMonthChangeOnDayClick ? handleMonth(e2, "prev") : updateDateModifier(e2), next: () => e2.enableMonthChangeOnDayClick ? handleMonth(e2, "next") : updateDateModifier(e2), current: () => updateDateModifier(e2) })[s ? "prev" : i ? "next" : "current"]();
}, typeClick = ["month", "year"], getValue = (e2, t, n) => {
  const { currentValue: a, columnID: l } = getColumnID(e2, t);
  return "month" === e2.context.currentType && l >= 0 ? n - l : "year" === e2.context.currentType && e2.context.selectedYear !== a ? n - 1 : n;
}, handleMultipleYearSelection = (e2, t) => {
  const n = getValue(e2, "year", Number(t.dataset.vcYearsYear)), a = getDate(e2.context.dateMin), l = getDate(e2.context.dateMax), o = e2.context.displayMonthsCount - 1, { columnID: s } = getColumnID(e2, "year"), i = e2.context.selectedMonth < a.getMonth() && n <= a.getFullYear(), r = e2.context.selectedMonth > l.getMonth() - o + s && n >= l.getFullYear(), c = n < a.getFullYear(), d = n > l.getFullYear(), u = i || c ? a.getFullYear() : r || d ? l.getFullYear() : n, m = i || c ? a.getMonth() : r || d ? l.getMonth() - o + s : e2.context.selectedMonth;
  setContext(e2, "selectedYear", u), setContext(e2, "selectedMonth", m);
}, handleMultipleMonthSelection = (e2, t) => {
  const n = t.closest('[data-vc-column="month"]').querySelector('[data-vc="year"]'), a = getValue(e2, "month", Number(t.dataset.vcMonthsMonth)), l = Number(n.dataset.vcYear), o = getDate(e2.context.dateMin), s = getDate(e2.context.dateMax), i = a < o.getMonth() && l <= o.getFullYear(), r = a > s.getMonth() && l >= s.getFullYear();
  setContext(e2, "selectedYear", l), setContext(e2, "selectedMonth", i ? o.getMonth() : r ? s.getMonth() : a);
}, handleItemClick = (e2, t, n, a) => {
  var l;
  ({ year: () => {
    if ("multiple" === e2.type) return handleMultipleYearSelection(e2, a);
    setContext(e2, "selectedYear", Number(a.dataset.vcYearsYear));
  }, month: () => {
    if ("multiple" === e2.type) return handleMultipleMonthSelection(e2, a);
    setContext(e2, "selectedMonth", Number(a.dataset.vcMonthsMonth));
  } })[n]();
  ({ year: () => {
    var n2;
    return null == (n2 = e2.onClickYear) ? void 0 : n2.call(e2, e2, t);
  }, month: () => {
    var n2;
    return null == (n2 = e2.onClickMonth) ? void 0 : n2.call(e2, e2, t);
  } })[n](), e2.context.currentType !== e2.type ? (setContext(e2, "currentType", e2.type), create(e2), null == (l = e2.context.mainElement.querySelector(`[data-vc="${n}"]`)) || l.focus()) : setYearModifier(e2, a, n, true, true);
}, handleClickType = (e2, t, n) => {
  var a;
  const l = t.target, o = l.closest(`[data-vc="${n}"]`), s = { year: () => createYears(e2, l), month: () => createMonths(e2, l) };
  if (o && e2.onClickTitle && e2.onClickTitle(e2, t), o && e2.context.currentType !== n) return s[n]();
  const i = l.closest(`[data-vc-${n}s-${n}]`);
  if (i) return handleItemClick(e2, t, n, i);
  const r = l.closest('[data-vc="grid"]'), c = l.closest('[data-vc="column"]');
  (e2.context.currentType === n && o || "multiple" === e2.type && e2.context.currentType === n && r && !c) && (setContext(e2, "currentType", e2.type), create(e2), null == (a = e2.context.mainElement.querySelector(`[data-vc="${n}"]`)) || a.focus());
}, handleClickMonthOrYear = (e2, t) => {
  const n = { month: e2.selectionMonthsMode, year: e2.selectionYearsMode };
  typeClick.forEach((a) => {
    n[a] && t.target && handleClickType(e2, t, a);
  });
}, handleClickWeekNumber = (e2, t) => {
  if (!e2.enableWeekNumbers || !e2.onClickWeekNumber) return;
  const n = t.target.closest("[data-vc-week-number]"), a = e2.context.mainElement.querySelectorAll("[data-vc-date-week-number]");
  if (!n || !a[0]) return;
  const l = Number(n.innerText), o = Number(n.dataset.vcWeekYear), s = Array.from(a).filter((e3) => Number(e3.dataset.vcDateWeekNumber) === l);
  e2.onClickWeekNumber(e2, l, o, s, t);
}, handleClickWeekDay = (e2, t) => {
  if (!e2.onClickWeekDay) return;
  const n = t.target.closest("[data-vc-week-day]"), a = t.target.closest('[data-vc="column"]'), l = a ? a.querySelectorAll("[data-vc-date-week-day]") : e2.context.mainElement.querySelectorAll("[data-vc-date-week-day]");
  if (!n || !l[0]) return;
  const o = Number(n.dataset.vcWeekDay), s = Array.from(l).filter((e3) => Number(e3.dataset.vcDateWeekDay) === o);
  e2.onClickWeekDay(e2, o, s, t);
}, handleClick = (e2) => {
  const t = (t2) => {
    handleClickArrow(e2, t2), handleClickWeekDay(e2, t2), handleClickWeekNumber(e2, t2), handleClickDate(e2, t2), handleClickMonthOrYear(e2, t2);
  };
  return e2.context.mainElement.addEventListener("click", t), () => e2.context.mainElement.removeEventListener("click", t);
}, initMonthsCount = (e2) => {
  if ("multiple" === e2.type && (e2.displayMonthsCount <= 1 || e2.displayMonthsCount > 12)) throw new Error(errorMessages.incorrectMonthsCount);
  if ("multiple" !== e2.type && e2.displayMonthsCount > 1) throw new Error(errorMessages.incorrectMonthsCount);
  setContext(e2, "displayMonthsCount", e2.displayMonthsCount ? e2.displayMonthsCount : "multiple" === e2.type ? 2 : 1);
}, getLocalDate = () => {
  const e2 = /* @__PURE__ */ new Date();
  return new Date(e2.getTime() - 6e4 * e2.getTimezoneOffset()).toISOString().substring(0, 10);
}, resolveDate = (e2, t) => "today" === e2 ? getLocalDate() : e2 instanceof Date || "number" == typeof e2 || "string" == typeof e2 ? parseDates([e2])[0] : t, initRange = (e2) => {
  var t, n, a;
  const l = resolveDate(e2.dateMin, e2.dateMin), o = resolveDate(e2.dateMax, e2.dateMax), s = resolveDate(e2.displayDateMin, l), i = resolveDate(e2.displayDateMax, o);
  setContext(e2, "dateToday", resolveDate(e2.dateToday, e2.dateToday)), setContext(e2, "displayDateMin", s ? getDate(l) >= getDate(s) ? l : s : l), setContext(e2, "displayDateMax", i ? getDate(o) <= getDate(i) ? o : i : o);
  const r = e2.disableDatesPast && !e2.disableAllDates && getDate(s) < getDate(e2.context.dateToday);
  setContext(e2, "displayDateMin", r || e2.disableAllDates ? e2.context.dateToday : s), setContext(e2, "displayDateMax", e2.disableAllDates ? e2.context.dateToday : i), setContext(e2, "disableDates", e2.disableDates[0] && !e2.disableAllDates ? parseDates(e2.disableDates) : e2.disableAllDates ? [e2.context.displayDateMin] : []), e2.context.disableDates.length > 1 && e2.context.disableDates.sort((e3, t2) => +new Date(e3) - +new Date(t2)), setContext(e2, "enableDates", e2.enableDates[0] ? parseDates(e2.enableDates) : []), (null == (t = e2.context.enableDates) ? void 0 : t[0]) && (null == (n = e2.context.disableDates) ? void 0 : n[0]) && setContext(e2, "disableDates", e2.context.disableDates.filter((t2) => !e2.context.enableDates.includes(t2))), e2.context.enableDates.length > 1 && e2.context.enableDates.sort((e3, t2) => +new Date(e3) - +new Date(t2)), (null == (a = e2.context.enableDates) ? void 0 : a[0]) && e2.disableAllDates && (setContext(e2, "displayDateMin", e2.context.enableDates[0]), setContext(e2, "displayDateMax", e2.context.enableDates[e2.context.enableDates.length - 1])), setContext(e2, "dateMin", e2.displayDisabledDates ? l : e2.context.displayDateMin), setContext(e2, "dateMax", e2.displayDisabledDates ? o : e2.context.displayDateMax);
}, initSelectedDates = (e2) => {
  var t;
  setContext(e2, "selectedDates", (null == (t = e2.selectedDates) ? void 0 : t[0]) ? parseDates(e2.selectedDates) : []);
}, setInitialContext = (e2, t, n) => {
  setContext(e2, "selectedMonth", t), setContext(e2, "selectedYear", n), setContext(e2, "displayYear", n);
}, initSelectedMonthYear = (e2) => {
  var t;
  if (e2.enableJumpToSelectedDate && (null == (t = e2.selectedDates) ? void 0 : t[0]) && void 0 === e2.selectedMonth && void 0 === e2.selectedYear) {
    const t2 = getDate(parseDates(e2.selectedDates)[0]);
    return void setInitialContext(e2, t2.getMonth(), t2.getFullYear());
  }
  const n = void 0 !== e2.selectedMonth && Number(e2.selectedMonth) >= 0 && Number(e2.selectedMonth) < 12, a = void 0 !== e2.selectedYear && Number(e2.selectedYear) >= 0 && Number(e2.selectedYear) <= 9999;
  setInitialContext(e2, n ? Number(e2.selectedMonth) : getDate(e2.context.dateToday).getMonth(), a ? Number(e2.selectedYear) : getDate(e2.context.dateToday).getFullYear());
}, initTime = (e2) => {
  var t, n, a;
  if (!e2.selectionTimeMode) return;
  if (![12, 24].includes(e2.selectionTimeMode)) throw new Error(errorMessages.incorrectTime);
  const l = 12 === e2.selectionTimeMode, o = l ? /^(0[1-9]|1[0-2]):([0-5][0-9]) ?(AM|PM)?$/i : /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
  let [s, i, r] = null != (a = null == (n = null == (t = e2.selectedTime) ? void 0 : t.match(o)) ? void 0 : n.slice(1)) ? a : [];
  s ? l && !r && (r = "AM") : (s = l ? transformTime12(String(e2.timeMinHour)) : String(e2.timeMinHour), i = String(e2.timeMinMinute), r = l ? Number(transformTime12(String(e2.timeMinHour))) >= 12 ? "PM" : "AM" : null), setContext(e2, "selectedHours", s.padStart(2, "0")), setContext(e2, "selectedMinutes", i.padStart(2, "0")), setContext(e2, "selectedKeeping", r), setContext(e2, "selectedTime", `${e2.context.selectedHours}:${e2.context.selectedMinutes}${r ? ` ${r}` : ""}`);
}, initAllVariables = (e2) => {
  setContext(e2, "currentType", e2.type), initMonthsCount(e2), initRange(e2), initSelectedMonthYear(e2), initSelectedDates(e2), initTime(e2);
}, reset = (e2, { year: t, month: n, dates: a, time: l, locale: o }, s = true) => {
  var i;
  const r = { year: e2.selectedYear, month: e2.selectedMonth, dates: e2.selectedDates, time: e2.selectedTime };
  if (e2.selectedYear = t ? r.year : e2.context.selectedYear, e2.selectedMonth = n ? r.month : e2.context.selectedMonth, e2.selectedTime = l ? r.time : e2.context.selectedTime, e2.selectedDates = "only-first" === a && (null == (i = e2.context.selectedDates) ? void 0 : i[0]) ? [e2.context.selectedDates[0]] : true === a ? r.dates : e2.context.selectedDates, o) {
    setContext(e2, "locale", { months: { short: [], long: [] }, weekdays: { short: [], long: [] } });
  }
  initAllVariables(e2), s && create(e2), e2.selectedYear = r.year, e2.selectedMonth = r.month, e2.selectedDates = r.dates, e2.selectedTime = r.time, "multiple-ranged" === e2.selectionDatesMode && a && handleSelectDateRange(e2, null);
}, createToInput = (e2) => {
  const t = document.createElement("div");
  return t.className = e2.styles.calendar, t.dataset.vc = "calendar", t.dataset.vcInput = "", t.dataset.vcCalendarHidden = "", setContext(e2, "inputModeInit", true), setContext(e2, "isShowInInputMode", false), setContext(e2, "mainElement", t), document.body.appendChild(e2.context.mainElement), reset(e2, { year: true, month: true, dates: true, time: true, locale: true }), queueMicrotask(() => show(e2)), e2.onInit && e2.onInit(e2), handleArrowKeys(e2), handleClick(e2);
}, handleInput = (e2) => {
  setContext(e2, "inputElement", e2.context.mainElement);
  const t = () => {
    e2.context.inputModeInit ? queueMicrotask(() => show(e2)) : createToInput(e2);
  };
  return e2.context.inputElement.addEventListener("click", t), e2.context.inputElement.addEventListener("focus", t), () => {
    e2.context.inputElement.removeEventListener("click", t), e2.context.inputElement.removeEventListener("focus", t);
  };
}, init = (e2) => (setContext(e2, "originalElement", e2.context.mainElement.cloneNode(true)), setContext(e2, "isInit", true), e2.inputMode ? handleInput(e2) : (initAllVariables(e2), create(e2), e2.onInit && e2.onInit(e2), handleArrowKeys(e2), handleClick(e2))), update = (e2, t) => {
  if (!e2.context.isInit) throw new Error(errorMessages.notInit);
  reset(e2, __spreadValues(__spreadValues({}, { year: true, month: true, dates: true, time: true, locale: true }), t), !(e2.inputMode && !e2.context.inputModeInit)), e2.onUpdate && e2.onUpdate(e2);
}, replaceProperties = (e2, t) => {
  const n = Object.keys(t);
  for (let a = 0; a < n.length; a++) {
    const l = n[a];
    "object" != typeof e2[l] || "object" != typeof t[l] || t[l] instanceof Date || Array.isArray(t[l]) ? void 0 !== t[l] && (e2[l] = t[l]) : replaceProperties(e2[l], t[l]);
  }
}, set = (e2, t, n) => {
  replaceProperties(e2, t), e2.context.isInit && update(e2, n);
};
function findBestPickerPosition(e2, t) {
  const n = "left";
  if (!t || !e2) return n;
  const { canShow: a, parentPositions: l } = getAvailablePosition(e2, t), o = a.left && a.right;
  return (o && a.bottom ? "center" : o && a.top ? ["top", "center"] : Array.isArray(l) ? ["bottom" === l[0] ? "top" : "bottom", ...l.slice(1)] : l) || n;
}
const setPosition = (e2, t, n) => {
  if (!e2) return;
  const a = "auto" === n ? findBestPickerPosition(e2, t) : n, l = { top: -t.offsetHeight, bottom: e2.offsetHeight, left: 0, center: e2.offsetWidth / 2 - t.offsetWidth / 2, right: e2.offsetWidth - t.offsetWidth }, o = Array.isArray(a) ? a[0] : "bottom", s = Array.isArray(a) ? a[1] : a;
  t.dataset.vcPosition = o;
  const { top: i, left: r } = getOffset(e2), c = i + l[o];
  let d = r + l[s];
  const { vw: u } = getViewportDimensions();
  if (d + t.clientWidth > u) {
    const e3 = window.innerWidth - document.body.clientWidth;
    d = u - t.clientWidth - e3;
  } else d < 0 && (d = 0);
  Object.assign(t.style, { left: `${d}px`, top: `${c}px` });
}, show = (e2) => {
  if (e2.context.isShowInInputMode) return;
  if (!e2.context.currentType) return void e2.context.mainElement.click();
  setContext(e2, "cleanupHandlers", []), setContext(e2, "isShowInInputMode", true), setPosition(e2.context.inputElement, e2.context.mainElement, e2.positionToInput), e2.context.mainElement.removeAttribute("data-vc-calendar-hidden");
  const t = () => {
    setPosition(e2.context.inputElement, e2.context.mainElement, e2.positionToInput);
  };
  window.addEventListener("resize", t), e2.context.cleanupHandlers.push(() => window.removeEventListener("resize", t));
  const n = (t2) => {
    "Escape" === t2.key && hide(e2);
  };
  document.addEventListener("keydown", n), e2.context.cleanupHandlers.push(() => document.removeEventListener("keydown", n));
  const a = (t2) => {
    t2.target === e2.context.inputElement || e2.context.mainElement.contains(t2.target) || hide(e2);
  };
  document.addEventListener("click", a, { capture: true }), e2.context.cleanupHandlers.push(() => document.removeEventListener("click", a, { capture: true })), e2.onShow && e2.onShow(e2);
}, labels = { application: "Calendar", navigation: "Calendar Navigation", arrowNext: { month: "Next month", year: "Next list of years" }, arrowPrev: { month: "Previous month", year: "Previous list of years" }, month: "Select month, current selected month:", months: "List of months", year: "Select year, current selected year:", years: "List of years", week: "Days of the week", weekNumber: "Numbers of weeks in a year", dates: "Dates in the current month", selectingTime: "Selecting a time ", inputHour: "Hours", inputMinute: "Minutes", rangeHour: "Slider for selecting hours", rangeMinute: "Slider for selecting minutes", btnKeeping: "Switch AM/PM, current position:" }, styles = { calendar: "vc", controls: "vc-controls", grid: "vc-grid", column: "vc-column", header: "vc-header", headerContent: "vc-header__content", month: "vc-month", year: "vc-year", arrowPrev: "vc-arrow vc-arrow_prev", arrowNext: "vc-arrow vc-arrow_next", wrapper: "vc-wrapper", content: "vc-content", months: "vc-months", monthsMonth: "vc-months__month", years: "vc-years", yearsYear: "vc-years__year", week: "vc-week", weekDay: "vc-week__day", weekNumbers: "vc-week-numbers", weekNumbersTitle: "vc-week-numbers__title", weekNumbersContent: "vc-week-numbers__content", weekNumber: "vc-week-number", dates: "vc-dates", date: "vc-date", dateBtn: "vc-date__btn", datePopup: "vc-date__popup", dateRangeTooltip: "vc-date-range-tooltip", time: "vc-time", timeContent: "vc-time__content", timeHour: "vc-time__hour", timeMinute: "vc-time__minute", timeKeeping: "vc-time__keeping", timeRanges: "vc-time__ranges", timeRange: "vc-time__range" };
class OptionsCalendar {
  constructor() {
    __publicField(this, "type", "default"), __publicField(this, "inputMode", false), __publicField(this, "positionToInput", "left"), __publicField(this, "firstWeekday", 1), __publicField(this, "monthsToSwitch", 1), __publicField(this, "themeAttrDetect", "html[data-theme]"), __publicField(this, "locale", "en"), __publicField(this, "dateToday", "today"), __publicField(this, "dateMin", "1970-01-01"), __publicField(this, "dateMax", "2470-12-31"), __publicField(this, "displayDateMin"), __publicField(this, "displayDateMax"), __publicField(this, "displayDatesOutside", true), __publicField(this, "displayDisabledDates", false), __publicField(this, "displayMonthsCount"), __publicField(this, "disableDates", []), __publicField(this, "disableAllDates", false), __publicField(this, "disableDatesPast", false), __publicField(this, "disableDatesGaps", false), __publicField(this, "disableWeekdays", []), __publicField(this, "disableToday", false), __publicField(this, "enableDates", []), __publicField(this, "enableEdgeDatesOnly", true), __publicField(this, "enableDateToggle", true), __publicField(this, "enableWeekNumbers", false), __publicField(this, "enableMonthChangeOnDayClick", true), __publicField(this, "enableJumpToSelectedDate", false), __publicField(this, "selectionDatesMode", "single"), __publicField(this, "selectionMonthsMode", true), __publicField(this, "selectionYearsMode", true), __publicField(this, "selectionTimeMode", false), __publicField(this, "selectedDates", []), __publicField(this, "selectedMonth"), __publicField(this, "selectedYear"), __publicField(this, "selectedHolidays", []), __publicField(this, "selectedWeekends", [0, 6]), __publicField(this, "selectedTime"), __publicField(this, "selectedTheme", "system"), __publicField(this, "timeMinHour", 0), __publicField(this, "timeMaxHour", 23), __publicField(this, "timeMinMinute", 0), __publicField(this, "timeMaxMinute", 59), __publicField(this, "timeControls", "all"), __publicField(this, "timeStepHour", 1), __publicField(this, "timeStepMinute", 1), __publicField(this, "sanitizerHTML", (e2) => e2), __publicField(this, "onClickDate"), __publicField(this, "onClickWeekDay"), __publicField(this, "onClickWeekNumber"), __publicField(this, "onClickTitle"), __publicField(this, "onClickMonth"), __publicField(this, "onClickYear"), __publicField(this, "onClickArrow"), __publicField(this, "onChangeTime"), __publicField(this, "onChangeToInput"), __publicField(this, "onCreateDateRangeTooltip"), __publicField(this, "onCreateDateEls"), __publicField(this, "onCreateMonthEls"), __publicField(this, "onCreateYearEls"), __publicField(this, "onInit"), __publicField(this, "onUpdate"), __publicField(this, "onDestroy"), __publicField(this, "onShow"), __publicField(this, "onHide"), __publicField(this, "popups", {}), __publicField(this, "labels", __spreadValues({}, labels)), __publicField(this, "layouts", { default: "", multiple: "", month: "", year: "" }), __publicField(this, "styles", __spreadValues({}, styles));
  }
}
const _Calendar = class e extends OptionsCalendar {
  constructor(t, n) {
    var a;
    super(), __publicField(this, "init", () => init(this)), __publicField(this, "update", (e2) => update(this, e2)), __publicField(this, "destroy", () => destroy(this)), __publicField(this, "show", () => show(this)), __publicField(this, "hide", () => hide(this)), __publicField(this, "set", (e2, t2) => set(this, e2, t2)), __publicField(this, "context"), this.context = __spreadProps(__spreadValues({}, this.context), { locale: { months: { short: [], long: [] }, weekdays: { short: [], long: [] } } }), setContext(this, "mainElement", "string" == typeof t ? null != (a = e.memoizedElements.get(t)) ? a : this.queryAndMemoize(t) : t), n && replaceProperties(this, n);
  }
  queryAndMemoize(t) {
    const n = document.querySelector(t);
    if (!n) throw new Error(errorMessages.notFoundSelector(t));
    return e.memoizedElements.set(t, n), n;
  }
};
__publicField(_Calendar, "memoizedElements", /* @__PURE__ */ new Map());

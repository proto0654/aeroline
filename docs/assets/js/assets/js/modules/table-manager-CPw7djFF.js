function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var naturalCompare_1;
var hasRequiredNaturalCompare;
function requireNaturalCompare() {
  if (hasRequiredNaturalCompare) return naturalCompare_1;
  hasRequiredNaturalCompare = 1;
  var alphabet;
  var alphabetIndexMap;
  var alphabetIndexMapLength = 0;
  function isNumberCode(code) {
    return code >= 48 && code <= 57;
  }
  function naturalCompare(a, b) {
    var lengthA = (a += "").length;
    var lengthB = (b += "").length;
    var aIndex = 0;
    var bIndex = 0;
    while (aIndex < lengthA && bIndex < lengthB) {
      var charCodeA = a.charCodeAt(aIndex);
      var charCodeB = b.charCodeAt(bIndex);
      if (isNumberCode(charCodeA)) {
        if (!isNumberCode(charCodeB)) {
          return charCodeA - charCodeB;
        }
        var numStartA = aIndex;
        var numStartB = bIndex;
        while (charCodeA === 48 && ++numStartA < lengthA) {
          charCodeA = a.charCodeAt(numStartA);
        }
        while (charCodeB === 48 && ++numStartB < lengthB) {
          charCodeB = b.charCodeAt(numStartB);
        }
        var numEndA = numStartA;
        var numEndB = numStartB;
        while (numEndA < lengthA && isNumberCode(a.charCodeAt(numEndA))) {
          ++numEndA;
        }
        while (numEndB < lengthB && isNumberCode(b.charCodeAt(numEndB))) {
          ++numEndB;
        }
        var difference = numEndA - numStartA - numEndB + numStartB;
        if (difference) {
          return difference;
        }
        while (numStartA < numEndA) {
          difference = a.charCodeAt(numStartA++) - b.charCodeAt(numStartB++);
          if (difference) {
            return difference;
          }
        }
        aIndex = numEndA;
        bIndex = numEndB;
        continue;
      }
      if (charCodeA !== charCodeB) {
        if (charCodeA < alphabetIndexMapLength && charCodeB < alphabetIndexMapLength && alphabetIndexMap[charCodeA] !== -1 && alphabetIndexMap[charCodeB] !== -1) {
          return alphabetIndexMap[charCodeA] - alphabetIndexMap[charCodeB];
        }
        return charCodeA - charCodeB;
      }
      ++aIndex;
      ++bIndex;
    }
    if (aIndex >= lengthA && bIndex < lengthB && lengthA >= lengthB) {
      return -1;
    }
    if (bIndex >= lengthB && aIndex < lengthA && lengthB >= lengthA) {
      return 1;
    }
    return lengthA - lengthB;
  }
  naturalCompare.caseInsensitive = naturalCompare.i = function(a, b) {
    return naturalCompare(("" + a).toLowerCase(), ("" + b).toLowerCase());
  };
  Object.defineProperties(naturalCompare, {
    alphabet: {
      get: function() {
        return alphabet;
      },
      set: function(value) {
        alphabet = value;
        alphabetIndexMap = [];
        var i = 0;
        if (alphabet) {
          for (; i < alphabet.length; i++) {
            alphabetIndexMap[alphabet.charCodeAt(i)] = i;
          }
        }
        alphabetIndexMapLength = alphabetIndexMap.length;
        for (i = 0; i < alphabetIndexMapLength; i++) {
          if (alphabetIndexMap[i] === void 0) {
            alphabetIndexMap[i] = -1;
          }
        }
      }
    }
  });
  naturalCompare_1 = naturalCompare;
  return naturalCompare_1;
}
var getByClass;
var hasRequiredGetByClass;
function requireGetByClass() {
  if (hasRequiredGetByClass) return getByClass;
  hasRequiredGetByClass = 1;
  var getElementsByClassName = function(container, className, single) {
    if (single) {
      return container.getElementsByClassName(className)[0];
    } else {
      return container.getElementsByClassName(className);
    }
  };
  var querySelector = function(container, className, single) {
    className = "." + className;
    if (single) {
      return container.querySelector(className);
    } else {
      return container.querySelectorAll(className);
    }
  };
  var polyfill = function(container, className, single) {
    var classElements = [], tag = "*";
    var els = container.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");
    for (var i = 0, j = 0; i < elsLen; i++) {
      if (pattern.test(els[i].className)) {
        if (single) {
          return els[i];
        } else {
          classElements[j] = els[i];
          j++;
        }
      }
    }
    return classElements;
  };
  getByClass = /* @__PURE__ */ function() {
    return function(container, className, single, options) {
      options = options || {};
      if (options.test && options.getElementsByClassName || !options.test && document.getElementsByClassName) {
        return getElementsByClassName(container, className, single);
      } else if (options.test && options.querySelector || !options.test && document.querySelector) {
        return querySelector(container, className, single);
      } else {
        return polyfill(container, className, single);
      }
    };
  }();
  return getByClass;
}
var extend;
var hasRequiredExtend;
function requireExtend() {
  if (hasRequiredExtend) return extend;
  hasRequiredExtend = 1;
  extend = function extend2(object) {
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, source; source = args[i]; i++) {
      if (!source) continue;
      for (var property in source) {
        object[property] = source[property];
      }
    }
    return object;
  };
  return extend;
}
var indexOf_1;
var hasRequiredIndexOf;
function requireIndexOf() {
  if (hasRequiredIndexOf) return indexOf_1;
  hasRequiredIndexOf = 1;
  var indexOf = [].indexOf;
  indexOf_1 = function(arr, obj) {
    if (indexOf) return arr.indexOf(obj);
    for (var i = 0, il = arr.length; i < il; ++i) {
      if (arr[i] === obj) return i;
    }
    return -1;
  };
  return indexOf_1;
}
var events = {};
var toArray;
var hasRequiredToArray;
function requireToArray() {
  if (hasRequiredToArray) return toArray;
  hasRequiredToArray = 1;
  toArray = function toArray2(collection) {
    if (typeof collection === "undefined") return [];
    if (collection === null) return [null];
    if (collection === window) return [window];
    if (typeof collection === "string") return [collection];
    if (isArray(collection)) return collection;
    if (typeof collection.length != "number") return [collection];
    if (typeof collection === "function" && collection instanceof Function) return [collection];
    var arr = [];
    for (var i = 0, il = collection.length; i < il; i++) {
      if (Object.prototype.hasOwnProperty.call(collection, i) || i in collection) {
        arr.push(collection[i]);
      }
    }
    if (!arr.length) return [];
    return arr;
  };
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  }
  return toArray;
}
var hasRequiredEvents;
function requireEvents() {
  if (hasRequiredEvents) return events;
  hasRequiredEvents = 1;
  var bind = window.addEventListener ? "addEventListener" : "attachEvent", unbind = window.removeEventListener ? "removeEventListener" : "detachEvent", prefix = bind !== "addEventListener" ? "on" : "", toArray2 = requireToArray();
  events.bind = function(el, type, fn, capture) {
    el = toArray2(el);
    for (var i = 0, il = el.length; i < il; i++) {
      el[i][bind](prefix + type, fn, capture || false);
    }
  };
  events.unbind = function(el, type, fn, capture) {
    el = toArray2(el);
    for (var i = 0, il = el.length; i < il; i++) {
      el[i][unbind](prefix + type, fn, capture || false);
    }
  };
  events.debounce = function(fn, wait, immediate) {
    var timeout;
    return wait ? function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) fn.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) fn.apply(context, args);
    } : fn;
  };
  return events;
}
var toString;
var hasRequiredToString;
function requireToString() {
  if (hasRequiredToString) return toString;
  hasRequiredToString = 1;
  toString = function(s) {
    s = s === void 0 ? "" : s;
    s = s === null ? "" : s;
    s = s.toString();
    return s;
  };
  return toString;
}
var classes;
var hasRequiredClasses;
function requireClasses() {
  if (hasRequiredClasses) return classes;
  hasRequiredClasses = 1;
  var index = requireIndexOf();
  var re = /\s+/;
  classes = function(el) {
    return new ClassList(el);
  };
  function ClassList(el) {
    if (!el || !el.nodeType) {
      throw new Error("A DOM element reference is required");
    }
    this.el = el;
    this.list = el.classList;
  }
  ClassList.prototype.add = function(name) {
    if (this.list) {
      this.list.add(name);
      return this;
    }
    var arr = this.array();
    var i = index(arr, name);
    if (!~i) arr.push(name);
    this.el.className = arr.join(" ");
    return this;
  };
  ClassList.prototype.remove = function(name) {
    if (this.list) {
      this.list.remove(name);
      return this;
    }
    var arr = this.array();
    var i = index(arr, name);
    if (~i) arr.splice(i, 1);
    this.el.className = arr.join(" ");
    return this;
  };
  ClassList.prototype.toggle = function(name, force) {
    if (this.list) {
      if ("undefined" !== typeof force) {
        if (force !== this.list.toggle(name, force)) {
          this.list.toggle(name);
        }
      } else {
        this.list.toggle(name);
      }
      return this;
    }
    if ("undefined" !== typeof force) {
      if (!force) {
        this.remove(name);
      } else {
        this.add(name);
      }
    } else {
      if (this.has(name)) {
        this.remove(name);
      } else {
        this.add(name);
      }
    }
    return this;
  };
  ClassList.prototype.array = function() {
    var className = this.el.getAttribute("class") || "";
    var str = className.replace(/^\s+|\s+$/g, "");
    var arr = str.split(re);
    if ("" === arr[0]) arr.shift();
    return arr;
  };
  ClassList.prototype.has = ClassList.prototype.contains = function(name) {
    return this.list ? this.list.contains(name) : !!~index(this.array(), name);
  };
  return classes;
}
var getAttribute;
var hasRequiredGetAttribute;
function requireGetAttribute() {
  if (hasRequiredGetAttribute) return getAttribute;
  hasRequiredGetAttribute = 1;
  getAttribute = function(el, attr) {
    var result = el.getAttribute && el.getAttribute(attr) || null;
    if (!result) {
      var attrs = el.attributes;
      var length = attrs.length;
      for (var i = 0; i < length; i++) {
        if (attrs[i] !== void 0) {
          if (attrs[i].nodeName === attr) {
            result = attrs[i].nodeValue;
          }
        }
      }
    }
    return result;
  };
  return getAttribute;
}
var item;
var hasRequiredItem;
function requireItem() {
  if (hasRequiredItem) return item;
  hasRequiredItem = 1;
  item = function(list) {
    return function(initValues, element, notCreate) {
      var item2 = this;
      this._values = {};
      this.found = false;
      this.filtered = false;
      var init = function(initValues2, element2, notCreate2) {
        if (element2 === void 0) {
          if (notCreate2) {
            item2.values(initValues2, notCreate2);
          } else {
            item2.values(initValues2);
          }
        } else {
          item2.elm = element2;
          var values = list.templater.get(item2, initValues2);
          item2.values(values);
        }
      };
      this.values = function(newValues, notCreate2) {
        if (newValues !== void 0) {
          for (var name in newValues) {
            item2._values[name] = newValues[name];
          }
          if (notCreate2 !== true) {
            list.templater.set(item2, item2.values());
          }
        } else {
          return item2._values;
        }
      };
      this.show = function() {
        list.templater.show(item2);
      };
      this.hide = function() {
        list.templater.hide(item2);
      };
      this.matching = function() {
        return list.filtered && list.searched && item2.found && item2.filtered || list.filtered && !list.searched && item2.filtered || !list.filtered && list.searched && item2.found || !list.filtered && !list.searched;
      };
      this.visible = function() {
        return item2.elm && item2.elm.parentNode == list.list ? true : false;
      };
      init(initValues, element, notCreate);
    };
  };
  return item;
}
var addAsync;
var hasRequiredAddAsync;
function requireAddAsync() {
  if (hasRequiredAddAsync) return addAsync;
  hasRequiredAddAsync = 1;
  addAsync = function(list) {
    var addAsync2 = function(values, callback, items) {
      var valuesToAdd = values.splice(0, 50);
      items = items || [];
      items = items.concat(list.add(valuesToAdd));
      if (values.length > 0) {
        setTimeout(function() {
          addAsync2(values, callback, items);
        }, 1);
      } else {
        list.update();
        callback(items);
      }
    };
    return addAsync2;
  };
  return addAsync;
}
var pagination;
var hasRequiredPagination;
function requirePagination() {
  if (hasRequiredPagination) return pagination;
  hasRequiredPagination = 1;
  var classes2 = requireClasses(), events2 = requireEvents(), List2 = requireSrc();
  pagination = function(list) {
    var isHidden = false;
    var refresh = function(pagingList, options) {
      if (list.page < 1) {
        list.listContainer.style.display = "none";
        isHidden = true;
        return;
      } else if (isHidden) {
        list.listContainer.style.display = "block";
      }
      var item2, l = list.matchingItems.length, index = list.i, page = list.page, pages = Math.ceil(l / page), currentPage = Math.ceil(index / page), innerWindow = options.innerWindow || 2, left = options.left || options.outerWindow || 0, right = options.right || options.outerWindow || 0;
      right = pages - right;
      pagingList.clear();
      for (var i = 1; i <= pages; i++) {
        var className = currentPage === i ? "active" : "";
        if (is.number(i, left, right, currentPage, innerWindow)) {
          item2 = pagingList.add({
            page: i,
            dotted: false
          })[0];
          if (className) {
            classes2(item2.elm).add(className);
          }
          item2.elm.firstChild.setAttribute("data-i", i);
          item2.elm.firstChild.setAttribute("data-page", page);
        } else if (is.dotted(pagingList, i, left, right, currentPage, innerWindow, pagingList.size())) {
          item2 = pagingList.add({
            page: "...",
            dotted: true
          })[0];
          classes2(item2.elm).add("disabled");
        }
      }
    };
    var is = {
      number: function(i, left, right, currentPage, innerWindow) {
        return this.left(i, left) || this.right(i, right) || this.innerWindow(i, currentPage, innerWindow);
      },
      left: function(i, left) {
        return i <= left;
      },
      right: function(i, right) {
        return i > right;
      },
      innerWindow: function(i, currentPage, innerWindow) {
        return i >= currentPage - innerWindow && i <= currentPage + innerWindow;
      },
      dotted: function(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
        return this.dottedLeft(pagingList, i, left, right, currentPage, innerWindow) || this.dottedRight(pagingList, i, left, right, currentPage, innerWindow, currentPageItem);
      },
      dottedLeft: function(pagingList, i, left, right, currentPage, innerWindow) {
        return i == left + 1 && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
      },
      dottedRight: function(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
        if (pagingList.items[currentPageItem - 1].values().dotted) {
          return false;
        } else {
          return i == right && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
        }
      }
    };
    return function(options) {
      var pagingList = new List2(list.listContainer.id, {
        listClass: options.paginationClass || "pagination",
        item: options.item || "<li><a class='page' href='#'></a></li>",
        valueNames: ["page", "dotted"],
        searchClass: "pagination-search-that-is-not-supposed-to-exist",
        sortClass: "pagination-sort-that-is-not-supposed-to-exist"
      });
      events2.bind(pagingList.listContainer, "click", function(e) {
        var target = e.target || e.srcElement, page = list.utils.getAttribute(target, "data-page"), i = list.utils.getAttribute(target, "data-i");
        if (i) {
          list.show((i - 1) * page + 1, page);
        }
      });
      list.on("updated", function() {
        refresh(pagingList, options);
      });
      refresh(pagingList, options);
    };
  };
  return pagination;
}
var parse;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse;
  hasRequiredParse = 1;
  parse = function(list) {
    var Item = requireItem()(list);
    var getChildren = function(parent) {
      var nodes = parent.childNodes, items = [];
      for (var i = 0, il = nodes.length; i < il; i++) {
        if (nodes[i].data === void 0) {
          items.push(nodes[i]);
        }
      }
      return items;
    };
    var parse2 = function(itemElements, valueNames) {
      for (var i = 0, il = itemElements.length; i < il; i++) {
        list.items.push(new Item(valueNames, itemElements[i]));
      }
    };
    var parseAsync = function(itemElements, valueNames) {
      var itemsToIndex = itemElements.splice(0, 50);
      parse2(itemsToIndex, valueNames);
      if (itemElements.length > 0) {
        setTimeout(function() {
          parseAsync(itemElements, valueNames);
        }, 1);
      } else {
        list.update();
        list.trigger("parseComplete");
      }
    };
    list.handlers.parseComplete = list.handlers.parseComplete || [];
    return function() {
      var itemsToIndex = getChildren(list.list), valueNames = list.valueNames;
      if (list.indexAsync) {
        parseAsync(itemsToIndex, valueNames);
      } else {
        parse2(itemsToIndex, valueNames);
      }
    };
  };
  return parse;
}
var templater;
var hasRequiredTemplater;
function requireTemplater() {
  if (hasRequiredTemplater) return templater;
  hasRequiredTemplater = 1;
  var Templater = function(list) {
    var createItem, templater2 = this;
    var init = function() {
      var itemSource;
      if (typeof list.item === "function") {
        createItem = function(values) {
          var item2 = list.item(values);
          return getItemSource(item2);
        };
        return;
      }
      if (typeof list.item === "string") {
        if (list.item.indexOf("<") === -1) {
          itemSource = document.getElementById(list.item);
        } else {
          itemSource = getItemSource(list.item);
        }
      } else {
        itemSource = getFirstListItem();
      }
      if (!itemSource) {
        throw new Error("The list needs to have at least one item on init otherwise you'll have to add a template.");
      }
      itemSource = createCleanTemplateItem(itemSource, list.valueNames);
      createItem = function() {
        return itemSource.cloneNode(true);
      };
    };
    var createCleanTemplateItem = function(templateNode, valueNames) {
      var el = templateNode.cloneNode(true);
      el.removeAttribute("id");
      for (var i = 0, il = valueNames.length; i < il; i++) {
        var elm = void 0, valueName = valueNames[i];
        if (valueName.data) {
          for (var j = 0, jl = valueName.data.length; j < jl; j++) {
            el.setAttribute("data-" + valueName.data[j], "");
          }
        } else if (valueName.attr && valueName.name) {
          elm = list.utils.getByClass(el, valueName.name, true);
          if (elm) {
            elm.setAttribute(valueName.attr, "");
          }
        } else {
          elm = list.utils.getByClass(el, valueName, true);
          if (elm) {
            elm.innerHTML = "";
          }
        }
      }
      return el;
    };
    var getFirstListItem = function() {
      var nodes = list.list.childNodes;
      for (var i = 0, il = nodes.length; i < il; i++) {
        if (nodes[i].data === void 0) {
          return nodes[i].cloneNode(true);
        }
      }
      return void 0;
    };
    var getItemSource = function(itemHTML) {
      if (typeof itemHTML !== "string") return void 0;
      if (/<tr[\s>]/g.exec(itemHTML)) {
        var tbody = document.createElement("tbody");
        tbody.innerHTML = itemHTML;
        return tbody.firstElementChild;
      } else if (itemHTML.indexOf("<") !== -1) {
        var div = document.createElement("div");
        div.innerHTML = itemHTML;
        return div.firstElementChild;
      }
      return void 0;
    };
    var getValueName = function(name) {
      for (var i = 0, il = list.valueNames.length; i < il; i++) {
        var valueName = list.valueNames[i];
        if (valueName.data) {
          var data = valueName.data;
          for (var j = 0, jl = data.length; j < jl; j++) {
            if (data[j] === name) {
              return { data: name };
            }
          }
        } else if (valueName.attr && valueName.name && valueName.name == name) {
          return valueName;
        } else if (valueName === name) {
          return name;
        }
      }
    };
    var setValue = function(item2, name, value) {
      var elm = void 0, valueName = getValueName(name);
      if (!valueName) return;
      if (valueName.data) {
        item2.elm.setAttribute("data-" + valueName.data, value);
      } else if (valueName.attr && valueName.name) {
        elm = list.utils.getByClass(item2.elm, valueName.name, true);
        if (elm) {
          elm.setAttribute(valueName.attr, value);
        }
      } else {
        elm = list.utils.getByClass(item2.elm, valueName, true);
        if (elm) {
          elm.innerHTML = value;
        }
      }
    };
    this.get = function(item2, valueNames) {
      templater2.create(item2);
      var values = {};
      for (var i = 0, il = valueNames.length; i < il; i++) {
        var elm = void 0, valueName = valueNames[i];
        if (valueName.data) {
          for (var j = 0, jl = valueName.data.length; j < jl; j++) {
            values[valueName.data[j]] = list.utils.getAttribute(item2.elm, "data-" + valueName.data[j]);
          }
        } else if (valueName.attr && valueName.name) {
          elm = list.utils.getByClass(item2.elm, valueName.name, true);
          values[valueName.name] = elm ? list.utils.getAttribute(elm, valueName.attr) : "";
        } else {
          elm = list.utils.getByClass(item2.elm, valueName, true);
          values[valueName] = elm ? elm.innerHTML : "";
        }
      }
      return values;
    };
    this.set = function(item2, values) {
      if (!templater2.create(item2)) {
        for (var v in values) {
          if (values.hasOwnProperty(v)) {
            setValue(item2, v, values[v]);
          }
        }
      }
    };
    this.create = function(item2) {
      if (item2.elm !== void 0) {
        return false;
      }
      item2.elm = createItem(item2.values());
      templater2.set(item2, item2.values());
      return true;
    };
    this.remove = function(item2) {
      if (item2.elm.parentNode === list.list) {
        list.list.removeChild(item2.elm);
      }
    };
    this.show = function(item2) {
      templater2.create(item2);
      list.list.appendChild(item2.elm);
    };
    this.hide = function(item2) {
      if (item2.elm !== void 0 && item2.elm.parentNode === list.list) {
        list.list.removeChild(item2.elm);
      }
    };
    this.clear = function() {
      if (list.list.hasChildNodes()) {
        while (list.list.childNodes.length >= 1) {
          list.list.removeChild(list.list.firstChild);
        }
      }
    };
    init();
  };
  templater = function(list) {
    return new Templater(list);
  };
  return templater;
}
var search;
var hasRequiredSearch;
function requireSearch() {
  if (hasRequiredSearch) return search;
  hasRequiredSearch = 1;
  search = function(list) {
    var columns, searchString, customSearch;
    var prepare = {
      resetList: function() {
        list.i = 1;
        list.templater.clear();
        customSearch = void 0;
      },
      setOptions: function(args) {
        if (args.length == 2 && args[1] instanceof Array) {
          columns = args[1];
        } else if (args.length == 2 && typeof args[1] == "function") {
          columns = void 0;
          customSearch = args[1];
        } else if (args.length == 3) {
          columns = args[1];
          customSearch = args[2];
        } else {
          columns = void 0;
        }
      },
      setColumns: function() {
        if (list.items.length === 0) return;
        if (columns === void 0) {
          columns = list.searchColumns === void 0 ? prepare.toArray(list.items[0].values()) : list.searchColumns;
        }
      },
      setSearchString: function(s) {
        s = list.utils.toString(s).toLowerCase();
        s = s.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
        searchString = s;
      },
      toArray: function(values) {
        var tmpColumn = [];
        for (var name in values) {
          tmpColumn.push(name);
        }
        return tmpColumn;
      }
    };
    var search2 = {
      list: function() {
        var words = [], phrase, ss = searchString;
        while ((phrase = ss.match(/"([^"]+)"/)) !== null) {
          words.push(phrase[1]);
          ss = ss.substring(0, phrase.index) + ss.substring(phrase.index + phrase[0].length);
        }
        ss = ss.trim();
        if (ss.length) words = words.concat(ss.split(/\s+/));
        for (var k = 0, kl = list.items.length; k < kl; k++) {
          var item2 = list.items[k];
          item2.found = false;
          if (!words.length) continue;
          for (var i = 0, il = words.length; i < il; i++) {
            var word_found = false;
            for (var j = 0, jl = columns.length; j < jl; j++) {
              var values = item2.values(), column = columns[j];
              if (values.hasOwnProperty(column) && values[column] !== void 0 && values[column] !== null) {
                var text = typeof values[column] !== "string" ? values[column].toString() : values[column];
                if (text.toLowerCase().indexOf(words[i]) !== -1) {
                  word_found = true;
                  break;
                }
              }
            }
            if (!word_found) break;
          }
          item2.found = word_found;
        }
      },
      // Removed search.item() and search.values()
      reset: function() {
        list.reset.search();
        list.searched = false;
      }
    };
    var searchMethod = function(str) {
      list.trigger("searchStart");
      prepare.resetList();
      prepare.setSearchString(str);
      prepare.setOptions(arguments);
      prepare.setColumns();
      if (searchString === "") {
        search2.reset();
      } else {
        list.searched = true;
        if (customSearch) {
          customSearch(searchString, columns);
        } else {
          search2.list();
        }
      }
      list.update();
      list.trigger("searchComplete");
      return list.visibleItems;
    };
    list.handlers.searchStart = list.handlers.searchStart || [];
    list.handlers.searchComplete = list.handlers.searchComplete || [];
    list.utils.events.bind(
      list.utils.getByClass(list.listContainer, list.searchClass),
      "keyup",
      list.utils.events.debounce(function(e) {
        var target = e.target || e.srcElement, alreadyCleared = target.value === "" && !list.searched;
        if (!alreadyCleared) {
          searchMethod(target.value);
        }
      }, list.searchDelay)
    );
    list.utils.events.bind(list.utils.getByClass(list.listContainer, list.searchClass), "input", function(e) {
      var target = e.target || e.srcElement;
      if (target.value === "") {
        searchMethod("");
      }
    });
    return searchMethod;
  };
  return search;
}
var filter;
var hasRequiredFilter;
function requireFilter() {
  if (hasRequiredFilter) return filter;
  hasRequiredFilter = 1;
  filter = function(list) {
    list.handlers.filterStart = list.handlers.filterStart || [];
    list.handlers.filterComplete = list.handlers.filterComplete || [];
    return function(filterFunction) {
      list.trigger("filterStart");
      list.i = 1;
      list.reset.filter();
      if (filterFunction === void 0) {
        list.filtered = false;
      } else {
        list.filtered = true;
        var is = list.items;
        for (var i = 0, il = is.length; i < il; i++) {
          var item2 = is[i];
          if (filterFunction(item2)) {
            item2.filtered = true;
          } else {
            item2.filtered = false;
          }
        }
      }
      list.update();
      list.trigger("filterComplete");
      return list.visibleItems;
    };
  };
  return filter;
}
var sort;
var hasRequiredSort;
function requireSort() {
  if (hasRequiredSort) return sort;
  hasRequiredSort = 1;
  sort = function(list) {
    var buttons = {
      els: void 0,
      clear: function() {
        for (var i = 0, il = buttons.els.length; i < il; i++) {
          list.utils.classes(buttons.els[i]).remove("asc");
          list.utils.classes(buttons.els[i]).remove("desc");
        }
      },
      getOrder: function(btn) {
        var predefinedOrder = list.utils.getAttribute(btn, "data-order");
        if (predefinedOrder == "asc" || predefinedOrder == "desc") {
          return predefinedOrder;
        } else if (list.utils.classes(btn).has("desc")) {
          return "asc";
        } else if (list.utils.classes(btn).has("asc")) {
          return "desc";
        } else {
          return "asc";
        }
      },
      getInSensitive: function(btn, options) {
        var insensitive = list.utils.getAttribute(btn, "data-insensitive");
        if (insensitive === "false") {
          options.insensitive = false;
        } else {
          options.insensitive = true;
        }
      },
      setOrder: function(options) {
        for (var i = 0, il = buttons.els.length; i < il; i++) {
          var btn = buttons.els[i];
          if (list.utils.getAttribute(btn, "data-sort") !== options.valueName) {
            continue;
          }
          var predefinedOrder = list.utils.getAttribute(btn, "data-order");
          if (predefinedOrder == "asc" || predefinedOrder == "desc") {
            if (predefinedOrder == options.order) {
              list.utils.classes(btn).add(options.order);
            }
          } else {
            list.utils.classes(btn).add(options.order);
          }
        }
      }
    };
    var sort2 = function() {
      list.trigger("sortStart");
      var options = {};
      var target = arguments[0].currentTarget || arguments[0].srcElement || void 0;
      if (target) {
        options.valueName = list.utils.getAttribute(target, "data-sort");
        buttons.getInSensitive(target, options);
        options.order = buttons.getOrder(target);
      } else {
        options = arguments[1] || options;
        options.valueName = arguments[0];
        options.order = options.order || "asc";
        options.insensitive = typeof options.insensitive == "undefined" ? true : options.insensitive;
      }
      buttons.clear();
      buttons.setOrder(options);
      var customSortFunction = options.sortFunction || list.sortFunction || null, multi = options.order === "desc" ? -1 : 1, sortFunction;
      if (customSortFunction) {
        sortFunction = function(itemA, itemB) {
          return customSortFunction(itemA, itemB, options) * multi;
        };
      } else {
        sortFunction = function(itemA, itemB) {
          var sort3 = list.utils.naturalSort;
          sort3.alphabet = list.alphabet || options.alphabet || void 0;
          if (!sort3.alphabet && options.insensitive) {
            sort3 = list.utils.naturalSort.caseInsensitive;
          }
          return sort3(itemA.values()[options.valueName], itemB.values()[options.valueName]) * multi;
        };
      }
      list.items.sort(sortFunction);
      list.update();
      list.trigger("sortComplete");
    };
    list.handlers.sortStart = list.handlers.sortStart || [];
    list.handlers.sortComplete = list.handlers.sortComplete || [];
    buttons.els = list.utils.getByClass(list.listContainer, list.sortClass);
    list.utils.events.bind(buttons.els, "click", sort2);
    list.on("searchStart", buttons.clear);
    list.on("filterStart", buttons.clear);
    return sort2;
  };
  return sort;
}
var fuzzy;
var hasRequiredFuzzy;
function requireFuzzy() {
  if (hasRequiredFuzzy) return fuzzy;
  hasRequiredFuzzy = 1;
  fuzzy = function(text, pattern, options) {
    var Match_Location = options.location || 0;
    var Match_Distance = options.distance || 100;
    var Match_Threshold = options.threshold || 0.4;
    if (pattern === text) return true;
    if (pattern.length > 32) return false;
    var loc = Match_Location, s = function() {
      var q = {}, i;
      for (i = 0; i < pattern.length; i++) {
        q[pattern.charAt(i)] = 0;
      }
      for (i = 0; i < pattern.length; i++) {
        q[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
      }
      return q;
    }();
    function match_bitapScore_(e, x) {
      var accuracy = e / pattern.length, proximity = Math.abs(loc - x);
      return accuracy + proximity / Match_Distance;
    }
    var score_threshold = Match_Threshold, best_loc = text.indexOf(pattern, loc);
    if (best_loc != -1) {
      score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
      best_loc = text.lastIndexOf(pattern, loc + pattern.length);
      if (best_loc != -1) {
        score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
      }
    }
    var matchmask = 1 << pattern.length - 1;
    best_loc = -1;
    var bin_min, bin_mid;
    var bin_max = pattern.length + text.length;
    var last_rd;
    for (var d = 0; d < pattern.length; d++) {
      bin_min = 0;
      bin_mid = bin_max;
      while (bin_min < bin_mid) {
        if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
          bin_min = bin_mid;
        } else {
          bin_max = bin_mid;
        }
        bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
      }
      bin_max = bin_mid;
      var start = Math.max(1, loc - bin_mid + 1);
      var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
      var rd = Array(finish + 2);
      rd[finish + 1] = (1 << d) - 1;
      for (var j = finish; j >= start; j--) {
        var charMatch = s[text.charAt(j - 1)];
        if (d === 0) {
          rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
        } else {
          rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
        }
        if (rd[j] & matchmask) {
          var score = match_bitapScore_(d, j - 1);
          if (score <= score_threshold) {
            score_threshold = score;
            best_loc = j - 1;
            if (best_loc > loc) {
              start = Math.max(1, 2 * loc - best_loc);
            } else {
              break;
            }
          }
        }
      }
      if (match_bitapScore_(d + 1, loc) > score_threshold) {
        break;
      }
      last_rd = rd;
    }
    return best_loc < 0 ? false : true;
  };
  return fuzzy;
}
var fuzzySearch;
var hasRequiredFuzzySearch;
function requireFuzzySearch() {
  if (hasRequiredFuzzySearch) return fuzzySearch;
  hasRequiredFuzzySearch = 1;
  requireClasses();
  var events2 = requireEvents(), extend2 = requireExtend(), toString2 = requireToString(), getByClass2 = requireGetByClass(), fuzzy2 = requireFuzzy();
  fuzzySearch = function(list, options) {
    options = options || {};
    options = extend2(
      {
        location: 0,
        distance: 100,
        threshold: 0.4,
        multiSearch: true,
        searchClass: "fuzzy-search"
      },
      options
    );
    var fuzzySearch2 = {
      search: function(searchString, columns) {
        var searchArguments = options.multiSearch ? searchString.replace(/ +$/, "").split(/ +/) : [searchString];
        for (var k = 0, kl = list.items.length; k < kl; k++) {
          fuzzySearch2.item(list.items[k], columns, searchArguments);
        }
      },
      item: function(item2, columns, searchArguments) {
        var found = true;
        for (var i = 0; i < searchArguments.length; i++) {
          var foundArgument = false;
          for (var j = 0, jl = columns.length; j < jl; j++) {
            if (fuzzySearch2.values(item2.values(), columns[j], searchArguments[i])) {
              foundArgument = true;
            }
          }
          if (!foundArgument) {
            found = false;
          }
        }
        item2.found = found;
      },
      values: function(values, value, searchArgument) {
        if (values.hasOwnProperty(value)) {
          var text = toString2(values[value]).toLowerCase();
          if (fuzzy2(text, searchArgument, options)) {
            return true;
          }
        }
        return false;
      }
    };
    events2.bind(
      getByClass2(list.listContainer, options.searchClass),
      "keyup",
      list.utils.events.debounce(function(e) {
        var target = e.target || e.srcElement;
        list.search(target.value, fuzzySearch2.search);
      }, list.searchDelay)
    );
    return function(str, columns) {
      list.search(str, columns, fuzzySearch2.search);
    };
  };
  return fuzzySearch;
}
var src;
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  var naturalSort = requireNaturalCompare(), getByClass2 = requireGetByClass(), extend2 = requireExtend(), indexOf = requireIndexOf(), events2 = requireEvents(), toString2 = requireToString(), classes2 = requireClasses(), getAttribute2 = requireGetAttribute(), toArray2 = requireToArray();
  src = function(id, options, values) {
    var self = this, init, Item = requireItem()(self), addAsync2 = requireAddAsync()(self), initPagination = requirePagination()(self);
    init = {
      start: function() {
        self.listClass = "list";
        self.searchClass = "search";
        self.sortClass = "sort";
        self.page = 1e4;
        self.i = 1;
        self.items = [];
        self.visibleItems = [];
        self.matchingItems = [];
        self.searched = false;
        self.filtered = false;
        self.searchColumns = void 0;
        self.searchDelay = 0;
        self.handlers = { updated: [] };
        self.valueNames = [];
        self.utils = {
          getByClass: getByClass2,
          extend: extend2,
          indexOf,
          events: events2,
          toString: toString2,
          naturalSort,
          classes: classes2,
          getAttribute: getAttribute2,
          toArray: toArray2
        };
        self.utils.extend(self, options);
        self.listContainer = typeof id === "string" ? document.getElementById(id) : id;
        if (!self.listContainer) {
          return;
        }
        self.list = getByClass2(self.listContainer, self.listClass, true);
        self.parse = requireParse()(self);
        self.templater = requireTemplater()(self);
        self.search = requireSearch()(self);
        self.filter = requireFilter()(self);
        self.sort = requireSort()(self);
        self.fuzzySearch = requireFuzzySearch()(self, options.fuzzySearch);
        this.handlers();
        this.items();
        this.pagination();
        self.update();
      },
      handlers: function() {
        for (var handler in self.handlers) {
          if (self[handler] && self.handlers.hasOwnProperty(handler)) {
            self.on(handler, self[handler]);
          }
        }
      },
      items: function() {
        self.parse(self.list);
        if (values !== void 0) {
          self.add(values);
        }
      },
      pagination: function() {
        if (options.pagination !== void 0) {
          if (options.pagination === true) {
            options.pagination = [{}];
          }
          if (options.pagination[0] === void 0) {
            options.pagination = [options.pagination];
          }
          for (var i = 0, il = options.pagination.length; i < il; i++) {
            initPagination(options.pagination[i]);
          }
        }
      }
    };
    this.reIndex = function() {
      self.items = [];
      self.visibleItems = [];
      self.matchingItems = [];
      self.searched = false;
      self.filtered = false;
      self.parse(self.list);
    };
    this.toJSON = function() {
      var json = [];
      for (var i = 0, il = self.items.length; i < il; i++) {
        json.push(self.items[i].values());
      }
      return json;
    };
    this.add = function(values2, callback) {
      if (values2.length === 0) {
        return;
      }
      if (callback) {
        addAsync2(values2.slice(0), callback);
        return;
      }
      var added = [], notCreate = false;
      if (values2[0] === void 0) {
        values2 = [values2];
      }
      for (var i = 0, il = values2.length; i < il; i++) {
        var item2 = null;
        notCreate = self.items.length > self.page ? true : false;
        item2 = new Item(values2[i], void 0, notCreate);
        self.items.push(item2);
        added.push(item2);
      }
      self.update();
      return added;
    };
    this.show = function(i, page) {
      this.i = i;
      this.page = page;
      self.update();
      return self;
    };
    this.remove = function(valueName, value, options2) {
      var found = 0;
      for (var i = 0, il = self.items.length; i < il; i++) {
        if (self.items[i].values()[valueName] == value) {
          self.templater.remove(self.items[i], options2);
          self.items.splice(i, 1);
          il--;
          i--;
          found++;
        }
      }
      self.update();
      return found;
    };
    this.get = function(valueName, value) {
      var matchedItems = [];
      for (var i = 0, il = self.items.length; i < il; i++) {
        var item2 = self.items[i];
        if (item2.values()[valueName] == value) {
          matchedItems.push(item2);
        }
      }
      return matchedItems;
    };
    this.size = function() {
      return self.items.length;
    };
    this.clear = function() {
      self.templater.clear();
      self.items = [];
      return self;
    };
    this.on = function(event, callback) {
      self.handlers[event].push(callback);
      return self;
    };
    this.off = function(event, callback) {
      var e = self.handlers[event];
      var index = indexOf(e, callback);
      if (index > -1) {
        e.splice(index, 1);
      }
      return self;
    };
    this.trigger = function(event) {
      var i = self.handlers[event].length;
      while (i--) {
        self.handlers[event][i](self);
      }
      return self;
    };
    this.reset = {
      filter: function() {
        var is = self.items, il = is.length;
        while (il--) {
          is[il].filtered = false;
        }
        return self;
      },
      search: function() {
        var is = self.items, il = is.length;
        while (il--) {
          is[il].found = false;
        }
        return self;
      }
    };
    this.update = function() {
      var is = self.items, il = is.length;
      self.visibleItems = [];
      self.matchingItems = [];
      self.templater.clear();
      for (var i = 0; i < il; i++) {
        if (is[i].matching() && self.matchingItems.length + 1 >= self.i && self.visibleItems.length < self.page) {
          is[i].show();
          self.visibleItems.push(is[i]);
          self.matchingItems.push(is[i]);
        } else if (is[i].matching()) {
          self.matchingItems.push(is[i]);
          is[i].hide();
        } else {
          is[i].hide();
        }
      }
      self.trigger("updated");
      return self;
    };
    init.start();
  };
  return src;
}
var srcExports = requireSrc();
const List = /* @__PURE__ */ getDefaultExportFromCjs(srcExports);
class TableManager {
  constructor(options = {}) {
    this.config = {
      containerId: options.containerId || "table-container",
      valueNames: options.valueNames || [],
      listClass: "listjs-container",
      page: options.page || 10,
      searchEnabled: options.searchEnabled || false,
      searchInputId: options.searchInputId || null,
      sortEnabled: options.sortEnabled !== false,
      // по умолчанию включена
      paginationEnabled: options.paginationEnabled !== false,
      // по умолчанию включена
      itemsCountEnabled: options.itemsCountEnabled !== false,
      // по умолчанию включен
      ...options
    };
    this.list = null;
    this.searchInput = null;
    this.init();
  }
  init() {
    console.log(`Инициализация TableManager для контейнера: ${this.config.containerId}`);
    const container = document.getElementById(this.config.containerId);
    if (!container) {
      console.log(`Контейнер ${this.config.containerId} не найден, пропускаем инициализацию`);
      return;
    }
    this.initTable();
    if (this.config.searchEnabled) {
      this.initSearch();
    }
    if (this.config.sortEnabled) {
      this.initSorting();
    }
    if (this.config.paginationEnabled) {
      this.initPaginationArrows();
    }
    if (this.config.itemsCountEnabled) {
      this.updateItemsCount();
    }
  }
  initTable() {
    this.ensureTableHasData();
    const listOptions = {
      valueNames: this.config.valueNames,
      listClass: this.config.listClass,
      page: this.config.page
    };
    if (this.config.searchEnabled && this.config.searchInputId) {
      listOptions.searchClass = "search";
    }
    if (this.config.paginationEnabled) {
      listOptions.pagination = {
        innerWindow: 1,
        outerWindow: 1,
        left: 1,
        right: 1,
        item: '<li><a class="page join-item btn btn-sm"></a></li>',
        paginationClass: "pagination join"
      };
    }
    this.list = new List(this.config.containerId, listOptions);
    if (this.config.paginationEnabled) {
      setTimeout(() => {
        this.togglePaginationVisibility();
      }, 50);
    }
    this.list.on("updated", () => {
      if (this.config.itemsCountEnabled) {
        this.updateItemsCount();
      }
      if (this.config.paginationEnabled) {
        this.togglePaginationVisibility();
        setTimeout(() => {
          this.updatePaginationArrows();
          this.setupStandardPaginationArrows();
        }, 10);
      }
    });
    if (this.config.paginationEnabled) {
      setTimeout(() => this.setupStandardPaginationArrows(), 100);
    }
  }
  ensureTableHasData() {
    const tbody = document.querySelector(`#${this.config.containerId} tbody.${this.config.listClass}`);
    if (tbody && tbody.children.length === 0) {
      console.log("Нет данных в таблице, добавляем пустой элемент для инициализации");
      const headerCells = document.querySelectorAll(`#${this.config.containerId} thead th`);
      const cellsCount = headerCells.length;
      let emptyCells = "";
      for (let i = 0; i < cellsCount; i++) {
        emptyCells += '<td class="px-4 py-3 text-brand-gray">-</td>';
      }
      tbody.innerHTML = `
        <tr class="hidden" data-type="template" data-id="0">
          ${emptyCells}
        </tr>
      `;
    }
  }
  initSearch() {
    if (!this.config.searchInputId) return;
    this.searchInput = document.getElementById(this.config.searchInputId);
    if (!this.searchInput) {
      console.log(`Поле поиска ${this.config.searchInputId} не найдено`);
      return;
    }
    this.searchInput.classList.add("w-full", "bg-brand-light", "rounded-xl", "p-3");
    let searchTimeout;
    this.searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase().trim();
        if (searchTerm === "") {
          this.list.search();
        } else {
          this.list.search(searchTerm);
        }
      }, 300);
    });
    this.searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.searchInput.value = "";
        this.list.search();
      }
    });
  }
  initSorting() {
    const sortButtons = document.querySelectorAll(`#${this.config.containerId} .sort[data-sort]`);
    sortButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setTimeout(() => {
          this.updateSortIndicators();
        }, 10);
      });
    });
  }
  updateSortIndicators() {
    const sortButtons = document.querySelectorAll(`#${this.config.containerId} .sort[data-sort]`);
    sortButtons.forEach((button) => {
      const arrow = button.querySelector("svg");
      if (!arrow) return;
      if (button.classList.contains("asc")) {
        arrow.style.transform = "rotate(0deg)";
      } else if (button.classList.contains("desc")) {
        arrow.style.transform = "rotate(180deg)";
      } else {
        arrow.style.transform = "rotate(0deg)";
      }
    });
  }
  initPaginationArrows() {
    const prevButton = document.getElementById("prev-page");
    const nextButton = document.getElementById("next-page");
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        const currentPage = this.getCurrentPage();
        if (currentPage > 1) {
          this.list.show((currentPage - 2) * this.list.page + 1, this.list.page);
        }
      });
    }
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        const currentPage = this.getCurrentPage();
        const totalPages = Math.ceil(this.list.size() / this.list.page);
        if (currentPage < totalPages) {
          this.list.show(currentPage * this.list.page + 1, this.list.page);
        }
      });
    }
    setTimeout(() => this.updatePaginationArrows(), 100);
  }
  updatePaginationArrows() {
    const paginationContainer = document.querySelector(`#${this.config.containerId} .pagination`);
    if (!paginationContainer) return;
    const prevButton = paginationContainer.querySelector(".pagination-prev");
    const nextButton = paginationContainer.querySelector(".pagination-next");
    if (!prevButton || !nextButton) return;
    const currentPage = this.getCurrentPage();
    const totalPages = Math.ceil(this.list.size() / this.list.page);
    if (currentPage <= 1) {
      prevButton.disabled = true;
      prevButton.classList.add("opacity-50", "cursor-not-allowed");
    } else {
      prevButton.disabled = false;
      prevButton.classList.remove("opacity-50", "cursor-not-allowed");
    }
    if (currentPage >= totalPages) {
      nextButton.disabled = true;
      nextButton.classList.add("opacity-50", "cursor-not-allowed");
    } else {
      nextButton.disabled = false;
      nextButton.classList.remove("opacity-50", "cursor-not-allowed");
    }
    this.updateNavigationArrows();
  }
  getCurrentPage() {
    const activePage = document.querySelector(`#${this.config.containerId} .pagination .active .page`);
    if (activePage) {
      return parseInt(activePage.textContent) || 1;
    }
    const activeButton = document.querySelector(`#${this.config.containerId} .pagination .active`);
    if (activeButton) {
      const pageText = activeButton.textContent || activeButton.innerText;
      const pageNumber = parseInt(pageText);
      if (!isNaN(pageNumber)) {
        return pageNumber;
      }
    }
    return 1;
  }
  updateItemsCount() {
    const itemsCount = document.getElementById("items-count");
    const totalCount = document.getElementById("total-count");
    if (itemsCount && totalCount && this.list) {
      itemsCount.textContent = this.list.visibleItems.length;
      totalCount.textContent = this.list.items.length;
    }
  }
  // Методы для фильтрации
  filter(filterFunction) {
    if (this.list) {
      this.list.filter(filterFunction);
    }
  }
  clearFilter() {
    if (this.list) {
      this.list.filter();
    }
  }
  // Методы для добавления/удаления элементов
  addItem(item2) {
    if (this.list) {
      this.list.add(item2);
    }
  }
  removeItem(id) {
    if (this.list) {
      this.list.remove("id", id);
    }
  }
  // Метод для получения экземпляра List.js
  getList() {
    return this.list;
  }
  // Метод для поиска
  search(searchTerm = "") {
    if (this.list) {
      this.list.search(searchTerm);
    }
  }
  // Метод для очистки поиска
  clearSearch() {
    if (this.searchInput) {
      this.searchInput.value = "";
    }
    this.search("");
  }
  setupStandardPaginationArrows() {
    const paginationContainer = document.querySelector(`#${this.config.containerId} .pagination`);
    if (!paginationContainer) return;
    const paginationItems = paginationContainer.querySelectorAll(".page");
    if (paginationItems.length === 0) return;
    const firstButton = paginationItems[0];
    const lastButton = paginationItems[paginationItems.length - 1];
    if (firstButton && isNaN(parseInt(firstButton.textContent))) {
      firstButton.innerHTML = "‹";
      firstButton.classList.add("pagination-arrow", "pagination-prev");
    }
    if (lastButton && isNaN(parseInt(lastButton.textContent))) {
      lastButton.innerHTML = "›";
      lastButton.classList.add("pagination-arrow", "pagination-next");
    }
    this.addNavigationArrows(paginationContainer, firstButton, lastButton);
  }
  addNavigationArrows(paginationContainer, firstButton, lastButton) {
    if (paginationContainer.querySelector(".pagination-first") || paginationContainer.querySelector(".pagination-last")) {
      return;
    }
    const firstPageButton = document.createElement("li");
    firstPageButton.innerHTML = '<a class="page join-item btn btn-sm pagination-first pagination-arrow">«</a>';
    const lastPageButton = document.createElement("li");
    lastPageButton.innerHTML = '<a class="page join-item btn btn-sm pagination-last pagination-arrow">»</a>';
    if (firstButton && firstButton.parentElement) {
      paginationContainer.insertBefore(firstPageButton, firstButton.parentElement);
    }
    if (lastButton && lastButton.parentElement) {
      paginationContainer.insertBefore(lastPageButton, lastButton.parentElement.nextSibling);
    }
    const firstPageLink = firstPageButton.querySelector(".pagination-first");
    const lastPageLink = lastPageButton.querySelector(".pagination-last");
    if (firstPageLink) {
      firstPageLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.list.show(1, this.list.page);
      });
    }
    if (lastPageLink) {
      lastPageLink.addEventListener("click", (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(this.list.size() / this.list.page);
        this.list.show((totalPages - 1) * this.list.page + 1, this.list.page);
      });
    }
    this.updateNavigationArrows();
  }
  updateNavigationArrows() {
    const paginationContainer = document.querySelector(`#${this.config.containerId} .pagination`);
    if (!paginationContainer) return;
    const firstPageButton = paginationContainer.querySelector(".pagination-first");
    const lastPageButton = paginationContainer.querySelector(".pagination-last");
    const prevButton = paginationContainer.querySelector(".pagination-prev");
    const nextButton = paginationContainer.querySelector(".pagination-next");
    if (!firstPageButton || !lastPageButton) return;
    const currentPage = this.getCurrentPage();
    const totalPages = Math.ceil(this.list.size() / this.list.page);
    if (currentPage <= 1) {
      firstPageButton.disabled = true;
      firstPageButton.classList.add("opacity-50", "cursor-not-allowed");
    } else {
      firstPageButton.disabled = false;
      firstPageButton.classList.remove("opacity-50", "cursor-not-allowed");
    }
    if (currentPage >= totalPages) {
      lastPageButton.disabled = true;
      lastPageButton.classList.add("opacity-50", "cursor-not-allowed");
    } else {
      lastPageButton.disabled = false;
      lastPageButton.classList.remove("opacity-50", "cursor-not-allowed");
    }
    if (prevButton) {
      if (currentPage <= 1) {
        prevButton.disabled = true;
        prevButton.classList.add("opacity-50", "cursor-not-allowed");
      } else {
        prevButton.disabled = false;
        prevButton.classList.remove("opacity-50", "cursor-not-allowed");
      }
    }
    if (nextButton) {
      if (currentPage >= totalPages) {
        nextButton.disabled = true;
        nextButton.classList.add("opacity-50", "cursor-not-allowed");
      } else {
        nextButton.disabled = false;
        nextButton.classList.remove("opacity-50", "cursor-not-allowed");
      }
    }
  }
  togglePaginationVisibility() {
    const paginationContainer = document.querySelector(`#${this.config.containerId} .pagination`);
    if (!paginationContainer) {
      console.log("Контейнер пагинации не найден");
      return;
    }
    setTimeout(() => {
      const pageButtons = paginationContainer.querySelectorAll(".page");
      const numberButtons = Array.from(pageButtons).filter((btn) => {
        const text = btn.textContent.trim();
        return !isNaN(parseInt(text)) && text !== "";
      });
      console.log(`Проверка пагинации: найдено ${numberButtons.length} кнопок с номерами страниц`);
      if (numberButtons.length <= 1) {
        paginationContainer.style.display = "none";
        console.log("Пагинация скрыта: одна страница или меньше");
      } else {
        paginationContainer.style.display = "flex";
        console.log(`Пагинация показана: ${numberButtons.length} страниц`);
      }
    }, 20);
  }
}
export {
  TableManager as T
};

function createAutocompleteInput(container, offices, id, placeholder, options = {}) {
  console.log(`Создание поля автокомплита ${id} с плейсхолдером "${placeholder}"`);
  const existingArrow = container.querySelector("img");
  let arrowHTML = "";
  if (existingArrow) {
    const arrowSrc = existingArrow.src;
    arrowHTML = `<img src="${arrowSrc}" alt="" class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">`;
  }
  const autocompleteHTML = `
    <div class="relative w-full">
      <input 
        id="${id}-input" 
        type="text" 
        class="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none text-body-secondary !pr-8 text-sm"
        placeholder="${placeholder}" 
        autocomplete="off"
        required
      >
      <button type="button" class="absolute right-0 top-0 h-full w-12 text-gray-400 focus:outline-none z-10"></button>
      ${arrowHTML}
      <ul 
        id="${id}-suggestions" 
        class="absolute w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto hidden z-20"
        style=""
      ></ul>
    </div>
  `;
  container.innerHTML = autocompleteHTML;
  console.log(`Вставлена HTML-разметка для поля ${id}`);
  const input = document.getElementById(`${id}-input`);
  const list2 = document.getElementById(`${id}-suggestions`);
  const toggleButton = container.querySelector("button");
  if (!input || !list2 || !toggleButton) {
    console.error(`Не удалось создать элементы автокомплита для ${id}`, {
      input: !!input,
      list: !!list2,
      toggleButton: !!toggleButton
    });
    return;
  }
  console.log(`Созданы элементы автокомплита для ${id}`);
  let currentIndex2 = -1;
  function officeToString(office) {
    if (options.onlyCities) {
      return office.city;
    }
    return `${office.city}, ${office.address}${office.phone ? ", " + office.phone : ""}`;
  }
  function officePreviewHTML(office) {
    if (options.onlyCities) {
      return `
        <div style="line-height:1.3; padding:2px 0;">
          <div style="font-weight:bold;">${office.city}</div>
        </div>
      `;
    }
    return `
      <div style="line-height:1.3; padding:2px 0;">
        <div style="font-weight:bold;">${office.city}</div>
        <div>${office.address}</div>
        <div style="color:#888; font-size:0.95em;">${office.type || ""}</div>
        <div style="color:#008DD2; font-size:0.98em;">${office.phone || ""}</div>
      </div>
    `;
  }
  function filterOffices(query) {
    const q = query.toLowerCase().trim();
    if (options.onlyCities) {
      const byCityStart2 = /* @__PURE__ */ new Map();
      const byCityInclude2 = /* @__PURE__ */ new Map();
      const uniqueCities = /* @__PURE__ */ new Map();
      offices.forEach((office) => {
        if (office.city) {
          const cityName = office.city.trim();
          const cityLower = cityName.toLowerCase();
          if (!uniqueCities.has(cityLower)) {
            uniqueCities.set(cityLower, office);
          }
        }
      });
      uniqueCities.forEach((office, cityLower) => {
        if (cityLower.startsWith(q)) {
          byCityStart2.set(cityLower, office);
        } else if (cityLower.includes(q)) {
          byCityInclude2.set(cityLower, office);
        }
      });
      return [...byCityStart2.values(), ...byCityInclude2.values()];
    }
    const byCityStart = [];
    const byCityInclude = [];
    const byOther = [];
    offices.forEach((office) => {
      if (office.city && office.city.toLowerCase().startsWith(q)) {
        byCityStart.push(office);
      } else if (office.city && office.city.toLowerCase().includes(q)) {
        byCityInclude.push(office);
      } else if (office.address && office.address.toLowerCase().includes(q) || office.type && office.type.toLowerCase().includes(q) || office.phone && office.phone.toLowerCase().includes(q)) {
        byOther.push(office);
      }
    });
    return [...byCityStart, ...byCityInclude, ...byOther];
  }
  function updateSuggestions(filtered) {
    list2.innerHTML = "";
    currentIndex2 = -1;
    filtered.forEach((office, index) => {
      const li = document.createElement("li");
      li.innerHTML = officePreviewHTML(office);
      li.className = "px-4 py-2 hover:bg-blue-100 cursor-pointer";
      li.addEventListener("click", () => {
        input.value = officeToString(office);
        list2.classList.add("hidden");
        if (options.onlyCities) {
          Promise.resolve().then(() => {
            const event = new CustomEvent("citySelected", { detail: { city: office.city } });
            input.dispatchEvent(event);
          });
        }
      });
      list2.appendChild(li);
    });
    list2.classList.remove("hidden");
  }
  function showAllSuggestions() {
    list2.innerHTML = "";
    currentIndex2 = -1;
    if (options.onlyCities) {
      const uniqueCities = /* @__PURE__ */ new Map();
      offices.forEach((office) => {
        if (office.city) {
          const cityName = office.city.trim();
          const cityLower = cityName.toLowerCase();
          if (!uniqueCities.has(cityLower)) {
            uniqueCities.set(cityLower, office);
          }
        }
      });
      uniqueCities.forEach((office, index) => {
        const li = document.createElement("li");
        li.innerHTML = officePreviewHTML(office);
        li.className = "px-4 py-2 hover:bg-blue-100 cursor-pointer";
        li.addEventListener("click", () => {
          input.value = officeToString(office);
          list2.classList.add("hidden");
          if (options.onlyCities) {
            Promise.resolve().then(() => {
              const event = new CustomEvent("citySelected", { detail: { city: office.city } });
              input.dispatchEvent(event);
            });
          }
        });
        list2.appendChild(li);
      });
    } else {
      offices.forEach((office, index) => {
        const li = document.createElement("li");
        li.innerHTML = officePreviewHTML(office);
        li.className = "px-4 py-2 hover:bg-blue-100 cursor-pointer";
        li.addEventListener("click", () => {
          input.value = officeToString(office);
          list2.classList.add("hidden");
          if (options.onlyCities) {
            Promise.resolve().then(() => {
              const event = new CustomEvent("citySelected", { detail: { city: office.city } });
              input.dispatchEvent(event);
            });
          }
        });
        list2.appendChild(li);
      });
    }
    list2.classList.remove("hidden");
  }
  toggleButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (list2.classList.contains("hidden")) {
      showAllSuggestions();
    } else {
      list2.classList.add("hidden");
    }
  });
  input.addEventListener("input", () => {
    const value = input.value.trim();
    if (!value) {
      list2.classList.add("hidden");
      return;
    }
    const filtered = filterOffices(value);
    if (filtered.length === 0) {
      list2.classList.add("hidden");
      return;
    }
    updateSuggestions(filtered);
  });
  input.addEventListener("keydown", (e) => {
    const items = list2.querySelectorAll("li");
    if (list2.classList.contains("hidden") || items.length === 0) {
      if (e.key === "ArrowDown" && input.value.trim() === "") {
        e.preventDefault();
        showAllSuggestions();
        return;
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      currentIndex2 = (currentIndex2 + 1) % items.length;
      highlightItem(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      currentIndex2 = (currentIndex2 - 1 + items.length) % items.length;
      highlightItem(items);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (currentIndex2 >= 0 && currentIndex2 < items.length) {
        const office = filterOffices(input.value.trim())[currentIndex2] || offices[currentIndex2];
        if (office) input.value = officeToString(office);
        list2.classList.add("hidden");
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      list2.classList.add("hidden");
    }
  });
  document.addEventListener("click", (e) => {
    if (!list2.contains(e.target) && e.target !== input && e.target !== toggleButton) {
      list2.classList.add("hidden");
    }
  });
  input.addEventListener("focus", () => {
    const value = input.value.trim();
    if (!value) return;
    const filtered = filterOffices(value);
    if (filtered.length > 0) {
      updateSuggestions(filtered);
    }
  });
  list2.style.maxHeight = "200px";
  list2.style.overflowY = "auto";
  list2.style.overscrollBehavior = "contain";
}
function highlightItem(items) {
  items.forEach((item, index) => {
    item.classList.toggle("bg-blue-100", index === currentIndex);
  });
  if (currentIndex >= 0) {
    const selectedItem = items[currentIndex];
    const listRect = list.getBoundingClientRect();
    const itemRect = selectedItem.getBoundingClientRect();
    if (itemRect.bottom > listRect.bottom) {
      selectedItem.scrollIntoView(false);
    } else if (itemRect.top < listRect.top) {
      selectedItem.scrollIntoView(true);
    }
  }
}
export {
  createAutocompleteInput as c
};

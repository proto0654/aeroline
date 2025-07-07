import { y as onMounted, c as createElementBlock, o as openBlock, b as createBaseVNode, e as createCommentVNode, t as toDisplayString } from "./runtime-dom.esm-bundler-C8J7FHpO.js";
const __vite_glob_0_0 = "" + new URL("../../img/563x304 (1)-KBSjg7Ja.jpg", import.meta.url).href;
const __vite_glob_0_1 = "" + new URL("../../img/563x304-8PI7wwWf.jpg", import.meta.url).href;
const __vite_glob_0_2 = "" + new URL("../../img/800x400 (1)-DehTG3JH.jpg", import.meta.url).href;
const __vite_glob_0_3 = "" + new URL("../../img/800x400 (2)-B-Ks_FTB.jpg", import.meta.url).href;
const __vite_glob_0_4 = "" + new URL("../../img/800x400-Bd9KAYgL.jpg", import.meta.url).href;
const __vite_glob_0_5 = "" + new URL("../../img/scale_1200 (1)-CloB-gPO.jpg", import.meta.url).href;
const __vite_glob_0_6 = "" + new URL("../../img/scale_1200-CHtVQ_Ge.jpg", import.meta.url).href;
const _hoisted_1 = { class: "modal-content" };
const _hoisted_2 = { class: "text-h4 font-bold text-brand-gray mb-4" };
const _hoisted_3 = {
  key: 0,
  class: "news-image mb-4"
};
const _hoisted_4 = { class: "rounded-2xl overflow-hidden" };
const _hoisted_5 = ["src", "alt"];
const _hoisted_6 = { class: "news-text text-body text-brand-gray mb-4" };
const _hoisted_7 = { class: "text-caption-form text-brand-gray-light" };
const _sfc_main = {
  __name: "NewsDetailModal",
  props: {
    news: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  setup(__props) {
    const images = /* @__PURE__ */ Object.assign({ "/assets/img/news/563x304 (1).jpg": __vite_glob_0_0, "/assets/img/news/563x304.jpg": __vite_glob_0_1, "/assets/img/news/800x400 (1).jpg": __vite_glob_0_2, "/assets/img/news/800x400 (2).jpg": __vite_glob_0_3, "/assets/img/news/800x400.jpg": __vite_glob_0_4, "/assets/img/news/scale_1200 (1).jpg": __vite_glob_0_5, "/assets/img/news/scale_1200.jpg": __vite_glob_0_6 });
    const props = __props;
    const getImageUrl = (imgName) => {
      if (!imgName) return new URL("" + new URL("../../img/Logotype_aerline_light-BjokHjWg.png", import.meta.url).href, import.meta.url).href;
      const found = Object.entries(images).find(([path]) => path.endsWith("/" + imgName));
      if (found) return found[1];
      return new URL("" + new URL("../../img/Logotype_aerline_light-BjokHjWg.png", import.meta.url).href, import.meta.url).href;
    };
    onMounted(() => {
      console.log("NewsDetailModal mounted with news:", props.news);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("h2", _hoisted_2, toDisplayString(__props.news.title), 1),
        __props.news.image && !__props.news.isPlaceholder ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("img", {
              src: getImageUrl(__props.news.image),
              alt: __props.news.title,
              class: "w-full object-cover aspect-[1.85/1]"
            }, null, 8, _hoisted_5)
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("p", _hoisted_6, toDisplayString(__props.news.content), 1),
        createBaseVNode("p", _hoisted_7, toDisplayString(__props.news.date), 1)
      ]);
    };
  }
};
export {
  _sfc_main as _,
  __vite_glob_0_6 as a,
  __vite_glob_0_5 as b,
  __vite_glob_0_4 as c,
  __vite_glob_0_3 as d,
  __vite_glob_0_2 as e,
  __vite_glob_0_1 as f,
  __vite_glob_0_0 as g
};

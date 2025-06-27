import { b as onMounted, c as createElementBlock, o as openBlock, d as createBaseVNode, e as createCommentVNode, t as toDisplayString } from "./runtime-dom.esm-bundler-D-nyHKmb.js";
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
    const props = __props;
    onMounted(() => {
      console.log("NewsDetailModal mounted with news:", props.news);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("h2", _hoisted_2, toDisplayString(__props.news.title), 1),
        __props.news.image && !__props.news.isPlaceholder ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("img", {
              src: __props.news.image,
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
  _sfc_main as _
};

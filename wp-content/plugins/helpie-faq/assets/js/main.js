var Stylus=require("./../../lib/stylus/js/search.js"),Tracker=require("./components/insights/tracker.js"),Submission=require("./components/submission/submission.js"),Pagination=require("./components/faq/pagination.js"),SearchByAttributes=require("./components/faq/seach_by_attribute.js"),HelpieFaq={nonce:helpie_faq_object.nonce,init:function(){this.setShortcodeIndex(),this.onPageLoadActions(),this.eventHandlers(),Tracker.init(this.nonce),Stylus.init(),Submission.init(),Pagination.init()},setShortcodeIndex:function(){let e=0;jQuery(".helpie-faq").each((function(){jQuery(this).attr("data-shortcode-index",e),e++}))},eventHandlers:function(){var e=this;jQuery(".helpie-faq").on("click",".accordion__header",(function(i){if(i.preventDefault(),i.stopPropagation(),e.isFaqList(jQuery(this)))return!1;e.onHeaderClick(this);var o=jQuery(this).attr("data-item");void 0!==o&&"undefined"!==o&&""!==o&&(window.location.hash=jQuery(this).attr("data-item"))})),jQuery(".helpie-faq").on("click",".accordion__title, .faq-title-icon",(function(i){var o=jQuery(this).closest(".accordion__header");if(i.preventDefault(),i.stopPropagation(),e.isFaqList(jQuery(this)))return!1;e.onHeaderClick(o);var t=o.attr("data-item");void 0!==t&&"undefined"!==t&&""!==t&&(window.location.hash=o.attr("data-item"))}))},openFirstAccordion:function(){jQuery(".helpie-faq.accordions.open-first > .accordion:first").each((function(){var e=".accordion__item:first > .accordion__header";jQuery(this).find(e).addClass("active"),jQuery(this).find(e).next(".accordion__body").stop().slideDown(300)}))},onPageLoadActions:function(){let e=window.location.hash,i=!1;""!=e&&(SearchByAttributes.doSearch(e),i=this.openHFaqAccordion(e)),i||this.openFirstAccordion()},onHeaderClick:function(e){jQuery(e).hasClass("active")?this.closeAccordion(e):(jQuery(e).closest(".helpie-faq.accordions").hasClass("faq-toggle")&&(jQuery(e).closest(".accordion").find(".accordion__header").removeClass("active"),jQuery(e).closest(".accordion").find(".accordion__body").slideUp()),this.openAccordion(e))},openAccordion:function(e){jQuery(e).addClass("active"),jQuery(e).next(".accordion__body").stop().slideDown(300);var i=jQuery(e).attr("data-id");i&&Tracker.clickCounter(i)},closeAccordion:function(e){jQuery(e).removeClass("active"),jQuery(e).next(".accordion__body").stop().slideUp(300)},openHFaqAccordion:function(e){var i=!1;return jQuery(".helpie-faq.accordions .accordion .accordion__item").each((function(){if("#"+jQuery(this).find(".accordion__header").attr("data-item")===e){if(jQuery(this).find(".accordion__header").addClass("active"),jQuery(this).find(".accordion__header").next(".accordion__body").stop().slideDown(300),jQuery(this).parents(".accordion").length>0){var o=jQuery(this).closest(".accordion").parent();o.prev().addClass("active"),o.show()}let e=jQuery(this).find(".accordion__header").offset().top;return e-=parseInt(70),window.scrollTo({top:e,behavior:"smooth"}),i=!0,!1}})),i},isFaqList:function(e){return jQuery(e).closest("article.faq_list").length}};jQuery(document).ready((function(){HelpieFaq.init()}));import"./../css/main.scss";
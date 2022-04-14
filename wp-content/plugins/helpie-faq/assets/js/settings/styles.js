var selectors={faqSettings:".helpie-faq__settings",theme:".faq_fields--theme",backgrounds:".faq_fields--color_group",themeField:".csf-fieldset select[name*='theme']",searchBgColorField:".faq_fields--search_background_color",searchFontColorField:".faq_fields--search_font_color",searchIconColorField:".faq_fields--search_icon_color",displayModeField:".faq_fields--display_mode",borderField:".faq_fields--accordion_border",headerPaddingsField:".faq_fields--accordion_header_spacing",bodyPaddingsField:".faq_fields--accordion_body_spacing",headerBackgroudColorField:".wp-picker-container .wp-picker-input-wrap input[name*='header']",bodyBackgroudColorField:".wp-picker-container .wp-picker-input-wrap input[name*='body']",inputFields:".csf-fieldset .csf--inputs .csf--input"},Styles={init:function(){if(0==jQuery(selectors.faqSettings).length)return!1;this.events()},events:function(){var e=jQuery(selectors.displayModeField).find(".csf-fieldset select[name*='display_mode']").val();const o=this;jQuery(selectors.theme).on("change",selectors.themeField,(function(){let e=jQuery(this).val(),s=o.getDefaultThemeValues(e);o.setBackgrounds(s)})),jQuery(selectors.displayModeField).on("change",".csf-fieldset select[name*='display_mode']",(function(){let s=jQuery(this).val();"faq_list"!=e&&"faq_list"!=s||(e=s,o.setHeaderAndBodyPaddingValues(s))})),o.disableURLAttributePostSlugOption()},getDefaultThemeValues:function(e){""==e&&(e="light");return{light:{header:"#FFFFFF",body:"#FCFCFC",search:{background:"#FFFFFF",icon:"#171717",font_color:"#171717"}},dark:{header:"#171717",body:"#272727",search:{background:"#171717",icon:"#fcfcfc",font_color:"#fcfcfc"}}}[e]},setBackgrounds:function(e){let o=jQuery(selectors.backgrounds).find(".csf-fieldset .csf-field-color");if(0==o.length)return;const s=this,t=jQuery(o[0]),r=jQuery(o[1]);s.removeTransparentClass(t),s.removeTransparentClass(r),s.setBackground(t,e),s.setBackground(r,e),s.setInput(t,"header",e),s.setInput(r,"body",e),s.setColorsInSearchFields(e)},setColorsInSearchFields:function(e){if("free"==helpie_faq_object.plan)return;const o=jQuery(selectors.searchBgColorField).find(".csf-fieldset"),s=jQuery(selectors.searchIconColorField).find(".csf-fieldset"),t=jQuery(selectors.searchFontColorField).find(".csf-fieldset");o.find(".wp-color-result").css("background-color",e.search.background),o.find("input[name*='search_background_color']").val(e.search.background),s.find(".wp-color-result").css("background-color",e.search.icon),s.find("input[name*='search_icon_color']").val(e.search.icon),t.find(".wp-color-result").css("background-color",e.search.font_color),t.find("input[name*='search_font_color']").val(e.search.font_color)},removeTransparentClass:function(e){let o=e.find(".wp-picker-container");o.hasClass("csf--transparent-active")&&o.removeClass("csf--transparent-active")},setBackground:function(e,o){e.find(".wp-picker-container .wp-color-result").css("background-color",o.header)},setInput:function(e,o,s){let t=s.header,r=selectors.headerBackgroudColorField;"body"==o&&(t=s.body,r=selectors.bodyBackgroudColorField),e.find(r).val(t)},setBorderFieldValuesAsZero:function(){let e=selectors.inputFields+" input[type='number']";jQuery(selectors.borderField).find(e).val(0)},setHeaderAndBodyPaddingValues:function(e){let o=this.getDefaultAccordionPaddingValues(e),s=o.header,t=o.body;for(var r in s){let e=s[r],o=selectors.inputFields+" input[name*='"+r+"']";jQuery(selectors.headerPaddingsField).find(o).val(e)}for(var r in t){let e=t[r],o=selectors.inputFields+" input[name*='"+r+"']";jQuery(selectors.bodyPaddingsField).find(o).val(e)}},getDefaultAccordionPaddingValues:function(e){let o={faq_list:{header:{top:"5",bottom:"5",left:"15",right:"15"},body:{top:"5",bottom:"5",left:"15",right:"15"}},others:{header:{top:"15",bottom:"15",left:"15",right:"15"},body:{top:"15",bottom:"0",left:"15",right:"15"}}};return"faq_list"===e?o.faq_list:o.others},disableURLAttributePostSlugOption:function(){jQuery(".faq_fields--faq_url_type").find(".csf-fieldset input[name*='faq_url_type']").each((function(){"temp_post_slug"===jQuery(this).val()&&(jQuery(this).closest("li").addClass("helpie-disabled"),jQuery(this).attr("disabled",!0))}))}};module.exports=Styles;
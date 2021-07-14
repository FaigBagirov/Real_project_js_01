import "./slider";
import modals from './modules/modals'
import tabs from './modules/tabs'
import forms from './modules/forms'
import gatherFormData from './modules/gatherFormData'

let formDataCollctn = {};

window.addEventListener('DOMContentLoaded', () => {
   "use strict";
   modals(); //call modal windows handler only when all document content was loaded
   tabs('.glazing_slider', 'glazing_block', 'glazing_content', 'active');
  
   //'classname > otherClassName' means get direct child of "className"
   tabs('.decoration_slider', 'no_click', 'decoration_content > div > div', 'after_click');
   
   //for tabSelector I can use  either balcon_icons_img or added by me calc_tab
   tabs('.balcon_icons', 'balcon_icons_img', 'big_img > img', 'do_image_more', 'inline-block'); 
   forms(formDataCollctn);
   gatherFormData(formDataCollctn);
}); 
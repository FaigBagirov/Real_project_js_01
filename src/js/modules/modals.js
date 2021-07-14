
//import resetDataCollection from './gatherFormData'

const modals = () => {
    //this is universal modal windows processing func.
    // at first it (lower) I call it for specific html element
    function bindModal(triggerSelector, modalSelector, closeSelector, closeOnOutsideClick = true) {
        
        //varibles for universal modal window handler
        const trigger = document.querySelectorAll(triggerSelector), //array of buttons that trigger each modal window
        modal = document.querySelector(modalSelector), //modal window itself
        close = document.querySelector(closeSelector), // close button on each modal windows
        
        //selecting by dataset is low performance: modalWindow = document.querySelectorAll("[data-modal]");
        modalWindows = document.querySelectorAll(".js-modal");

        trigger.forEach(item => {
            item.addEventListener('click', (event) => {
                //resetDataCollection();

                //if chtobi proverit esli obyekt ssilka
                if(event.target){
                    event.preventDefault();
                }

                modalWindows.forEach(element => {
                    element.style.display = 'none';
                });

                //additional actions when opening the modal window
                modal.style.display = "block";   
                // document.body.classList.add('modal-open'); //modal-open is bootstrap predefined class
                document.body.style.overflow = "hidden"; //zapretit prokrutu kogda modalnoye okno otkrito
            });
        });
        //old non universal version
            //action on click on the button that opens the modal window
            // trigger.addEventListener('click', (event) => {
            //     //if chtobi proverit esli obyekt ssilka
            //     if(event.target){
            //         event.preventDefault();
            //     }

            //     //additional actions when opening the modal window
            //     modal.style.display = "block";

            //     // document.body.classList.add('modal-open'); //modal-open is bootstrap predefined class
            //     document.body.style.overflow = "hidden"; //zapretit prokrutu kogda modalnoye okno otkrito
            // });

        //action on click on the close button
        close.addEventListener('click', () => {

            modal.style.display = "none"; //spratat (zakrit) modalnoye okno 
            
            // document.body.classList.remove('modal-open'); //modal-open is bootstrap predefined class
            document.body.style.overflow = ""; //razreshit prokrutku obratno
        });
        
        // if clicked outside of the modal then close it as if close btn was pressed
        modal.addEventListener('click', (event) => {

            // it works because if event target is top div it isn't regarded nested divs inside that top div
            if (event.target === modal && closeOnOutsideClick) { 
                modal.style.display = "none"; //spratat (zakrit) modalnoye okno 

                // document.body.classList.remove('modal-open'); //modal-open is bootstrap predefined class
                document.body.style.overflow = ""; //razreshit prokrutku obratno
            }
        });
    }
    
    //here we specify with which html elements bindModal should work
    //but this is not universal approach, this needs to be moved inside tha bindModal function
    // const callEngineerBtn = document.querySelector('.popup_engineer_btn'), //modal window open button
    // modalEngineer = document.querySelector('.popup_engineer'), // modal window itself
    // modalEngineerClose = document.querySelector('.popup_engineer .popup_close'); //modal windows close button
    
    //here we call that func by passing to it html elements that I want it to work with
    //old non-universal version with html classes
    // bindModal(callEngineerBtn, modalEngineer, modalEngineerClose); 
    
    //new universal version with css selectors
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');

    bindModal('.popup_calc_btn','.popup_calc','.popup_calc_close');
    bindModal('.popup_calc_button','.popup_calc_profile','.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button','.popup_calc_end','.popup_calc_end_close', false);
};

export default modals;
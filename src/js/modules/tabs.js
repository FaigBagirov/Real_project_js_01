//activeClass var is needed for tabs (not their content) to highlight selected tab
const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {

    const header =  document.querySelector(headerSelector),
    tab = document.querySelectorAll('.' + tabSelector),
    content = document.querySelectorAll('.' + contentSelector);


    function hideAllTabs(){
        content.forEach(item => {
           item.style.display = 'none';
        });

        tab.forEach(item => {
            item.classList.remove(activeClass)
        });
    }

    function showTab(clickedTab){
        //show first tab if no id is passed (it's for init code)
        if (clickedTab === undefined){
            content[0].style.display = display;
            tab[0].classList.add(activeClass);
        }

        else{
        //show content according to hte clicked tab
        // console.log(clickedTab.dataset.slide);
        console.log(document.querySelector(`#${clickedTab.dataset.slide}`));
        document.querySelector(`#${clickedTab.dataset.slide}`).style.display = display;
        clickedTab.classList.add(activeClass);
        }
    }

    // init code
    hideAllTabs();
    showTab(); 

    //add click listener for whole header of the tabs
    header.addEventListener('click', (event) =>{
        //if I plan to change "target" variable it must not be "const"
        let target = event.target; 

        //checking if target of the click has the class of the tabs, which is passed as tabSelector
        //or if it is the tab's child element, then element's parentNode should be our tab
        //"if(target)" statement checks if the target element is clickable

        // //----------------old browser compatibility version start
            // let tabsParentsClasses = target.parentNode.classList.values();
            // let tabsClasses = target.classList.values();

            // if (target){//"if (target)" means "if the clicked element is clickable"
            //     for (let item of  tabsParentsClasses){
            //         if (item === tabSelector) {
            //             console.log("found child");

            //             hideAllTabs();
            //             showTab(target.parentNode);
            //             return;
            //         }
            //     }

            //     for (let item of  tabsClasses){
            //         if (item === tabSelector){
            //             console.log("found itself");
                        
            //            hideAllTabs();
            //            showTab(target); 
            //            return;
            //         }

            //     } 
            // }
        // //----------------old browser compatibility version end
        
        //----------------only modern browsers compatibility version start
        if(target){
            if (target.parentNode.classList.contains(tabSelector)){
                target = target.parentNode; //here I change the "target" variable to it's own parent
            }

            if (target.classList.contains(tabSelector)){
                //if user clicked the tab's child then change the "target" to it's parent
                hideAllTabs();
                showTab(target); 
            }
        }
        //----------------only modern browsers compatibility version end
    });
}

export default tabs;
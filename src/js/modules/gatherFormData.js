import checkInputValues from './checkInputValues'

const gatherFormData = (collctn)=>{
    const productForm = document.querySelectorAll('.balcon_icons_img'),
    productWidth = document.querySelectorAll('#width'),
    productHeight = document.querySelectorAll('#height'),
    productType = document.querySelectorAll('#view_type'),
    productProfile = document.querySelectorAll('.checkbox');

    checkInputValues('#width', "pure_nums");
    checkInputValues('#height', "pure_nums");

    //console.log(productWidth);
    // allInputFields.forEach((field)=>{
    //     console.log(field.nodeName)
    // });

    //document.addEventListener('click', (target)=>{
        //console.log(target.nodeName);
    //})

    //! this is not needed if I assign default values to empty keys on server side
    //select first element by default if slider and dropdown weren't clicked
    //querySelector() selects first found element, that's what I need :)
    // collctn['form'] =  document.querySelector('.balcon_icons_img').dataset.slide; 
    // collctn['type'] =  document.querySelector('#view_type').value; 

    //! universal binding func that allows me to add event listeners to multiple types of elements
    //because I've wrote queryselectorALL, the element will be iterable even if thre's just 1 item in it
    function bindActionToElements (event, element, prop){
        // window.addEventListener('click', (target)=>{
        //     console.log(target);
        // });
        element.forEach((item, i) => {
            item.addEventListener(event,()=>{
                // console.log(item);
                switch(item.nodeName){
                    //window form selected in tabs slider
                    case "SPAN": //must be uppercase
                        collctn[prop] =  item.dataset.slide; 
                    break;
                    
                    case "INPUT":
                        //window type selected by checkboxes
                        if(item.getAttribute('type') === 'checkbox'){
                            const checkedProductType = item.nextElementSibling;
                            collctn[prop] =  checkedProductType.id; //must be 'nextElementSibling' not the 'nextSibling'

                            //uncheck all the rest checkboxes
                                element.forEach((checkBox)=>{
                                    const productType = checkBox.nextElementSibling;
                                if (productType.id !== checkedProductType.id){
                                    checkBox.checked = false;
                                }
                            });
                        }
                        //window dimensions set inside text fields
                        else{//the other inputs are text fields for width and height
                            collctn[prop] =  item.value; 
                        }
                    break;
                        //window profile chosen in the dropdown list
                    case 'SELECT':
                        collctn[prop] =  item.value; 
                    break;
                }
                console.log(collctn);
            });
        });
    }

    bindActionToElements('click', productForm, 'form');
    bindActionToElements('input', productWidth, 'width');
    bindActionToElements('input', productHeight, 'height');
    bindActionToElements('change', productType, 'type');
    bindActionToElements('input', productProfile, 'profile');

}

export const resetDataCollection = ()=> {
    console.log(collctn);
    console.log('resetting daca collection');
            collctn[form]= undefined;
            collctn[width]= undefined;
            collctn[hegth]=undefined;
            collctn[type]=undefined;

    // collctn = {
    //         form: undefined,
    //         width: undefined,
    //         hegth:undefined,
    //         type:undefined
    //     };
    console.log(collctn);
}

export default gatherFormData;
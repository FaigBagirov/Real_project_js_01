const checkInputValues = (inputField, valuesType) => {

    const allInputs = document.querySelectorAll(inputField);

    allInputs.forEach(element => {
        if (valuesType === "pure_nums"){
            element.addEventListener('input', ()=>{
                element.value = element.value.replace(/\D/, '');
            });
        }

        else if (valuesType === "phone_nums"){
            element.addEventListener('input', ()=>{
                element.value = element.value.replace(/\D/, '');//-@ cange this to allow dashs and braces
            });
        }
    });
}
export default checkInputValues;
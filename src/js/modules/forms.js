
import checkInputValues from './checkInputValues'

const forms = () => {
          //collect all forms of the webpage
        const allForms = document.querySelectorAll('form'),
        //collect all inputs (their values, I think) of the forms     
        allInputs = document.querySelectorAll('input');
        // allPhoneNumInputs = document.querySelectorAll('input[name="user_phone"]');

        // allPhoneNumInputs.forEach( phoneNum => { 
        //     phoneNum.addEventListener('input', ()=>{
        //     //each time when user inputs a value it is being checked if it's a number 
        //     //and being replaced if it's not a num
        //     phoneNum.value = phoneNum.value.replace(/\D/, ''); 
        //     })
        // }); 
        checkInputValues('input[name="user_phone"]', "phone_nums");

    const messages = {
        loading: "is loading...",
        success: "sent successful",
        failure: "failed sending"
    };
    
    const postData = async (url, data) =>{
        console.log("loading");
        document.querySelector('.status').textContent = messages.loading;
        console.log("loading");
        //without await "result" will be empty bcause it will not wait for async request
        let result = await fetch(url, { //fetch() method is async method
            method: "POST",
            body: data//,
           // headers: headers
        });
        console.log("sent");
        return await result.text(); //.text() is async method as well
    }

    const clearInputs = ()=> {
        allInputs.forEach(input=>{
            input.value = '';
        });
    }

    allForms.forEach(eachForm => {
        eachForm.addEventListener('submit', (event) => {
            
            //on submit prevent default actions 
                //because we use AJAX and default action will refresh the page or someth. else
            event.preventDefault();

            //prepare html element for status message
            let statusMessage = document.createElement('div');
            // prosto chtobi bilo krasivee
            //class "status" already exsists, designer created it before us
            statusMessage.classList.add('status'); 
            
            //add created element message to the html
            eachForm.appendChild(statusMessage);

            const formData = new FormData(eachForm);
            // console.log("passing formdata to postData func");
            //send data from the form where submit was pressed to the specified server
            postData('http://192.168.254.70:8080', formData) //I have my own remote php server
            //postData('/assets/server.php', formData) //This is for those who have locally installed "WAMP" server
            .then(res =>{
                console.log(res); //print response from the server
                //inform the user about success
                statusMessage.textContent = messages.success;
            })
            .catch((error)=>{
                console.log("catched an error");
                console.log(error);
                statusMessage.textContent=messages.failure;
            })
            .finally(()=>{
                clearInputs();
                setTimeout(()=>{
                    statusMessage.remove();
                },10000);
            });
        })
    } );
}
export default forms;
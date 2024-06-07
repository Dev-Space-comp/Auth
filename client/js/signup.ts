import Swal from 'sweetalert2'

const form = document.querySelector("form")  as HTMLFormElement;

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const form_Data = new FormData(this);
    const formData:{ [key: string]: FormDataEntryValue } = {};
    form_Data.forEach((value, key) => {
        // console.log(`${key}: ${value}`);
        formData[key] = value
    });
if (formData.pass != formData.pass_check){
    Swal.fire({
        title: 'The password and conformation dont match',
        showConfirmButton: true,
        confirmButtonText: "RETRY",
        icon: 'warning'
    }
    )
} else {
    const endpoint = 'http://localhost:3000/api/';

// Suggested code may be subject to a license. Learn more: ~LicenseLog:2365620366.
    fetch(endpoint,{
      method: "POST",
      body: JSON.stringify(formData)
    })
      .then(async response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        if ((await response.json()).DataReceived == true){
          console.log("eudfeu")
        }
        })
      .catch((error: any) => {
        console.error('Fetch error:', error);
      });
    }
});


import Swal from "sweetalert2";

const form = document.getElementById('form') as HTMLFormElement;
form.addEventListener('submit', async (e) => {
e.preventDefault();

const form_Data = new FormData(form);
const formData: { [key: string]: FormDataEntryValue } = {};
form_Data.forEach((value, key) => {
  formData[key] = value
});

fetch('http://localhost:5000/api/login', {
  method: 'POST',
  body: JSON.stringify(formData)
}).then(async Response => {
  if (Response.ok) {
    if((await Response.json()).userexists){
      console.log("s")
      return true
    } else{
      console.log("f")
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Email or Password is incorrect 😔',
      })
      return false
    }
  } else {
    throw new Error('Network response was not ok');
  }
}).catch(error => {
  console.error('Fetch error:', error);
}
)
})
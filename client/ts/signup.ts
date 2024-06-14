import Swal from 'sweetalert2'
import { passwordStrength } from 'check-password-strength'


const form = document.querySelector("form") as HTMLFormElement;

form.addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const form_Data = new FormData(this);
  const formData: { [key: string]: FormDataEntryValue } = {};
  form_Data.forEach((value, key) => {
    // console.log(`${key}: ${value}`);
    formData[key] = value
  });
  if (formData.pass == formData.pass_check) {
    if (passwordStrength(formData.pass as string).id < 2) {
      const endpoint = 'http://localhost:5000/api/';

      // Suggested code may be subject to a license. Learn more: ~LicenseLog:2365620366.
      fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(formData)
      })
        .then(async response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }

          const jsonResponse = await response.json();

          if (jsonResponse.DataReceived) {
            if (jsonResponse.MailSent) {
              console.log(jsonResponse.MailInfo);
              form.reset()
              form.remove()
              const form2 = document.getElementById("otp-form") as HTMLFormElement
              form2.innerHTML = `
                  <input placeholder="please input the otp" type="text" id="otp" class="basicBox" name="otp" maxlength="6" minlength="6">
                  <input type="submit" id="otp-submit" class="mt-100 submit">
                `
              form2.addEventListener('submit', async (event) => {
                event.preventDefault()
                const form2_Data = new FormData(form2);
                const form2Data: { [key: string]: FormDataEntryValue } = {};
                form2_Data.forEach((value, key) => {
                  // console.log(`${key}: ${value}`);
                  form2Data[key] = value
                });
                console.log(form2Data)
                form2.reset()
                if (jsonResponse.Mailotp == form2Data.otp) {
                  fetch(endpoint,{
                    method:"put",
                    body:JSON.stringify(formData)
                  }).then(
                  ).catch((error: any) => {
                    console.error('Fetch error:', error);
                  })
                }
              })

            } else {
              console.log(jsonResponse.MailError);
            }
          }
        })
        .catch((error: any) => {
          console.error('Fetch error:', error);
        });
    } else {
      Swal.fire({
        title: 'The email is not valid',
        showConfirmButton: true,
        confirmButtonText: "RETRY",
        icon: 'warning'
      })
    }
  } else {
    Swal.fire({
      title: 'The email is not valid',
      showConfirmButton: true,
      confirmButtonText: "RETRY",
      icon: 'warning'
    })
  }
});


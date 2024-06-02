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
    alert("{")
}
});
const form = document.getElementById('uploadForm')
const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const email = document.getElementById('email')

const fileInput = document.getElementById('uploadFilesInput')
const submit = document.getElementById('submitButton')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData()
  formData.append('fname', fname.value)
  formData.append('lname', fname.value)
  formData.append('email', email.value)
  for (let i = 0; i < fileInput.files.length; i++) {
    formData.append('avatar', fileInput.files[i])
  }
  try {
    const fetchOptions = {
      method: 'POST',
      body: formData
    }
    const response = await fetch(`api/user`, fetchOptions)
    const json = await response.json()
    console.log('user created with avatar ', json)
  } catch (err) {
    console.log('error message:' + err.message)
  }
})

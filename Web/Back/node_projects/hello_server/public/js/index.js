const response = await fetch('http://127.0.0.1:8000/api/hello', {
    method:'GET'
})
// Asumir que el api contesto con status 200
if(response.ok)
{
    const message = await response.text()

    console.log(message)

    const resultDiv = document.getElementById('response-placeholder')
    resultDiv.innerHTML = message
}
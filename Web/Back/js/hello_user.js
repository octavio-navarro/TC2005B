const response = await fetch('http://localhost:3000/api/hello', {
    method:'GET'
})

if(response.ok)
{
    const message = await response.text()

    console.log(message)
}
else
    console.log(`HTTP Error: ${response.status}`)


const params = new URLSearchParams({
    name:'Octavio',
    surname:'Navarro'
})

const response_parameters = await fetch('http://localhost:3000/api/hello?' + params, {
    method:'GET',
})

if(response_parameters.ok)
{
    const message = await response_parameters.text()

    console.log(message)
}
else
    console.log(`HTTP Error: ${response_parameters.status}`)


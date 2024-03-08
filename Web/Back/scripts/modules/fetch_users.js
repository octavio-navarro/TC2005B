async function main()
{
    try
    {

        let response = await fetch('http://localhost:3000/api/hello?' + new URLSearchParams({
            name: 'Octavio',
        }),
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf8'
            }
        })
        let text = await response.text()
        console.log(text)
    }
    catch(err)
    {
        console.log("Error:", err)
    }
}

main()
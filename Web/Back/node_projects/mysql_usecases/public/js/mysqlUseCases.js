function main()
{
    document.getElementById('formSelectUser').onsubmit = async (e) =>
    {
        e.preventDefault()

        const data = new FormData(formSelectUser)
        const dataObj = Object.fromEntries(data.entries())

        let response = await fetch(`http://localhost:5000/api/users/${dataObj['userID']}`,{
            method: 'GET'
        })
        
        if(response.ok)
        {
            let results = await response.json()
        
            if(results.length > 0)
            {
                const headers = Object.keys(results[0])
                const values = Object.values(results)
    
                let table = document.createElement("table")
    
                let tr = table.insertRow(-1)                  
    
                for(const header of headers)
                {
                    let th = document.createElement("th")     
                    th.innerHTML = header
                    tr.appendChild(th)
                }
    
                for(const row of values)
                {
                    let tr = table.insertRow(-1)
    
                    for(const key of Object.keys(row))
                    {
                        let tabCell = tr.insertCell(-1)
                        tabCell.innerHTML = row[key]
                    }
                }
    
                const container = document.getElementById('getResultsID')
                container.innerHTML = ''
                container.appendChild(table)
            }
            else
            {
                const container = document.getElementById('getResultsID')
                container.innerHTML = 'No results to show.'
            }
        }
        else{
            getResults.innerHTML = response.status
        }
    }

    document.getElementById('formInsert').onsubmit = async(e)=>
    {
        e.preventDefault()

        const data = new FormData(formInsert)
        const dataObj = Object.fromEntries(data.entries())

        let response = await fetch('http://localhost:5000/api/users',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataObj)
        })
        
        if(response.ok)
        {
            let results = await response.json()
        
            console.log(results)
            postResults.innerHTML = results.message + ' id: ' + results.id
        }
        else{
            postResults.innerHTML = response.status
        }
    }

    document.getElementById('formUpdate').onsubmit = async(e)=>
    {
        e.preventDefault()

        const data = new FormData(formUpdate)
        const dataObj = Object.fromEntries(data.entries())

        let response = await fetch('http://localhost:5000/api/users',{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataObj)
        })
        
        if(response.ok)
        {
            let results = await response.json()
        
            console.log(results)
            putResults.innerHTML = results.message
        }
        else{
            putResults.innerHTML = response.status
        }
    }

    document.getElementById('formDelete').onsubmit = async(e)=>
    {
        e.preventDefault()

        const data = new FormData(formDelete)
        const dataObj = Object.fromEntries(data.entries())

        let response = await fetch(`http://localhost:5000/api/users/${dataObj['userID']}`,{
            method: 'DELETE'
        })
        
        if(response.ok)
        {
            let results = await response.json()
        
            deleteResults.innerHTML = results.message
        }
        else
        {
            deleteResults.innerHTML = `Error!\nStatus: ${response.status} Message: ${results.message}`
        }
    }
}

main()
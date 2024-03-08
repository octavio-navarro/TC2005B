function doSomethingAsync () 
{
    const number = Math.random()
    if(number < 0.5)
        return Promise.resolve(`The number was ${number}`)
    else
        return Promise.reject(`${number} was more than 0.5`)
}

async function doSomething()
{
    try
    {
        const response = await doSomethingAsync()
        console.log(`Response: ${response}`)
    }
    catch(err)
    {
        console.log(`Error: ${err}`); 
    }  
}

doSomething()
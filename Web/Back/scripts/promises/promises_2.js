let done = false

// The word “async” before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.
function doSomethingAsync () {
    return new Promise((resolve, reject) => {
        if(done)
            setTimeout(() => resolve('I did something'), 1000)
        else
            setTimeout(() => reject('I did nothing'), 1000)
    })
  }

// The keyword await makes JavaScript wait until that promise settles and returns its result.
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

// It is useful to think of promises as a device to move values into an asynchronous reality. A normal value is simply there. A promised value is a value that might already be there or might appear at some point in the future. Computations defined in terms of promises act on such wrapped values and are executed asynchronously as the values become available.
console.log('Before')
doSomething()
console.log('After')
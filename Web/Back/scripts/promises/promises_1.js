let done = false

const isDone = new Promise((resolve, reject) =>
{
    if(done)
    {
        resolve("Trabajo hecho!")
    }
    else
    {
        reject("Trabajo no hecho!")
    }
})

const checkIfItsDone = () => {
    isDone.then(ok => {
        console.log(ok)
      }).catch(err => {
        console.error(err)
      })
  }

checkIfItsDone()
const promiseNumber = () => 
{
    return new Promise(resolve => 
    {
      setTimeout(() => resolve({message: "Returning number 5", value: 5}), 1000)
    })
}
  
const addToNumber = async () => 
{
    const number = await promiseNumber()
    number.message += " and adding 5 to the number"
    number.value += 5
    return number
}
  
const multiplyToNumber = async () => 
{
    const number = await addToNumber()
    number.message += " and multiplying all by 2"
    number.value *= 2
    return number
}

try
{
    const result = await multiplyToNumber()
    console.table(result)
}
catch(err)
{
    console.log(err);
}


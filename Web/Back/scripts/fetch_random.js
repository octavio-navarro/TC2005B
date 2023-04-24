// Using the module 'node-fetch' to get the functionality of the fetch api: https://github.com/node-fetch/node-fetch
// npm install node-fetch

import fetch from 'node-fetch'

async function fetchData(url)
{
    try
    {
        const response = await fetch(url)
    
        if(response.ok)
            return response.json()
        else
            console.log(`HTTP Error: ${response.status}`)
    }
    catch(error)
    {
        console.log(error)
    }
}

function pickRandomElement(list) 
{
    return list[Math.floor(Math.random() * list.length)];
}

async function getRandomName(amount=1)
{
    if(amount<=0) amount = 1
    
    const base_url = 'https://www.randomlists.com/data/names-'
    
    const male_names = await fetchData(base_url + 'male.json')
    const female_names = await fetchData(base_url + 'female.json')
    const surnames = await fetchData(base_url + 'surnames.json')

    // Alternative for calling multiple promises:
    // const response = await Promise.all([
    //     fetchData(base_url + 'male.json'),
    //     fetchData(base_url + 'female.json'),
    //     fetchData(base_url + 'surnames.json')
    // ])

    // const [male_names, female_names, surnames] = response;

    const names = male_names.data.concat(female_names.data)

    let name_list = []

    for(let i =0; i< amount; i++)
    {
        let name = pickRandomElement(names)
        let surname = pickRandomElement(surnames.data)

        name_list.push(`${name} ${surname}`)
    }

    return name_list
}

async function getRandomWord(amount=1)
{    
    if(amount<=0) amount = 1

    const base_url = 'https://www.randomlists.com/data/words.json'
    const words = await fetchData(base_url)

    let word_list = []

    for(let i =0; i< amount; i++)
    {
        let word = pickRandomElement(words.data)
        word_list.push(word)
    }

    return word_list
}

export {getRandomName, getRandomWord}
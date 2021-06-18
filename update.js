const axios = require('axios')
const fetch = require('node-fetch');


function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min+1) + min
    )
}

async function updateC(city, model){ 
    const dat = await(axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b434f5471b01757788257eee711094b4`))
    const tempT =[]
    tempT[0] = dat.data.main.temp
    tempT[1] = dat.data.main.temp_max
    tempT[2] = dat.data.main.temp_min
    const temp = tempT[0]
    const max = tempT[1]
    const min = tempT[2]

    return { 
        Name: city,
        Temp: temp,
        Max : max,
        Min: min
    }
}

function update(input, model){
    const {action} = input
    const {city} = input
    var {cities}  = model
    var {temp} = model
    var {max} = model
    var {min} = model
    const imp = updateC(city, model).then(val => console.log(val))
    const low = between(-500, 1000)/100
    const high = between(2300, 3500)/100
    const actual = between(-500, 3500)/100
    if (action === "Add City") {
        cities.push(city)
        temp[city] = actual
        max[city] = high
        min[city] = low
    
        return {
            imp,
            ...model,
            temp: temp,
            max: max,
            min: min
            
        }
    } else if (action === "Update City") {
        temp[city] = actual
        max[city] = high
        min[city] = low

        return {
            ...model,
            temp: temp,
            max: max,
            min: min,
            imp
        }
    } else if (action === "Delete City") {
        var filter = cities.filter(function(value){
            return value !== city
        })
        delete temp[city]
        delete max[city]
        delete min[city]
        return {
            ...model,
            cities: filter,
            temp: temp,
            max: max,
            min: min
        }
    }
}



///b434f5471b01757788257eee711094b4
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
module.exports = {
    update,
    updateC
}
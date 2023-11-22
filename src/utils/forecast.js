const request = require('request')

// old code without destructuring
// const forecast = (location, callback) => {
//     const ws_key = 'd60c3dec510e963061d0774274222e00'
//     const url = 'http://api.weatherstack.com/current?access_key='+ws_key+'&query='+location+'&units=m'

//     request({url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service! Try again.', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location.', undefined)
//         } else {
//             const desc = response.body.current.weather_descriptions
//             const temp = response.body.current.temperature
//             const feelslike = response.body.current.feelslike
//             callback(undefined, desc[0]+ '. It is currently '+ temp+ ' degrees out. It feels like '+ feelslike+'% out.')
//         }
//     })

// }

const forecast = (location, callback) => {
    const ws_key = 'd60c3dec510e963061d0774274222e00'
    const url = 'http://api.weatherstack.com/current?access_key='+ws_key+'&query='+location+'&units=m'

    request({url, json: true}, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to weather service! Try again.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const desc = body.current.weather_descriptions[0]
            const temp = body.current.temperature
            const feelslike = body.current.feelslike
            const humidity = body.current.weather_descriptions[6]
            callback(undefined, desc+ '. It is currently '+ temp+ ' degrees out. It feels like '+ feelslike+'% out. The humididy is '+ humidity+'%')
        }
    })

}

module.exports = {
    forecast: forecast,
}
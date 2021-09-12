// Llamo a la dependencia para consumir la API
const Twit = require('twit')
 
const T = new Twit({
  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  '',
  timeout_ms:           60*1000,  //  HTTP request timeout to apply to all requests.
  strictSSL:            true,     //  requires SSL certificates to be valid.
})

// Filtra los tweets por #Hashtag
const stream = T.stream('statuses/filter', { track: '#testBotPaco'})
 
// Imprimo datos del tweet
stream.on('tweet', function (tweet) {
    console.log(`Su id es: ${tweet.id}`)
    console.log(`Su descripcion es es: ${tweet.user.description}`)
    console.log(`Su id es: ${tweet.id}`)
    console.log(`El tweet dice: ${tweet.text}`)
    console.log(`El Twittero se llama: ${tweet.user.name}`)
    console.log(`El nombre de su tweet es: @${tweet.user.screen_name}`)
    console.log(`El Twittero es de: ${tweet.user.location}`)
    console.log(`Tiene: ${tweet.user.followers_count} de seguidores.`)
    console.log(`Tiene: ${tweet.user.friends_count} de seguidores.`)


    // Funcion para darle RT a ese Tweet
    T.post('statuses/retweet/:id', { id: `${tweet.id_str}` }, function (err, data, response) {
        err ? console.log(`Error al intentar hacer RT, el codigo del error es: ${err}`) : console.log(`Se hizo RT al tweet con id: ${tweet.id_str}`)
    })

    // Esta funcion le da MG al tweet
    T.post('favorites/create', { id: `${tweet.id_str}` }, function (err, data, response) {
        err ? console.log(`Error al intentar hacer fav, el codigo del error es: ${err}`) : console.log(`Se dio el MG al tweet con id: ${tweet.id_str}`)
    })
})


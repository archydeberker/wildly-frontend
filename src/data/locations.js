const locationNames = ['Rumney, New Hampshire', 
						'White Mountains, New Hampshire', 
						'Lake Placid, New York',
						'Mt Tremblant, Quebec',
						'Mt Orford, Quebec',
						'Kamouraska, Quebec',
						'Jay Peak, Vermont',
						'Val David, Quebec',
						'Algonquin, Ontario',
						'Smugglers Notch, Vermont']

const locationTags = {'Rumney, New Hampshire':['Climbing'], 
						'White Mountains, New Hampshire':['Hiking', 'Ski Touring'], 
						'Lake Placid, New York':['Skiing', 'Mountain Biking', 'Hiking'],
						'Mt Tremblant, Quebec':['Skiing', 'Mountain Biking'],
						'Mt Orford, Quebec':['Skiing'],
						'Kamouraska, Quebec':['Climbing', 'Hiking'],
						'Jay Peak, Vermont':['Skiing'],
						'Val David, Quebec':['Climbing', 'Cross Country Skiing'],
						'Algonquin, Ontario': ['Canoeing', 'Hiking'],
						'Smugglers Notch, Vermont': ['Skiing', 'Mountain Biking']}

const locationCoords = {'Rumney, New Hampshire':'43.8054,-71.8126', 
						'White Mountains, New Hampshire':'44.2706,-71.3042', 
						'Lake Placid, New York':'44.2794,-73.9798',
						'Mt Tremblant, Quebec':'46.1184,-74.5961',
						'Mt Orford, Quebec':'45.3227754,-72.1881633',
						'Kamouraska, Quebec':'47.566059,-69.865995',
						'Jay Peak, Vermont':'44.9244904,-72.5256705',
						'Val David, Quebec':'46.0306,-74.2062',
						'Algonquin, Ontario': '45.55397,-78.59676',
						'Smugglers Notch, Vermont': '44.5884605,-72.7899944'}

const smallWeatherURL = "<script type='text/javascript' src='https://darksky.net/widget/default-small/LOCATION/us12/en.js?width=100%&height=70&title=Full Forecast&textColor=333333&bgColor=FFFFFF&transparency=false&skyColor=undefined&fontFamily=Default&customFont=&units=us'></script>"
const detailedWeatherURL = "<script type='text/javascript' src='https://darksky.net/widget/default/LOCATION/us12/en.js?height=500&title= &textColor=333333&bgColor=FFFFFF&skyColor=333&fontFamily=Default&units=us&htColor=333333&ltColor=C7C7C7&displaySum=yes&displayHeader=yes'></script>"
const googleEmbedURL = '<iframe width="400" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=LOCATION&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>'


function smallWeatherMapper(mapObj, name){mapObj[name] = smallWeatherURL.replace('LOCATION', locationCoords[name]);
								  return mapObj}

function detailedWeatherMapper(mapObj, name){mapObj[name] = detailedWeatherURL.replace('LOCATION', locationCoords[name]);
								  return mapObj}

function embedMapper(mapObj, name){mapObj[name] = googleEmbedURL.replace('LOCATION', name.replace(' ', '%20'));
								  return mapObj}

const detailedWeather = locationNames.reduce(detailedWeatherMapper, {})
const smallWeather = locationNames.reduce(smallWeatherMapper, {})
const googleMaps = locationNames.reduce(embedMapper, {})


function RandomEntry(){
    const imgNumber = Math.ceil(Math.random()*100)
    let randName = locationNames[Math.floor(Math.random() * locationNames.length)]
    console.log(googleMaps[randName])
    return ({fields:{title: randName,
        tags: locationTags[randName], 
        locationImage: {fields: {file: {url: `https://picsum.photos/id/${imgNumber}/300/300`}}},
        url: 'www.google.com',
        smallWeather: smallWeather[randName],
        detailedWeather: detailedWeather[randName],
        mapUrl: googleMaps[randName],
    }})}

export default RandomEntry
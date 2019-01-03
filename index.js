const api_key = 'eROgJQrFiJl6Fht2FTnppR9ZHhHb4tj2Q3fWqftd';

function findParks(stateName, maxResults){
	let userSearch = formatParameters(stateName, maxResults);
	console.log(userSearch);
	let url = 'https://developer.nps.gov/api/v1/parks' + '?' + userSearch
	console.log(url)
	fetch (url) 
		.then(response => response.json())
		.then(responseJson => 
			displayResults(responseJson))
	
}


function submitForm() {
	$('form').submit(event => {
	//prep form
    event.preventDefault();
    $('#results').empty();

    //set up search params
    let states = $("#park-search").val();
    let num_of_results = $('#number-of-results').val()

     //start search function
     findParks(states, num_of_results);

  });
}

function displayResults(responseJson) {
	console.log(responseJson);
	let myArray = responseJson;
	let max_of_results = $('#number-of-results').val();
	for (let i = 0; i < responseJson.data.length && i < max_of_results; i++) {
      $('#results').append(`<h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
       <p>${responseJson.data[i].description}</p></li>`)
  };
	$('.results').removeClass('hidden');
  
}

function formatParameters (stateName, maxResults){
	let parameters = [];
	parameters.push(`api_key=${api_key}`);
    for (let i = 0; i < stateName.length; i++) {
        parameters.push(`stateCode=${encodeURIComponent(stateName[i])}`)
    }
   
    return parameters.join('&');
}
	
submitForm();
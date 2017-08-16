/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

const theForm = document.querySelector("form.search-form")
theForm.addEventListener('submit', function(event){
  event.preventDefault()

  const resultContainer = document.querySelector(".results")
  resultContainer.textContent = ""



  const searchText = document.querySelector("#searchtext").value;

  fetch(`https://itunes.apple.com/search?term=${searchText}`)
  .then( function(r){
    return r.json()
    console.log(r);
  })

  .then( function(json) {
    console.log(json);

    for (var i = 0; i < json.results.length; i++) {



      const resultsHtml = `
        <div class="searchbox">
          <img src="${json.results[i].artworkUrl100}" value="${json.results[i].previewUrl}">
          <h3>${json.results[i].artistName}</h3>
          <small>${json.results[i].trackName}</small>
          <audio  controls="controls" src="${json.results[i].previewUrl}"</audio>
        </div>
      `

      resultContainer.insertAdjacentHTML("beforeEnd", resultsHtml)
    }

  })


})

document.querySelector('.results').addEventListener('click', function (e) {
  if (e.target && e.target.nodeName == 'IMG') {
    let audio = document.querySelector('.music-player');
    audio.src = e.target.getAttribute('value');
  };
});

//query Selectors and any additional variables
const img = document.querySelector(`#comments`)
const scrollDown = document.querySelector(`#down`)
const selectTab = document.querySelector(`#img-select`)
const optionTab = document.querySelector(`option`)
const funFact = document.querySelector(`#fun-fact`)
const newCountryFormAdd = document.querySelector(`.form-div`)
const newCountryFormRemove = document.querySelector(`#remove`)
//const countryUpdate = document.querySelector(`#update`)
const commentContainer = document.querySelector(`#paragraph-comment`)


// select ID

// fetching Public Api for country flag/ country picture/ some fun facts
const fetchPublicApi = (country) => {
 fetch(`https://restcountries.com/v3.1/name/${country}`)
 .then(res => res.json())
 .then(data => data.forEach(countries => {
  postImage(countries)
  postFunFacts(countries)
  }))
}


// fetch the Url from local host 3000. (Including country names / ratings / comments)
const fetchLocalHost = () => {
 fetch(`http://localhost:3000/visited`)
 .then(res => res.json())
 .then(data => {
  cleanupSelected()
  data.forEach(visited => {
    displaySelectOption(visited)})
})
}


fetchLocalHost()


// Posting to Local Host 3000 any additional country with comments and ratings
const postLocalHost = (country) => {
 return fetch(`http://localhost:3000/visited`, {
  method: "POST",
  headers: {
   "Content-type": "application/json"
  },
  body: JSON.stringify(country)
 })
 .then(res => res.json())
 .then(data => {
  fetchLocalHost();
  (console.log(data))
})
}
/*
// Patch localhost 3000 edit the current comment or rating
const patchLocalHost = (ratingEdit, commentEdit) => {
 fetch(`http://localhost:3000/visited/${id}`, {
  method: "PATCH", 
  headers: {
   "Content-type": "application/json"
  },
  body: JSON.stringify({
    rating: ratingEdit,
    comment: commentEdit
  })
 })
 .then(res => res.json())
 .then(data => console.log(data))
}
*/

// delete from Localhost 3000 In order to refresh the list elements we need to call Get fetch request function.
// since we are not using Promise line of code
const deleteLocalHost = (id) => {
 fetch(`http://localhost:3000/visited/${id}`, {
  method: "DELETE", 
  headers: {
   "Content-type": "application/json"
  }
 })
 .then(res => res.json())
 .then(data => {
  fetchLocalHost()
  console.log(data)
})
}
/*
const displayCommentsSection = (commentParagraph) => {
  let p = document.createElement(`p`)
  p.innerText = commentParagraph.comment
  commentContainer.append(p)
}
*/
// adding image to the image element from public api
const postImage = (post) => {
  let img = document.querySelector(`#comments`)
  img.src = post.flags.png
  img.classList.remove(`hidden`)
}
// adding elements to the card with funfacts from Public Api
const postFunFacts = (fact) => {
  const li = document.createElement(`li`)
  const li2 = document.createElement(`li`)
  const a = document.createElement(`a`)
  funFact.innerHTML = ""
  li.innerHTML = `Borders: ` + fact.borders
  li2.innerHTML = `Population: ` + fact.population
  a.href = fact.maps.googleMaps
  a.innerText = `Google Maps`
  funFact.append(li, li2, a)
  funFact.classList.remove(`hidden`)
}
// How to set a vaue to country name and have value of number too in order to delete and patch from local host
const displaySelectOption = (text) => {
  let option = document.createElement(`option`)
  option.value = text.country
  option.textContent = text.country
  option.id = text.id
  selectTab.append(option)

}
//let selectId;
// eventlistener for selecting and connecting the api picture
  selectTab.addEventListener(`change`, (e) => {
  let option2 = e.target.value
  //selectId = e.target
  //console.log(selectId)
  fetchPublicApi(option2) 
  //fetchLocalHost()
 })


// posting new countries to Localhost 3000
newCountryFormAdd.addEventListener(`submit`, (e) => {
  e.preventDefault()
  let newCountry = {
  country: e.target.country.value,
  comment: e.target.comment.value,
  rating: e.target.rating.value
} 
// remove all
  postLocalHost(newCountry)
  newCountryFormAdd.reset()
})

newCountryFormRemove.addEventListener(`click`, () => {
  const options = selectTab.options;
  const id = options[options.selectedIndex].id;
  deleteLocalHost(id)
})





const cleanupSelected = () => {
  let img = document.querySelector(`#comments`)
  selectTab.innerHTML = ""
  img.src = ""
  img.classList.add(`hidden`)
  const li = document.createElement(`li`)
  funFact.innerHTML = ""
  funFact.classList.add(`hidden`)
}



/*editRamenForm.addEventListener(`submit`, (e) => {
  e.preventDefault() 
  let ratingEdit = {
    rating: e.target.rating.value
  }
  let commentEdit = {
    comment: e.target[`new-comment`].value
  }
 setRamenRating(ratingEdit.rating)
 setRamenComment(commentEdit.comment)
 petchRamen(ratingEdit.rating, commentEdit.comment)
})


const petchRamen = (ratingEdit, commentEdit) => {
  fetch(`http://localhost:3000/ramens/${currentId}`, {
  method: "PATCH",
  headers: {
    "Content-type": "application/json"
  },
  body: JSON.stringify({
    rating: ratingEdit,
    comment: commentEdit
  })
  })
  .then(res => res.json())
  .then(data => console.log(data))
}*/

/*
countryUpdate.addEventListener(`click`, (e) => {

  let ratingEdit = {
    rating: e.target.rating.value
  }
  let commentEdit = {
    comment: e.target.comment.value
  }
  patchLocalHost(ratingEdit.rating, commentEdit.comment)
})*/
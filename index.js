//query Selectors and any additional variables
const img = document.querySelector(`#comments`)
const scrollDown = document.querySelector(`#down`)
const selectTab = document.querySelector(`#img-select`)
const optionTab = document.querySelector(`option`)
const funFact = document.querySelector(`#fun-fact`)
const newCountryFormAdd = document.querySelector(`.form-div`)
const newCountryFormRemove = document.querySelector(`#remove`)
const commentContainer = document.querySelector(`#paragraph-comment`)


// fetching Public Api for country flag/ country picture/ some fun facts
const fetchPublicApi = (country) => {
 fetch(`https://restcountries.com/v3.1/name/${country}`)
 .then(res => res.json())
 .then(data => data.forEach(country => {
  postImage(country)
  postFunFacts(country)
  }))
}


// fetch the Url from local host 3000. (Including country names / ratings / comments)
const fetchLocalHost = () => {
 fetch(`http://localhost:3000/visited`)
 .then(res => res.json())
 .then(data => {
  cleanupSelected()
  data.forEach(visited => {
    commentsDisplay(visited)
    displaySelectOption(visited)
  })
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
  fetchLocalHost()
  (console.log(data))})
}

// Patch localhost 3000 edit the current comment or rating
const patchLocalHost = (countryObj) => {
 fetch(`http://localhost:3000/visited/${countryObj.id}`, {
  method: "PATCH", 
  headers: {
   "Content-type": "application/json"
  },
  body: JSON.stringify(countryObj)
 })
 .then(res => res.json())
 .then(data => console.log(data))
}


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


// adding image to the image element from public api
const postImage = (post) => {
  let img = document.querySelector(`#comments`)
  img.src = post.flags.png
  img.classList.remove(`hidden`)
}
// adding elements to the card with funfacts from Public Api
const postFunFacts = (fact) => {
  const li = document.createElement(`li`)
  funFact.innerHTML = ""
  li.innerHTML = fact.name.official
  funFact.append(li)
}
// How to set a vaue to country name and have value of number too in order to delete and patch from local host
const displaySelectOption = (text) => {
  let option = document.createElement(`option`)
  option.value = text.country
  option.textContent = text.country
  option.id = text.id
  selectTab.append(option)

}
let selectId;
// eventlistener for selecting and connecting the api picture
  selectTab.addEventListener(`change`, (e) => {
  let option2 = e.target.value
  //let option3 = e.target.option.id
  selectId = e.target
  console.log(selectId)
  fetchPublicApi(option2)  
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
 
const commentsDisplay = (comment) => {
  const p = document.createElement(`p`)
  p.textContent = comment.comment
  commentContainer.append(p)
}





const cleanupSelected = () => {
  let img = document.querySelector(`#comments`)
  selectTab.innerHTML = ""
  img.src = ""
  img.classList.add(`hidden`)
  const li = document.createElement(`li`)
  funFact.innerHTML = ""
}




/*

const displayComment = (country) => {
  let p = document.createElement(`p`)
  p.textContent = country.comment
  footerSec.append(p)

}
*/
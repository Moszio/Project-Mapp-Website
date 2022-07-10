//query Selectors and any additional variables
const img = document.querySelector(`#comments`)
const scrollDown = document.querySelector(`#down`)
const selectTab = document.querySelector(`#img-select`)
const optionTab = document.querySelector(`option`)
const funFact = document.querySelector(`#fun-fact`)
const newCountryFormAdd = document.querySelector(`.form-div`)
const newCountryFormRemove = document.querySelector(`#remove`)



// fetching Public Api for country flag/ country picture/ some fun facts
const fetchPublicApi = (country) => {
 fetch(`https://restcountries.com/v3.1/name/${country}`)
 .then(res => res.json())
 .then(data => data.forEach(country => {
  postImage(country)
  postFunFacts(country)
  }))
}

fetchPublicApi()

// fetch the Url from local host 3000. (Including country names / ratings / comments)
const fetchLocalHost = () => {
 fetch(`http://localhost:3000/visited`)
 .then(res => res.json())
 .then(data => data.forEach(visited => displaySelectOption(visited)))
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
 .then(data => (console.log(data)))
}
// Patch localhost 3000 edit the current comment or rating
const patchLocalHost = () => {
 fetch(`http://localhost:3000/visited`, {
  method: "PATCH", 
  headers: {
   "Content-type": "application/json"
  },
  body: JSON.stringify()
 })
 .then(res => res.json())
 .then(data => console.log(data))
}





const postImage = (post) => {
 let img = document.querySelector(`#comments`)
 img.src = post.flags.png
}

const postFunFacts = (fact) => {
 const li = document.createElement(`li`)
 funFact.innerHTML = ""
 li.innerHTML = fact.name.official
 console.log(fact.name.official)
 funFact.append(li)
}

const displaySelectOption = (text) => {
 let option = document.createElement(`option`)
 option.value = text.country
 option.textContent = text.country
 selectTab.append(option)
}


selectTab.addEventListener(`click`, (e) => {
 let option2 = e.target.value
 console.log(option2)
  fetchPublicApi(option2)  
 })

newCountryFormAdd.addEventListener(`submit`, (e) => {
 e.preventDefault()
 let newCountry = {
  country: e.target.country.value,
  comment: e.target.comment.value,
  rating: e.target.rating.value
 } 
 postLocalHost(newCountry)
})


newCountryFormRemove.addEventListener(`click`, (e) => {
 e.preventDefault()
})



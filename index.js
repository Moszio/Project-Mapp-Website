const img = document.querySelector(`#comments`)
const scrollDownBox = document.querySelector(`#down`)
const selectTab = document.querySelector(`#img-select`)
const optionTab = document.querySelector(`option`)
const funFact = document.querySelector(`#fun-fact`)
const newCountryFormAdd = document.querySelector(`.form-div`)
const newCountryFormRemove = document.querySelector(`#remove`)
const commentContainer = document.querySelector(`#paragraph-comment`)
const a = (document.querySelector(`a`).href = `#down`)
const icons = document.querySelector(`.icons`)
const footerDiv = document.querySelector(`#footer`)
const commentsDispla = document.querySelector(`#comments-display`)

// select ID

// fetching Public Api for country flag/ country picture/ some fun facts
const fetchPublicApi = (country) => {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((res) => res.json())
    .then((data) =>
      data.forEach((countries) => {
        postImage(countries)
        postFunFacts(countries)
      })
    )
}

// fetch the Url from local host 3000. (Including country names / ratings / comments)
const fetchLocalHost = () => {
  fetch(`http://localhost:3000/visited`)
    .then((res) => res.json())
    .then((data) => {
      cleanupSelected()
      data.forEach((visit) => {
        displaySelectOption(visit)
      })
    })
}

/* This is to pin comments from countries to thhe website*/

const createElement = (id) => {
  let pComment = document.createElement(`p`)
  let pRating = document.createElement(`p`)
  pComment.textContent = id.comment
  pRating.textContent = id.rating + `/10`
  commentsDispla.innerHTML = ``
  commentsDispla.append(pComment, pRating)
  commentsDispla.classList.remove(`hidden`)
}

const fetchLocalHost2 = (id) => {
  fetch(`http://localhost:3000/visited/${id}`)
    .then((res) => res.json())
    .then((data) => createElement(data))
}

fetchLocalHost()

// Posting to Local Host 3000 any additional country with comments and ratings
const postLocalHost = (country) => {
  return fetch(`http://localhost:3000/visited`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(country),
  })
    .then((res) => res.json())
    .then((data) => {
      fetchLocalHost()
      console.log(data)
    })
}

// delete from Localhost 3000 In order to refresh the list elements we need to call Get fetch request function.

const deleteLocalHost = (id) => {
  fetch(`http://localhost:3000/visited/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      fetchLocalHost()
      fetchLocalHost2()
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
  const h3CapitalCity = document.createElement(`h3`)
  const liBorder = document.createElement(`li`)
  const liPopulation = document.createElement(`li`)
  let border = fact.borders
  funFact.innerHTML = ''
  h3CapitalCity.innerText = `Capital City: ` + fact.capital
  border === undefined ? ` ` : (liBorder.innerText = `Border: ` + fact.borders)
  liPopulation.innerText = `Population: ` + fact.population
  funFact.append(h3CapitalCity, liBorder, liPopulation)
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
  const options = selectTab.options
  const id = options[options.selectedIndex].id
  //selectId = e.target
  //console.log(selectId)
  fetchPublicApi(option2)
  fetchLocalHost2(id)
})

// posting new countries to Localhost 3000
newCountryFormAdd.addEventListener(`submit`, (e) => {
  e.preventDefault()
  let newCountry = {
    country: e.target.country.value,
    comment: e.target.comment.value,
    rating: e.target.rating.value,
  }
  // remove all
  postLocalHost(newCountry)
  newCountryFormAdd.reset()
})

newCountryFormRemove.addEventListener(`click`, () => {
  const options = selectTab.options
  const id = options[options.selectedIndex].id
  deleteLocalHost(id)
})

icons.addEventListener(`mouseover`, () => {
  alert(`Not Today!`)
})

const cleanupSelected = () => {
  let img = document.querySelector(`#comments`)
  selectTab.innerHTML = ''
  img.src = ''
  img.classList.add(`hidden`)
  const li = document.createElement(`li`)
  funFact.innerHTML = ''
  funFact.classList.add(`hidden`)
}

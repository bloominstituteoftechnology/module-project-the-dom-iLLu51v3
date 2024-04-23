function moduleProject1() {
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👇 WORK WORK BELOW THIS LINE 👇

  // 👉 TASK 1 - Add a "widget" class name to widgets so CSS kicks in
    /** 
     * 1) create a class name widgets (declare a variable)
     * 2) have widgets select all the divs in index.html
     *  --- use querySelectorAll to grab all the <div> elements that are nested in the <section> element
     * 3) Be sure to console.log the new variable to check if the information was connected correctly
     * 4) run the class list through a forEach loop to add 'widget' onto the div class name.
     *  --- syntax: array.forEach(''=>{array.classList.add('')})
      */
  const widgets = document.querySelectorAll('section>div')
  widgets.forEach((widget, idx) => { // idx is added later for step 6 
    widget.classList.add('widget')
    widget.setAttribute('tabindex', idx + 1) // step 6: Accessability: allow for pressing tab to cycle through the widgets
  })
  
  // 👉 TASK 2 - Build a "Quote of the Day" widget
    /**
     * 1) check index.html for the script information/location we are going to inject into the quote div
     * --- The script is pulling from data.js
     * --- The amount of information in data.js is too much. Inspect the mock-finished model pertaining to the div in focus
     * --- In the inspection, we can find the content included: A div with a quote, and A div with an author/date: Both change on reload
     * --- The change on reload is implemented by acessing a data.js index at random using Math.floor(Math.random())
     * --- Since Math.random displays 0-1, add Math.floor gives single digit numbers, and we multiply by 10 to = whole numbers
     * --- Further Improve: Instead (* 10) replace that with * quotes.length. This allows for changing array length to the quotes array  
     * 2) Declare a variable that will contain the quote 
     * 3) Make a div for the random quote to populate in to
     * 4) Pull the data and set it into the desired
     * 5) Modify text content of quote
     * 6) log out to inspect if the data is pairing
    */
  const randomIdx = Math.floor(Math.random()* quotes.length)// eslint-disable-line
  const randomQuote = quotes[randomIdx] // eslint-disable-line
  const quote = document.createElement('div')
  const quoteText = randomQuote.quote
  const authorDate = document.createElement('div')
  const widget1 = document.querySelector('.quoteoftheday')

  quote.textContent = quoteText
  widget1.appendChild(quote)

  function quoteAuthorData(randomQuote){
   const {author, date} = randomQuote
    if (date === null) {
      return `${author} in an unknown date`
    } else {
      return `${author} in ${date}`
    }
  }

  authorDate.textContent = quoteAuthorData(randomQuote);
  widget1.appendChild(authorDate) 

  // 👉 TASK 3 - Build a "Corporate Speak" widget
  const randomVerb1 = verbs[Math.floor(Math.random()* verbs.length)]// eslint-disable-line
  const randomVerb2 = verbs[Math.floor(Math.random()* verbs.length)]// eslint-disable-line

  const randomAdverb1 = adverbs[Math.floor(Math.random()* adverbs.length)]// eslint-disable-line
  const randomAdverb2 = adverbs[Math.floor(Math.random()* adverbs.length)]// eslint-disable-line

  const randomNoun1 = nouns[Math.floor(Math.random()* nouns.length)]// eslint-disable-line
  const randomNoun2 = nouns[Math.floor(Math.random()* nouns.length)]// eslint-disable-line

  const ostentatious = `We need to ${randomVerb1} our ${randomNoun1} ${randomAdverb1} in order to ${randomVerb2} our ${randomNoun2} ${randomAdverb2}.`
  const paragraph = document.createElement('p')
  paragraph.textContent = ostentatious
  document.querySelector('.corporatespeak').appendChild(paragraph)

  // 👉 TASK 4 - Build a "Countdown" widget
  const countdownWidget = document.querySelector('.countdown')
  let count = 5; // use 'let' to allow for interval to mutate the value (using the count--(counting down 1 at a time from 5))
  const countdown = document.createElement('p')
  const countdownInterval = setInterval(() => {
    count--
    if (count === 0) {
      countdown.textContent = "Liftoff! 🚀"
      clearInterval(countdownInterval) // stops the countdown inverval from counting into the negatives
    } else { 
      countdown.textContent = `T-minus ${count}...`    }
  }, 1000)

  countdown.textContent = `T-minus ${count}...`
  countdownWidget.appendChild(countdown) // attaches the widget to the dom
  
  // 👉 TASK 5 - Build a "Friends" widget
/* Example: <p>Michael Chen was born in 1995 and is friends with Carlos Garcia, Mohammed Ali and Jason Wong.</p> */
/* Firt Name, Last Name, display only year, display friend full names, no comma before 'and', displays "has no friends" if none, period*/

const personIdx =  people[Math.floor(Math.random()* people.length)] // eslint-disable-line 
// the line above will pull from data.js in the people array. The person selected will be at random by way of using the people array index. To pull according to index, we use [] and allow the index range to be dictated by math.logic to the length of the people array.
const personText = document.createElement('p')
const friendsWidget = document.querySelector('.friends')
const yearOfBirth = personIdx.dateOfBirth.split('-')[0] // splits the DOB into an array Idx of 3 and selects the first item [0], the year
const friendsArr = personIdx.friends // put the personIdx friends into a variable (for simplicity); allows for bracket/index notation

const friendsText = (friendsArr) => { // put the friends array conditionals into a variable
  if (friendsArr.length === 0) { // if the personIdx has no friends
    return "has no friends"
  } else {   
    const friendsName = friendsArr.map(id => { // creates a variable to map over the friends array of peopleIdx
      const friend = people.find(person => person.id === id); // If the friend id is found in personIdx friends array, returns names
      return friend ? `${friend.fname} ${friend.lname}` : 'Unknown'; //turnary (if/else shorthand) if friend = truthy returns fname lname
  });
    if (friendsName.length === 1) { // person has one friend
      return `is friends with ${friendsName[0]}` // returns friends fname lname according to the id @ [index]
    } else {
      const friendsNotFinal = friendsName.slice(0,-1).join(', ') // adds comma between each index to friends list string except last one
      const finalFriend = friendsName[friendsName.length - 1] // allows determining of the last friend: for later string grammar 
      return `is friends with ${friendsNotFinal} and ${finalFriend}`
    }   
  }
}
personText.textContent = `${personIdx.fname} ${personIdx.lname} was born in ${yearOfBirth} and ${friendsText(friendsArr)}.`
friendsWidget.appendChild(personText)

  // 👉 TASK 6 - Make it so user can tab through the widgets
  //  ✨ add your code here ===> (No... added to lines 17 & 19 )

  /* loop over widgets, add ability to tab over*/

  // 👆 WORK WORK ABOVE THIS LINE 👆
}
// ❗ DO NOT WORK BELOW THIS LINE
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject1 }
else moduleProject1()

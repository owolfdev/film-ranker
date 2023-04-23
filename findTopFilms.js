function findTopFilmsWithPosition(films) {
  // create an empty Map object to store the score of each film
  const scores = new Map();
  // set the number of lists to the length of the input array
  const numLists = films.length;

  // loop through each list in the input array
  for (let i = 0; i < numLists; i++) {
    // get the current list
    const list = films[i];
    // get the length of the current list
    const listLength = list.length;
    // loop through each film in the current list
    for (let j = 0; j < listLength; j++) {
      // get the current film
      const film = list[j];
      // assign a position score based on the position of the film in the list
      const positionScore = 1 / (j + 1); // higher score for films appearing earlier in the list
      // update the score of the film in the Map object
      if (scores.has(film)) {
        // if the film is already in the Map, add the position score to its existing score
        scores.set(film, scores.get(film) + positionScore);
      } else {
        // if the film is not yet in the Map, set its score to the position score
        scores.set(film, positionScore);
      }
    }
  }

  console.log("scores:", scores);

  // create an empty array to store the top 3 films
  const topFilms = [];
  // loop 3 times to get the top 3 films
  for (let i = 0; i < 3; i++) {
    // initialize the top score and top film to null
    let topScore = 0;
    let topFilm = null;
    // loop through the Map object to find the film with the highest score
    for (const [film, score] of scores.entries()) {
      // if the score of the film is higher than the current top score and it hasn't already been added to the top films array, update the top score and top film
      if (score > topScore && !topFilms.includes(film)) {
        topScore = score;
        topFilm = film;
      }
    }
    // if a top film was found, add it to the top films array
    if (topFilm !== null) {
      topFilms.push(topFilm);
    }
  }

  // return the top films array
  return scores;
}

module.exports = findTopFilmsWithPosition;

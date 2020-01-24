module.exports = (originalNotes, userInput) => {
  if (userInput.length < originalNotes.length) {
    userInput.concat(new Array(originalNotes.length - userInput.length))
  }

  return originalNotes.map((note, index) => note === userInput[index])
};

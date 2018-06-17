export const dataFormat = (name, arr) => {
  return {
    user: name,
    LT3words: arr.filter(message => {
      return message.text.split(' ').length <= 3
    }).length,
    LT3wordsColor: 'hsl(165, 70%, 50%)',
    noTone: arr.filter(message => {
      return message.text.split(' ').length > 3 && !message.score
    }).length,
    noToneColor: 'hsl(263, 70%, 50%)',
    sad: arr.filter(message => {
      return (
        message.text.split(' ').length > 3 &&
        message.score &&
        message.tone_id === 'sad'
      )
    }).length,
    sadColor: 'hsl(230, 70%, 50%)',
    frustrated: arr.filter(message => {
      return (
        message.text.split(' ').length > 3 &&
        message.score &&
        message.tone_id === 'frustrated'
      )
    }).length,
    frustratedColor: 'hsl(334, 70%, 50%)',
    satisfied: arr.filter(message => {
      return (
        message.text.split(' ').length > 3 &&
        message.score &&
        message.tone_id === 'satisfied'
      )
    }).length,
    satisfiedColor: 'hsl(116, 70%, 50%)',
    excited: arr.filter(message => {
      return (
        message.text.split(' ').length > 3 &&
        message.score &&
        message.tone_id === 'excited'
      )
    }).length,
    excitedColor: 'hsl(301, 70%, 50%)',
    polite: arr.filter(message => {
      return (
        message.text.split(' ').length > 3 &&
        message.score &&
        message.tone_id === 'polite'
      )
    }).length,
    impolite: arr.filter(message => {
      return (
        message.text.split(' ').length > 3 &&
        message.score &&
        message.tone_id === 'impolite'
      )
    }).length,
    impoliteColor: 'hsl(1, 70%, 50%)',
    sympathetic: arr.filter(message => {
      return (
        message.text.split(' ').length > 3 &&
        message.score &&
        message.tone_id === 'sympathetic'
      )
    }).length,
    sympatheticColor: 'hsl(60, 70%, 50%)'
  }
}

export function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const totalA =
    a.LT3words +
    a.noTone +
    a.excited +
    a.frustrated +
    a.impolite +
    a.polite +
    a.sad +
    a.satisfied +
    a.sympathetic
  const totalB =
    b.LT3words +
    b.noTone +
    b.excited +
    b.frustrated +
    b.impolite +
    b.polite +
    b.sad +
    b.satisfied +
    b.sympathetic

  let comparison = 0
  if (totalA > totalB) {
    comparison = -1
  } else if (totalA < totalB) {
    comparison = 1
  }
  return comparison
}

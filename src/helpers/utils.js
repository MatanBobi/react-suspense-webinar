export const simulateSleep = ms => {
  let now = Date.now()
  while (Date.now() < now + ms) {
    // noop
  }
}

export const sendAnalyticsPing = value => {
  performance.mark('analytics-start')
  simulateSleep(25)
  performance.mark('analytics-end')
  performance.measure('Analytics: ' + value, 'analytics-start', 'analytics-end')
}

export const createResource = fetchFunction => {
  let data
  const promise = fetchFunction()
    .then(response => (response.json ? response.json() : response))
    .then(parsedResponse => (data = parsedResponse))

  return {
    read() {
      if (!data) {
        throw promise
      }

      return data
    },
  }
}

export const getPokemonIdFromUrl = currentPath => {
  return currentPath.split('/pokemon/')[1]
}

export const preloadImage = src => {
  return new Promise(resolve => {
    const img = document.createElement('img')
    img.src = src
    img.onload = () => resolve(src)
  })
}

export const getMainImageUrl = id => {
  return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
}

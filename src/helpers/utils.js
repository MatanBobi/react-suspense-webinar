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
  
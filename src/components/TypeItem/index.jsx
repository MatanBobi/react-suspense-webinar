import React from 'react'

const getTypeStyles = type => {
  switch (type.name) {
    case 'grass':
      return { backgroundColor: 'MediumSeaGreen' }
    case 'poison':
      return { backgroundColor: 'RebeccaPurple' }
    case 'water':
      return { backgroundColor: 'DodgerBlue' }
    case 'fire':
      return { backgroundColor: 'Tomato' }
    case 'electric':
      return { backgroundColor: '#FFE26F', color: 'black' }
    case 'ice':
      return { backgroundColor: '#75ABDC' }
    case 'fighting':
      return { backgroundColor: '#b54' }
    case 'ground':
      return { backgroundColor: '#db5' }
    case 'flying':
      return { backgroundColor: '#89f' }
    case 'psychic':
      return { backgroundColor: '#f59' }
    case 'bug':
      return { backgroundColor: '#ab2' }
    case 'rock':
      return { backgroundColor: '#ba6' }
    case 'ghost':
      return { backgroundColor: '#66b' }
    case 'dragon':
      return { backgroundColor: '#76e' }
    case 'dark':
      return { backgroundColor: '#754' }
    case 'steel':
      return { backgroundColor: '#aab' }
    case 'fairy':
      return { backgroundColor: '#e9e' }
    default:
      return { backgroundColor: 'gray' }
  }
}
const TypeItem = ({ type }) => {
  const style = getTypeStyles(type)

  return (
    <li
      style={{
        display: 'inline-flex',
        marginRight: '.25em',
        borderRadius: '.25em',
        padding: '.5em 1em',
        color: 'white',
        ...style,
      }}
    >
      {type.name}
    </li>
  )
}

export default TypeItem

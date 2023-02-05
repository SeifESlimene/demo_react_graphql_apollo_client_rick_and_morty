import React from 'react'
import './CharacterList.css'
import {useCharacters} from '../hooks/useCharacters'
import { Link } from 'react-router-dom'

export default function CharactersList() {

  const { error, data, loading } = useCharacters()
  if(loading) return <div className="spinner"><div className="lds-facebook"><div></div><div></div><div></div></div></div>

  if(error) return <div>something went wrong</div>

  return <div className='CharacterList'>
    {data.characters.results.map(character => {
      return <Link key={character.id} to={`/${character.id}`}>
        <img src={character.image} alt={character.name}></img>
        <h2>{character.name}</h2>
      </Link>
    })}
  </div>
}

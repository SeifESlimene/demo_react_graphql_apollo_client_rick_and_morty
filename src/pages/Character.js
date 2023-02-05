import "./Character.css"
import React from 'react'
import { useCharacter } from '../hooks/useCharacter'
import { useParams } from "react-router-dom"

export default function Character() {
  const { id } = useParams();

  const { error, data, loading } = useCharacter(id)

  if(loading) return <div className="spinner"><div className="lds-facebook"><div></div><div></div><div></div></div></div>

  if(error) return <div>something went wrong</div>

  return <div className="character">
    <img src={data.character.image} width={750} height={750} alt={data.character.name} />
    <div className="character-content">
      <h1>{data.character.name}</h1>
      <p>{data.character.gender}</p>
      <div className="character-episode">
        {data.character.episode.map(episode => {
          return <div key={episode.id}>
            {episode.name} - <b>{episode.episode}</b>
          </div>
        })}
      </div>
    </div>
  </div>
}

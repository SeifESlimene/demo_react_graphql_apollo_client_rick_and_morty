import './Search.css'
import React, { useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'


const GET_CHARACTER_LOCATIONS = gql`
query GetCharacterLocations($name: String!){
  characters(filter: { name: $name }) {
		results {
    	location {
        id
        name
      }
    }
  }
}
`

export default function Search() {
  const [name, setName] = useState("")
  const [ getLocations, { loading, error, data, called } ] = useLazyQuery(GET_CHARACTER_LOCATIONS, {
    variables: {
      name
    }
  })

  console.log({ loading, error, data, called });

  return (
    <div className='search'>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)}/>
        <button onClick={() => getLocations()}>Search</button>
      </div>
      {loading && <div className="spinner"><div className="lds-facebook"><div></div><div></div><div></div></div></div>}
      {error && <div>something went wrong</div>}
      {data && (
        <ul>
          {data.characters.results.map(character => {
            return <li key={character.location.id}>{character.location.name}</li>
          })}
        </ul>
      )}
    </div>
  )
}

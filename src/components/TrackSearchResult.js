import React from 'react'

export default function TrackSearchResult({ track, chooseTrack }) {
 function handlePlay () {
chooseTrack(track)
 }
    return (
    <div className="flex justify-center" style={{cursor: 'pointer'}}  onclick={handlePlay}>
      <img src={track.albumUrl} style={{height: '64px', width: '64px'}}/>
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-gray-600">{track.artist}</div>
      </div>
    </div>
  )
}

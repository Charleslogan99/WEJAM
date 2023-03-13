import { useState, useEffect } from "react"
import Uselogin from './Uselogin';
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
    clientId: "ebc0d5a8595449f495e38c5c494fe380",
});

export default function Dashboard({ code }) {
const accessToken = Uselogin(code)
const [search, setSearch] = useState("")
const [searchResults, setSearchResults] = useState([])
const [playingTrack, setPlayingTrack] = useState()
const [lyrics, setLyrics] = useState("")


function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
}

useEffect(() => {
if (!playingTrack) return

axios.get('http://localhost:3001/lyrics', {
    params: {
        track: playingTrack.title,
        artist: playingTrack.artist,
    }
}).then(res => {
    setLyrics(res.data.lyrics)
})
}, [playingTrack])

useEffect(() => {
    if (!accessToken) return
spotifyApi.setAccessToken(accessToken)
}, [accessToken])

useEffect(() => {
if (!search) return setSearchResults([])
if (!accessToken) return 

let cancel = false
spotifyApi.searchTracks(search).then(res => {
if (cancel) return 
    setSearchResults(res.body.tracks.items.map(track => {
    const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
        if (image.height < smallest.height) return image
        return smallest
    }, track.album.images[0])

    return {
        artist: track.artists[0].name,
        title: track.name,
        uri: track.uri,
        albumUrl: smallestAlbumImage.url
    }
}))
})
return () => cancel = true
}, [search, accessToken])

return <div className="">
    
<div className="flex justify-center">
  <div className="py-3 mb-3 xl:w-96">
    <input
      type="search"
      className="relative m-0 block w-full min-w-0 flex-auto  border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-2 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 rounded-full"
     
    placeholder="Search for artist songs and..."
    value={search} onChange={e => setSearch(e.target.value)} />
  </div>
</div>
<div className="text-white flex-grow my-2">
    {searchResults.map(track => (
        <TrackSearchResult 
        track={track} 
        key={track.uri}  
        chooseTrack={chooseTrack} />
    ))}
    {searchResults.length === 0 && (
        <div className="text-center whitespace-pre">
            {lyrics}
        </div>
    )}
    </div>
<div><Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
</div>

}

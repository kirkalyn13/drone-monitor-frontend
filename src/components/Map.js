import { useState, useEffect} from 'react'
import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import Drone from './Drone'
import Sidebar from './Sidebar'
import axios from 'axios'


const defPosition = [14.58384947051935, 120.97797921169004]
const nullInfo = {
    droneID: '',
    latitude: '',
    longitude: '',
}


export const DroneContext = React.createContext()

const darkAttr = 'Tiles &copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
const darkUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
const satelliteAttr = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
const satelliteUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

const Map = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(false)
    const [tracks, setTracks] = useState([])
    const [selectedDrone, setSelectedDrone] = useState(nullInfo)
    const [showSidebar, setShowSidebar] = useState(true)
    const [radarOn, setRadarOn] = useState(false)

    useEffect(() => {
        setTimeout(()=>{
          refresh()
        },5000)
        getTracks()
      },[refreshTrigger])
  
      const refresh = () => {
          setRefreshTrigger(!refreshTrigger)
        }
  
      const getTracks = () => {
          axios.get('http://localhost:3010/tracks').then((response)=>{
            setTracks(response.data)
          })
      }

      const toggleSidebar = () =>{
          setShowSidebar(!showSidebar)
      }
      
    return (
        <>
        <DroneContext.Provider value={{selectedDrone, setSelectedDrone, radarOn, setRadarOn}}>
            <div className="container-map">
                <MapContainer center={defPosition} zoom={9} scrollWheelZoom={true}>
                    <TileLayer
                        attribution={satelliteAttr}
                        url={satelliteUrl}
                    />
                    {tracks.map(track => (
                        <>
                        <Drone key={track.indexNum} location={[track.lat, track.long]}
                        droneID={track.droneID}
                        />
                        </>
                    ))}
                </MapContainer>
                <div className={showSidebar === true ? "sidebar-on" : "sidebar-off"}>
                    <button className="btn-sidebar" onClick={toggleSidebar}>{showSidebar ? '>>>' : '<<<'}</button>
                    {showSidebar === true && (<Sidebar droneInfo={selectedDrone}/>)}
                </div>
            </div>
        </DroneContext.Provider>
        </>
    )
}

export default Map
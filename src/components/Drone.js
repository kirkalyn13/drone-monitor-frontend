import { Marker, Circle } from 'react-leaflet'
import { Icon } from 'leaflet'
import { useContext } from 'react'
import { DroneContext } from './Map'

const RADAR_COVERAGE = 5000
const DRONE_PATH = `./drone.png`

const Drone = ({location, droneID, key}) => {
    const { radarOn, setSelectedDrone } = useContext(DroneContext)
    const radarOptions = {fillOpacity:0, color: '#FFF'}

    const droneIcon = new Icon({
        iconUrl: DRONE_PATH,
        iconSize: [50, 50]
    })

    const assetInfo = {
        droneID: droneID,
        latitude: location[0],
        longitude: location[1],
    }

    return (
            <Marker key={key}
            position={location}
            icon={droneIcon}
            zIndexOffset={1000}
            eventHandlers={{
                click: () => {
                setSelectedDrone(assetInfo) 
                  }
                }}>
            {radarOn === true && (
                    <Circle
                    center={location}
                    pathOptions={radarOptions}
                    radius={RADAR_COVERAGE}
                    stroke={true}  />
            )}
        </Marker>
    )
}

export default Drone

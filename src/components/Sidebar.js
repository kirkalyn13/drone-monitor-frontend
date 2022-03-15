import React from 'react'
import {useContext} from 'react'
import { DroneContext } from './Map'

export const MessageContext = React.createContext()

const Sidebar = ({droneInfo}) => {
    const { radarOn, setRadarOn } = useContext(DroneContext)

    const toggleRadar = () => {
        setRadarOn(!radarOn)
    }

    return (
        <>
        <div className="container-radar-switch">
                <h4>Toggle Radar: </h4>
                <input type="checkbox" name="" onChange={toggleRadar} defaultChecked={radarOn === true ? true : false} />
            </div>
            <div className="container-details">
                <h2>DRONE MONITOR</h2>
                <table className="information">
                    <tbody>
                    <tr className="info"><td className="info-label">Drone ID: </td></tr>
                    <tr><td>{droneInfo.droneID}</td></tr>
                    <tr className="info"><td className="info-label">Latitude: </td></tr>
                    <tr><td>{droneInfo.latitude}</td></tr>
                    <tr className="info"><td className="info-label">Longitude: </td></tr>
                    <tr><td>{droneInfo.longitude}</td></tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Sidebar

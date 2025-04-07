import { Button } from '@mui/material'
import './style/popup-overlay.css'

export default function PopupOverlay(props: any) {
    return <div style={{display: props.visible ? "" : "none"}} className='popup-blur-background'>
                <div className='popup-content'>
                    {props.content}
                </div>
           </div>
}
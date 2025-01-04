import React from 'react'
import './AppPromotion.css'

const AppPromotion = () => {
  return (
    <>
        <div className="app-promotion" id="app-promotion">
        <div className="app-image">
            <img src="/app_image.png" alt="" />
        </div>
        <div className="app-content">
            <h2>Get the QuickBite app</h2>
            <p>Download Here!</p>
            <div className="app-download">
            <a href=""><img src="googleplay.png" alt="" /></a>
            <a href=""><img src="apptore2.png" alt="" /></a>
            </div>
            
            
        </div>
        </div>
    </>
  )
}

export default AppPromotion

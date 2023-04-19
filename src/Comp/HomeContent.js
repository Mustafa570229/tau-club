import React from 'react'
import "./HomeContent.css"
const HomeContent = () => {
  return (
    <>
    <div className='content'>

        <div className='content-img'><img src="https://3fcampus.tau.edu.tr/uploads/blocks/main.tau/gthdYGTP.jpg" alt="..."/></div>

        <div className='content-content'>
            <div className='content-title'>title</div>
            <div className='content-desc'>In this example, the max-width media feature is used to target 
            screens with a maximum width of 400px. The styles inside the curly braces will only be applied
             to screens that match this condition. In this case, the width property of the body element is
              set to 100%, which will make the body element expand to fill the entire width of the screen.</div>
            <div className='content-date'>12/08/2023</div>
        </div>
    </div>
       <div className='content'>

       <div className='content-img'><img src="https://3fcampus.tau.edu.tr/uploads/blocks/main.tau/gthdYGTP.jpg" alt="..."/></div>

       <div className='content-content'>
           <div className='content-title'>title</div>
           <div className='content-desc'>desc</div>
           <div className='content-date'>date</div>
       </div>
   </div>
   </>
  )
}

export default HomeContent
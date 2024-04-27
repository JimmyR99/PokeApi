import React from 'react'

function Modals({isOpen, onClose}) {

  return (
    <>
        {isOpen && <div className="modal-container">
         <div className="modal-body">
           <button onClick={onClose} className="button-start">Start</button>
         </div>
        </div>}
    </>
  );
}

export default Modals
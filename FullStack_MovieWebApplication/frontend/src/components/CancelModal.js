import {useRef} from "react";
import classes from "./Modal.module.css"

function CancelModal(props){

    return(
        <div className = "modal">
            <div className = "modal-content">
                <div className = "modal-header">
                    <h4 className = "modal-title">Cancellation Status</h4>
                </div>
            </div>
            <div className = "modal-body">
                Cancellation confirmed
            </div>
            <div className = "modal-footer">
                <button onClick = {props.onClose} className = "button">Close</button>
            </div>
        </div> 
    )
}

//Implement in cancelTicket
//return(
//<div className = "App">
//  <button onClick = {() => setShow(true)}> Show Modal</button>
//  <Modal onClose ={() => setShow(false)} show = {show} />
//</div>
//)
//https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

export default CancelModal;

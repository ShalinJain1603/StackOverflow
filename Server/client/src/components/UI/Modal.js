import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick} />;
}

const Overlays = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>
            {props.children}
        </div>
    </div>

}

const Modal = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, document.getElementById('overlays'))}
        {ReactDOM.createPortal(<Overlays>{props.children} </Overlays>, document.getElementById('overlays'))}
    </Fragment>
}

export default Modal;
import React,{ useContext }  from "react";
import { useObserver } from "mobx-react-lite";
import style from '../../css/compCss/ThemeHeader.module.css';
import { storeContext } from "../stores/context";
import {NavLink, useLocation} from 'react-router-dom'

const ThemeHeader = () => {
  
  const {uiStore} = useContext(storeContext);
  const loc = useLocation().pathname;

  return useObserver (() => ( 
        <div className={`${style.theme__toggleButton} ${style[uiStore.themeClass]}`}>
          { (loc === '/add' ? '' : <NavLink to="/add" > <button className={`${style.plus__button} ${style[uiStore.themeClass]}`}></button> </NavLink> )}
          
          <div className={`${style.theme__switch} ${style[uiStore.themeClass]}`}>
            <p>Dark mode: </p>
            <input defaultChecked onClick={()=>uiStore.toggle()} type="checkbox" id="toggle" />
            <label htmlFor="toggle"></label>
            <div className={`${style[uiStore.themeClass]}`}></div>
          </div>

        </div>
  ));
};

export default ThemeHeader;

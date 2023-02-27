//********************************************************************************************* */
//ELECTRON MODULES
const { ipcRenderer } = require("electron");
const $ = require('jquery')
const shell = require('shelljs')
const fs = require('fs');
const kill = require('kill-process-by-name')
const day_time = require('date-and-time')
const mysql = require('mysql2/promise')


//********************************************************************************************* */

//MY MODULES
const { view_modules, _cl, sendvich, watcher } = require('./front/global_modules')
const { now_day, now_time, user_session, all_users, data_location } = require('./front/global_values')
const { orders_update } = require('./server/get_orders_serv') 
const { users_update } = require('./server/get_users_serv')

const MODULES = [view_modules(), orders_update(), users_update(), sendvich(), watcher]

//********************************************************************************************* */
window.addEventListener('DOMContentLoaded', () => {
   






})
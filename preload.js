const { ipcRenderer } = require("electron")
const { change_login_window, user_login, pin_ready } = require('./server/autorization')

if (localStorage.getItem('session_start') != 'start') { ipcRenderer.send('login', { message: 'START LOGIN' }) }



window.addEventListener('DOMContentLoaded', () => {
    

    $('#init-btn').click(function () { pin_ready($('#init-val').val()) })
    $('#mail_pass_btn').click(function () { user_login($('#email_inp').val(), $('#password_inp').val()) })

    if (localStorage.getItem('session_start') == 'start' && localStorage.getItem('session_ready') != 'true') {

        if (localStorage.getItem('session_ready') != 'end_init') { change_login_window() }
        else {
            localStorage.setItem('session_ready', 'true')
            localStorage.setItem('link', 'main_admin_home.html')
            ipcRenderer.send('reload', { message: 'RELOAD MAIN WINDOW' })
            ipcRenderer.send('close_login', { message: 'CLOSE LOGIN WINDOW' })
        }
    }
})
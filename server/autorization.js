
const global_host = '89.184.68.183'
const global_user = 'u_all_brb_ne'
const global_database = 'all_brb_networks'
const global_password = 'lhpN3C53'

const config_networks = { host: global_host, user: global_user, database: global_database, password: global_password }


module.exports.change_login_window = (()=>{ $(`.login-box-1`).hide(); $(`.login-box-2`).show() })

module.exports.user_login = (async(log, password)=>{
    const data = JSON.parse(localStorage.getItem('data_autorization'))
    const config_locale = { host: data.host, user: data.user_data_base, database: data.data_base, password: data.password_data_base }

    try{

        const data = [log, password]
        const connect = await mysql.createConnection(config_locale)
        const [rows] = await connect.execute('SELECT * FROM all_users WHERE login=? AND pass=?', data)
        console.log(rows)
        localStorage.setItem('user_session', JSON.stringify(rows[0]))
        const [data_location] = await connect.execute(`SELECT * FROM locations WHERE id_location=${rows[0].id_location}`)
        localStorage.setItem('data_location', JSON.stringify(data_location[0]))
        await connect.end()
        localStorage.setItem('session_ready', 'end_init')
        ipcRenderer.send('reload_login', { message: 'RELOAD LOGIN' })
        ipcRenderer.send('reload', { message: 'RELOAD MAIN WINDOW' })



    }catch(e) { _cl(e) }

})

module.exports.pin_ready = (async (pin) => {
    try {

        const connect = await mysql.createConnection(config_networks)
        const [data_autorization] = await connect.execute('SELECT * FROM all_networks')
        data_autorization.forEach(obj => { if (obj.pin == pin) { localStorage.setItem('data_autorization', JSON.stringify(obj))}})
        await connect.end()
        localStorage.setItem('session_start', 'start')
        ipcRenderer.send('reload_login', { message: 'RELOAD LOGIN' })

    } catch (e) { _cl(e) }

})

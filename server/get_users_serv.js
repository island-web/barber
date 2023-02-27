
module.exports.users_update = async () => {

    try {
        const data_location = JSON.parse(localStorage.getItem('data_autorization'))
        const config_locale  = { host: data_location.host, user: data_location.user_data_base, database: data_location.data_base, password: data_location.password_data_base } 
        const id_location = JSON.parse(localStorage.getItem('data_location')).id_location
        
        const connect_location = await mysql.createConnection(config_locale)
        const [rows] = await connect_location.execute(`SELECT * FROM all_users WHERE id_location=${id_location}`)

        if(JSON.stringify(rows) !== localStorage.getItem('all_users')) {  

            localStorage.setItem('all_users', JSON.stringify(rows))
            fs.writeFileSync('./json_data/all_users.json', JSON.stringify(rows))
            await connect_location.end()
            await fs.writeFileSync('wath.txt', day_time.format(new Date(), 'HH:mm:ss'))

        }else { await connect_location.end() }
        

    } catch (e) { console.log(e) }

}

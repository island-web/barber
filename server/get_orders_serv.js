
module.exports.orders_update = async () => {

    try {
        const data_location = JSON.parse(localStorage.getItem('data_autorization'))
        const config_locale  = { host: data_location.host, user: data_location.user_data_base, database: data_location.data_base, password: data_location.password_data_base } 
        const id_location = JSON.parse(localStorage.getItem('data_location')).id_location
        
        const connect_location = await mysql.createConnection(config_locale)
        const [rows] = await connect_location.execute(`SELECT * FROM all_orders WHERE id_location=${id_location} AND date_order>=${now_day('YYYY-MM-DD')}`)

        if(JSON.stringify(rows) !== localStorage.getItem('all_orders')) {  

            localStorage.setItem('all_orders', JSON.stringify(rows))
            fs.writeFileSync('./json_data/all_orders.json', JSON.stringify(rows))
            await connect_location.end()
            await fs.writeFileSync('wath.txt', day_time.format(new Date(), 'HH:mm:ss'))

        }else { await connect_location.end() }
        

    } catch (e) { console.log(e) }

}

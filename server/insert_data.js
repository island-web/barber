
const connect = require("./connect_my_location")

module.exports.save_new_user = function (data) {

    connect.connect()
    connect(`INSERT INTO all_users (email_user, name_user, id_location, login, contact_user, 
        contact_user, procent_from_order_user, work_start_date_user, ipn_user, pasport_data_user, adres_user, service, status_user) 
        VALUES ?`, data, function (err, results) {
            if (err) { console.log(err) }
            else { console.log(results) }
        })
    //connect.end()
    //location.reload()
}

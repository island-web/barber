

module.exports.now_day = ((template = 'DD-MM-YYYY') => { return day_time.format(new Date(), template) })
module.exports.now_time = ((template = 'HH:mm:ss') => { return day_time.format(new Date(), template) })


module.exports.user_session = (() => {

    const data = JSON.parse(localStorage.getItem('user_session'), 'utf-8')    
    const output = {}

    for(const key of Object.keys(data)){
       try{ output[key] = JSON.parse(data[key]) }
       catch(err){ output[key] = data[key] }
    }
    return output
})

module.exports.data_location = (() => {

    const data = JSON.parse(localStorage.getItem('data_location'), 'utf-8')
    const loc = {}
    
        for (const key of Object.keys(data)) {
            try { loc[key] = JSON.parse(data[key]) } 
            catch (e) { loc[key] = data[key] }
        } 

    return loc
})

module.exports.all_users = (() => {

    const data = JSON.parse(localStorage.getItem('all_users'), 'utf-8')
    const all_users = data.map(obj => {
        const temp_arr = {}
        for (const key of Object.keys(obj)) {
            try { temp_arr[key] = JSON.parse(obj[key]) } 
            catch (e) { temp_arr[key] = obj[key] }
        }
        return temp_arr
    })
    return all_users

})

module.exports.all_orders = (() => {

    let temp_orders = JSON.parse(localStorage.getItem('all_orders'))
    const all_orders = temp_orders.map(obj => {
        const temp_arr = {}
        for (const key of Object.keys(obj)) {
            try { temp_arr[key] = JSON.parse(obj[key]) } 
            catch (e) { temp_arr[key] = obj[key] }
        }
        return temp_arr
    })
    return all_orders

})





/* 
module.exports.get_link = (() => { return localStorage.getItem('link') })
module.exports.pin_status = (() => { return localStorage.getItem('session_status_pin') })
module.exports.get_my_location = (() => { return JSON.parse(localStorage.getItem('my_location')) })
module.exports.get_tables = (() => { return localStorage.getItem('all_tables') })
 */
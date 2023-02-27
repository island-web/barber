

const { save_new_user } = require('./server/insert_data')
const { get_data_location, get_user_location } = require('./front/global_values')

let new_user = new Object()
let new_status_user = new Array()
let new_services_user = new Object()
let new_foto = new Array()

$('.add-master-save-btn').click(function () {
    $('.edit-data-master input').map(function () {
        if ($(this).val() != '') {
            if ($(this).attr('data-file') == 'file') {
                new_foto.push($(this))
            }
            else if ($(this).attr('data_post') == 'singl') {
                new_user[$(this).attr('name')] = $(this).val()
                if ($(this).attr('name') == 'email_user') { new_user['login'] = $(this).val() }
            }
            else if ($(this).val() == 'on_status_user') {
                new_status_user.push($(this).attr('name'))
            }
            else if ($(this).val() == 'on_service') {
                let name_serv = $(this).attr('name')
                new_services_user[name_serv] = new Object()
            }
            else if ($(this).attr('name') == 'price', 'time') {
                try { new_services_user[$(this).attr('data_post')][$(this).attr('name')] = $(this).val() }
                catch (e) {
                    new_services_user[$(this).attr('data_post')] = new Object()
                    new_services_user[$(this).attr('data_post')][$(this).attr('name')] = $(this).val()
                }
            }
        }
    })
    let entry = document.getElementById("file").files[0]
    
    try {
        let temp_img_name = `${new_user.login}_${new_user.id_user}_${day_time.format(new Date(), 'YYYY-MM-DD')}.jpg`

        new_user['img_user'] = `./img_location/${temp_img_name}`
        shell.cp(entry.path, `./img_location/${temp_img_name}`)
    } catch (e) {
        new_user['img_user'] = `./img_location/michael_jackson.jpg`
    }
    _cl(new_services_user.length)
    new_user['status_user'] = JSON.stringify(new_status_user)
    new_user['service'] = JSON.stringify(new_services_user)
    new_user['id_location'] = get_user_location().id_location

    let arr = []
    const coll = ['email_user', 'name_user', 'id_location', 'login', 'contact_user', 'contact_user', 'procent_from_order_user', 'work_start_date_user', 'ipn_user', 'pasport_data_user', 'adres_user', 'service', 'status_user']
    coll.forEach(key => { (new_user[key] == undefined) ? arr.push('null') : arr.push(new_user[key]) })
    _cl(arr)
    save_new_user(arr)
})


let data_location = get_data_location()

for (key in data_location.services_location) {
    data_location.services_location[key].forEach(element => {
        let id = element.replaceAll(' ', '§')
        $('#checkboxes').append(`<div class='checkbox-unit'><label for='${element}'><input name='${element}'
        class='checkboxes-input' type='checkbox' onclick="on_off(this.id, 'service')" data_post='service' id='${id}' value='' />${element}</option>
        <p>
        <input class='edit-data-master-input edit-data-master-input-click' id='price_${id}' name='price' type='number'
        placeholder='ціна послуги' data_post='${element}' value='' require />
        <input class='edit-data-master-input mar-left' id='time_${id}'
        name='time' type='number' placeholder='час послуги' data_post='${element}'
        value='' require />
        </p>
        </div>
    `)
    })
}

data_location.grodation_masters.forEach(status => {
    let id = status.replaceAll(' ', '§')
    $('.checkboxes-status').append(`<label for='${status}'><input name='${status}' class='checkboxes' type='checkbox' onclick="on_off(this.id, 'status_user')" id="${id}" value=''/>${status}</option>`)
})

function on_off(id, data) {
    if ($(`#${id}`).val() == '') { $(`#${id}`).val(`on_${data}`) }
    else { $(`#${id}`).val('') }
}






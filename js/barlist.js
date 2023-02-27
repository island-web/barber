$('#network_name').html(`<img src="./img_location/${data_location().logo_network}"/> `)

$('.nav-bar-click').click( function (){ 

    localStorage.setItem('link', this.id)
    let content = fs.readFileSync(`./templates_html/${this.id}`, { encoding: 'utf8', flag: 'r' })
    $('.main-parent').html(content)
    
})

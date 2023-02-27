//const { shell } = require("systeminformation")

const { get_link, now_time, get_all_users } = require("./global_values")


module.exports.hide_block = function (class_name) {
   $(`.${class_name}`).hide()
}

module.exports.show_block = function (class_name) {
   $(`.${class_name}`).show()
}

module.exports.view_modules = function () {

   if(localStorage.getItem('session_ready') == 'true'){

      let header = fs.readFileSync('./templates_html/header.html', { encoding: 'utf8', flag: 'r' })
      let site_bar = fs.readFileSync('./templates_html/nav_bar.html', { encoding: 'utf8', flag: 'r' })
      $('.main-parent').html(fs.readFileSync(`./templates_html/${localStorage.getItem('link')}`, { encoding: 'utf8', flag: 'r' }))
      let footer = fs.readFileSync('./templates_html/footer.html', { encoding: 'utf8', flag: 'r' })
   
      $('.header-parent').html(header)
      $('.nav-parent').html(site_bar)
      $('.footer-parent').html(footer)

   }

}

module.exports.sendvich=(() => {

   (() => { setTimeout(() => { if ($('#spinner').length > 0) { $('#spinner').removeClass('show') } }, 1)})
   // Back to top button
   $(window).scroll(() => { ($(this).scrollTop() > 300) ? $('.back-to-top').fadeIn('slow') : $('.back-to-top').fadeOut('slow') })
   $('.back-to-top').click(() => { $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo'); return false })
   // Sidebar Toggler
   $('.sidebar-toggler').click(() => { $('.sidebar, .content').toggleClass("open"); return false })

})

module.exports.watcher = fs.watch('./wath.txt', (eventType, filename) => { ipcRenderer.send('reload', { message: 'reload' }); console.log(`Event type: ${eventType}`) })


module.exports._cl = function(data) { console.log(data) }
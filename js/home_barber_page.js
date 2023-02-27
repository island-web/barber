actual_orders_user.forEach(element => {
   if (element.date_order == now_day()) {
      $('#table_order_user').append(`<ul><li>${element.date_order}</li><li>${element.time_order}</li><li>${element.service_order}</li><li>${element.name_client}</li></ul>`);
      $('.my_reserve').html('');
      $('.my_reserve').append(`Мої замовлення: ${now_day}`);
   }
});


///////calender


function calendar(id, year, month) {
   var Dlast = new Date(year, month + 1, 0).getDate(),
      D = new Date(year, month, Dlast),
      DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
      DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
      calendar = '<tr>',
      month = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
   if (DNfirst != 0) {
      for (var i = 1; i < DNfirst; i++) calendar += '<td>';
   } else {
      for (var i = 0; i < 6; i++) calendar += '<td>';
   }
   for (var i = 1; i <= Dlast; i++) {
      let m = D.getMonth() + 1;
      let d = i;
      if (m < 10) {
         m = `0${m}`;
      }
      if (d < 10) {
         d = `0${d}`;
      }
      if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
         calendar += `<td id="${d}/${m}/${D.getFullYear()}" class="today">` + i;
      } else {
         calendar += `<td id="${d}/${m}/${D.getFullYear()}">` + i;
      }
      if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
         calendar += '<tr>';
      }
   }
   for (var i = DNlast; i < 7; i++) calendar += '<td> ';
   document.querySelector('#' + id + ' tbody').innerHTML = calendar;
   document.querySelector('#' + id + ' thead td:nth-child(2)').id = `${id}/${D.getMonth()}/${D.getFullYear()}`
   document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML = month[D.getMonth()] + ' ' + D.getFullYear();
   document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
   document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
   if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) {
      // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
      document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td> <td> <td> <td> <td> <td> <td> ';
   }
}
calendar("calendar", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
   calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) - 1);
}
// переключатель плюс месяц
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
   calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) + 1);
}



function checkWorkDayCalendar() {
   work_days.forEach(el => {
      if (el.day >= now_day) {
         $('td').each(function (i, element) {
            if (element.id == el.day) {
               $(element).addClass('active-day')
               $(element).css('cursor', 'pointer').css('color', '#45f3ff').css('font-weight', 'bold');
               $(element).click(function () {////////click active day////////////
                  $('html, body').animate({ scrollTop: 0 }, 'fast');
                  $('#table_order_user').children().remove();
                  actual_orders_user.forEach(e => {
                     if (e.date_order == element.id) {
                        $('#table_order_user').append(`<ul><li>${e.date_order}</li><li>${e.time_order}</li><li>${e.service_order}</li><li>${e.name_client}</li></ul>`)
                     }
                  });
                  $('.my_reserve').html('');
                  $('.my_reserve').append(`Мої замовлення: ${element.id.replaceAll('/', '-')}`)
               })
            }
         })

      }
   });
}
checkWorkDayCalendar()

$('.next').click(function () {
   $(document).ready(function () {
      checkWorkDayCalendar()
   })
});


/////////////coments////////////////////

// let revese_comments = comments.reverse();
comments.forEach(com => {
   if (com.id_master == user("id_master")) {
      console.log(com)
   $('.head-coments').append(`<div class="d-flex w-100 justify-content-between"><h6 class="name-of-coments mb-0">${com.name_client}</h6><small class="date-coment">${com.date_comment}</small></div><span class="your-coments">${com.comment}</span><hr>`)

   }   
});

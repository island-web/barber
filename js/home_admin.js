/*  */

/* let all_masters = get_all_users()
let all_orders = get_all_orders()
//_cl(all_orders)

let arr_current_time_for_order = [];
let master_for_order;
let data_order_service = [];
let interval_time_near_order = '15';



function compareSecondColumn(a, b) {
   if (a[0] === b[0]) {
      return 0;
   }
   else {
      return (a[0] < b[0]) ? -1 : 1;
   }
}

function bubbleSort(arr) {
   for (var i = 0, endI = arr.length - 1; i < endI; i++) {
      var wasSwap = false;
      for (var j = 0, endJ = endI - i; j < endJ; j++) {
         if (arr[j][0].time_start_order > arr[j + 1][0].time_start_order) {
            var swap = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = swap;
            wasSwap = true;
         }
      }
      if (!wasSwap) break;
   }
   return arr;
}

function deleteDublicate(class_name, teg_name) {
   var original = [];
   $(`.${class_name} ${teg_name}`).each(function () {
      var thisText = $(this).text();
      if (original[thisText]) {
         $(this).remove();
      } else {
         original[thisText] = true;
      }
   });
}////////////////////

function getEndOrdersTime(startTime, orderTimeLine) {
   startTime = startTime.split(':');
   let min = Number(startTime[1]);
   let hov = Number(startTime[0]);
   orderTimeLine = Number(orderTimeLine);
   min += orderTimeLine;
   hov += parseInt(min / 60);
   min = min % 60;
   if (hov == 24) {
      hov = '00'
   } else if (hov < 10) {
      hov = '0' + hov;
   }
   if (min < 10) {
      min = '0' + min;
   }
   return hov + ":" + min;
}

///////////actual time
let actual_time = now_time_h_m()
 *///////////edit order window
/* function editOrderHomeAdmin() {

   $('.home-admin-edit-wind-closed').click(function () {////////закрыть всплывающее окно 
      $('.home-admin-edit-wind').fadeOut();
      $('.home-admin-edit-info-name,.home-admin-edit-info-order,.home-admin-edit-info-date,.home-admin-edit-info-time').css('color', '#45f3ff');
   })/////////

   $(document).ready(function () {

      $('.reserve_today-for-master,.reserve_today').on('click', '.edit-admin-btn-li-btn', function () {
         $('.edit-wind-child-time-change,.edit-wind-child-day-change ,.edit-wind-child-master-change,.home-admin-edit-btn').hide();
         $('.edit-wind-child-time-change p,.edit-wind-child-day-change li,.edit-wind-child-master-change li').remove();
         $('.edit-wind-child-master ,.edit-wind-child-time,.edit-wind-child-closed-order,.edit-wind-child-day').show();
         $('.edit-wind-child-master-span,.edit-wind-child-day-span,.edit-wind-child-time-span').hide();
         $('.home-admin-edit-info-name,.home-admin-edit-info-date,.home-admin-edit-info-time').css('color', '#45f3ff').css('font-weight', 'normal');
         $('.list-order-for-master-parent').fadeOut();
         $('.home-admin-edit-wind').fadeIn();

         $('#reserve_barbers_edit_id_order').val($('#id-order-input').val())
         $('#reserve_barbers_edit_id_order').val(this.id);
         $('#reserve_barbers_edit_status_master').val(this.name);
         $('#reserve_barbers_edit_id_master,#reserve_barbers_old_id_master').val(this.value);
         $('#reserve_barbers_edit_new_date').val($('.today-master-date').html().replaceAll('-', '/'));
         $('.home-admin-edit-info-name').html($(this).children('#reserve_barbers_work_today-name-input').val())
         $('.for-id-order-input').val($(this).children('#order-length-input').val())
         $('.for-length-order-input').val($(this).children('#id-order-input').val())
         $('.home-admin-edit-info-date').html($('.today-master-date').html())
         $('.home-admin-edit-info-order').html($(this).children('#reserve_barbers_work_today-servise-input').val())
         $('#order_for_change').val($(this).children('#reserve_barbers_work_today-servise-input').val())
         $('.home-admin-edit-info-time').html($(this).children('#reserve_barbers_work_today-time-input').val())
         $('#reserve_barbers_edit_new_time').val($(this).closest('.reserve_barbers_work_today').find('.reserve_barbers_work_today-time').html())
         $('#input_length_service').val($(this).children('#order-length-input').val())
         $('#input_email').val($(this).children('#mail').val())
         $('#input_phone').val($(this).children('#contact-input').val())
         $('#input_client_name').val($(this).children('#name-client-input').val())
         $('.home-admin-edit-wind').css(`margin-left`, `-${document.querySelector('.home-admin-edit-wind').offsetWidth / 2}px`)
      })///////////////////////////////////
   })///////////////////////////////////

   $('.edit-wind-child-day').click(function () {////////day click/////////////
      $('.edit-wind-child-day-change-li').remove();
      $('.home-admin-edit-btn').hide();
      $('.home-admin-edit-info-time').css('color', '#45f3ff').css('font-weight', 'normal').html(' ');
      all_masters.forEach(reserve => {
         _cl(reserve)
         reserve.work_day.forEach(work => {
            if (reserve.id_user == $('#reserve_barbers_edit_id_master').val()) {
               $('.edit-wind-child-day-change').append(`<li class='edit-wind-child-day-change-li' id='${work.day}'>${work.day.replaceAll('/', '.')}</li>`)
            }
         })
      });

      $('.edit-wind-child-day-change').slideDown('slow').css('border', '1px solid')
      $('.edit-wind-child-master ,.edit-wind-child-time,.edit-wind-child-closed-order').slideUp('slow');
      $('.edit-wind-child-day-span').fadeIn()


      if ($('.edit-wind-child-day-change').show()) {
         $('.edit-wind-child-day-change').on('click', '.edit-wind-child-day-change-li', function () {

            all_masters.forEach(reserve => {
               if (reserve.id_user == $('#reserve_barbers_edit_id_master').val()) {
                  reserve.work_day.forEach(work => {
                     if (work.day.trim() == $('#reserve_barbers_edit_new_date').val().trim()) {
                        $('#start_time_day').val(work.time.split('-')[0])
                        $('#end_time_day').val(work.time.split('-')[1])
                     }
                  })
               }
            });

            $('.edit-wind-child-day-span').fadeOut()
            $('.home-admin-edit-info-date').html(this.id).css('color', 'yellowgreen').css('font-weight', 'bold');
            $('.edit-wind-child-day-change').slideUp('slow');
            $('#reserve_barbers_edit_new_date').val(this.id);
            $('.edit-wind-child-master ,.edit-wind-child-time,.edit-wind-child-closed-order').slideDown('slow');
         })

         $('.edit-wind-child-day-change li').each(function () {
            if (checkOldDate($(this).text())) {
               $(this).remove()
            }
         })
      }
   })///////////////////////////
   $('.edit-wind-child-master').click(function () {////////master click/////////////
      $('.home-admin-edit-btn').hide();
      $('.home-admin-edit-info-time').css('color', '#45f3ff').css('font-weight', 'normal').html(' ');
      all_info_masters.forEach(element => {
         if (element.status.st[0] != 'Admin') {

            Object.keys(element.service_data.service).forEach(ser => {
               $('.home-admin-edit-info-order').html().split('#').filter(Boolean).forEach(el => {

                  if (el == ser.split('[')[0]) {
                     $('.edit-wind-child-master-change').append(`<li class='edit-wind-child-master-change-li' id='${element.id_user}'>${element.name_user}</li>`)
                  }
               });
            });
         }

      });
      $('.edit-wind-child-master-change').slideDown('slow').css('border', '1px solid')
      $('.edit-wind-child-day,.edit-wind-child-time,.edit-wind-child-closed-order').slideUp('slow');
      $('.edit-wind-child-master-span').fadeIn()
      deleteDublicate('edit-wind-child-master-change', 'li');

      if ($('.edit-wind-child-master-change').show()) {
         $('.edit-wind-child-master-change').on('click', '.edit-wind-child-master-change-li', function () {
            $('.edit-wind-child-master-span').fadeOut()
            $('.home-admin-edit-info-name').html($(this).html()).css('color', 'yellowgreen').css('font-weight', 'bold');
            $('.edit-wind-child-master-change').slideUp('slow');
            $('#reserve_barbers_edit_id_master').val(this.id);
            $('.edit-wind-child-day ,.edit-wind-child-time,.edit-wind-child-closed-order').slideDown('slow');
            all_masters.forEach(reserve => {
               if (reserve.id_user == $('#reserve_barbers_edit_id_master').val()) {
                  reserve.work_day.forEach(work => {
                     if (work.day.trim() == $('#reserve_barbers_edit_new_date').val().trim()) {
                        $('#start_time_day').val(work.time.split('-')[0])
                        $('#end_time_day').val(work.time.split('-')[1])
                     }
                  })
               }
            });

         })
      }
   })/////////////////

   // 
   $('.edit-wind-child-time').click(function () {//////click parent time
      $('.edit-wind-child-time-change p').remove();
      $('.edit-wind-child-time-span').fadeIn();
      $('.edit-wind-child-day,.edit-wind-child-master,.edit-wind-child-closed-order').slideUp('slow');
      let orders_time_arr = []; //////////all orders today
      let time_end_work_master;
      let time_start_work_master;
      let list_free_time = [];

      all_info_masters.forEach(elements => {
         if (elements.status.st[0] != 'Admin' && elements.id_user == $('#reserve_barbers_edit_id_master').val()) {
            elements.work_day.work_day.forEach(work => {

               if (work.day.trim() == $('#reserve_barbers_edit_new_date').val().trim()) {
                  time_start_work_master = work.time.split('-')[0];
                  time_end_work_master = work.time.split('-')[1];
               }
            });
            elements.actual_orders_user.actual_orders_user.forEach(e => {

               if (e.date_order.trim() == $('#reserve_barbers_edit_new_date').val().trim() && e.id_order != $('#reserve_barbers_edit_id_order').val()) {
                  orders_time_arr.push([e.time_order, getEndOrdersTime(e.time_order, e.order_length)])
               }
            });
         }
      });
      if (orders_time_arr.length == 0) {
         for (i = time_start_work_master; getEndOrdersTime(i, $('.for-id-order-input').val()) <= time_end_work_master; i = getEndOrdersTime(i, interval_time_near_order)) {
            list_free_time.push(i);
         }
      } else {
         orders_time_arr.sort(compareSecondColumn);
         let temp_time = time_start_work_master;
         for (i = 0; i < orders_time_arr.length;) {
            if (orders_time_arr[i][0] == temp_time) {
               temp_time = orders_time_arr[i][1];
               i++;
            } else if (getEndOrdersTime(temp_time, $('.for-id-order-input').val()) > orders_time_arr[i][0]) {
               temp_time = orders_time_arr[i][1];
               i++;
            } else if (getEndOrdersTime(temp_time, $('.for-id-order-input').val()) > time_end_work_master) {
               i++;
            } else {
               list_free_time.push(temp_time);
               temp_time = getEndOrdersTime(temp_time, interval_time_near_order)
               while (getEndOrdersTime(temp_time, $('.for-id-order-input').val()) < orders_time_arr[i][0]) {
                  list_free_time.push(temp_time);
                  temp_time = getEndOrdersTime(temp_time, interval_time_near_order)
               }
               list_free_time.push(temp_time);
               temp_time = orders_time_arr[i][1]
               i++;
            }
            if (i + 1 > orders_time_arr.length && getEndOrdersTime(temp_time, $('.for-id-order-input').val()) < time_end_work_master) {
               list_free_time.push(temp_time);
               temp_time = getEndOrdersTime(temp_time, interval_time_near_order)
               while (getEndOrdersTime(temp_time, $('.for-id-order-input').val()) <= time_end_work_master) {
                  list_free_time.push(temp_time);
                  temp_time = getEndOrdersTime(temp_time, interval_time_near_order)
               }
               break
            }
         }
      }
      list_free_time.forEach(time => {
         $('.edit-wind-child-time-change').append(`<p id="${time}" class='edit-time-change-click'>${time}</p>`)
         $('.edit-wind-child-time-change').slideDown().css('border', '1px solid')
      });
      $('.edit-wind-child-time-change p').each(function () {
         if ($('#reserve_barbers_edit_new_date').val() == now_day() && $(this).text().replaceAll(':', '') < actual_time.replaceAll(':', '')) {
            $(this).remove()
         }
      })
   });
   ////////////////////
   $('.edit-wind-child-time-change').on('click', '.edit-time-change-click', function () {////////////////////////////////////click time final
      $('.home-admin-edit-info-time').html(this.id).css('color', 'yellowgreen').css('font-weight', 'bold');
      $('.home-admin-edit-btn').fadeIn();
      $('.edit-wind-child-time-change').slideUp().css('border', 'none')
      $('.edit-wind-child-day,.edit-wind-child-master,.edit-wind-child-closed-order').slideDown('slow');
      $('.edit-wind-child-time-span').hide();
      $('#reserve_barbers_edit_new_time').val(this.id)
   })
   /////////////////////////
   $(function () {////////закриття блоків
      $('.edit-wind-child-master-span').click(function () {
         $('.edit-wind-child-master-change').slideUp().css('border', '1px solid')
         $('.edit-wind-child-day,.edit-wind-child-time,.edit-wind-child-closed-order').slideDown();
         $('.edit-wind-child-master-span').fadeOut()
      })
      $('.edit-wind-child-day-span').click(function () {
         $('.edit-wind-child-day-change').slideUp().css('border', '1px solid')
         $('.edit-wind-child-master ,.edit-wind-child-time,.edit-wind-child-closed-order').slideDown();
         $('.edit-wind-child-day-span').fadeOut()
      })
      $('.edit-wind-child-time-span').click(function () {
         $('.edit-wind-child-time-change').slideUp().css('border', '1px solid')
         $('.edit-wind-child-day,.edit-wind-child-master,.edit-wind-child-closed-order').slideDown();
         $('.edit-wind-child-time-span').fadeOut()
      })
   })//////////////////////
}
 */

///////

///////////////add mitute to orders
// function getEndOrdersTime(startTime, orderTimeLine) {
//    startTime = startTime.split(':');
//    let min = Number(startTime[1]);
//    let hov = Number(startTime[0]);
//    orderTimeLine = Number(orderTimeLine);
//    min += orderTimeLine;
//    hov += parseInt(min / 60);
//    min = min % 60;
//    if (hov == 24) {
//       hov = '00'
//    } else if (hov < 10) {
//       hov = '0' + hov;
//    }
//    if (min < 10) {
//       min = '00'
//    }
//    return hov + ":" + min;
// }
///////function true time



/* list_masters_day(now_day())

function listOrdersDay(day) {
   let temp_orders = []
   for (key in all_orders) { 
      if (all_orders[key].date_order == day) { temp_orders.push(all_orders[key]) }
   }
   //temp_orders = bubbleSort(temp_orders)
   

    temp_orders.forEach(el => {
     
      $('.reserve_today').append(`<div class="reserve_barbers_work_today-main">
      <input id='reserve_barbers_work_id_order' type="hidden" name="id_order" value="${el.id_order}"></input>
      <input id='reserve_barbers_work_status_master' type="hidden" name="status_master" value="${el.status_user}"></input>   
   <ul class="reserve_barbers_work_today">
   <li class='reserve_barbers_work_today-time'>${el.time_start_order}</li>
   <li class='reserve_barbers_work_today-order'>${el.service_order}</li>
   <li class='reserve_barbers_work_today-name'>${el.name_user}</li>
   <li class="adaptive-li-normal">${el.name_client}</li>
   <li class="adaptive-li-normal"><a class="a-tel-orders" href="tel:${el.phone_client}">${el.phone_client}</a></li>
   <li class="adaptive-li-normal"><button id='${el.id_order}' class="edit-admin-btn-li-btn"  value='${el.id_user}' type="button">Редагувати
   <input type='hidden' id='reserve_barbers_work_today-name-input' value='${el.name_client}'></input>
   <input type='hidden' id='reserve_barbers_work_today-servise-input' value='${el.service_order}'></input>
   <input type='hidden' id='reserve_barbers_work_today-time-input' value='${el.time_start_order}'></input>
   <input type='hidden' id='order-length-input' value='${el.length_order}'></input>
   <input type='hidden' id='id-order-input' value='${el.id_order}'></input>
   <input type='hidden' id='name-client-input' value='${el.name_client}'></input>
   <input type='hidden' id='mail' value='${el.email_client}'></input>
   <input type='hidden' id='contact-input' value='${el.phone_client}'></input>
   </button>
</li>
   <li class="adaptive-home-admin-li"><button class="edit-admin-btn-1" name="edit" type="button">Деталі</button></li>
</ul>

   <div class="edit-order-window-admin">
   <li><span class="name-adaptive">Замовник: </span> ${el.name_client}</li>
   <li><a class="a-tel-orders" href="tel:${el.phone_client}">${el.phone_client}</a></li>
   <li class="edit-admin-btn-li">
   <button id='${el.id_order}' class="edit-admin-btn-li-btn" value='${el.id_user}' type="button">Редагувати
   <input type='hidden' id='reserve_barbers_work_today-name-input' value='${el.name_client}'></input>
   <input type='hidden' id='reserve_barbers_work_today-servise-input' value='${el.service_order}'></input>
   <input type='hidden' id='reserve_barbers_work_today-time-input' value='${el.time_start_order}'></input>
   <input type='hidden' id='order-length-input' value='${el.length_order}'></input>
   <input type='hidden' id='id-order-input' value='${el.id_order}'></input>
   <input type='hidden' id='name-client-input' value='${el.name_client}'></input>
   <input type='hidden' id='mail' value='${el.email_client}'></input>
   <input type='hidden' id='contact-input' value='${el.phone_client}'></input>

   </button>
   </li>
   </div>
   </div>`)
   });
   //editOrderHomeAdmin()

}


listOrdersDay(now_day())
///////////


 function listOrdersDayForMaster(day) {////////дивитись замовлення
   $(document).ready(function () {
      $('.data_barber_work_today').on('click', '.show_orders', function () {
         $('.reserve_today-for-master div').remove();
         $('.list-order-for-master-parent').fadeIn();
         $('.list-order-for-master-data').html($('.today-master-date').html())
         $('.list-order-for-master-name').html(this.value);
         $('.list-order-for-master-close').click(function () {
            $('.list-order-for-master-parent').fadeOut();
         })

         let temp_orders = [];
         all_masters.forEach(reserve => {
            if (this.id == reserve.id_master) {

               reserve.actual_orders_user.forEach(el => {
                  if (el.date_order == day) {
                     let temp_t = el.time_order.slice(0, 2);
                     let temp_p = el.time_order.slice(3, 5);
                     let t = Number(temp_t + temp_p)
                     let temp = [{ id_sort: t, id_order: el.id_order, name: el.name_client, contact: el.contact_client, order: el.service_order, reserve_name: reserve.name, time_order: el.time_order, status_master: reserve.status_master, id_master: reserve.id_master, order_length: el.order_length, email_client: el.email_client }];
                     temp_orders.push(temp);
                  }
               });
            }
         });
         temp_orders = bubbleSort(temp_orders)
         temp_orders.forEach(el => {

            el = el[0];
            $('.reserve_today-for-master').append(`<div class="reserve_barbers_work_today-main">
      <input id='reserve_barbers_work_id_order' type="hidden" name="id_order" value="${el.id_order}"></input>
      <input id='reserve_barbers_work_status_master' type="hidden" name="status_master" value="${el.status_user}"></input>  
   <ul class="reserve_barbers_work_today">
      <li class='reserve_barbers_work_today-time'>${el.time_order}</li>
      <li class='reserve_barbers_work_today-order'>${el.order}</li>
      <li class="adaptive-li-normal">${el.name}</li>
      <li class="adaptive-li-normal"><a class="a-tel-orders" href="tel:${el.contact}">${el.contact}</a></li>
      <li class="adaptive-li-normal"><button id='${el.id_order}' class="edit-admin-btn-li-btn" value='${el.id_user}' type="button">Редагувати
      <input type='hidden' id='reserve_barbers_work_today-name-input' value='${el.reserve_name}'></input>
      <input type='hidden' id='reserve_barbers_work_today-servise-input' value='${el.order}'></input>
      <input type='hidden' id='reserve_barbers_work_today-time-input' value='${el.time_order}'></input>   
      <input type='hidden' id='order-length-input' value='${el.order_length}'></input>
      <input type='hidden' id='id-order-input' value='${el.id_order}'></input>
      <input type='hidden' id='name-client-input' value='${el.name}'></input>
      <input type='hidden' id='mail' value='${el.email_client}'></input>
      <input type='hidden' id='contact-input' value='${el.contact}'></input>

   
      </button>
</li>
   <li class="adaptive-home-admin-li"><button class="edit-admin-btn-1" name="edit" type="button">Деталі</button></li>
</ul>

   <div class="edit-order-window-admin">
   <li><span class="name-adaptive">Замовник: </span> ${el.name}</li>
   <li><a class="a-tel-orders" href="tel:${el.contact}">${el.contact}</a></li>
   <li class="edit-admin-btn-li"><button id='${el.id_order}' class="edit-admin-btn-li-btn" value='${el.id_user}' type="button">Редагувати
   <input type='hidden' id='reserve_barbers_work_today-name-input' value='${el.reserve_name}'></input>
   <input type='hidden' id='reserve_barbers_work_today-servise-input' value='${el.order}'></input>
   <input type='hidden' id='reserve_barbers_work_today-time-input' value='${el.time_order}'></input>
   <input type='hidden' id='order-length-input' value='${el.order_length}'></input>
   <input type='hidden' id='id-order-input' value='${el.id_order}'></input>
   <input type='hidden' id='name-client-input' value='${el.name}'></input>
   <input type='hidden' id='mail' value='${el.email_client}'></input>
   <input type='hidden' id='contact-input' value='${el.contact}'></input>


   </button>
   </li>
   </div>
   </div>`)
         });
      });
   });

   editOrderHomeAdmin()
}
listOrdersDayForMaster(now_day())

///////////////////////////
$(document).ready(function () {////////////click adaptive adit master & order btn
   $('.data_barber_work_today').on('click', '.edit-admin-btn', function () {
      $(this).closest('.click-data-barber').find('.edit-admin-window').slideToggle().css('display', 'flex');
      $(this).parent('.all_barbers_work_today').toggleClass('colo');
   })
   /////////////////
   $('.reserve_today,.reserve_today-for-master').on('click', '.edit-admin-btn-1', function () {
      $(this).closest('.reserve_barbers_work_today-main').find('.edit-order-window-admin').slideToggle().css('display', 'flex');
      $(this).closest('.reserve_barbers_work_today').toggleClass('colo');
   })
})



////////////////////
comments.forEach(e => {
   $('.all_head-coments').append(`<div class="d-flex w-100 justify-content-between"><h6 class="name-of-coments mb-0">${e.name_user}</h6><small class="date-coment">${e.date}</small></div><span class="your-coments">${e.comments}</span><hr>`);
});

//////to do list

function taskBtn() {
   let task_input = $('.task-input').val();
   if (task_input != '') {
      $('.task-parent').prepend(`<div class="d-flex w-100 align-items-center justify-content-between task-bottom"><span>${task_input}.</span><button  class="task-delete btn btn-sm text-primary"><i class="fa fa-times"></i></button></div>`)
   }
   $('.task-input').val('');
}
$(function () {
   $(document).on('click', '.task-delete', function () {
      $(this).parent().remove();
   })
})
$(function () {
   $(document).on('click', '.task-bottom span', function () {
      $(this).toggleClass('line-through');
   })
})

///////////////////////

////////calendar
$(document).ready(function () {
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
            calendar += `<td id="${d}-${m}-${D.getFullYear()}" class="today-calendar admin-calendar-item">` + i;
         } else {
            calendar += `<td id="${d}-${m}-${D.getFullYear()}" class="admin-calendar-item">` + i;
         }
         if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
            calendar += '<tr>';
         }
      }
      for (var i = DNlast; i < 7; i++) calendar += '<td> ';

      document.querySelector('#' + id + ' tbody').innerHTML = calendar;
      document.querySelector('#' + id + ' thead td:nth-child(2)').id = `${id}-${D.getMonth()}-${D.getFullYear()}`
      document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML = month[D.getMonth()] + ' ' + D.getFullYear();
      document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
      document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
      if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) {
         // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
         document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td> <td> <td> <td> <td> <td> <td> ';
      }
   }
   $(function () {
      $('.admin-calendar-item').click(function () { ///////click calendar
         document.querySelector('#target').scrollIntoView({
            behavior: 'smooth'
         });
         $('.today-master-date').html('');
         $('.today-master-date').html(` ${this.id}`);
         $('.reserve_today,.data_barber_work_today').children().remove();
         let click_date = this.id.replaceAll('-', '/');
         listMasterDay(click_date);
         listOrdersDay(click_date);
         listOrdersDayForMaster(click_date);
      })
   })

   calendar("calendar", new Date().getFullYear(), new Date().getMonth());
   // переключатель минус месяц
   document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
      $(document).ready(function () {
         calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) - 1);
         $(function () {
            $('.admin-calendar-item').click(function () { ///////click calendar
               document.querySelector('#target').scrollIntoView({
                  behavior: 'smooth'
               });
               $('.today-master-date').html('');
               $('.today-master-date').html(` ${this.id}`);
               $('.reserve_today,.data_barber_work_today').children().remove();
               let click_date = this.id.replaceAll('-', '/');
               listMasterDay(click_date);
               listOrdersDay(click_date);
               listOrdersDayForMaster(click_date);
            })
         })

      })
   }
})
// переключатель плюс месяц
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
   $(document).ready(function () {
      calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) + 1);
      $(function () {
         $('.admin-calendar-item').click(function () { ///////click calendar
            document.querySelector('#target').scrollIntoView({
               behavior: 'smooth'
            });
            $('.today-master-date').html('');
            $('.today-master-date').html(` ${this.id}`);
            $('.reserve_today,.data_barber_work_today').children().remove();
            let click_date = this.id.replaceAll('-', '/');
            listMasterDay(click_date);
            listOrdersDay(click_date);
            listOrdersDayForMaster(click_date);
         })
      })

   })
}

 */




$(document).ready(function () {   /////////// увеличение фото
   $('.data_barber_work_today').on('mouseover', 'img', function () {
      $('.home-admin-wind-for-big-img-child').attr('src', this.id);
      $('.home-admin-wind-for-big-img').show();
   });
   $('.data_barber_work_today').on('mouseout', 'img', function () {
      $('.home-admin-wind-for-big-img').hide();
   });
});


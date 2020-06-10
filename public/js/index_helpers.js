// Toggle selected entries and unfold options to view, edit, and delete
$('.list-group-item').click((event) => {
  $(event.currentTarget).siblings().children('.collapse').collapse('hide')
  $(event.currentTarget).siblings().css({
    'background-color': '',
    color: 'black'
  })

  if ($(event.currentTarget).children('.collapse').hasClass('show')) {
    $(event.currentTarget).children('.collapse').collapse('hide')
    $(event.currentTarget).css({
      'background-color': '',
      color: 'black'
    })
  } else {
    $(event.currentTarget).children('.collapse').collapse('show')
    $(event.currentTarget).css({
      'background-color': '#4d78a5',
      color: '#ffff'
    })
  }
})

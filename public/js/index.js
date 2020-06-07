$(() => {
  $('.navbar-toggler').click(() => {
    $('.offcanvas-collapse').toggleClass('open')
  })

  $('option').on('click', (event) => {
    const selectedOption = $(event.currentTarget)

    $('input[type=search]').attr('placeholder', selectedOption.text())
    $('input[type=search]').attr('name', selectedOption.val())
  })

  $('.list-group-item').click((event) => {
    if ($(event.currentTarget).children('.collapse').hasClass('show')) {
      $(event.currentTarget).children('.collapse').collapse('hide')
      $(event.currentTarget).css({
        'background-color': '',
        color: 'black'
      })
    } else {
      $(event.currentTarget).siblings().children('.collapse').collapse('hide')
      $(event.currentTarget).children('.collapse').collapse('show')
      $(event.currentTarget).css({
        'background-color': '#4d78a5',
        color: '#ffff'
      })
    }
  })
})

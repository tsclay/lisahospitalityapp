$(() => {
  $('option').on('click', (event) => {
    const selectedOption = $(event.currentTarget)

    $('input[type=search]').attr('placeholder', selectedOption.text())
    $('input[type=search]').attr('name', selectedOption.val())
  })

  $('.list-group-item').click((event) => {
    if ($(event.currentTarget).children('.collapse').hasClass('show')) {
      $(event.currentTarget).children('.collapse').collapse('hide')
    } else {
      $(event.currentTarget).siblings().children('.collapse').collapse('hide')
      $(event.currentTarget).children('.collapse').collapse('show')
    }
  })
})

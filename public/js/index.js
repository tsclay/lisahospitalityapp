$(() => {
  $('option').on('click', (event) => {
    const selected = $(event.currentTarget)

    $('input[type=search]').attr('placeholder', selected.text())
    $('input[type=search]').attr('name', selected.val())
  })
})

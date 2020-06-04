$(() => {
  $('option').on('click', (event) => {
    const selectedOption = $(event.currentTarget)

    $('input[type=search]').attr('placeholder', selectedOption.text())
    $('input[type=search]').attr('name', selectedOption.val())
  })
})

// Hide the HTML until all styles and scripts have loaded
$('html').css('visibility', 'hidden')

$(() => {
  // Reveal HTML after all loading is done
  $('html').css('visibility', 'visible')

  // Unfolds the navbar on right
  $('.navbar-toggler').click(() => {
    $('.offcanvas-collapse').toggleClass('open')
  })

  // Toggle the placeholder of the search field to match the selected search query parameter
  $('option').on('click', (event) => {
    const selectedOption = $(event.currentTarget)

    $('input[type=search]').attr('placeholder', selectedOption.text())
    $('input[type=search]').attr('name', selectedOption.val())
  })
})

const editCommentField = $('#post-new-comment')
  .clone()
  .attr('id', 'edit-comment')
  .append(
    $(
      "<button type='button' class='btn btn-sm btn-secondary' id='cancel-button'>"
    ).text('CANCEL')
  )

$('.edit-comment-button').on('click', (event) => {
  $('#cancel-button').click()

  const postIdStr = $(event.currentTarget)
    .parent()
    .parent()
    .attr('action')
    .slice(5, -15)

  const existingComment = $(event.currentTarget)
    .parentsUntil('#this-comment')
    .find('.card-text')

  console.log(existingComment.html())

  editCommentField
    .children('textarea[name=content]')
    .text(existingComment.html())

  editCommentField.attr('action', `/app/comment/${postIdStr}?_method=PUT`)

  existingComment.after(editCommentField)

  $('#cancel-button').click((event) => {
    $(event.currentTarget).parent().remove()
  })
})

$('.your-comments')
  .parent()
  .parent()
  .hover(
    (event) => {
      $(event.currentTarget).find('div[role=group]').show('slow')
    },
    (event) => {
      $(event.currentTarget).find('div[role=group]').hide('slow')
    }
  )

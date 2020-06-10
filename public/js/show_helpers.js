// Create a clone of the comment field to move around the DOM for updated requests
const editCommentField = $('#post-new-comment')
  .clone()
  .attr('id', 'edit-comment')
  .append(
    $(
      "<button type='button' class='btn btn-sm btn-secondary' id='cancel-button'>"
    ).text('CANCEL')
  )

$('.edit-comment-button').on('click', (event) => {
  // On 'CANCEL', close any other open edit comment fields
  $('#cancel-button').click()

  // Grab string containing the guest ID and post ID
  const postIdStr = $(event.currentTarget)
    .parent()
    .parent()
    .attr('action')
    .slice(5, -15)

  // Grab the comment that is already displayed in DOM
  const existingComment = $(event.currentTarget)
    .parentsUntil('#this-comment')
    .find('.card-text')

  // Set the text of the edit-comment field to the text already their for edits
  editCommentField
    .children('textarea[name=content]')
    .text(existingComment.html())

  // Set the action of the new form to update the Post and redirect back to Guest
  editCommentField.attr('action', `/app/comment/${postIdStr}?_method=PUT`)

  existingComment.after(editCommentField)

  // Get rid of edit field if not editing
  $('#cancel-button').click((event) => {
    $(event.currentTarget).parent().remove()
  })
})

// See edit and delete options for user's comments only on hover
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

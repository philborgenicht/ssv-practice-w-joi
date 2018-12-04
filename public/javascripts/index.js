document.addEventListener('DOMContentLoaded', function(){
  //Dynamically populate user list on page load
  $.get('/users')
    .done(result => {
      result.forEach(user => {
        $('tbody').append(
          `<tr>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>`
        )
      })
    })

  //Submit form data event listener
  document.querySelector('form').addEventListener('submit', () => {
    event.preventDefault()
    //Create new user object with form inputs
    const data = {
      first_name: $('#first_name').val(),
      last_name: $('#last_name').val(),
      email: $('#email').val(),
      password: $('#password').val()
    }
    // Post to /signup route
    $.post('/signup', data)
      //Successful POST request, append new user data
      .done(user => {
          $('tbody').append(
            `<tr>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>`
          )
      })
      //Unsuccessful POST request, append error text
      .fail(result => {
        $('#error-text').empty()
        $('#error-text').append(`<h5>${result.responseJSON.error}</h5>`)
      })
  })

}) // End DOMContentLoaded

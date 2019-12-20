$(function(){
  function buildHTML(message){
    if (message.image){
      var html = `<div class="messages">
                    <div class="messages__data">
                      <div class="user-name">
                        ${message.user_name}
                      </div>
                      <div class="create-date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="messages__user-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      <img src="${message.image}" class="lower-message_image">
                    </div>
                    </div>`
    }
    else {
      var html = `<div class="messages">
                    <div class="messages__data">
                      <div class="user-name">
                        ${message.user_name}
                      </div>
                      <div class="create-date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="messages__user-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                    </div>`
    }
    return html;
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit-btn').prop('disabled', false);
    })
    .fail(function(){
          alert("メッセージ送信に失敗しました");
    });
  });
})

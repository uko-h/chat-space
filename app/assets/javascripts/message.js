$(function(){
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `
        <div class="messages"data-id=${message.id}>
          <div class="messages__data"> 
            <div class="user-name">${message.user_name}</div>
            <div class="create-date">${message.created_at}</div>
          </div>
          <div class="messages__user-message">
            <p class="lower-message__content">${message.content}</p>
            <img src="${message.image}">
          </div>
        </div>`
    } 
    else if (message.content) {
      var html = `
      <div class="messages"data-id="${message.id}">
        <div class="messages__data"> 
          <div class="user-name">${message.user_name}</div>
          <div class="create-date">${message.created_at}</div>
        </div>
        <div class="messages__user-message">
          <p class="lower-message__content">${message.content}</p>
        </div>
      </div>`
    } else if (message.image) {
        var html = `
        <div class="messages"data-id="${message.id}">
          <div class="messages__data"> 
            <div class="user-name">${message.user_name}</div>
            <div class="create-date">${message.created_at}</div>
          </div>
          <div class="messages__user-message">
            <img src="${message.image}" >
          </div>
        </div>`
    };
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

  var reloadMessages = function() {
    last_message_id = $('.messages:last').data("id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
        var insertHTML = '';
        $.each(messages, function(i, message){
        insertHTML += buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
      
    })
    .fail(function(){
      alert('error');
    });
  };
  if (document. location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages,7000);
  }
});

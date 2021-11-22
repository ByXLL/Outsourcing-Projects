

$.ajaxSettings.beforeSend = function(xhr,request){
  let token = window.localStorage.getItem('token')
  xhr.setRequestHeader('Content-Type','application/json')
  xhr.setRequestHeader('token',token);
}

function logout() {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('userInfo')
  window.location.replace('login.html')
}
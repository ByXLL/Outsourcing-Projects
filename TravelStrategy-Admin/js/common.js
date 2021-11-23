// $.ajaxSettings.beforeSend = function(xhr,request){
//   let token =
//   xhr.setRequestHeader('Content-Type','application/json')
//   xhr.setRequestHeader('token',token);
// }

$.ajaxSetup({
  aysnc: false,
  dataType: "JSON",
  headers: {
    "Content-Type": "application/json",
    token: window.localStorage.getItem("token") || "",
  },
  dataFilter: function(data,type) {
    let result = JSON.parse(data)
    if(result.code == 401) {
      window.location.replace('login.html')
    }
    return data;
  },
  error: function (jqXHR, textStatus, errorMsg) {},
  // complete: function (request, textStatus) {
  //   let responseJSON = request.responseJSON
  //   if(responseJSON.code == 401) {
  //     window.location.replace('login.html')
  //   }
  // },
});

function logout() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userInfo");
  window.location.replace("login.html");
}

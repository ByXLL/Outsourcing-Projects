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


function queryURLParameter(url) {
  var quesIndex = url.indexOf('?'),
      obj = {};
  if (quesIndex === -1) {     //URL中没有传参，直接返回空对象
      return obj;
  }
  url = url.substring(quesIndex + 1);
  var ary = url.split('&');
  for (var i = 0; i < ary.length; i++) {
     var curAry = ary[i].split('=');
     obj[curAry[0]] = curAry[1]; 
  }
  return obj;
}

function logout() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userInfo");
  window.location.replace("login.html");
}

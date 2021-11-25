// $.ajaxSettings.beforeSend = function(xhr,request){
//   let token =
//   xhr.setRequestHeader('Content-Type','application/json')
//   xhr.setRequestHeader('token',token);
// }
let tempUserInfo = JSON.parse(window.localStorage.getItem('userInfo') || '{}')
$("#userAvatar").attr('src',tempUserInfo.avatar)
$("#loginName").text(tempUserInfo.userName)

$.ajaxSetup({
  aysnc: false,
  // dataType: "JSON",
  headers: {
    // "Content-Type": "application/json",
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

function formatDate(dateTime) {
  var date = new Date(dateTime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var year = date.getFullYear(),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      sdate = ("0" + date.getDate()).slice(-2),
      hour = ("0" + date.getHours()).slice(-2),
      minute = ("0" + date.getMinutes()).slice(-2),
      second = ("0" + date.getSeconds()).slice(-2);
  var result = year + "-"+ month +"-"+ sdate +" "+ hour +":"+ minute +":" + second
  return result
}

function createImgDom(filePath) {
  let tempHtml = `
        <li class="col-xs-4 col-sm-3 col-md-2">
          <figure>
            <img id="coverPic" src="${filePath}" alt="">
            <figcaption>
              <a class="btn btn-round btn-square btn-danger" href="javascript:;" onclick="$(this).parent().parent().parent().remove()"><i class="mdi mdi-delete"></i></a>
            </figcaption>
          </figure>
        </li>`
  return tempHtml      
}

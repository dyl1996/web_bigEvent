$.ajaxPrefilter(function (options) {
    // console.log(options.url); 
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    // token验证
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
        // 后台验证
        options.complete = function (res) {
            // console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                localStorage.removeItem("token");
                location.href = 'login.html';
            }
        }
    }
});
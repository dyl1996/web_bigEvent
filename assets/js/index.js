$(function () {
    var layer = layui.layer;
    // 获取用户信息
    window.initUserInfo = initUserInfo;
    initUserInfo();
    function initUserInfo() {
        // $.ajax({
        //     method: "GET",
        //     url: "/my/userinfo",
        //     success: function (res) {
        //         console.log(res);
        //     }
        // });
        $.get("/my/userinfo", function (res) {
            // console.log(res);
            if (res.status !== 0) return layer.msg(res.message);
            // 渲染头像和昵称
            renderAvatar(res.data);
        });
    }
    // 渲染函数
    function renderAvatar(user) {
        var uname = user.nickname || user.username;
        $(".welcome").html("欢迎 " + uname);
        if (user.user_pic !== null) {
            // 渲染图片头像
            $(".pic_avatar").prop("src", user.user_pic).show();
            $(".user_avatar").hide();
        } else {
            // 渲染文本呢头像
            $(".pic_avatar").hide();
            $(".user_avatar").html(uname[0].toUpperCase()).show();
        }
    }
    // 退出功能
    $(".btnSignout").on("click", () => {
        layer.confirm("确定退出？", { icon: 3, title: '提示' }, index => {
            localStorage.removeItem("token");
            location.href = 'login.html';
            layer.close(index);
        });
    });
})
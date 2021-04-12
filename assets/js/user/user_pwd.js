$(function () {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须为6到12位，且不能出现空格'],
        newPwd: function (value) {
            if (value === $(".oldPwd").val()) {
                return '新旧密码不能一致';
            }
        },
        rePwd: function (value) {
            if (value !== $(".newPwd").val()) {
                return "两次输入密码不一致";
            }
        }
    });
    $(".form_pwd").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
            }
        })
    })
})
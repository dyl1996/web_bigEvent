$(function () {
    // 点击 去注册
    $("#link_reg").on("click", function () {
        $(".login").hide();
        $(".reg").show();
    });
    // 点击 去登录
    $("#link_login").on("click", function () {
        $(".login").show();
        $(".reg").hide();
    });
    // 自定义校验规则
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // value 为表单中的值
            // 判断两次输入内容是否一致
            if (value !== $(".reg [name=password]").val()) {
                return "两次输入密码不一致";
            }
        }
    });
    // 监听注册事件
    $("#regForm").on("submit", function (e) {
        e.preventDefault(); // 阻止表单默认提交
        $.post("/api/reguser", {
            // 参数
            username: $(".reg [name=username]").val(),
            password: $(".reg [name=password]").val()
        }, function (res) {
            if (res.status !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message);
            }
            // console.log('注册成功');
            layer.msg("注册成功！请登录");
            $("#link_login").click();
        });
    });
    // 监听登录事件
    $("#login_form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("登录成功");
                localStorage.setItem("token", res.token);
                location.href = 'index.html';
            }
        });
    });
});
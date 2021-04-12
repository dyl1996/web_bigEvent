$(function () {
    var layer = layui.layer;
    var form = layui.form;
    initInfo();
    function initInfo() {
        $.get("/my/userinfo", res => {
            if (res.status !== 0) return layer.msg(res.message);
            form.val("form_update", res.data);
        });
    }
    // 重置
    $(".btnReset").on("click", function (e) {
        e.preventDefault();
        initInfo();
    });
    // 提交修改
    $(".formUpdate").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                window.parent.initUserInfo();
            }
        });
    })
});
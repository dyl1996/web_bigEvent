$(function () {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);
    // 点击上传
    $(".btn_Upload").on("click", function () {
        $("#file1").click();
    });
    // 更换裁剪区域
    $("#file1").on("change", function (e) {
        var fileList = e.target.files;
        if (fileList.length <= 0) return layer.msg("请选择要上传的头像");
        var newImgURL = URL.createObjectURL(fileList[0]);
        $image.cropper("destroy").attr("src", newImgURL).cropper(options);
    });
    // 点击更换头像
    $(".btnUpdate").on("click", function () {
        var dataURL = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toDataURL('image/png');       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.post("/my/update/avatar", { avatar: dataURL }, res => {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg(res.message);
            window.parent.initUserInfo();
        })
    });
});
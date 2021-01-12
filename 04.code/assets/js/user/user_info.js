$(function () {

    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1-6个字符之间'
            }
        }
    })

    initUserInfo()

    //初始化用户基本信息

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                layer.msg('成功获取用户信息')
                console.log(res);

                //调用form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)

            }
        })
    }


    //重置表单数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()

        //调用 initUserInfo() 方法 发起ajax请求 获取到用户信息
        initUserInfo()
    })

    //监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户的信息更新失败')
                }
                layer.msg('用户的信息更新成功')
                //调用父页面中的方法,渲染子页面中用户的头像和信息
                window.parent.getUserInfo()
            }
        })

    })

})
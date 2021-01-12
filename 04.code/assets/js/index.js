$(function () {

    getUserInfo()

    //退出按钮绑定点击事件


    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清空本地存储的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = '/login.html'

            // 官方提供的关闭弹出层
            layer.close(index);
        });


    })





})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },   //在baseAPI中设置了字符串拼接
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar 渲染用用户头像
            renderAvatar(res.data)
        },
        //不论成功还是失败，最后都会调用complete 回调函数
        // complete: function (res) {
        //     // console.log('执行了 complete 回调');
        //     // console.log(res);

        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据\
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //1.强制清空token 
        //         localStorage.removeItem('token')
        //         //2.强制跳转登录页面
        //         location.href = '/login.html'
        //     }
        // }


    })
}

//渲染用户头像
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        //3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
        $('.layui-nav-img').hide()
    }
}
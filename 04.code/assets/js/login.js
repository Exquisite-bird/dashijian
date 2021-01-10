$(function () {

  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()

  })
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // 通过layui获取form属性
  var form = layui.form

  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须在6-16位之间,且不能出现空格'],
    //校验两次密码输入是否一致
    repwd: function (value) {
      //形参value为确认密码中的内容
      //再获取到输入密码中的内容 pwd
      //判断二者是否相等
      //若是不等，return 一个提示信息，提醒用户重新输入
      var pwd = $('.reg-box [name = password]').val()
      if (pwd !== value) {
        return '两次输入的密码不一致，请重新输入'
      }
    }
  })

  //监听注册表单提交事件

  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    var data = {
      username: $('#form_reg [name = username]').val(),
      password: $('#form_reg [name = password]').val()
    }

    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return console.log(res.message);
      }
      console.log('注册成功了');
    }
    )
  })


  //监听登录表单提交事件

  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败');
        }
        layer.msg('登录成功');
        localStorage.setItem('token', res.token)
        
        location.href = '../../index.html'
      }
    })
  })
})
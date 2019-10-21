







1. 前端h5混合开发手机端ios  当有input输入时，手机下方弹出键盘使页面上移，当输入完成，键盘消失后页面不能回弹导致下方有空白，按钮不能点击；

​	https://blog.csdn.net/YY110621/article/details/87919966

​	https://blog.csdn.net/zhangkeke_/article/details/88739521

2. 解决安卓键盘收起表单无法失去焦点问题

   ```javascript
    // 主要代码是在表单加上一个类名input-hook，在mounted监听事件。
   const el = document.documentElement || document.body
   const originHeight = el.clientHeight
   window.addEventListener('resize', () => {
         const resizeHeight = el.clientHeight
         if (resizeHeight < originHeight) {
           console.log('键盘弹起')
         } else {
           console.log('键盘收起')
           const likeArray = document.getElementsByClassName('input-hook')
           Array.from(likeArray, input => input.blur())
         }
       }, false)
   ```

   

https://blog.csdn.net/wu_xianqiang/article/details/90720362

3. 通过focusout事件解决IOS键盘收起时界面不归位的问题

```javascript
// 页面
<div @focusout="inputBlur" @focusin="inputFocus">
    <input type="text" placeholder="请填写省市县" />
    <input type="text" placeholder="请填写地址" />
    <input type="text" placeholder="请填写姓名" />
    <input type="text" placeholder="请填写联系电话" />
</div>
// js
  inputBlur(e) {
    // 首先，判断触发事件的目标元素是否是input输入框，我们只关注输入框的行为。
    if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input') {
    // 输入框失去焦点，要把IOS键盘推出页面的滚动部分还原。即将页面滚动到视窗顶部对齐
       console.log('设置timer')
       this.timer = setTimeout(() => {
        console.log('timer触发')
        window.scrollTo(0,0);
       }, 0)
      }
  },
  inputFocus(e) {
    // 如果focus，则移除上一个输入框的timer
    if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input') {
      clearTimeout(this.timer);
     }
   }
```

http://www.fly63.com/article/detial/4211

4. 安卓手机点击input框，会被键盘挡住的问题。

   ```javascript
   // 写个js即可（对于vue项目，将js写在mounted即可）
   // 处理安卓手机输入法遮挡输入框问题（摘自WEUI）
   if ((/Android/gi).test(navigator.userAgent)) {
           window.addEventListener('resize', function () {
               if (document.activeElement.tagName == 'INPUT' || 
                   document.activeElement.tagName == 'TEXTAREA') {
                   window.setTimeout(function () {
                       document.activeElement.scrollIntoViewIfNeeded();
                   }, 0);
               }
           });
       } 
   ```

   



​	
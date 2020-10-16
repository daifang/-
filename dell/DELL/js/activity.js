var div = document.getElementsByClassName('div'); 
for(var i = 0; i < div.length ;i++){
    (function(i){
        div[i].addEventListener('click',function(){
            for(var j = 0; j <div.length ;j++){
                (function(){
                    div[j].classList.remove('checked');
                })(j)
            }
            div[i].classList.add('checked');
        })
    })(i);
};
var div2 = document.getElementsByClassName('div2'); 
for(var i = 0; i < div2.length ;i++){
    (function(i){
        div2[i].addEventListener('click',function(){
            for(var j = 0; j <div2.length ;j++){
                (function(){
                    div2[j].classList.remove('checked');
                })(j)
            }
            div2[i].classList.add('checked');
        })
    })(i);
};

var top = document.getElementsByClassName('top')[0].addEventListener('click',function(){
    if(document.getElementById('text').innerHTML == '更多筛选条件'){
        document.getElementById('text').innerHTML = '收起';
        document.getElementsByClassName('header')[0].classList.add('translate');
        document.getElementById('text_img').style.transform = "rotate(0deg)";
        document.getElementsByClassName('header')[0].style = "height:26.3rem;";
        document.getElementsByClassName('first_kind')[0].style = "display:block;";
        document.getElementsByClassName('second_kind')[0].style = "display:block";
    }else{
        document.getElementById('text').innerHTML = '更多筛选条件';
        document.getElementById('text').style = 'margin-bottom : 0';
        document.getElementsByClassName('header')[0].classList.add('translate');
        document.getElementById('text_img').style.transform = "rotate(-180deg)";
        document.getElementsByClassName('header')[0].style = "height:3rem;";
        setTimeout(() => {
            document.getElementsByClassName('first_kind')[0].style = "display:none;";
            document.getElementsByClassName('second_kind')[0].style = "display:none";
        }, 200);
    }
});

var checkbox = document.getElementsByClassName('idCard_items');

for (let i = 0; i < checkbox.length; i++) {
    const element = checkbox[i];
    element.addEventListener('click',()=>{
        window.open('./活动详情.html','_self');
    });
    
}
var idCard = document.getElementsByClassName('idCard_items');

for(var i = 0; i < idCard.length;i++){
    (function(idx){
        idCard[idx].addEventListener('click',function(){
            window.open('./历史数据2.html','_self');
        });
    })(i);
};


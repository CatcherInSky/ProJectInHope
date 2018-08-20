function dropDown(){
    var div = document.getElementById("nav");
    div.style.display = "block";
}
function closeNav(){
    var div = document.getElementById("nav");
    div.style.animation="navSlideOut 0.5s forwards";
    setTimeout(Non,500);
    function Non(){
        div.style.display="none";
        div.style.animation="navSlide 0.5s";
    }
}

var bread = document.getElementById("bread");
if(bread){
    console.log(bread);
    bread.innerHTML = bread.innerHTML.replace("您所在的位置：","");
    bread.innerHTML = bread.innerHTML.replace(">>",">");
    console.log(bread);
}




function getElementsByClassName(className, root, tagName) {    //root：父节点，tagName：该节点的标签名。 这两个参数均可有可无
    if (root) {
        root = typeof root == "string" ? document.getElementById(root) : root;
    } else {
        root = document.body;
    }
    tagName = tagName || "*";
    if (document.getElementsByClassName) {                    //如果浏览器支持getElementsByClassName，就直接的用
        return root.getElementsByClassName(className);
    } else {
        var tag = root.getElementsByTagName(tagName);    //获取指定元素
        var tagAll = [];                                    //用于存储符合条件的元素
        for (var i = 0; i < tag.length; i++) {                //遍历获得的元素
            for (var j = 0, n = tag[i].className.split(' ') ; j < n.length; j++) {    //遍历此元素中所有class的值，如果包含指定的类名，就赋值给tagnameAll
                if (n[j] == className) {
                    tagAll.push(tag[i]);
                    break;
                }
            }
        }
        return tagAll;
    }
}





var paginator2 = getElementsByClassName("paginator2",);
if(paginator2){
    console.log(paginator2.children);
    paginator2.style.width=(paginator2.children.length-4)*52+"px";
    paginator2.style.float="none";
    paginator2.style.margin="auto";
    var num = paginator2.children.length;
    console.log(num);
    for(var i=0;i<num;i++){
        console.log(paginator2.children[i].innerText);
        if(paginator2.children[i].innerText=="上一页"){
            paginator2.children[i].innerText="<";
        }
        if(paginator2.children[i].innerText=="下一页"){
            paginator2.children[i].innerText=">";
        }
    }

}
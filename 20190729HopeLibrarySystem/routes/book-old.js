const express=require("express");
const mysql_util=require("./mysql_util");
const router=express.Router();

const setSession = require('./../utils/set-session');
const hopeDB = require('./../utils/hopeDB.js');
const userDB = hopeDB.userDB;
const bookDB = hopeDB.bookDB;
const borrowDB = hopeDB.borrowDB;

router.route("/").get(function(req,res){
    if(!req.session.userID || !req.session.userSign){
        res.redirect("/hopelibrary/user/login");
        return;
    }
    const userID = req.session.userID;
    userDB.selectMessage(userID, (rows) => {
        const user = rows[0];
        const [userName, userImg, userPermission] = [user.readerName, user.userImgSrc, 'user'];
        const query = 'SELECT bookCate FROM hopebook GROUP BY bookCate';
        bookDB.query(query, (rows) => {
            const bookCate = [];
            rows.forEach(function(ele) {
                bookCate.push(ele.bookCate);
            });
            bookDB.orderItems('bookLeft DESC,bookID DESC', 0, 20, (rows) => {
                const book = rows;
                setSession(req,{userSign:true,userID: req.session.userID});
                res.render("user/user-book",{userName,userImg,userPermission,firstPath:'borrow',secondPath:'',book,bookCate});
            });
        })
    });
}).post(function(req, res) {
    let startNum=parseInt(req.body.bookNum);
    let endNum = startNum+8;
    bookDB.orderItems('bookLeft DESC,bookID DESC', startNum, endNum, (rows) => {
        let book = rows;
        bookDB.countItems('bookNum', (rows) => {
            let bookNum = rows[0].bookNum;
            let message={
                book:book
            };
            if(endNum >= bookNum){
                message.end = true;
            }
            res.send(message);
        });
    });
});
router.route('/borrow').post(function(req,res){
    const bookID = req.body.borrowID;
    const userID = req.session.userID;
    bookDB.selectMessage(bookID, (rows) => {
        const bookLeft = rows[0].bookLeft - 1;
        const query = 'INSERT bookborrow SET borrowBookID='
                      + bookID
                      + ',borrowUserID='
                      + userID
                      + ',borrowTime=CURDATE(),returnBefore=ADDDATE(CURDATE(),30)';
        if(bookLeft >= 0) {
          borrowDB.query(query, (rows) => {
            const setDataJson = {
              bookLeft: bookLeft
            };
            bookDB.updateMessage(bookID, setDataJson, (message) => {
              res.send(message);
            }, '借阅成功');
          });
        }
    });
});

router.route("/cate/:cate").get(function(req, res){
    if(!req.session.userID || !req.session.userSign){
        res.redirect("/hopelibrary/user/login");
        return;
    }
    const bookCateCurrent = decodeURI(req.params.cate);
    const userID = req.session.userID;
    userDB.selectMessage(userID, (rows) => {
        const user = rows[0];
        const [userName, userImg, userPermission] = [user.readerName, user.userImgSrc, 'user'];
        const query = 'SELECT bookCate FROM hopebook GROUP BY bookCate';
        bookDB.query(query, (rows) => {
            const bookCate = [];
            rows.forEach(function(ele) {
                bookCate.push(ele.bookCate);
            });
            const searchDataJson = {
                bookCate: bookCateCurrent
            };
            bookDB.orderSearchItems(searchDataJson, 'bookLeft DESC, bookID DESC', 0, 20, (rows) => {
                const book = rows;
                res.render("user/user-book",{userName,userImg,userPermission,firstPath:'borrow',secondPath:bookCateCurrent,book,bookCate});
            });
        });
    });
}).post(function(req, res) {
    const startNum = parseInt(req.body.bookNum);
    const endNum = startNum+8;
    const bookCateCurrent = decodeURI(req.params.cate);
    const searchDataJson = {
        bookCate: bookCateCurrent
    };
    bookDB.orderSearchItems(searchDataJson, 'bookLeft DESC, bookID DESC', startNum, endNum, (rows) => {
        const book = rows;
        bookDB.countSearchItems(searchDataJson, 'bookNum', (rows) => {
            const bookNum = rows[0].bookNum;
            const message={
                book:book
            };
            if(endNum >= bookNum){
                message.end = true;
            }
            res.send(message);
        });
    });
});



module.exports=router;



<!DOCTYPE html>
<html lang="zh">
<%- include("./../public/head.ejs") %>
<body>
<%- include("./../public/header.ejs") %>
<%- include("./../public/banner.ejs") %>
<section class="main">
    <div class="container clearfix">
        <%- include("./../public/user/user-aside.ejs") %>
        <section class="main-right">
            <%- include("./../public/user/user-nav.ejs") %>
            <% if( book.length > 0) { %>
            <section class="main-right-borrow">
                <ul class="main-right-borrow-list clearfix">
                    <% for(var i = 0, max = book.length; i < max; i++) {%>
                    <li class="main-right-borrow-list-item">
                        <div class="main-right-borrow-list-item-img">
                            <img src="/hopelibrary/<%= book[i].bookImgSrc %>" alt="">
                        </div>
                        <div class="main-right-borrow-list-item-message">
                            <h4> <%= book[i].bookName %> </h4>
                            <p>编号：<%= book[i].bookHopeID %> </p>
                            <% if(book[i].bookLeft <= 0) { %>
                            <button disabled="disabled">已借出</button>
                            <% } else {%>
                            <button data-borrowID=<%= book[i].bookID%> class="js-borrow-btn">借阅</button>
                            <% } %>
                        </div>
                    </li>
                    <% } %>
                </ul>
            </section>
            <% } else { %>
            <section class="main-right-table">
                <table>
                    <thead>
                    <th class="t-10 center">当前暂无图书</th>
                    </thead>
                </table>
            </section>
            <% } %>
        </section>
    </div>
</section>
<%- include("./../public/footer.ejs") %>
<script src="/hopelibrary/js/public/require.js" type="text/javascript" charset="utf-8"></script>
<script>
  requirejs.config({
    baseUrl: "/hopelibrary/js",
    paths:{
      hajax: "public/hajax",
      jquery: "public/jquery",
      hlayer: "./hlayer/hlayer",
      bookcate: "./user/bookcate"
    },
    shim: {
      hajax: {exports: "hajax"},
      hlayer: {exports: "hlayer"},
      bookcate: {exports: "bookcate"}
    }
  })
  requirejs(["jquery", 'hlayer', 'bookcate'],function($, hlayer,bookcate) {
    bookcate.borrow();
    // bookcate.scroll();
  })
</script>
</body>
</html>

      <!--         <%if(bookNum>1){%>
                <section class="main-right-page-num">
                    <%if(bookNum>12){if(bookPage==1 || bookPage==bookNum){%>
                    <span <%if(bookPage==1){%> class="main-right-page-num-active" <%}%>><a href="/hopelibrary/book?pageTab=1">1</a></span>
                    <span><a href="/hopelibrary/book?pageTab=2">2</a></span>
                    <span><a href="/hopelibrary/book?pageTab=3">3</a></span>
                    <span><a href="">...</a></span>
                    <span><a href="/hopelibrary/book?pageTab=<%=bookNum-2%>"><%=bookNum-2%></a></span>
                    <span><a href="/hopelibrary/book?pageTab=<%=bookNum-1%>"><%=bookNum-1%></a></span>
                    <span <%if(bookNum==bookPage){%> class="main-right-page-num-active"<%}%>><a href="/hopelibrary/book?pageTab=<%=bookNum%>"><%=bookNum%></a></span>
                    <%}else{%>
                    <span><a href="/hopelibrary/book?pageTab=1">1</a></span>
                    <%if(bookPage>3){%>
                    <span><a href="">...</a></span>
                    <%}%>
                    <%if(bookPage>=3){%>
                    <span><a href="/hopelibrary/book?pageTab=<%=bookPage-1%>"><%=parseInt(bookPage)-1%></a></span>
                    <%}%>
                    <span class="main-right-page-num-active"><a href="/hopelibrary/book?pageTab=<%=bookPage%>"><%=bookPage%></a></span>
                    <%if(bookPage<(parseInt(bookNum)-1)){%>
                    <span><a href="/hopelibrary/book?pageTab=<%=parseInt(bookPage)+1%>"><%=parseInt(bookPage)+1%></a></span>
                    <%}%>
                    <%if(bookPage<(parseInt(bookNum)-2)){%>
                    <span><a href="">...</a></span>
                    <%}%>
                    <span><a href="/hopelibrary/book?pageTab=<%=bookNum%>"><%=bookNum%></a></span>
                    <%}}else{%>
                    <%for(var k=1;k<=bookNum;k++){%>
                    <span <%if(k==bookPage){%> class="main-right-page-num-active"<%}%>><a href="/hopelibrary/book?pageTab=<%=k%>"><%=k%></a></span>
                    <%}%>
                    <%}%>
                    <%}%>
                    <%}else{%>
                    <table>
                    <th class="t-10 center">当前架上尚无图书</th>
                    </table>
                </section>
              <%}%> -->

router.route("/").get(function(req,res){
    if(!req.session.userID || !req.session.userSign){
        res.redirect("/hopelibrary/user/login");
        return;
    }
    const bookCateCurrent = decodeURI(req.params.cate);
    const userID = req.session.userID;
    let pageNum=req.query.pageTab || 1;
    userDB.selectMessage(userID, (rows) => {
        const user = rows[0];
        const [userName, userImg, userPermission] = [user.readerName, user.userImgSrc, 'user'];
        let pageStart=(pageNum-1)*12;
        let pageEnd=pageNum*12;
        const searchDataJson = {
            bookCate: bookCateCurrent
        };
        bookDB.orderSearchItems(searchDataJson,'bookLeft DESC,bookID DESC', pageStart, pageEnd,  (rows) => {
            const book = rows;
            bookDB.countItems('bookNum', (rows) => {
                let bookNum = Math.ceil(rows[0].bookNum/12);
                const query = 'SELECT bookCate FROM hopebook GROUP BY bookCate';
                bookDB.query(query, (rows) => {
                    const bookCate = [];
                    rows.forEach(function(ele) {
                        bookCate.push(ele.bookCate);
                    });
                    
                    setSession(req,{userSign:true,userID: req.session.userID});
                    res.render("user/user-book",{userName,userImg,userPermission,firstPath:'borrow',secondPath:bookCateCurrent,book,bookCate,bookNum,bookPage:pageNum});
                })
            })
        });
    });
})
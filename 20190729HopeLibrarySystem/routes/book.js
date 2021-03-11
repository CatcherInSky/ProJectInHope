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
    let pageNum=req.query.pageTab || 1;
    userDB.selectMessage(userID, (rows) => {
        const user = rows[0];
        const [userName, userImg, userPermission] = [user.readerName, user.userImgSrc, 'user'];
        let pageStart=(pageNum-1)*12;
        let pageEnd=pageNum*12;
        bookDB.orderItems('bookLeft DESC,bookID DESC', pageStart, pageEnd,  (rows) => {
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
                    res.render("user/user-book",{userName,userImg,userPermission,firstPath:'borrow',secondPath:'',book,bookCate,bookNum,bookPage:pageNum});
                })
            })
        });
    });
})
router.route('/search').get(function(req,res){
    if(!req.session.userID || !req.session.userSign){
        res.redirect("/hopelibrary/user/login");
        return;
    }
    const userID = req.session.userID;
    userDB.selectMessage(userID, (rows) => {
        const user = rows[0];
        const [userName, userImg, userPermission] = [user.readerName, user.userImgSrc, 'user'];
        let word = decodeURI(req.query.word);
     
        bookDB.search(word,(rows)=>{
            const book = rows;
            setSession(req,{userSign:true,userID: req.session.userID});
            res.render("user/user-search",{userName,userImg,userPermission,firstPath:'borrow',secondPath:'search',book})
        })
    });
    
})
// .post(function(req, res) {
//     let startNum=parseInt(req.body.bookNum);
//     let endNum = startNum+8;
//     bookDB.orderItems('bookLeft DESC,bookID DESC', startNum, endNum, (rows) => {
//         let book = rows;
//         bookDB.countItems('bookNum', (rows) => {
//             let bookNum = rows[0].bookNum;
//             let message={
//                 book:book
//             };
//             if(endNum >= bookNum){
//                 message.end = true;
//             }
//             res.send(message);
//         });
//     });
// });
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
            bookDB.countSearchItems(searchDataJson,'bookNum', (rows) => {
                console.log(rows)
                console.log(rows[0])
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
// .post(function(req, res) {
//     const startNum = parseInt(req.body.bookNum);
//     const endNum = startNum+8;
//     const bookCateCurrent = decodeURI(req.params.cate);
//     const searchDataJson = {
//         bookCate: bookCateCurrent
//     };
//     bookDB.orderSearchItems(searchDataJson, 'bookLeft DESC, bookID DESC', startNum, endNum, (rows) => {
//         const book = rows;
//         bookDB.countSearchItems(searchDataJson, 'bookNum', (rows) => {
//             const bookNum = rows[0].bookNum;
//             const message={
//                 book:book
//             };
//             if(endNum >= bookNum){
//                 message.end = true;
//             }
//             res.send(message);
//         });
//     });
// });



module.exports=router;
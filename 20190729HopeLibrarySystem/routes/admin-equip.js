const express=require("express");
const mysql_util=require("./mysql_util");
const crypto=require("crypto");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const url=require("url");
const router=express.Router();

const setSession = require('./../utils/set-session');
const hopeDB = require('./../utils/hopeDB.js');
const [adminDB, equipDB] = [hopeDB.adminDB, hopeDB.equipDB];

/*设备管理员设备分页*/
router.route("/admin-equip").get(function(req,res){
    if(!req.session.adminID || !req.session.adminSign){
        res.redirect("/hopelibrary/admin/login");
        return;
    }
	let pageNum = req.query.pageTab || 1;
    adminDB.selectMessage(req.session.adminID, (rows) => {
        const admin = rows[0];
        const [userName, userImg, userPermission] = [admin.adminName, admin.adminImgSrc, admin.adminPermissions];
        let pageStart = (pageNum-1)*10;
        let pageEnd = pageNum*10;
        const query = 'SELECT equipName,equipID,adminName,equipLeft'
                      + ' FROM hopeequip,hopeadmin'
                      + ' WHERE hopeequip.equipAdminID=hopeadmin.adminID'
                      + ' ORDER BY equipLeft,equipHopeID ASC LIMIT '
                      + mysql_util.DBConnection.escape(pageStart)
                      + ','
                      + mysql_util.DBConnection.escape(pageEnd);
        equipDB.query(query, (rows) => {
            const equip = rows;
            equipDB.countItems('equipNum', (rows) => {
                const equipNum=Math.ceil(rows[0].equipNum/10);
                const query = 'SELECT readerName,borrowEquipID'
                              + ' FROM hopereader,equipborrow'
                              + ' WHERE borrowUserID=readerID AND returnWhe=0';
                equipDB.query(query, (rows) => {
                    let borrower = [];
                    for(let i = 0, max = equip.length; i < max; i++){
                        borrower[i] = 0;
                        for(let j = 0, max1 = rows.length; j < max1;j++){
                            if(rows[j].borrowEquipID == equip[i].equipID){
                                borrower[i] = rows[j].readerName;
                                
                            }
                        }
                    }
                    res.render("admin-equip/index",{userName,userImg,userPermission,firstPath:'camera',secondPath:'modify',equip,borrower,equipNum,equipPage:pageNum});
                });
            });
        });
    });
});
router.route('/admin-equip/search').get(function(req,res){
    if(!req.session.adminID || !req.session.adminSign){
        res.redirect("/hopelibrary/admin/login");
        return;
    }
    adminDB.selectMessage(req.session.adminID, (rows) => {
        const admin = rows[0];
        let word = decodeURI(req.query.word);
        const [userName, userImg, userPermission] = [admin.adminName, admin.adminImgSrc, admin.adminPermissions];
        const query = 'SELECT equipName,equipID,adminName,equipLeft'
                      + ' FROM hopeequip,hopeadmin'
                      + ' WHERE hopeequip.equipAdminID=hopeadmin.adminID'
                      + ' AND (equipName LIKE "%'
                      + word
                      + '%" OR adminName LIKE "%'
                      + word
                      + '%" OR equipHopeID LIKE "%'
                      + word
                      + '%")';
        equipDB.query(query, (rows) => {
            const equip = rows;

            const query = 'SELECT readerName,borrowEquipID'
                        + ' FROM hopereader,equipborrow'
                        + ' WHERE borrowUserID=readerID AND returnWhe=0';
            equipDB.query(query, (rows) => {
                let borrower = [];
                for(let i = 0, max = equip.length; i < max; i++){
                    borrower[i] = 0;
                    for(let j = 0, max1 = rows.length; j < max1;j++){
                        if(rows[j].borrowEquipID == equip[i].equipID){
                            borrower[i] = rows[j].readerName;
                                
                        }
                    }
                }
                res.render("admin-equip/admin-equip-search",{userName,userImg,userPermission,firstPath:'camera',secondPath:'search',equip,borrower});
            });
            
        });
    });
})

//管理员修改设备信息
router.route("/equipmodify/:equipID").get(function(req,res){
    if(!req.session.adminID || !req.session.adminSign){
        res.redirect("/hopelibrary/admin/login");
        return;
    }
    const equipID=req.params.equipID;
    adminDB.selectMessage(req.session.adminID, (rows) => {
        const admin = rows[0];
        const [userName, userImg, userPermission] = [admin.adminName, admin.adminImgSrc, admin.adminPermissions];
        const query = 'SELECT equipHopeID,equipName,equipImgSrc,adminName'
                      + ' FROM hopeequip,hopeadmin'
                      + ' WHERE hopeequip.equipAdminID=hopeadmin.adminID AND equipID='
                      + mysql_util.DBConnection.escape(equipID);
        equipDB.query(query, (rows) => {
           const equip = rows[0];
           setSession(req,{adminID:admin.adminID,adminSign: true});
           res.render("admin-equip/admin-equip-modify",{userName,userImg,userPermission,firstPath:'camera',secondPath:'modify',equip});
        });
    });
}).post(function(req,res){
	const equipID=req.params.equipID;
	const dataJson = {
		adminName: req.body.equipAdmin,
        adminPermissions: 'camera'
	};
	adminDB.selectItem(dataJson, (rows) => {
        if(rows.length<1){
            let err={
                code:2,
                message:"该管理员不存在"
            };
            res.send('err')
            console.log('err')
            res.send(err);
            return;
        }
        let setDataJson;
        let tempImgSrcs = req.body.equipImgSrc.toString();
        const tempImgSrc = tempImgSrcs.toString().replace(/\/hopelibrary\//g, '');
        if(tempImgSrc.includes('temp')) {
            const equipImgSrc = tempImgSrc.replace(/temp/g, 'equip');
            const oldPath = path.join('./public', tempImgSrc);
            const newPath = path.join('./public', equipImgSrc);
            fs.renameSync(oldPath, newPath);
            setDataJson = {
                equipName: req.body.equipName,
                equipHopeID: req.body.hopeID,
                equipAdminID: rows[0].adminID,
                // equipdesc: req.body.equipdesc,
                equipImgSrc
            }
            console.log('temp')
        }else{
            setDataJson = {
                equipName: req.body.equipName,
                equipHopeID: req.body.hopeID,
                equipAdminID: rows[0].adminID,
                // equipdesc: req.body.equipdesc
            };
        }
		equipDB.updateMessage(equipID, setDataJson, (message) => {
            res.send(message);
		});
	});
});

router.route("/check").get(function(req,res){
    if(!req.session.adminID || !req.session.adminSign){
        res.redirect("/hopelibrary/admin/login");
        return;
    }
    adminDB.selectMessage(req.session.adminID, (rows) => {
        const admin = rows[0];
        const [userName, userImg, userPermission] = [admin.adminName, admin.adminImgSrc, admin.adminPermissions];
        const query = "SELECT readerName,borrowTime,equipName,reservationText,borrowEquipID,adminName"
                      + " FROM hopereader,equipborrow,hopeequip,hopeadmin"
                      + " WHERE equipborrow.borrowEquipID=hopeequip.equipID"
                      + " AND equipborrow.reservation=0"
                      + " AND equipborrow.borrowUserID=hopereader.readerID"
                      + " AND hopeequip.equipAdminID=hopeadmin.adminID"
                      + " AND hopeadmin.adminID="
                      + mysql_util.DBConnection.escape(req.session.adminID);
        equipDB.query(query, (rows) => {
            let equip = rows;
            equip.forEach(function(e){
                e.borrowTime = e.borrowTime.getFullYear()+"-"+e.borrowTime.getMonth()+"-"+e.borrowTime.getDate();
            });
            res.render("admin-equip/admin-equip-check",{userName,userImg,userPermission,firstPath:'camera',secondPath:'check',equip});
        });
    });
}).post(function(req,res){
	const equipID=req.body.equipID;
	const check=req.body.check;
	if(check==="true"){
	    const query = 'UPDATE equipborrow SET reservation=1 WHERE borrowEquipID=' + mysql_util.DBConnection.escape(equipID);
	    equipDB.query(query, (rows) => {
            const message = {
                message:"操作成功"
            };
            res.send(message);
        });
	}else if(check==="false"){
	    const setDataJson = {
	        equipLeft: 1
        };
	    // equipDB.updateMessage(equipID,(message) => {
	        const query = 'DELETE FROM equipborrow WHERE borrowEquipID=' + mysql_util.DBConnection.escape(equipID);
	        equipDB.query(query, (rows) => {
                const message = {
                    message:"操作成功"
                };
                res.send(message);
            });
        // });
	}
});

// 设备添加by张春祥
router.route("/equipadd").get(function(req,res){
    if(!req.session.adminID || !req.session.adminSign){
        res.redirect("/hopelibrary/admin/login");
        return;
    }
    adminDB.selectMessage(req.session.adminID, (rows) => {
        const admin = rows[0];
        const [userName, userImg, userPermission] = [admin.adminName, admin.adminImgSrc, admin.adminPermissions];
        setSession(req,{adminID:admin.adminID,adminSign: true});
        res.render("admin-equip/admin-equip-add",{userName,userImg,userPermission,firstPath:'camera',secondPath:'add'});
    });
}).post(function(req,res){
    const dataJson = {
        adminName: req.body.equipAdmin,
        adminPermissions: 'camera'
    };
    adminDB.selectItem(dataJson, (rows) => {
        if(rows.length<1){
            let err={
                code:2,
                message:"该管理员不存在"
            };
            res.send('err')
           
            res.send(err);
            return;
        }
        let setDataJson;
        let tempImgSrcs = req.body.equipImgSrc.toString();
         const tempImgSrc = tempImgSrcs.toString().replace(/\/hopelibrary\//g, '');
        if(tempImgSrc.includes('temp')) {
            const equipImgSrc = tempImgSrc.replace(/temp/g, 'equip');
            const oldPath = path.join('./public', tempImgSrc);
            const newPath = path.join('./public', equipImgSrc);
            fs.renameSync(oldPath, newPath);
            setDataJson = {
                equipName: req.body.equipName,
                equipHopeID: req.body.hopeID,
                equipAdminID: rows[0].adminID,
                equipImgSrc
            }
        }else{
            setDataJson = {
                equipName: req.body.equipName,
                equipHopeID: req.body.hopeID,
                equipAdminID: rows[0].adminID,
            };
        }
        equipDB.addItem(setDataJson, (message) => {
            res.send(message);
        });
    });
});

module.exports=router;
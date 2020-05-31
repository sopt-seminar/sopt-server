var express = require('express');
var router = express.Router();


const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const companyModel = require('../models/company');

router.get('/popular/:uid', async(req, res) => {
    const uid = req.params.uid;
  
    try{
      const popularCompany = await companyModel.popularCompany(uid);
  
      return res.status(statusCode.OK).send(util.success(statusCode.OK, "인기 회사 조회 성공", popularCompany));
    }catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
});

router.get('/interested/:uid', async(req, res) => {
    const uid = req.params.uid;
  
    try{
      const interestedCompany = await companyModel.interestedCompany(uid);
  
      return res.status(statusCode.OK).send(util.success(statusCode.OK, "관심 회사 조회 성공", interestedCompany));
    }catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
        throw err;
    }
});


module.exports = router;

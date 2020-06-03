var express = require("express");
var router = express.Router();

const util = require("../modules/util");
const statusCode = require("../modules/statusCode");
const companyModel = require("../models/company");

//인기회사조회
router.get("/popular/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const popularCompany = await companyModel.popularCompany(uid);

    return res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, "인기 회사 조회 성공", popularCompany));
  } catch (err) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    throw err;
  }
});

//관심회사조회
router.get("/interested/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const interestedCompany = await companyModel.interestedCompany(uid);

    return res
      .status(statusCode.OK)
      .send(
        util.success(statusCode.OK, "관심 회사 조회 성공", interestedCompany)
      );
  } catch (err) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    throw err;
  }
});

// 회사 하트 개수 수정
router.put("/hearts/:company_idx/:company_hearts", async (req, res) => {
  const { company_idx, company_hearts } = req.params;

  if (!company_idx || !company_hearts) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  try {
    const heartsUpdateResult = await companyModel.changeCompanyHearts(
      company_idx,
      company_hearts
    );

    return res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          "회사 하트개수 업데이트 성공",
          heartsUpdateResult
        )
      );
  } catch (err) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, "test"));
    throw err;
  }
});

// 회사 팔로우 유무 업데이트
router.put("/following/:company_idx/:company_follow", async (req, res) => {
  const { company_idx, company_follow } = req.params;

  if (!company_idx || !company_follow) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  try {
    const followingUpdateResult = await companyModel.changeCompanyFollowing(
      company_idx,
      company_follow
    );

    return res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          "회사 팔로우 유무 업데이트 성공 (1이면 팔로우한 상태, 0이면 언팔로우 상태)",
          followingUpdateResult
        )
      );
  } catch (err) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    throw err;
  }
});

module.exports = router;

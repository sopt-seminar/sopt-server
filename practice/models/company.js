const pool = require("../modules/pool");
const table = "company";

const company = {
  popularCompany: async (uid) => {
    const query = `SELECT company_name, company_industry, company_img, company_hearts FROM ${table};`;

    try {
      const result = await pool.queryParam(query);
      return result;
    } catch (err) {
      console.log("인기 회사 조회가 실패했습니다.", err.errno, err.code);
      return -1;
    }
    console.log("인기 회사 조회가 실패했습니다.", err);
    throw err;
  },
  interestedCompany: async (uid) => {
    const query = `SELECT company_img, company_follow, company_name, company_location, recruit_position FROM ${table};`;

    try {
      const result = await pool.queryParam(query);
      return result;
    } catch (err) {
      console.log("인기 회사 조회가 실패했습니다.", err.errno, err.code);
      return -1;
    }
    console.log("인기 회사 조회가 실패했습니다.", err);
    throw err;
  },
  changeCompanyHearts: async (company_name, company_hearts) => {
    const query = `UPDATE ${table} SET company_hearts="${company_hearts}" WHERE company_name="${company_name}"`;
    try {
      const result = await pool.queryParam(query);
      return {
        company_name: result[0].company_name,
        company_hearts: result[0].company_hearts,
      };
    } catch (err) {
      console.log("회사 하트개수 업데이트 실패", err.errno, err.code);
      throw err;
    }
  },
};

module.exports = company;

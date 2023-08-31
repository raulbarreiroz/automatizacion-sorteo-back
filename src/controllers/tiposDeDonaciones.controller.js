const pool = require("../db");
// get de todos los sorteos
const getTiposDeDonaciones = async (req, res, next) => {
  try {
    const result = await pool.query(`
select 
	t.*				
from tipo_donacion t
where t.estado = 'A'
    `);

    const tipoDeDonaciones = result?.rows;
    res.json(tipoDeDonaciones?.length ? tipoDeDonaciones : []);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTiposDeDonaciones,
};

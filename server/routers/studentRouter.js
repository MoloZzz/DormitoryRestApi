const Router = require('express');
const router = Router();

router.post('/',()=>{ alert('did not realised'); });
router.get('/',()=>{ alert('did not realised'); });

module.exports = router;
export function controller(func) {
  return async (req, res) => {
    try {
      const r = await func(req);
      res.json({
        msg: 'ok',
        data: r
      })
    } catch (err) {
      res.status(403).json({
        msg: err.message
      });
    }
  }
}
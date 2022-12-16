const middError = (err, req, res, _next) => {
  console.log(`Algo deu errado na: ${err.message}, na rota ${req.path}`);
  
  return res.status(500).json({ message: 'Erro no servidor!' });
  };
  
  module.exports = middError; 
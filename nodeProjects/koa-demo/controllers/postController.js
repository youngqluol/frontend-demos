const handleUpload = async (ctx, next) => {
  console.log('ctx:', ctx.body.request);
  ctx.response.body = 'success';
}

module.exports = {
  handleUpload
}
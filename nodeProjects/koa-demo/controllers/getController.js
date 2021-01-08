const getHomeInfo = async (ctx, next) => {
  // ctx.response.type = 'text/html';
  // ctx.response.body = '<h1>home index</h1>';
  await ctx.render('home', {
    title: 'home',
    content: 'home'
  })
}

const login = async (ctx, next) => {
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>login</h1>';
}

module.exports = {
  getHomeInfo,
  login
};
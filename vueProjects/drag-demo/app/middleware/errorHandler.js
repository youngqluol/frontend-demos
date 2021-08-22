function initErrorHandler(app, logger) {
  app.use(async(ctx, next) => {
    try {
      await next();
    } catch(e) {
      logger.error(JSON.stringify(e));
      ctx.status = 500;
      ctx.body = '内部错误';
    }
  });

  app.use(async(ctx, next) => {
    await next();
    if (ctx.status === 404 && ctx.url !== '/404.html') {
      await ctx.render('404');
    }
  });
}

exports.initErrorHandler = initErrorHandler;
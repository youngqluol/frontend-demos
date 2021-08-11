// 爬取网站图片小demo
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

console.log('网站地址：', process.argv.slice(2));
const targetUrl =
  process.argv.slice(2)[0] ||
  'https://www.google.com/search?q=%E7%BC%96%E7%A8%8B&tbm=isch&ved=2ahUKEwjMvP_v1ajyAhUH95QKHVXPDfAQ2-cCegQIABAA&oq=%E7%BC%96%E7%A8%8B&gs_lcp=CgNpbWcQAzIICAAQgAQQsQMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6CwgAEIAEELEDEIMBOgQIABATOgQIABAeUJ-ePVjTvj1g8r89aAVwAHgAgAFciAHVBZIBAjExmAEAoAEBqgELZ3dzLXdpei1pbWewAQDAAQE&sclient=img&ei=WpoTYcynIIfu0wTVnreADw&bih=937&biw=1920&rlz=1C1GCEU_enCN880CN880';

axios
  .get(targetUrl)
  .then(res => {
    if (res.data) {
      const $ = cheerio.load(res.data);
      const imgs = $('img');
      const promises = [];
      imgs.each((i, ele) => {
        promises.push(createImageLoad($(ele)));
      });
      Promise.all(promises).then(() => {
        console.log('爬取完成:', `成功：${successNum}`, `失败：${failNum}`);
      });
    }
  })
  .catch(err => {
    console.log(err);
  });

let successNum = 0;
let failNum = 0;
let nameNum = 0;

function createImageLoad(ele) {
  const src = ele.attr('data-original') || ele.attr('src');
  console.log('图片地址:', src);
  console.log('图片alt:', ele.attr('alt'));
  const name = (ele.attr('alt') && ele.attr('alt').trim().replace(/\/|\./, '')) || nameNum;
  const splitArr = src.split('.');
  let type;
  if (/data:image/.test(src)) {
    type = src.split(';')[0].split('/')[1];
  } else if (/jpeg|gif|png/.test(splitArr[splitArr.length - 1])) {
    type = splitArr[splitArr.length - 1];
  } else {
    type = 'jpg';
  }
  // 只加载http或者base64类型
  if (src && (/(http|https):\/\//.test(src) || /data:image/.test(src))) {
    nameNum++;
    return new Promise(resolve => {
      axios({
        method: 'get',
        url: src,
        responseType: 'stream'
      })
        .then(res => {
          if (res.data) {
            const writeStream = fs.createWriteStream(
              `../../public/${name}.${type}`
            );
            writeStream.on('error', err => {
              failNum++;
              console.log('图片保存失败：', `${name}.${type}`, failNum, err);
              resolve();
            });
            writeStream.on('close', () => {
              successNum++;
              console.log('图片保存成功：', `${name}.${type}`, successNum);
              resolve();
            });
            res.data.pipe(writeStream);
          }
        })
        .catch(() => {
          // console.log('图片加载失败：', err);
          resolve();
        });
    });
  }
}

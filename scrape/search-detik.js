import axios from 'axios'
import * as cheerio from 'cheerio'

const searchDetik = async (query) => {
    try {
        const url = `https://www.detik.com/search/searchall?query=${encodeURIComponent(q)}`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const hasil = [];

        $("article.list-content__item").each((i, el) => {
          const title = $(el).find("a.media__link").text().trim();
          const link = $(el).find("a.media__link").attr("href");
          const kategori = $(el).find("h2.media__subtitle").text().trim();
          const waktu = $(el).find(".media__date span").text().trim();
          const img = $(el).find(".media__image img").attr("src");

          if (title && link) {
            hasil.push({
              title,
              link,
              kategori,
              waktu,
              img,
            });
          }
        });

        console.log(hasil);
        return hasil;
      } catch (err) {
        console.error("❌ Gagal scraping:", err.message);
      }
}

export default searchDetik

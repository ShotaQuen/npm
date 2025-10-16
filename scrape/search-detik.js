import axios from 'axios'
import * as cheerio from 'cheerio';

const searchDetik = async (query) => {
    const url = `https://www.detik.com/search/searchall?query=${query}`
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    const result = []
    $('article').each((i, el) => {
        const title = $(el).find('h2').text().trim()
        const link = $(el).find('a').attr('href')
        const date = $(el).find('span').text().trim()
        result.push({ title, link, date })
    })
    return result
}

export default searchDetik
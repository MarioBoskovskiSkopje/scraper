const scrapeIt = require("scrape-it");
const { axiosProxyRequest, axiosProxyRequest1 } = require("./utils");

async function scrapeData(link) {
  return await axiosProxyRequest1(link)
    .then(resp => {
      let html = resp.data;
      let data = scrapeIt.scrapeHTML(html, {
        reviewsCount: ".rating-info .review-count.rating-qualifier",
        avgRating: {
          selector: ".rating-info .i-stars",
          attr: "title"
        },
        articles: {
          listItem: ".review",
          data: {
            rating: {
              selector: ".i-stars",
              attr: "title"
            },
            date: ".rating-qualifier",
            content: ".review-content > p",
            name: ".user-display-name",
            url: {
              selector: "img",
              attr: "src"
            }
          }
        },
        nextPage: {
          selector: ".available-number",
          attr: "href"
        }
      });
      console.log(data);
      return html;
    })
    .catch(err => console.log(err));

  // .then(({ data, response }) => {
  //   console.log(`Status Code: ${response.statusCode}`);
  //   const firstEl = data.articles[0];
  //   if (
  //     firstEl.rating === "" &&
  //     firstEl.date === "" &&
  //     firstEl.name === "" &&
  //     firstEl.content === ""
  //   ) {
  //     data.articles.splice(firstEl, 1);
  //   }
  //   let filteredDataByRating = data.articles.filter(el => {
  //     return (
  //       parseFloat(el.rating.split("star")[0]) >=
  //       parseFloat(data.avgRating.split("star")[0])
  //     );
  //   });
  //   let filteredDataByDate = filteredDataByRating.sort((a, b) => {
  //     return new Date(b.date) - new Date(a.date);
  //   });
  //   console.log("DATA NEXT PAGE", data.nextPage);
  //   console.log("FILTERED DATA", filteredDataByDate);

  //   while (data.nextPage !== "") {
  //     setTimeout(scrapeData(data.nextPage), 2000);
  //   }
  // })
  // .catch(err => {});
}
scrapeData(
  //   "202.142.185.150:40929",
  "http://www.yelp.com/biz/prometric-san-francisco?osq=popmetrics"
);

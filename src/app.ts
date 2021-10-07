import express, {
  Application,
  Request,
  Response,
  NextFunction
} from "express";
import * as cheerio from "cheerio";
import axios from "axios";

const app: Application = express();
const port = 5000;

interface Articles {
  title: string;
  url?: string;
}

const getData = async (): Promise<Articles[]> => {
  const url = "https://www.theguardian.com/uk";
  const articles: Articles[] = [];

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $(".fc-item__title", data).each((i, element) => {
      const title = $(element).text();
      const url = $(element).find("a").attr("href");
      articles.push({ title, url });
    });

    return articles;
  } catch (err) {
    console.error(err);
    return [];
  }
};

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  let results = await getData();
  let tags: string = "";
  results.map((r) => {
    tags += `<h3>${r.title}</h3> <p>${r.url}</p>`;
  });

  res.send(tags);
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

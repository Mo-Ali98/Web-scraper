import express, { Application, Request, Response, NextFunction } from "express";
import * as cheerio from "cheerio";
import axios from "axios";
import { html } from "cheerio/lib/api/manipulation";

const app: Application = express();
const port = 5000;

interface Articles {
  title: string;
  url?: string;
}

interface JobPosting {
  jobTitle: string;
  company: string;
  salary: string;
}

const getTodaysArticles = async (): Promise<Articles[]> => {
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

const getTodaysJobPostings = async (): Promise<JobPosting[]> => {
  const url =
    "https://uk.indeed.com/jobs?q=Software+Engineer&l=London%2C+Greater+London";
  const jobs: JobPosting[] = [];

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $(".tapItem", data).each((i, element) => {
      const jobPosting = $(element).find(".resultContent");

      const jobTitle = $(jobPosting).find(".jobTitle").text();
      //console.log(jobTitle);
      const company = $(jobPosting).find(".companyName").text();
      //console.log(company);
      let salary = $(jobPosting).find(".salary-snippet").text();
      if (salary.length == 0) salary = "Competitive";
      //console.log(salary);

      jobs.push({ jobTitle, company, salary });
    });

    return jobs;
  } catch (err) {
    console.error(err);
    return [];
  }
};

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  let articleData = await getTodaysArticles();
  let todaysJobPostings = await getTodaysJobPostings();

  let htmlOutput: string = "";

  articleData.map((r) => {
    htmlOutput += `<h3>${r.title}</h3> <p>${r.url}</p>`;
  });

  htmlOutput += "<br />";

  todaysJobPostings.map((j) => {
    htmlOutput += `<h3>${j.jobTitle}</h3> <h4>${j.company}</h4> <p>${j.salary}</p>`;
  });

  res.send(htmlOutput);
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

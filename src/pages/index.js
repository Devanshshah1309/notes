import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/notes/category/modules/"
            >
              View Notes
            </Link>
          </div>
          <h2 className={"hero__subtitle " + styles.pad}>
            A{" "}
            <i>
              <u>community-driven</u>
            </i>{" "}
            <i>
              <u>open-source</u>
            </i>{" "}
            hub of knowledge where students collaboratively contribute, curate,
            and expand their collective wisdom.
          </h2>
        </div>
      </header>
      <center style={{ padding: "2rem" }}>
        <h2 className="hero__subtitle">Contributions Welcome!</h2>
        <p>
          If you find any mistakes or would like to contribute, please feel free
          to open an issue or a pull request on{" "}
          <a href="https://github.com/Devanshshah1309/notes" target="_blank">
            GitHub
          </a>
          .
        </p>
      </center>
    </>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Knowledge Repository of Notes for University Courses"
    >
      <HomepageHeader />
    </Layout>
  );
}

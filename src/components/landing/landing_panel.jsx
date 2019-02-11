import * as React from "react";
import { Column, Columns, Icon, Section } from "bloomer";
import { useEffect } from "react";
import GithubCorner from "react-github-corner";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const randomNumber = (count) =>
  [...Array(count)]
    .map(() => Math.floor(Math.random() * 9))
    .join("");

const Affiliated = ({ users, type }) => {
  const isDiscord = type === "discord";

  return (
    <a
      className={`button is-fullwidth is-large ${type}`}
      href="https://reddit.com/r/NewGame"
    >
      <Icon isSize="large" className={`fab fa-${type}`}/>
      <span className="is-size-5-desktop is-size-6-tablet">
        <b>{users}</b>
        {isDiscord ? " members" : " redditors"}
      </span>
    </a>
  );
};

export const LandingPanel = () => {
  const DEFAULT_USERS = 0;
  const defaultEndpoint = "https://whamer.000webhostapp.com/api/hifumi.php";
  const [discord, setDiscord] = React.useState(DEFAULT_USERS);
  const [reddit, setReddit] = React.useState(DEFAULT_USERS);

  const getUserData = (endpoint) =>
    fetch(endpoint, { mode: "cors" })
      .then(r => r.json())
      .then(r => {
        setDiscord(r.discordUsers);
        setReddit(r.subscribers);
      });

  // const rollNumbers = () =>

  useEffect(() => {
    void getUserData(defaultEndpoint);
  }, []);

  const title = [
    "is-size-1-desktop",
    "is-size-1-tablet",
    "is-size-2-mobile",
    "has-text-white-ter",
    "banner-text",
    "has-text-centered",
    "shadowed"
  ];

  const query = graphql`{
    file(relativePath: { regex: "/landing.jpg/" }) {
      childImageSharp {
        fixed(width: 1920 height: 1080 quality: 100) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
  }`;

  return (
    <div className="landing">
      <StaticQuery query={query} render={data =>
        <Img className="landing-image" fadeIn={true} fixed={data.file.childImageSharp.fixed}/>
      }/>
      <div className="overlay"/>
      <div className="banner-container">
        <GithubCorner href="https://github.com/xetera/hifumi.io"/>
        <div className="arrow has-text-white">
          <Icon className="fa fa-arrow-down"/>
        </div>
        <Columns>
          <Column>
            <div className="is-flex banner-text-container">
              <h1 className={title.join(" ")}>New Game!</h1>
              <p className="has-text-white-ter banner-text has-text-centered shadowed">
                {" "}
                ニューゲーム
              </p>
            </div>
            <Section>
              <Columns>
                <Column isSize="1/2">
                  <Affiliated users={discord} type="discord"/>
                </Column>
                <Column isSize="1/2">
                  <Affiliated users={reddit} type="reddit"/>
                </Column>
              </Columns>
            </Section>
          </Column>
        </Columns>
      </div>
    </div>
  );
};
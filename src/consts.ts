import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "David Li",
  EMAIL: "dlc9113@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 1,
  NUM_PROJECTS_ON_HOMEPAGE: 1,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "David Li is a QA Automation Architect specializing in Playwright, Appium, CI/CD and scalable test automation frameworks.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "X",
    HREF: "https://x.com/davidlc9113",
  },
  { 
    NAME: "GitHub",
    HREF: "https://github.com/davidlc9113"
  },
  { 
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/dlc9113/",
  }
];

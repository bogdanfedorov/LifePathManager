export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Find work project",
  description: "Tools for save job info",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Vacancy",
      href: "/vacancy",
    },
    {
      label: "Helpfull links",
      href: "links",
    },
  ],

  links: {
    github: {
      url: "https://github.com/bogdanfedorov",
    },
    github_cv: {
      title: "My CV on github pages",
      url: "https://bogdanfedorov.github.io/CV/",
    },
    telegram: {
      title: "Telegram",
      url: "https://web.telegram.org/k/#@Bohdan_Fedorov_Web",
    },
    linkedin: {
      url: "https://www.linkedin.com/in/bohdan-fedorov-137636263/?locale=en_US",
    },

    djinni: {
      url: "https://djinni.co/q/400b4e8e19/",
    },
  },
};

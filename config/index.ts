export const APP_TITLE = "Ariful Alam";
export const APP_DESCRIPTION = "This is my portfolio website.";
export const MY_IMAGE_URL = "/static/avatar.jpg";
export const socialLinks = {
  facebook: "https://www.facebook.com/alamariful1727",
  linkedin: "https://www.linkedin.com/in/alamariful1727",
  github: "https://github.com/alamariful1727",
  twitter: "https://twitter.com/alamariful1727",
};
export const aboutNavigation = { name: "About", href: "/about" };
export const worksNavigation = { name: "Works", href: "/works" };
export const projectsNavigation = { name: "Projects", href: "/projects" };
export const contactNavigation = { name: "Contact", href: "/contact" };

export const innerNavigation = [
  aboutNavigation,
  worksNavigation,
  projectsNavigation,
];
export const outerNavigation = [...innerNavigation, contactNavigation];
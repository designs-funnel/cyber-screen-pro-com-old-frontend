// Combination 1
// export const color1 = "#9effd9"; // buttons
// export const color2 = "#65ffac"; // background
// export const color3 = "#32e085"; // navbar

export const color1 = "#99ffcc"; // buttons
// export const color2 = "#66ff99"; // background
export const color3 = "#33cc66"; // navbar
export const buttonColor = "#06A479";

export const token = (localStorage) => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const loadImage = (url) => {
  if (!url || !url.includes("instagram")) return url;
  const p = url.split("/");
  let t = "";
  for (let i = 0; i < p.length; i++) {
    if (i === 2) {
      t +=
        p[i].replaceAll("-", "--").replaceAll(".", "-") +
        atob("LnRyYW5zbGF0ZS5nb29n") +
        "/";
    } else {
      if (i !== p.length - 1) {
        t += p[i] + "/";
      } else {
        t += p[i];
      }
    }
  }
  return encodeURI(t);
};

// use it in downloading social links of user from instagram, facebook, linkedin from google
// and use it before sending links to backend to clean the links provided by user
export const clean_profile_url = (url, company) => {
  let id, parts, pos;

  url = url.toLowerCase();
  pos = url.indexOf(company);
  url = url.substring(pos, url.length); // strip everything before linkedin
  url = url.split("?")[0]; // remove any query parameters
  parts = url.split("/"); // split url into parts

  if (url.lastIndexOf("/") === url.length - 1) {
    // strip trailing slash from url
    url = url.substring(0, url.length - 1);
  }
  if (parts.length === 4 && parts[3].length === 2) {
    //shortcut for language
    url = parts[0].toLowerCase() + "/" + parts[1] + "/" + parts[2];
  } else if (parts.length > 3 && parts[4] !== undefined) {
    // urls with ids have more parts
    if (parts[4].length === 2) {
      parts[4] = "0" + parts[4]; // see: http://git.io/vRBcL
    }

    if (parts[5].length === 2) {
      parts[5] = "0" + parts[5]; // see: http://git.io/vRBcL
    }

    if (parts[5].length === 1) {
      parts[5] = "00" + parts[5]; // see: http://git.io/vRBcL
    }

    id = parts[5] + parts[4] + parts[3]; // see example above
    url = parts[0] + "/" + parts[1] + "/" + parts[2] + "-" + id;
  }

  return "https://" + url.replace("pub", "in"); // pub are for Search Engines
};

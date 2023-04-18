import React from 'react'

import classes from "./list.module.css";

const data = [
  {
    id: 1,
    name: "Agriculture Infrastructure Fund",
    link: "https://vikaspedia.in/schemesall/schemes-for-farmers/agriculture-infrastructure-fund ",
  },
  {
    id: 2,
    name: "Credit facility for farmers",
    link: "https://vikaspedia.in/schemesall/schemes-for-farmers/credit-facility-for-farmers ",
  },
  {
    id: 3,
    name: "Crop insurance schemes",
    link: "https://vikaspedia.in/schemesall/schemes-for-farmers/crop-insurance-schemes ",
  },
  {
    id: 4,
    name: "Krishi UDAN scheme",
    link: "https://vikaspedia.in/schemesall/schemes-for-farmers/krishi-udan-scheme ",
  },
  {
    id: 5,
    name: "National Mission on Edible Oils",
    link: "https://vikaspedia.in/schemesall/schemes-for-farmers/national-mission-on-edible-oils ",
  },
  {
    id: 6,
    name: "National Mission on Natural Farming",
    link: "https://vikaspedia.in/schemesall/schemes-for-farmers/national-mission-on-natural-farming",
  },
  {
    id: 7,
    name: "PM Kisan Maan Dhan Yojana",
    link: "https://vikaspedia.in/schemesall/schemes-for-farmers/pm-kisan-maan-dhan-yojana",
  },
  {
    id: 8,
    name: "Primary Agricultural Credit Societies (PACS)",
    link: "https://vikaspedia.in/schemesall/schemes-for-farmers/primary-agricultural-credit-societies-(pacs) ",
  },
  {
    id: 9,
    name: "Vibrant Villages Programme",
    link: "https://vikaspedia.in/schemesall/schemes-for-farmers/vibrant-villages-programme",
  },
];




const Schemes = () => {
  const listItems = data.map((item) => (
    <li key={item.id} className={classes.li}>
      <a
        style={{
          textDecoration: "none",
          color: "black",
        }}
        onMouseOver={(e) => (e.target.style.color = "purple")}
        onMouseOut={(e) => (e.target.style.color = "black")}
        href={item.link}
      >
        {item.name}
      </a>
    </li>
  ));
  return (
    // eslint-disable-next-line jsx-a11y/no-distracting-elements
    <marquee direction="down" scrollamount="2">
      <ul className={classes.ul}>{listItems}</ul>;
    </marquee>
  );
}

export default Schemes

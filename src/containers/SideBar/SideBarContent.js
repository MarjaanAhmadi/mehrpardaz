import React from "react";
import CustomScrollbars from "util/CustomScrollbars";
import Navigation from "../../components/Navigation";

const SideBarContent = () => {
  const navigationMenus = [
    {
      name: "sidebar.main",
      type: "section",
      children: [
        {
          name: "pages.samplePage",
          type: "item",
          link: "/app/sample-page",
          icon: "view-dashboard",
        },
        {
          name: "library",
          type: "item",
          link: "/app/dashboard/library",
          icon: "view-dashboard",
        }
      ],
    },
  ];

  return (
    <CustomScrollbars className=" scrollbar">
      <Navigation menuItems={navigationMenus} />
    </CustomScrollbars>
  );
};

export default SideBarContent;

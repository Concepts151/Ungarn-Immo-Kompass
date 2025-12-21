import { initialState, setFilters } from "@/state";
import { useAppSelector } from "@/state/redux";
import { MapPinHouse } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";

const LandingTabsFilterPills = () => {
  const t = useTranslations("Common");
  const dispatch = useDispatch();
  const filters = useAppSelector((state) => state.global.filters);
  const [localFilters, setLocalFilters] = useState(initialState.filters);
  const [selectedTab, setSelectedTab] = useState(
    initialState.filters.propertyType
  );
  const handleFilterChange = (value: string) => {
    console.log("filter changed");
    setSelectedTab(value);
    // setLocalFilters({ ...localFilters, propertyType: value });
    dispatch(setFilters({ ...localFilters, propertyType: value }));

    console.log(filters);
  };
  return (
    <div
      className="col-lg-10 m-auto"
      data-aos="fade-up"
      data-aos-duration={1000}
    >
      <div className="property-list-tab">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <button
              className={
                "nav-link " + (selectedTab === "HOUSE" ? "active" : "")
              }
              onClick={() => handleFilterChange("HOUSE")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM13 19H18V9.15745L12 3.7029L6 9.15745V19H11V13H13V19Z" />
              </svg>
              {t('house')}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={
                "nav-link " + (selectedTab === "HOLIDAY_HOME" ? "active" : "")
              }
              onClick={() => handleFilterChange("HOLIDAY_HOME")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 19V9.79875L12 4.27675L5 9.79875V19H19ZM21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.31391C3 9.00773 3.14027 8.71843 3.38065 8.52879L11.3807 2.21793C11.7438 1.93142 12.2562 1.93142 12.6193 2.21793L20.6193 8.52879C20.8597 8.71843 21 9.00773 21 9.31391V20ZM7 12H9C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12H17C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z" />
              </svg>
              {t('holiday_home')}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={
                "nav-link " + (selectedTab === "APARTMENT" ? "active" : "")
              }
              onClick={() => handleFilterChange("APARTMENT")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.6727 1.61162 20.7999 9H17.8267L12 3.70302 6 9.15757V19.0001H11V21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V11.0001L1 11.0001 11.3273 1.61162C11.7087 1.26488 12.2913 1.26488 12.6727 1.61162ZM14 11H23V18H14V11ZM16 13V16H21V13H16ZM24 21H13V19H24V21Z" />
              </svg>
              {t('apartment')}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={
                "nav-link " + (selectedTab === "FARMHOUSE" ? "active" : "")
              }
              onClick={() => handleFilterChange("FARMHOUSE")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10 10.1111V1L21 7V21H3V7L10 10.1111ZM12 4.36908V13.1886L5 10.0775V19H19V8.18727L12 4.36908Z" />
              </svg>
              {t('farmhouse')}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={"nav-link " + (selectedTab === "LAND" ? "active" : "")}
              onClick={() => handleFilterChange("LAND")}
            >
              <MapPinHouse />
              {t('land')}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LandingTabsFilterPills;

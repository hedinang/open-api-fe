import URL_CONFIG from "services/urlConfig";
import i18next from "i18next";


import ServiceList from "./Admin/ManageService/ServiceList/ServiceList";
import ServiceDetails from "./Admin/ManageService/ServiceDetails/ServiceDetails";


const ServiceRoutes = [
    // {
    //     path: "/service-list", isProtected: false, name: i18next.t("ServiceList"), Component: ServiceList, render: true
    // },
    {
        path: "/system-service/service-detail", isProtected: false, name: i18next.t("ServiceDetail"), Component: ServiceDetails, render: true
    },
];



export default [
    ...ServiceRoutes,
    {
        path: "/system-service/service-list", isProtected: false, name: i18next.t("ServiceList"), Component: ServiceList, render: true
    },
];

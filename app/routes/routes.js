import URL_CONFIG from "services/urlConfig";
import i18next from "i18next";


import ServiceList from "./Admin/ManageService/ServiceList/ServiceList";
import ServiceDetails from "./Admin/ManageService/ServiceDetails/ServiceDetails";
import ApiCreate from "./Admin/ManageService/ApiCreate/ApiCreate";
import ServiceCreate from "./Admin/ManageService/ServiceCreate/ServiceCreate";

const ServiceRoutes = [
    {
        path: "/system-service/service-list", isProtected: false, name: i18next.t("ServiceList"), Component: ServiceList, render: true
    },
    {
        path: "/system-service/service-detail", isProtected: false, name: i18next.t("ServiceDetail"), Component: ServiceDetails, render: true
    },
    {
        path: "/system-service/api-create", isProtected: false, name: i18next.t("ApiCreate"), Component: ApiCreate, render: true
    },
    {
        path: "/system-service/service-create", isProtected: false, name: i18next.t("ServiceCreate"), Component: ServiceCreate, render: true
    },
];



export default [
    ...ServiceRoutes
];

import { convertDate2String, formatDisplayDecimal } from "helper/utilities";
import CUSTOM_CONSTANTS from "helper/constantsDefined";
import i18next from "i18next";

const formatNumber = (params) => {
    const { value } = params;
    if (value) return formatDisplayDecimal(Number(value), 2);
    return "0.00";
};

const getItemParameter = (
    paramName,
    dataType,
    paramType,
    defaultValue,
    mandatory,
    note,
    autoGenerate
) => [
        {
            headerName: i18next.t("action"),
            field: "action",
            cellRenderer: "actionDelete",
            filter: false,
            width: 100
        },
        {
            headerName: i18next.t("paramName"),
            field: "paramName",
            editable: true,
            width: 250
        },
        {
            headerName: i18next.t("dataType"),
            field: "dataType",
            editable: true,
            width: 150

        },
        {
            headerName: i18next.t("paramType"),
            field: "paramType",
            editable: true,
            width: 150

        },
        {
            headerName: i18next.t("defaultValue"),
            field: "defaultValue",
            editable: true,
            width: 300
        },
        {
            headerName: i18next.t("mandatory"),
            field: "mandatory",
            editable: true,
            width: 150
        },
        {
            headerName: i18next.t("note"),
            field: "note",
            editable: true,
            width: 400
        },
        {
            headerName: i18next.t("autoGenerate"),
            field: "autoGenerate",
            editable: true,
            width: 150

        },
    ];

export default getItemParameter;

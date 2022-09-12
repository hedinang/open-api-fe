import { convertDate2String, formatDisplayDecimal } from "helper/utilities";
import CUSTOM_CONSTANTS from "helper/constantsDefined";
import i18next from "i18next";

const formatNumber = (params) => {
    const { value } = params;
    if (value) return formatDisplayDecimal(Number(value), 2);
    return "0.00";
};

const getItemParameter = (
    name,
    type,
    defaultValue,
    mandatory
) => [
        {
            headerName: i18next.t("action"),
            field: "action",
            cellRenderer: "actionDelete",
            filter: false,
            width: 100
        },
        {
            headerName: i18next.t("name"),
            field: "action",
            cellRenderer: "actionDelete",
            filter: false,
            width: 438
        },
        {
            headerName: i18next.t("type"),
            field: "itemCode",
            valueGetter: (params) => params.data?.itemCode?.slice(0, 20),
            width: 250

        },
        {
            headerName: i18next.t("defaultValue"),
            field: "itemName",
            valueGetter: (params) => params.data?.itemName?.slice(0, 200),

            width: 438
        },
        {
            headerName: i18next.t("mandatory"),
            field: "itemDescription",
            cellEditor: "agLargeTextCellEditor",
            cellEditorParams: { maxLength: 250 },

            tooltipField: "itemDescription",
            width: 250
        }
    ];

export default getItemParameter;

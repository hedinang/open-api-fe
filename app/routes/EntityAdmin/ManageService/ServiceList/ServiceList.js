import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SystemService from "services/SystemService";
import useToast from "routes/hooks/useToast";
import { useTranslation } from "react-i18next";
import {
    Container, Row, Col
} from "react-bootstrap";
import { HeaderMain } from "routes/components/HeaderMain";
import { AgGridReact } from "components/agGrid";
import { defaultColDef } from "helper/utilities";
import _ from "lodash";

const ServiceList = () => {
    const { t } = useTranslation();
    const showToast = useToast();
    const history = useHistory();
    const [serviceList, setServiceList] = useState([{
        service: "Hyper SMS",
        amountOfInstance: 2
    },

    {
        service: "Nodejs",
        amountOfInstance: 3
    },
    {
        service: "Php",
        amountOfInstance: 3
    },
    {
        service: "Vinaphone SMS",
        amountOfInstance: 4
    }]);

    const columnDefs = [
        {
            headerName: t("Service"),
            field: "service"
        },
        {
            headerName: t("Amount of Instance"),
            field: "amountOfInstance"
        }
    ];

    const retrieveServiceList = async () => {
        try {
            const response = await SystemService.getAllService();
            if (response.data.status === "OK") {
                setServiceList(response.data.data);

            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            showToast("error", error.response.data.message);
        }
    };

    useEffect(() => {
        retrieveServiceList();
    }, []);

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
        setGridApi(params.api);
    };

    const onRowDoubleClick = (event) => {
        history.push('service-detail/');
    };

    return (
        <>
            <Container fluid>
                <Row className="mb-1">
                    <Col lg={12}>
                        <HeaderMain
                            title={t("Service List")}
                            className="mb-3 mb-lg-3"
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col lg={12}>
                        <div className="ag-theme-custom-react" style={{ height: "500px" }}>
                            <AgGridReact
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                rowData={serviceList}
                                pagination
                                paginationPageSize={10}
                                onGridReady={onGridReady}
                                rowSelection="multiple"
                                rowMultiSelectWithClick
                                onRowDoubleClicked={onRowDoubleClick}
                                suppressRowClickSelection
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ServiceList;

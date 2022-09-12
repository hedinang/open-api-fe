import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useHistory, useLocation } from "react-router";
import {
    Container,
    Col,
    Row,
    Button,
    ButtonToolbar,
} from "components";
import useToast from "routes/hooks/useToast";
import { HeaderMain } from "routes/components/HeaderMain";
import StickyFooter from "components/StickyFooter";
import ApiForm from "./ApiForm";
import { Formik, Form } from "formik";
import { AddItemRequest } from "routes/components";
import { HeaderSecondary } from "routes/components/HeaderSecondary";

const ServiceCreate = (props) => {
    const { t } = useTranslation();
    const [isCreate, setIsCreate] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
        isActive: false
    });
    const updateForm = (name, value) => {
        setForm({
            ...form,
            [name]: value
        });
    };

    let [methodList, setMethodList] = useState(["POST", "PUT"])
    let [encryptList, setEncryptList] = useState(["NONE", "MD5"])
    let [serviceList, setServiceList] = useState(["Hyper Sms", "Vinaphone", "Viettel"])
    const initialValues = {

    }
    const [apiDetailStates, setPurchaseDetailsStates] = useState({
        loading: true,
        isEdit: true,
        purchaseDetails: null,
        purchaseUuid: "",
        companyUuid: "",
        activeInternalTab: 1,
        activeExternalTab: 1,
        showAddCatalogue: false,
        showAddContact: false,
        showAddForecast: false,
        catalogueItems: [],
        forecastItems: [],
        contactItems: [],
        suppliers: [],
        uoms: [],
        currencies: [],
        taxRecords: [],
        addresses: [],
        glAccounts: [],
        typeOfRequisitions: [],
        listCategory: [],
        natureOfRequisitions: [
            { label: "Project", value: true },
            { label: "Non-Project", value: false }
        ],
        projects: [],
        procurementTypes: [
            { label: "Goods", value: "Goods" },
            { label: "Service", value: "Service" }
        ],
        approvalRoutes: [],
        rowDataProject: [],
        rowDataTrade: [],
        rowDataItem: [],
        externalConversationLines: [],
        internalConversationLines: [],
        rowDataInternalConversation: [],
        rowDataExternalConversation: [],
        rowDataInternalAttachment: [],
        rowDataExternalAttachment: [],
        rowDataItemReq: [],
        rowDataAuditTrail: [],
        subTotal: 0,
        tax: 0,
        total: 0,
        activeAuditTrailTab: 1,
        rowDataOverview: []
    });
    return (
        <Container fluid>
            <Formik
                initialValues={initialValues}
                onSubmit={() => { }}
            >
                <Form>
                    <Row className="mb-1">
                        <Col lg={12}>
                            <HeaderMain
                                title={(t("Create Api"))}
                                className="mb-3 mb-lg-3"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col lg={12}>
                            <ApiForm
                                isCreate={isCreate}
                                isEdit={isEdit}
                                form={form}
                                updateForm={updateForm}
                                headerName={t("General Information")}
                                methodList={methodList}
                                encryptList={encryptList}
                                serviceList={serviceList}
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-between mx-0 mt-3 mb-1">
                        <HeaderSecondary
                            title={t("Add parameter")}
                            className="my-2"
                        />
                        <span>
                            <Button
                                color="primary"
                                onClick={() => addItemManual()}
                                style={{ height: 34, marginRight: '5px' }}
                            >
                                <span className="mr-1">+</span>
                                <span>{t("Import")}</span>
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => addItemManual()}
                                style={{ height: 34 }}
                            >
                                <span className="mr-1">+</span>
                                <span>{t("AddManual")}</span>
                            </Button>
                        </span>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={12}>
                            <AddItemRequest
                                rowDataItemReq={apiDetailStates.rowDataItemReq}
                                onDeleteItem={(uuid, rowData) => onDeleteItemReq(uuid, rowData)}
                                // suppliers={values.supplierCode.length > 0
                                //     ? values.supplierCode
                                //     : purchaseDetailsStates.suppliers}
                                uoms={apiDetailStates.uoms}
                                currencies={apiDetailStates.currencies}
                                addresses={apiDetailStates.addresses}
                                glAccounts={apiDetailStates.glAccounts}
                                taxRecords={apiDetailStates.taxRecords}
                                listCategory={apiDetailStates.listCategory}
                                onCellValueChanged={(params) => onEditRowAddItemReq(params)}
                                gridHeight={350}
                                disabled={!apiDetailStates.isEdit}
                                apiCreate={true}
                            />
                        </Col>
                    </Row>
                    <StickyFooter>
                        <Row className="justify-content-between mx-0 px-3">
                            <Button
                                className="mb-2 btn btn-secondary"
                                onClick={() => (isEdit ? onBackButtonPressHandler() : history.goBack())}
                            >
                                {t("Back")}
                            </Button>
                        </Row>
                    </StickyFooter>
                </Form>
            </Formik>
        </Container>
    )
}
export default ServiceCreate;
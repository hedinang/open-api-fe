import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useHistory, useLocation } from "react-router";
import {
    Container,
    Col,
    Row,
    Button,
} from "components";
import useToast from "routes/hooks/useToast";
import { HeaderMain } from "routes/components/HeaderMain";
import StickyFooter from "components/StickyFooter";
import SystemService from "services/SystemService";
import { useCurrentCompany, usePermission } from "routes/hooks";
import ServiceForm from "./ServiceForm";
import { Formik, Form } from "formik";
import ServiceGroupDetails from "./ServiceGroupDetails";

const ServiceDetails = (props) => {
    const { t } = useTranslation();
    const showToast = useToast();
    const history = useHistory();
    const [isCreate, setIsCreate] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [detailsStates, setDetailsStates] = useState({
        companyUuid: "",
        uuid: ""
    });
    const [form, setForm] = useState({
        isActive: false
    });
    const [backupForm, setBackupForm] = useState({});
    const currentCompany = useCurrentCompany();

    const updateForm = (name, value) => {
        setForm({
            ...form,
            [name]: value
        });
    };
    const [groupServiceList, setGroupServiceList] = useState([
        {
            name: '1. Login',
            api: [{
                title: '/v3/app/login',
                method: 'POST',
                borderTopColor: '#49cc90',
                encrypt: false,
                requestParams: [{
                    name: 'a',
                    type: 'string',
                    default: 'string',
                    mandatory: true
                },
                {
                    name: 'b',
                    type: 'integer',
                    default: 1,
                    mandatory: false
                }],
                requestHeaders: [{
                    name: 'c',
                    type: 'integer',
                    default: 1,
                    mandatory: true
                },
                {
                    name: 'd',
                    type: 'string',
                    default: 'sdsd',
                    mandatory: false
                }],
                requestBody: `{
                            "code": "",
                            "currPage": 1,
                            "pageSize": 20
                            }`
            }]
        },
        {
            name: '2. Product',
            api: [{
                title: '/v3/app/product/item/query',
                method: 'POST',
                borderTopColor: '#49cc90',
                encrypt: true,
                requestParams: [],
                requestHeaders: [],
                requestBody: `{
                            "code": "",
                            "currPage": 1,
                            "pageSize": 20
                            }`
            }]
        },
        {
            name: '3. Brand',
            api: [
                {
                    title: '/v3/app/brandname/query',
                    method: 'POST',
                    borderTopColor: '#49cc90',
                    encrypt: 'token',
                    appKey: 'tph461sugvbszoxw04250dpw5y9gnzef',
                    requestParams: [],
                    requestHeaders: [
                        {
                            name: 'isTokenRide',
                            type: 'boolean',
                            description: 'description',
                            default: true,
                            mandatory: true
                        },
                        {
                            name: 'appId',
                            type: 'string',
                            description: 'description',
                            default: '220225017',
                            mandatory: true
                        },
                        {
                            name: 'version',
                            type: 'string',
                            description: 'description',
                            default: 'v3',
                            mandatory: true
                        },
                        {
                            name: 'Content-Type',
                            type: 'string',
                            description: 'description',
                            default: 'application/json',
                            mandatory: true
                        },

                    ],
                    requestBody: `{
  "brandName": "",
  "code": "BR-52Ld3QvkRV",
  "currPage": 1,
  "pageSize": 20
}`
                },
                {
                    title: '/v3/app/brandname/invalid',
                    method: 'POST',
                    borderTopColor: '#49cc90',
                    encrypt: true,
                    requestParams: [],
                    requestHeaders: [],
                    requestBody: `{
                            "code": "",
                            "currPage": 1,
                            "pageSize": 20
                            }`
                },
                {
                    title: '/v3/app/brandname/info',
                    method: 'POST',
                    borderTopColor: '#49cc90',
                    encrypt: true,
                    requestParams: [],
                    requestHeaders: [],
                    requestBody: `{
                            "code": "",
                            "currPage": 1,
                            "pageSize": 20
                            }`
                },
                {
                    title: '/v3/app/brandname/add',
                    method: 'POST',
                    borderTopColor: '#49cc90',
                    encrypt: true,
                    requestParams: [],
                    requestHeaders: [],
                    requestBody: `{
                            "code": "",
                            "currPage": 1,
                            "pageSize": 20
                            }`
                }]
        },
        {
            name: '4. Template',
            api: [
                {
                    title: '/v3/app/template/query',
                    method: 'POST',
                    borderTopColor: '#49cc90',
                    encrypt: true,
                    requestParams: [],
                    requestHeaders: [],
                    requestBody: `{
                            "code": "",
                            "currPage": 1,
                            "pageSize": 20
                            }`
                },
                {
                    title: '/v3/app/template/invalid',
                    method: 'POST',
                    borderTopColor: '#49cc90',
                    encrypt: true,
                    requestParams: [],
                    requestHeaders: [],
                    requestBody: `{
                            "code": "",
                            "currPage": 1,
                            "pageSize": 20
                            }`
                },
                {
                    title: '/v3/app/template/info',
                    method: 'POST',
                    borderTopColor: '#49cc90',
                    encrypt: true,
                    requestParams: [],
                    requestHeaders: [],
                    requestBody: `{
                            "code": "",
                            "currPage": 1,
                            "pageSize": 20
                            }`
                },
                {
                    title: '/v3/app/template/add',
                    method: 'POST',
                    borderTopColor: '#49cc90',
                    encrypt: true,
                    requestParams: [],
                    requestHeaders: [],
                    requestBody: `{
                            "code": "",
                            "currPage": 1,
                            "pageSize": 20
                            }`
                }]
        }
    ]);
    let [serverList, setServerList] = useState(["https://openapi-uat.hypersms.vn", "https://openapi.viettel.hypersms.vn"])



    useEffect(() => {
        // Retrieve uuid of payment term if is edit
        const query = new URLSearchParams(props.location.search);
        const uuid = query.get("uuid");
        if (uuid) {
            setIsCreate(false);
            setIsEdit(false);
        }

        // Retrieve company uuid
        if (!_.isEmpty(currentCompany)) {
            setDetailsStates((prevStates) => ({
                ...prevStates,
                companyUuid: currentCompany.companyUuid,
                uuid
            }));
        }
    }, [currentCompany]);

    // Get details of payment terms
    const getPaymentTermsDetail = async () => {
        try {
            if (detailsStates.companyUuid && detailsStates.uuid) {
                const response = await SystemService.getPaymentTermByUuid(detailsStates.companyUuid, detailsStates.uuid);
                if (response.data.status === "OK") {
                    const {
                        ptRemarks,
                        ptName,
                        ptDays,
                        createdByName,
                        createdOn
                    } = response.data.data;
                    setForm((prevStates) => ({
                        ...prevStates,
                        ptRemarks,
                        ptUuid: detailsStates.uuid,
                        ptName,
                        ptDays,
                        createdByName,
                        createdOn
                    }));
                    setBackupForm((prevStates) => ({
                        ...prevStates,
                        ptRemarks,
                        ptUuid: detailsStates.uuid,
                        ptName,
                        ptDays,
                        createdByName,
                        createdOn
                    }));
                } else {
                    throw new Error(response.data.message);
                }
            }
        } catch (error) {
            showToast("error", error.message);
        }
    };

    useEffect(() => {
        getPaymentTermsDetail();
    }, [detailsStates]);

    const onBackButtonPressHandler = () => {
        if (isEdit) {
            setIsEdit(!isEdit);
            setForm(backupForm);
        }
    };
    const initialValues = {

    }
    return (
        <>
            <Container fluid>
                <Formik
                    initialValues={initialValues}
                    onSubmit={() => { }}
                >
                    <Form>
                        <Row className="mb-1">
                            <Col lg={12}>
                                <HeaderMain
                                    title={(t("Service Details"))}
                                    className="mb-3 mb-lg-3"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col lg={12}>
                                <ServiceForm
                                    isCreate={isCreate}
                                    isEdit={isEdit}
                                    form={form}
                                    updateForm={updateForm}
                                    headerName={t("General Information")}
                                    serverList={serverList}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            {groupServiceList.map(e => < ServiceGroupDetails groupService={e} serverUrl={serverList[0]} />)}
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
        </>
    );
};

export default ServiceDetails;

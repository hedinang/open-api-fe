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
    let [dataDetail, setDataDetail] = useState()

    const getServiceDetail = async (serviceId) => {
        let response = await SystemService.detailService(serviceId)
        if (response.data.status === "OK") {
            // setServiceList(response.data.data);
            setDataDetail(response.data.data)
            console.log('asas');
        } else {
            showToast("error", error.response.data.message);
        }
    }
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const id = query.get("id");
        getServiceDetail(id)
        console.log('aaa')
    }, [])


    const onBackButtonPressHandler = () => {
        if (isEdit) {
            setIsEdit(!isEdit);
            setForm(backupForm);
        }
    };
    const initialValues = {
        serverName: '',
        serverUrl: '',
        groupDtoList: [
            {
                id: 'dsds',
                groupName: 'dsds',
                apiDtoList: [{
                    id: 'dsds',
                    name: 'v3/app/brandname/query',
                    method: 'POST',
                    encryptionType: 'MD5',
                    requestBody: `{
  "brandName":"",
  "code":"",
  "currPage": 1,
  "pageSize": 30
}
`,
                    params: [
                        {
                            paramName: 'isTokenRide',
                            paramType: 'header',
                            dataType: 'string',
                            defaultValue: true,
                            mandatory: true,
                            note: 'bbbb',
                            autoGenerate: true
                        }
                    ]
                }]
            }
        ],
        authorize: [{
            id: 'aa',
            key: 'token',
            value: 'aaaaaaaaaaa'
        }]

    }
    return (
        <>
            <Container fluid>
                <Formik
                    initialValues={initialValues}
                    onSubmit={() => { }}

                >
                    {({
                        values, setFieldValue
                    }) => {

                        return (
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
                                            // form={form}
                                            // updateForm={updateForm}
                                            headerName={t("General Information")}
                                            serverList={serverList}
                                            values={values}
                                            setFieldValue={setFieldValue}
                                            dataDetail={dataDetail}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-5">
                                    {dataDetail?.groupDtoList?.map(e => < ServiceGroupDetails groupService={e}

                                        serverUrl={values.serverUrl} />)}
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
                        )
                    }}
                </Formik>
            </Container>
        </>
    );
};

export default ServiceDetails;

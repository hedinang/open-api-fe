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
    let [authorize, setAuthorize] = useState([])
    let [dataDetail, setDataDetail] = useState()
    const query = new URLSearchParams(location.search);
    const serviceId = query.get("id");
    const getServiceDetail = async () => {
        let response = await SystemService.detailService(serviceId)
        if (response.data.status === "OK") {
            setDataDetail(response.data.data)
        } else {
            showToast("error", error.response.data.message);
        }
    }
    useEffect(() => {
        getServiceDetail()
    }, [])

    const deleteApi = async (apiId) => {
        let response = await SystemService.deleteApi(apiId)
        if (response.data.status === "OK") {
            getServiceDetail()
        } else {
            showToast("error", error.response.data.message);
        }
    }

    const onBackButtonPressHandler = () => {

    };
    const onEditService = () => {
        history.push('/system-service/service-edit?id=' + serviceId);
    };
    const initialValues = {}
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
                                            headerName={t("General Information")}
                                            values={values}
                                            setFieldValue={setFieldValue}
                                            dataDetail={dataDetail}
                                            authorize={authorize}
                                            setAuthorize={setAuthorize}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-5">
                                    {dataDetail?.groupDtoList?.map(e => < ServiceGroupDetails groupService={e}
                                        authorize={authorize}
                                        deleteApi={deleteApi}
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
                                        <Button
                                            className="mb-2 btn btn-secondary"
                                            onClick={onEditService}
                                        >
                                            {t("Edit")}
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

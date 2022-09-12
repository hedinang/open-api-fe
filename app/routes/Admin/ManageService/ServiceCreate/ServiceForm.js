import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
    Card, CardBody, CardHeader, FormGroup, Col, Row, Button, Label, Input, HorizontalInput
} from "components";
import { formatDateTime } from "helper/utilities";
import CUSTOM_CONSTANTS from "helper/constantsDefined";
import Select from "react-select";
import { Formik } from "formik";
import MultiSelect from "../components/MultiSelect";
import { MultiAdd } from "../components/MultiSelect/MultiAdd";
const ServiceForm = (props) => {
    const { t } = useTranslation();
    const {
        isCreate,
        isEdit,
        methodList,
        serverUrlList
    } = props;
    let isChange = false;
    if (isEdit || isCreate) {
        isChange = true;
    }
    const SingleValue = ({ data, ...props }) => {
        if (data.value === "") return <div>{data.label}</div>
        return (<div>{"+" + data.value}</div>);
    };
    const initialValues = {
        approvalConfig: false,
        requisitionType: "",
        workRequisitionTitle: "",
        contractType: "",
        bqContingencySum: "",
        retentionPercentage: "",
        retentionCappedPercentage: "",
        project: false,
        projectCode: "",
        vendorUuid: "",
        // dwrDate: formatDateString(new Date(), CUSTOM_CONSTANTS.YYYYMMDD),
        prNumber: "",
        currencyCode: "",
        isSupplier: false,
        supplierCode: [],
        rfqProcess: false,
        rfqTreshold: 0,
        prTitle: "",
        procurementType: "",
        approvalRouteUuid: "",
        approvalSequence: "",
        requester: "",
        submittedDate: "",
        deliveryAddress: "",
        deliveryDate: "",
        note: "",
        tradeCode: "",
        saveAsDraft: false,
        enablePrefix: false
    };
    const [validationSchema, setValidationSchema] = useState(null);
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => { }}
            >
                {({
                    errors, values, touched, handleChange, setFieldValue, dirty, handleSubmit
                }) => {
                    useEffect(() => {

                    }, [values.supplierCode]);


                    return (
                        <Card>
                            <CardBody className="p-4">
                                <FormGroup>
                                    <Row xs='12'>
                                        <Col xs='6'>
                                            <Row xs='12'>
                                                <Col xs="4" md="4">
                                                    <Label
                                                    >
                                                        {t("Service Name")}
                                                    </Label>
                                                </Col>
                                                <Col xs="8" md="8">
                                                    <Input
                                                        type="text"
                                                        value="Hyper SMS"
                                                    />
                                                </Col>
                                            </Row>
                                            {/* <Row xs='12'>
                                                <Col xs="4" md="4">
                                                    <label
                                                    // htmlFor="userName"
                                                    // className={classes.inputText1}
                                                    >
                                                        {t("Server Url List")}
                                                    </label>
                                                </Col>
                                                <Col xs="8" md="8" >
                                                    <FormGroup>
                                                        <MultiAdd
                                                            name="moduleServer"
                                                            className="form-control"
                                                            // options={modules.map((module) => ({
                                                            //     name: module.moduleName,
                                                            //     value: module.moduleCode
                                                            // }))}
                                                            options={serverUrlList.map((element) => ({
                                                                name: element,
                                                                value: element
                                                            }))}
                                                            objectName="Module"
                                                            setFieldValue={setFieldValue}
                                                            defaultValue={[
                                                                { value: 'a', name: 'a' },
                                                                { value: 'b', name: 'b' },
                                                                { value: 'c', name: 'c' },
                                                                { value: 'd', name: 'd' },
                                                            ]}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row> */}
                                        </Col>
                                        <Col xs="6" md="6"></Col>
                                    </Row>
                                </FormGroup>
                            </CardBody>
                        </Card>)
                }}
            </Formik>
        </>
    );
};

ServiceForm.propTypes = {
    isCreate: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
    form: PropTypes.instanceOf(Object).isRequired,
    updateForm: PropTypes.func.isRequired
};

export default ServiceForm;

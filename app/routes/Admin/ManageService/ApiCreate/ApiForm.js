import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
    Card, CardBody, CardHeader, FormGroup, Col, Row, Button, SelectInput, Label, Input, HorizontalInput
} from "components";
import { formatDateTime } from "helper/utilities";
import CUSTOM_CONSTANTS from "helper/constantsDefined";
import Select from "react-select";
const ApiForm = (props) => {
    const { t } = useTranslation();
    const {
        isCreate,
        isEdit,
        methodList,
        encryptList,
        serviceList
    } = props;
    let isChange = false;
    if (isEdit || isCreate) {
        isChange = true;
    }
    const SingleValue = ({ data, ...props }) => {
        if (data.value === "") return <div>{data.label}</div>
        return (<div>{"+" + data.value}</div>);
    };
    return (
        <>
            <Card>
                <CardBody className="p-4">
                    <FormGroup>
                        <Row xs='12'>
                            <Col xs='6'>
                                <Row xs='12'>
                                    <Col xs="4" md="4">
                                        <Label
                                        >
                                            {t("Api Name")}
                                        </Label>
                                    </Col>
                                    <Col xs="8" md="8">
                                        <Input
                                            type="text"
                                            value="/brandname/query"
                                            disabled
                                        />
                                    </Col>
                                </Row>
                                <Row xs='12'>
                                    <Col xs="4" md="4">
                                        <Label
                                        >
                                            {t("Service Name")}
                                        </Label>
                                    </Col>
                                    <Col xs="8" md="8">
                                        <Select
                                            // components={{ SingleValue }}
                                            // onChange={(e) => {
                                            //     setAddress({ ...address, country: e.value });
                                            // }}
                                            options={serviceList.map((element) => ({
                                                label: element,
                                                value: element
                                            }))}
                                            isSearchable
                                            defaultValue={"Please select a server instance"}
                                        // className={
                                        //     classNames("form-validate", {
                                        //         "is-invalid": !address.country && showValidate
                                        //     })
                                        // }
                                        />
                                    </Col>
                                </Row>
                                <Row xs='12'>
                                    <Col xs="4" md="4">
                                        <label
                                        // htmlFor="userName"
                                        // className={classes.inputText1}
                                        >
                                            {t("Encrytion")}
                                        </label>
                                    </Col>
                                    <Col xs="8" md="8" className="label-required">
                                        <Select
                                            // components={{ SingleValue }}
                                            // onChange={(e) => {
                                            //     setAddress({ ...address, country: e.value });
                                            // }}
                                            options={encryptList.map((element) => ({
                                                label: element,
                                                value: element
                                            }))}
                                            isSearchable
                                            defaultValue={"Please select a server instance"}
                                        // className={
                                        //     classNames("form-validate", {
                                        //         "is-invalid": !address.country && showValidate
                                        //     })
                                        // }
                                        />
                                    </Col>
                                </Row>
                                <Row xs='12'>
                                    <Col xs="4" md="4">
                                        <label
                                        // htmlFor="userName"
                                        // className={classes.inputText1}
                                        >
                                            {t("Method")}
                                        </label>
                                    </Col>
                                    <Col xs="8" md="8" className="label-required">
                                        <Select
                                            // components={{ SingleValue }}
                                            // onChange={(e) => {
                                            //     setAddress({ ...address, country: e.value });
                                            // }}
                                            options={methodList.map((element) => ({
                                                label: element,
                                                value: element
                                            }))}
                                            isSearchable
                                            defaultValue={"Please select a server instance"}
                                        // className={
                                        //     classNames("form-validate", {
                                        //         "is-invalid": !address.country && showValidate
                                        //     })
                                        // }
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="4" md="4">
                                        <Label
                                        >
                                            {t("Group")}
                                        </Label>
                                    </Col>
                                    <Col xs="8" md="8" className="label-required">
                                        <Select
                                            // components={{ SingleValue }}
                                            // onChange={(e) => {
                                            //     setAddress({ ...address, country: e.value });
                                            // }}
                                            options={methodList.map((element) => ({
                                                label: element,
                                                value: element
                                            }))}
                                            isSearchable
                                            defaultValue={"Please select a server instance"}
                                        // className={
                                        //     classNames("form-validate", {
                                        //         "is-invalid": !address.country && showValidate
                                        //     })
                                        // }
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="6" md="6">
                                <HorizontalInput
                                    name="requestBody"
                                    label={t("Default request body")}
                                    type="textarea"
                                    maxLength={3000}
                                    placeholder={t("Enter default request body")}
                                    // errors={errors.note}
                                    rows={10}
                                    // touched={touched.note}
                                    className="mb-0"
                                // disabled={disabled}
                                />
                            </Col>
                        </Row>


                    </FormGroup>
                </CardBody>
            </Card>
        </>
    );
};

ApiForm.propTypes = {
    isCreate: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
    form: PropTypes.instanceOf(Object).isRequired,
    updateForm: PropTypes.func.isRequired
};

export default ApiForm;

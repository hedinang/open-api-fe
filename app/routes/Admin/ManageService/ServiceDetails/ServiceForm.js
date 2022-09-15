import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
    Card, CardBody, CardHeader, FormGroup, Col, Row, Button, SelectInput, Label, Input
} from "components";
import { formatDateTime } from "helper/utilities";
import CUSTOM_CONSTANTS from "helper/constantsDefined";
import Select from "react-select";
const ServiceForm = (props) => {
    const { t } = useTranslation();
    const {
        isCreate,
        isEdit,
        serverList
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
                        <Row xs="12" className="d-flex mx-0">
                            <Col xs="2" md="2">
                                <Label
                                >
                                    {t("Service Name")}
                                </Label>
                            </Col>
                            <Col xs="4" md="4">
                                <Input
                                    type="text"
                                    value="Hyper SMS"
                                    disabled
                                />

                            </Col>
                            <Col xs="2" md="2"></Col>
                            <Col xs="4" md="4">
                                <Button
                                    className="mb-2 btn btn-primary" style={{ backgroundColor: "#fb9f3f" }}
                                >
                                    {t("Authorize")}
                                </Button>
                            </Col>
                        </Row>
                        <Row xs="12" className="d-flex mx-0">
                            <Col xs="2" md="2">
                                <label
                                // htmlFor="userName"
                                // className={classes.inputText1}
                                >
                                    {t("Server Url")}
                                </label>
                            </Col>
                            <Col xs="4" md="4" className="label-required">
                                <Select
                                    // components={{ SingleValue }}
                                    // onChange={(e) => {
                                    //     setAddress({ ...address, country: e.value });
                                    // }}
                                    options={serverList.map((element) => ({
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
                            <Col xs="3" md="3"></Col>
                            <Col xs="3" md="3">
                            </Col>
                        </Row>
                    </FormGroup>
                </CardBody>
            </Card>
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

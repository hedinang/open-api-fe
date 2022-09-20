import React, { useState, useEffect, useRef } from "react";
import { InputSwitch } from "primereact/inputswitch";
import { useTranslation } from "react-i18next";
import classes from "./NavbarTopMenuToggle.scss";

const NavbarTopMenuToggle = () => {
    const { t } = useTranslation();
    const [toggleOn, setToggleOn] = useState(true);

    useEffect(() => {
        if (localStorage.getItem(process.env.SHARE_COOKIES_NAME))
            setToggleOn(true)
        else setToggleOn(false)
    }, [])

    const onToggleChanged = (value) => {
        if (toggleOn) {
            localStorage.removeItem(process.env.SHARE_COOKIES_NAME)
            window.location.href = 'http://localhost:4100/system-service/service-list'
        }
        else {
            window.location.href = 'http://localhost:4100/login'
        }

    };
    return (
        <>
            <div className={classes["toggle-menu"]}>
                <p className={[classes["text-buyer"], toggleOn ? "" : classes.active].join(" ")}>{t("User")}</p>
                <InputSwitch
                    className={classes["toggle-button"]}
                    // checked={toggleOn}
                    trueValue={toggleOn}
                    onChange={(e) => onToggleChanged(e.value)}
                />
                <p className={[classes["text-supplier"], !toggleOn ? "" : classes.active].join(" ")}>{t("Guest")}</p>
            </div>
        </>
    );
};

export default NavbarTopMenuToggle;

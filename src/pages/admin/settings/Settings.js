import React, { useEffect, useState } from "react";
import Sweetalert2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { TextInputMask } from "react-web-masked-text";
import { MoneyMaskedToStringUnmasked } from "utils";

import * as settingsService from "services/settingsService";

import store from "store";
import { history } from "routes/history";
import * as actions from "store/actions";

import "./styles.css";

const Swal = withReactContent(Sweetalert2);

//////////////////////////////////////////////////////////////////////////////
const Settings = () => {
    const [idSettings, setIdSettings] = useState(0);
    const [addressSellerSettings, setAddressSellerSettings] = useState("");
    const [shippingTaxSettings, setShippingTaxSettings] = useState(0);

    useEffect(() => {
        store.dispatch(actions.actionAdminModuleActivate());

        const getSettings = async () => {
            const response = await settingsService.get()
            setIdSettings(response.IdSettings);
            setAddressSellerSettings(response.AddressSellerSettings);
            setShippingTaxSettings(response.ShippingTaxSettings);
        };
        getSettings();
    }, []);


    const handleSubmit = () => {
        if (!validateFields({ addressSellerSettings, shippingTaxSettings })) return false;
        confirmAndExit();

        async function confirmAndExit() {
            Swal.fire({
                title: 'Confirma ?',
                // text: "Esta notificação irá para todos os clientes com o app !!",
                icon: 'warning',
                position: "top-end",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    let shippingTaxValue = MoneyMaskedToStringUnmasked(shippingTaxSettings);

                    settingsService.put({
                        AddressSellerSettings: addressSellerSettings,
                        ShippingTaxSettings: shippingTaxValue,
                        IdSettings: idSettings,
                    });
                    history.push("orders");
                    return true;
                }
            });
        };
    };

    const handleExit = () => {
        history.push("orders");
    };

    return (
        <div id="notifications" className="notifications-container">
            <div className="notifications-header">
                <div className="notifications-header-text">
                    Settings
                </div>
            </div>
            <div className="notifications-buttons">
                <button className="notifications-button" onClick={handleSubmit}>
                    Confirmar
                </button>

                <button className="notifications-button" onClick={handleExit}>
                    Sair
                </button>
            </div>
            <div className="notifications-warning">
                <div className="notifications-warning-text">
                    Settings
                </div>
            </div>
            <div className="notifications-content">
                {/* addressSellerSettings */}
                <div className="notifications-input-group">
                    <label className="notifications-label" htmlFor="addressSellerSettings">
                        Endereço do Estabelecimento
                    </label>
                    <input
                        className="notifications-input"
                        name="addressSellerSettings"
                        id="addressSellerSettings"
                        required
                        autoComplete="new-password"
                        value={addressSellerSettings}
                        onChange={(e) => setAddressSellerSettings(e.target.value)}
                    />
                </div>

                {/* shippingTaxSettings */}
                <div className="notifications-input-group">
                    <label className="notifications-label" htmlFor="shippingTaxSettings">
                        Valor do Frete
                    </label>
                    <TextInputMask
                        kind={"money"}
                        className="notifications-input"
                        style={{ width: 200 }}
                        name="shippingTaxSettings"
                        id="shippingTaxSettings"
                        required
                        autoComplete="new-password"
                        value={shippingTaxSettings}
                        onChange={(text) => setShippingTaxSettings(text)}
                    />
                </div>

            </div>
        </div>
    );
};

const validateFields = (values) => {
    if (!values.addressSellerSettings) {
        validateErrorMessage("Campo Endereço do Estabelecimento é obrigatório !!");
        return false;
    }
    return true;
};
const validateErrorMessage = (message) => {
    Swal.fire({
        icon: "error",
        title: message,
        text: "Oops ...",
        position: "top-end",
        background: "yellow",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });
};

export default Settings;

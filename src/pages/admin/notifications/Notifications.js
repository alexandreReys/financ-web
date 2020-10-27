import React, { useEffect, useState } from "react";
import { history } from "routes/history";

import { TextInputMask } from "react-web-masked-text";

import Sweetalert2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import store from "store";
import * as actions from "store/actions";
import * as utils from "utils";
import * as masks from "utils/masks";

import "./styles.css";

const Swal = withReactContent(Sweetalert2);

const Notifications = () => {
    const [estimatedPropertyValue, setEstimatedPropertyValue] = useState(550000);
    const [financingAmount, setFinancingAmount] = useState(276913);
    const [financingTerm, setFinancingTerm] = useState(360);
    const [annualRate, setAnnualRate] = useState(5.12);
    const [insurancePercentage, setInsurancePercentage] = useState(5.799);
    const [tariffValue, setTariffValue] = useState(25);

    const [arrayValues, setArrayValues] = useState([]);

    useEffect(() => {
        store.dispatch(actions.actionAdminModuleActivate());
    }, []);

    const handleExit = () => {
        history.push("/");
    };

    const handleSubmit = () => {

        const validateFields = (values) => {
            if (!values.estimatedPropertyValueFloat || values.estimatedPropertyValueFloat < 0) {
                validateErrorMessage("Campo Valor Estimado do Imovel é obrigatório !!");
                return false;
            }
            if (!values.financingAmountFloat || values.financingAmountFloat < 0) {
                validateErrorMessage("Campo Valor do Financiamento é obrigatório !!");
                return false;
            }
            if (!values.financingTermFloat || values.financingTermFloat < 0) {
                validateErrorMessage("Campo Prazo do Financiamento é obrigatório !!");
                return false;
            }
            if (values.financingTermFloat > 720) {
                validateErrorMessage("Campo Prazo do Financiamento fora dos limites permitidos !!");
                return false;
            }
            if (!values.annualRateFloat || values.annualRateFloat < 0) {
                validateErrorMessage("Campo Taxa Efetiva Anual de Juros é obrigatório !!");
                return false;
            }
            if (!values.insurancePercentageFloat || values.insurancePercentageFloat < 0) {
                validateErrorMessage("Campo % Seguro é obrigatório !!");
                return false;
            }
            if (!values.tariffValueFloat || values.tariffValueFloat < 0) {
                validateErrorMessage("Campo Valor das Tarifas é obrigatório !!");
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
                timer: 4000,
                timerProgressBar: true,
            });
        };
        const fixedParse = (value) => {
            return parseFloat(value.toFixed(2))
        };
        const setList = (financingAmount, annualRate, financingTerm, insurancePercentage, tariffValue) => {
            var response = [];

            const calculateMonthlyRate = (annualRate) => {
                let v1 = (annualRate + 100) / 100;
                let v2 = (1 / 12);
                return ((v1 ** v2) - 1) * 100;
            };
            const monthlyRate = calculateMonthlyRate(annualRate);

            var financingValue = financingAmount;
            const ammortization = fixedParse(financingAmount / financingTerm);

            for (var index = 1; index <= financingTerm; index++) {
                const obj = setListItem(
                    index, financingValue, monthlyRate, ammortization,
                    insurancePercentage, tariffValue, financingTerm
                );

                financingValue = obj.balance;
                response.push(obj);
            };

            return response;
        };
        const setListItem = (
            index, financingValue, monthlyRate, ammortization, 
            insurancePercentage, tariffValue, financingTerm
        ) => {
            const interestValue = fixedParse((financingValue * monthlyRate) / 100);
            const currentValue = fixedParse(financingValue + interestValue);
            const insuranceValue = fixedParse((interestValue + ammortization) * (insurancePercentage / 100));
            const ajValue = fixedParse(interestValue + ammortization);
            var monthlyPayment = fixedParse(interestValue + ammortization + insuranceValue + tariffValue);
            var balance = 0;

            if (index !== financingTerm) {
                balance = fixedParse(currentValue - ajValue);
            } else {
                const dif = fixedParse(currentValue - ajValue);
                monthlyPayment += dif;
                balance = 0;
            };

            return {
                index, financingValue, interestValue, currentValue, ammortization,
                insuranceValue, tariffValue, ajValue, monthlyPayment, balance
            };
        };

        var estimatedPropertyValueFloat = utils.MoneyMaskedToFloat(estimatedPropertyValue);
        var financingAmountFloat = utils.MoneyMaskedToFloat(financingAmount);
        var financingTermFloat = utils.MoneyMaskedToFloat(financingTerm);
        var annualRateFloat = utils.MoneyMaskedToFloat(annualRate);
        var insurancePercentageFloat = utils.MoneyMaskedToFloat(insurancePercentage);
        var tariffValueFloat = utils.MoneyMaskedToFloat(tariffValue);

        if (!validateFields({
            estimatedPropertyValueFloat, financingAmountFloat, financingTermFloat,
            annualRateFloat, insurancePercentageFloat, tariffValueFloat,
        })) {
            setArrayValues([]);
            return false;
        };


        const list = setList(
            financingAmountFloat, annualRateFloat, financingTermFloat,
            insurancePercentageFloat, tariffValueFloat,
        );

        setArrayValues(list);
    };

    return (
        <div id="notifications" className="notifications-container">
            <div className="notifications-header">
                <div className="notifications-header-text">
                    Tabela SAC
                </div>
            </div>
            <div className="notifications-buttons">
                <button className="notifications-button" onClick={handleExit}>
                    Sair
                </button>
            </div>
            <div className="notifications-warning">
                <div className="notifications-warning-text">
                    SAC - Sistema de amortização Constante - Tipo de operação : IMOB SFH IPCA SAC PF
                </div>
            </div>

            <div className="notifications-content">

                <div>
                    {/* estimatedPropertyValue */}
                    <div className="notifications-input-group">
                        <label className="notifications-label" htmlFor="title">
                            Valor estimado do imóvel
                        </label>
                        <TextInputMask
                            kind={"money"}
                            options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' }}
                            className="notifications-input"
                            style={{ width: 200 }}
                            name="estimatedPropertyValue"
                            id="estimatedPropertyValue"
                            required
                            autoComplete="new-password"
                            value={estimatedPropertyValue}
                            onChange={(text) => setEstimatedPropertyValue(text)}
                        // onChange={(event, maskedvalue, floatvalue) => {
                        //     setEstimatedPropertyValue(floatvalue)
                        // }}
                        />
                    </div>
                </div>

                <div>
                    {/* financingAmount */}
                    <div className="notifications-input-group">
                        <label className="notifications-label" htmlFor="title">
                            Valor do Financiamento
                        </label>
                        <TextInputMask
                            kind={"money"}
                            options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' }}
                            className="notifications-input"
                            style={{ width: 200 }}
                            name="financingAmount"
                            id="financingAmount"
                            required
                            autoComplete="new-password"
                            value={financingAmount}
                            onChange={(text) => setFinancingAmount(text)}
                        />
                    </div>
                </div>

                <div>
                    {/* financingTerm */}
                    <div className="notifications-input-group">
                        <label className="notifications-label" htmlFor="title">
                            Prazo
                        </label>
                        <TextInputMask
                            kind={"only-numbers"}
                            className="notifications-input"
                            style={{ width: 100 }}
                            name="financingTerm"
                            id="financingTerm"
                            required
                            autoComplete="new-password"
                            value={financingTerm}
                            onChange={(text) => setFinancingTerm(text)}
                        />
                    </div>
                </div>

                <div>
                    {/* annualRate */}
                    <div className="notifications-input-group">
                        <label className="notifications-label" htmlFor="title">
                            % Taxa Efetiva Anual de Juros
                        </label>
                        <TextInputMask
                            kind={"money"}
                            options={{ precision: 2, separator: ',', delimiter: '.', unit: '', suffixUnit: '' }}
                            className="notifications-input"
                            style={{ width: 100 }}
                            name="annualRate"
                            id="annualRate"
                            required
                            autoComplete="new-password"
                            value={annualRate}
                            onChange={(text) => setAnnualRate(text)}
                        />
                    </div>
                </div>

                <div>
                    {/* insurancePercentage */}
                    <div className="notifications-input-group">
                        <label className="notifications-label" htmlFor="title">
                            % Seguro
                        </label>
                        <TextInputMask
                            kind={"money"}
                            options={{ precision: 3, separator: ',', delimiter: '.', unit: '', suffixUnit: '' }}
                            className="notifications-input"
                            style={{ width: 100 }}
                            name="insurancePercentage"
                            id="insurancePercentage"
                            required
                            autoComplete="new-password"
                            value={insurancePercentage}
                            onChange={(text) => setInsurancePercentage(text)}
                        />
                    </div>
                </div>

                <div>
                    {/* estimatedPropertyValue */}
                    <div className="notifications-input-group">
                        <label className="notifications-label" htmlFor="title">
                            Tarifas
                        </label>
                        <TextInputMask
                            kind={"money"}
                            options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' }}
                            className="notifications-input"
                            style={{ width: 200 }}
                            name="tariffValue"
                            id="tariffValue"
                            required
                            autoComplete="new-password"
                            value={tariffValue}
                            onChange={(text) => setTariffValue(text)}
                        />
                    </div>
                </div>

            </div>

            <div>
                <button
                    style={{ marginTop: 30, marginLeft: 30, padding: 20, borderRadius: 10 }}
                    onClick={() => handleSubmit()}
                >
                    Calcular
                </button>
            </div>

            <table className="table" style={{ marginTop: 30 }}>
                <thead style={{ fontSize: "0.9rem" }}>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Saldo Inicial</th>
                        <th scope="col">Juros</th>

                        <th scope="col">Saldo Atualizado</th>
                        <th scope="col">Amortização</th>
                        <th scope="col">Seguro</th>

                        <th scope="col">Tarifas</th>
                        <th scope="col">A+J</th>
                        <th scope="col">Prestação</th>

                        <th scope="col">Saldo Devedor</th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: "0.8rem" }}>

                    {arrayValues.map((v) => {
                        return (
                            <tr key={v.index}>
                                <th scope="row">{v.index}</th>
                                <td>{masks.moneyMask(v.financingValue)}</td>
                                <td>{masks.moneyMask(v.interestValue)}</td>

                                <td>{masks.moneyMask(v.currentValue)}</td>
                                <td>{masks.moneyMask(v.ammortization)}</td>
                                <td>{masks.moneyMask(v.insuranceValue)}</td>

                                <td>{masks.moneyMask(v.tariffValue)}</td>
                                <td>{masks.moneyMask(v.ajValue)}</td>
                                <td>{masks.moneyMask(v.monthlyPayment)}</td>

                                <td>{masks.moneyMask(v.balance)}</td>
                            </tr>

                        )
                    })}

                </tbody>
            </table>

        </div>
    );
};

export default Notifications;

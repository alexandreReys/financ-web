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

    const [interestTotal, setInterestTotal] = useState(0);
    const [mainDebtTotal, setMainDebtTotal] = useState(0);
    const [debtTotal, setDebtTotal] = useState(0);
    const [maximumParcelValue, setMaximumParcelValue] = useState(0);
    const [minimumIncome, setMinimunIncome] = useState(0);

    const [arrayValues, setArrayValues] = useState([]);

    useEffect(() => {
        store.dispatch(actions.actionAdminModuleActivate());
    }, []);

    const handleExit = () => {
        history.push("/");
    };

    const handleCalculate = () => {

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

        const thousandCeil = (value) => Math.ceil( value / 1000 ) * 1000;

        const clearList = () => {
            setArrayValues([]);
            setInterestTotal(0);
            setMainDebtTotal(0);
            setDebtTotal(0);
            setMaximumParcelValue(0);
            setMinimunIncome(0);
        };

        const generateList = (financingAmount, annualRate, financingTerm, insurancePercentage, tariffValue) => {
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
                const obj = generateListItem(
                    index, financingValue, monthlyRate, ammortization,
                    insurancePercentage, tariffValue, financingTerm
                );

                financingValue = obj.balance;
                response.push(obj);
            };

            return response;
        };

        const generateListItem = (
            index, financingValue, monthlyRate, ammortization,
            insurancePercentage, tariffValue, financingTerm
        ) => {
            const interestValue = fixedParse((financingValue * monthlyRate) / 100);
            const currentValue = fixedParse(financingValue + interestValue);
            const insuranceValue = fixedParse((interestValue + ammortization) * (insurancePercentage / 100));
            const ajValue = fixedParse(interestValue + ammortization);
            var monthlyPayment = fixedParse(interestValue + ammortization + insuranceValue + tariffValue);
            var balance = 0;

            if (index === 1) {
                setMaximumParcelValue( Math.ceil(monthlyPayment) );
                setMinimunIncome( thousandCeil(monthlyPayment / 0.25) );
            };

                if (index !== financingTerm) {
                    balance = fixedParse(currentValue - ajValue);
                } else {
                    const dif = fixedParse(currentValue - ajValue);
                    ammortization += dif;
                    // balance = 0;
                };
            
            return {
                index, financingValue, interestValue, currentValue, ammortization,
                insuranceValue, tariffValue, ajValue, monthlyPayment, balance
            };
        };












        //////////////////////////////////////////////////////////////////////////////////////////////
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
            clearList();
            return false;
        };


        const list = generateList(
            financingAmountFloat, annualRateFloat, financingTermFloat,
            insurancePercentageFloat, tariffValueFloat,
        );

        setArrayValues(list);

        setInterestTotal(list.reduce((acc, cur) => acc + cur.interestValue, 0));
        setMainDebtTotal(list.reduce((acc, cur) => acc + cur.ammortization, 0));
        setDebtTotal(list.reduce((acc, cur) => acc + cur.monthlyPayment, 0));
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
                        <label className="notifications-label" htmlFor="title">Valor estimado </label>
                        <label className="notifications-label" htmlFor="title">
                            do imóvel
                        </label>
                        <TextInputMask
                            kind={"money"}
                            options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' }}
                            className="notifications-input"
                            style={{ width: 150 }}
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
                        <   label className="notifications-label" htmlFor="title">Valor total</label>
                        <label className="notifications-label" htmlFor="title">do Financiamento</label>
                        <TextInputMask
                            kind={"money"}
                            options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' }}
                            className="notifications-input"
                            style={{ width: 150 }}
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
                        <label className="notifications-label" htmlFor="title" style={{ color: "white" }}>.</label>
                        <label className="notifications-label" htmlFor="title">
                            Prazo
                        </label>
                        <TextInputMask
                            kind={"only-numbers"}
                            className="notifications-input"
                            style={{ width: 70 }}
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
                        <label className="notifications-label" htmlFor="title">% Taxa Efetiva</label>
                        <label className="notifications-label" htmlFor="title">Anual de Juros</label>
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
                        <label className="notifications-label" htmlFor="title" style={{ color: "white" }}>.</label>
                        <label className="notifications-label" htmlFor="title">% Seguro</label>
                        <TextInputMask
                            kind={"money"}
                            options={{ precision: 3, separator: ',', delimiter: '.', unit: '', suffixUnit: '' }}
                            className="notifications-input"
                            style={{ width: 70 }}
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
                        <label className="notifications-label" htmlFor="title">Valor mensal</label>
                        <label className="notifications-label" htmlFor="title">das tarifas</label>
                        <TextInputMask
                            kind={"money"}
                            options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$ ', suffixUnit: '' }}
                            className="notifications-input"
                            style={{ width: 100 }}
                            name="tariffValue"
                            id="tariffValue"
                            required
                            autoComplete="new-password"
                            value={tariffValue}
                            onChange={(text) => setTariffValue(text)}
                        />
                    </div>
                </div>

                <div>
                    <button className="notifications-button-calcular" onClick={() => handleCalculate()}>
                        Calcular
                    </button>
                </div>

            </div>


            <div style={{ display: "flex" }} className="notifications-content">
                <view style={{ display: "flex", flexDirection: "column" }}>
                    <text style={{fontWeight: "bold", color: "navy"}}>Juros devidos</text>
                    <text style={{fontWeight: "bold", color: "blue"}}>{masks.moneyMask(interestTotal)}</text>
                </view>

                <view style={{ display: "flex", flexDirection: "column", marginLeft: 30 }}>
                    <text style={{fontWeight: "bold", color: "navy"}}>Principal devido</text>
                    <text style={{fontWeight: "bold", color: "blue"}}>{masks.moneyMask(mainDebtTotal)}</text>
                </view>

                <view style={{ display: "flex", flexDirection: "column", marginLeft: 30 }}>
                    <text style={{fontWeight: "bold", color: "navy"}}>Total devido</text>
                    <text style={{fontWeight: "bold", color: "blue"}}>{masks.moneyMask(debtTotal)}</text>
                </view>

                <view style={{ display: "flex", flexDirection: "column", marginLeft: 30 }}>
                    <text style={{fontWeight: "bold", color: "navy"}}>Prestação maxima</text>
                    <text style={{fontWeight: "bold", color: "blue"}}>{masks.moneyMask(maximumParcelValue)}</text>
                </view>

                <view style={{ display: "flex", flexDirection: "column", marginLeft: 30 }}>
                    <text style={{fontWeight: "bold", color: "navy"}}>Renda Minima</text>
                    <text style={{fontWeight: "bold", color: "blue"}}>{masks.moneyMask(minimumIncome)}</text>
                </view>

            </div>


            <table className="table" style={{ marginTop: 30 }}>
                <thead style={{ fontSize: "0.9rem" }}>
                    <tr style={{fontWeight: "bold", color: "navy"}}>
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

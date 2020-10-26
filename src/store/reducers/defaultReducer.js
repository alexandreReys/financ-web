const INITIAL_STATE = {
  appTitle: "Financiamento",
  loadingText: "Acessando dados ...",
  errorMsgText: "Verificando ...",
  adminModule: true,
  addressSellerSettings: "",
  shippingTaxSettings: 0,
};

export default function defaultReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ACTION_ADMIN_MODULE_ACTIVATE":
      return { ...state, adminModule: true };
    case "ACTION_ADMIN_MODULE_DEACTIVATE":
      return { ...state, adminModule: false };
    case "ACTION_GET_SETTINGS":
      return functionGetSettings(state, action);
    default:
      return state;
  }
}

const functionGetSettings = (state, { settings }) => {
  return {
    ...state,
    addressSellerSettings: settings.AddressSellerSettings,
    shippingTaxSettings: settings.ShippingTaxSettings,
  };
};

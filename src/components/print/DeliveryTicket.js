import React from "react";
import store from "store";
import * as utils from "utils";
import { moneyMask } from "utils/masks";

import "./styles.css";

class DeliveryTicket extends React.Component {
  render() {
    const deliveryDate = utils.formattedDate(store.getState().orderState.order.DateOrder);
    const orderItems = store.getState().orderState.orderItems;
    const totalProductsOrder = moneyMask(store.getState().orderState.order.TotalProductsOrder);
    const shippingAmountOrder = moneyMask(store.getState().orderState.order.ShippingAmountOrder);
    const totalOrder = moneyMask(store.getState().orderState.order.TotalOrder);
    
    const changeValueOrder = moneyMask(store.getState().orderState.order.ChangeValueOrder);
    const totalOrder2 = moneyMask(store.getState().orderState.order.TotalOrder / 2);
    const totalOrder3 = moneyMask(store.getState().orderState.order.TotalOrder / 3);
    const totalOrder4 = moneyMask(store.getState().orderState.order.TotalOrder / 4);
    const totalOrder5 = moneyMask(store.getState().orderState.order.TotalOrder / 5);

    return (
      <section id="DeliveryTicket" className="print-content">
        <div className="ticket-content">
          <div className="ticket-header">
            <h3>{store.getState().defaultState.appTitle}</h3>
            <h4>
              <b>Pedido: {store.getState().orderState.order.IdOrder}</b>
            </h4>
            <h5>Entrega : Delivery para {deliveryDate}</h5>
            <h5>
              Pagamento : {store.getState().orderState.order.PaymantTypeOrder}
            </h5>
          </div>
          <hr />
          <div className="delivery-info">
            <h4>
              Bairro :{" "}
              {store.getState().orderState.order.CustomerNeighborhoodOrder}
            </h4>
            <p>
              Endereço: {store.getState().orderState.order.CustomerAddressOrder}
            </p>
            <h5>
              Cliente: {store.getState().orderState.order.CustomerNameOrder}
            </h5>
          </div>
          <hr />
          {orderItems.map((item) => {
            const total = moneyMask(
              item.quantityOrderItem * item.priceOrderItem
            );
            return (
              <div className="table-item" key={item.idProductOrderItem}>
                <span className="column-left product-description">
                  {item.DescricaoVinho}
                </span>
                <span className="column-right">{total}</span>
              </div>
            );
          })}
          <hr />
          <div className="total">
            <span className="column-left">Total dos produtos</span>
            <span className="column-right">{totalProductsOrder}</span>
          </div>
          <div className="total">
            <span className="column-left">Frete</span>
            <span className="column-right">{shippingAmountOrder}</span>
          </div>
          <div className="total">
            <span className="column-left">Total a pagar</span>
            <span className="column-right">{totalOrder}</span>
          </div>
          <div className="total">
            <span className="column-left">Troco</span>
            <span className="column-right">{changeValueOrder}</span>
          </div>

          <hr />

          <div className="qtty-persons">
            <span className="column-left">2 pessoas: {totalOrder2}</span>
            <span className="column-left">4 pessoas: {totalOrder4}</span>
          </div>
          <div className="qtty-persons">
            <span className="column-left">3 pessoas: {totalOrder3}</span>
            <span className="column-left">5 pessoas: {totalOrder5}</span>
          </div>

          <hr />

          <div className="ticket-footer">
            <h3>Adega da Vila</h3>
            <h4>
              <b>Pedido: {store.getState().orderState.order.IdOrder}</b>
            </h4>
            <h5>
              {utils.formatttedToday()} {utils.formatttedCurrentTime()}
            </h5>
          </div>

          <hr />
        </div>
      </section>
    );
  }
}

export default DeliveryTicket;
